<template>
  <div class="q-pa-md">
    <q-table
      :grid="grid"
      :title="title"
      :rows="rows"
      :columns="columns"
      row-key="rowKey"
      flat
      :filter="filter"
      :hide-header="grid ? true : false"
      :pagination="pagination"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          filled
          debounce="300"
          v-model="filter"
          placeholder="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <!-- Modo grid -->
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <q-card>
            <q-card-section class="q-pb-xs">
              <div class="text-overline ellipsis" style="line-height: 1.5">
                {{ props.row.title }}
              </div>
            </q-card-section>
            <q-separator v-if="props.row.title" />
            <q-card-section horizontal>
              <q-card-section class="col-5 flex flex-center" v-if="avatar">
                <q-img
                  class="rounded-borders"
                  :src="props.row.avatar"
                  height="100px"
                  fit="contain"
                />
              </q-card-section>

              <q-card-section class="q-pa-none">
                <div class="text-caption text-grey">
                  <q-list dense>
                    <q-item
                      v-for="(col, key) in dataFiltered(props.cols, props.row)"
                      :key="key"
                    >
                      <q-item-section>
                        <q-item-label class="text-black">
                          {{ col.label }}
                        </q-item-label>
                        <q-item-label>{{ col.value }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-card-section>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn
                unelevated
                dense
                class="custom-btn primary no-shadow"
                size="md"
                label="Editar"
                no-caps
                @click="onEdit(props.row)"
                v-if="props.row.btnEdit"
              />
              <q-btn
                unelevated
                dense
                class="custom-btn primary no-shadow"
                size="md"
                label="Inhabilitar"
                no-caps
                @click="onStatus(props.row)"
                v-if="props.row.btnStatus"
              />
              <q-btn
                unelevated
                dense
                class="custom-btn primary no-shadow"
                size="md"
                label="Detalle"
                no-caps
                @click="onDetail(props.row)"
                v-if="props.row.btnDetail"
              />
            </q-card-actions>
          </q-card>
        </div>
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in dataFiltered(props.cols, props.row)"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
          <q-th auto-width />
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            v-for="col in dataFiltered(props.cols, props.row)"
            :key="col.name"
            :props="props"
          >
            <div v-if="col.label != 'ESTADO'">{{ col.value }}</div>
            <q-badge
              v-else
              :color="assingColor(props.row)"
              :label="col.value == 1 ? 'ACTIVO' : 'INACTIVO'"
              class="q-pa-sm text-center"
            />
          </q-td>
          <q-td auto-width>
            <div class="full-width q-gutter-sm">
              <q-btn
                unelevated
                dense
                round
                class="custom-btn primary no-shadow"
                size="md"
                icon="fa-solid fa-pen-to-square"
                no-caps
                @click="onEdit(props.row)"
                v-if="props.row.btnEdit"
              >
                <q-tooltip> Editar </q-tooltip>
              </q-btn>
              <q-btn
                unelevated
                dense
                round
                class="custom-btn warning no-shadow"
                size="md"
                icon="fa-solid fa-power-off"
                no-caps
                @click="onStatus(props.row)"
                v-if="props.row.btnStatus"
              >
                <q-tooltip> Cambiar estado </q-tooltip>
              </q-btn>
              <q-btn
                unelevated
                dense
                round
                class="custom-btn secondary no-shadow"
                size="md"
                icon="fa-solid fa-eye"
                no-caps
                @click="onDetail(props.row)"
                v-if="props.row.btnDetail"
              >
                <q-tooltip> Ver detalle </q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { ref, watch } from 'vue';

export default {
  props: {
    rows: {
      type: Array,
      require: true,
    },
    columns: {
      type: Array,
      require: true,
    },
    title: String,
    avatar: {
      type: Boolean,
      default: false,
    },
    grid: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['onEdit', 'onDetail', 'onStatus', 'input'],
  setup(props: any, { emit }: any) {
    const $q = useQuasar();
    function getItemsPerPage() {
      if ($q.screen.lt.sm) {
        return 3;
      }
      if ($q.screen.lt.md) {
        return 6;
      }
      return 9;
    }

    const filter = ref('');
    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 9,
      // rowsNumber: xx if getting data from a server
    });

    watch(
      () => $q.screen.name,
      () => {
        pagination.value.rowsPerPage = getItemsPerPage();
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const upDateVmodel = ($event: any) => {
      emit('input', $event);
    };

    const onEdit = (row: any) => {
      emit('onEdit', row);
    };

    const onStatus = (row: any) => {
      emit('onStatus', row);
    };

    const onDetail = (row: any) => {
      emit('onDetail', row);
    };

    const dataFiltered = (cols: any, row: any) => {
      if (row) {
        return cols.filter(
          (col: any) => col.label !== 'TITLE' && col.value !== row.title
        );
      }
      return cols.filter((col: any) => col.label !== 'TITLE');
    };

    const assingColor = (data: any) => {
      if (data.estadoUsuario == 1) {
        return 'green';
      } else {
        return 'negative';
      }
    };

    return {
      filter,
      pagination,
      upDateVmodel,
      onEdit,
      onStatus,
      onDetail,
      dataFiltered,
      assingColor,
    };
  },
};
</script>

<style lang="sass">
.grid-masonry
  flex-direction: column
  height: 700px

  &--2
    > div
      &:nth-child(2n + 1)
        order: 1
      &:nth-child(2n)
        order: 2

    &:before
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 1
  &--3
    > div
      &:nth-child(3n + 1)
        order: 1
      &:nth-child(3n + 2)
        order: 2
      &:nth-child(3n)
        order: 3

    &:before,
    &:after
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 2
</style>
