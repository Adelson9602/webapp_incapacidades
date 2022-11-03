<template>
  <q-page padding>
    <!-- content -->
    <q-card flat>
      <q-card-section class="q-pb-none">
        <q-btn
          color="primary"
          icon="add"
          label="agregar cargo"
          @click="dialogRol = true"
        />
        <q-dialog v-model="dialogRol" persistent>
          <q-card style="width: 450px; max-width: 90vw">
            <q-bar dark class="bg-primary text-white">
              <q-btn dense flat round icon="list" color="white" />
              <div class="col text-center text-weight-bold">
                {{ position.idCargo ? 'Editar ' : 'Agregar ' }}cargo
              </div>
              <q-btn
                dense
                flat
                round
                icon="close"
                color="white"
                v-close-popup
              />
            </q-bar>
            <q-card-section>
              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
                ref="myForm"
              >
                <q-input
                  v-model="position.nombreCargo"
                  outlined
                  type="text"
                  label="Nombre del cargo"
                  :rules="[(val) => !!val || 'Nombre cargo es requerido']"
                />
                <div class="row justify-end">
                  <q-btn label="Guardar" type="submit" color="primary" />
                  <q-btn
                    label="Cancelar"
                    type="reset"
                    color="primary"
                    flat
                    class="q-ml-sm"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-card-section>
      <general-table-component
        :columns="columns"
        title="Cargos del sistema"
        :rows="rows"
        :grid="true"
        @on-edit="onEdit"
      />
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useQuasar, QTableColumn } from 'quasar';
import { get, post } from 'src/requests';
import { Position } from 'src/models/generals.models';
import { controlError } from 'src/helpers/controlError';
import GeneralTableComponent from 'src/components/general/GeneralTableComponent.vue';

const columns: QTableColumn[] = [
  {
    name: 'idCargo',
    label: 'ID CARGO',
    align: 'center',
    sortable: true,
    field: 'idCargo',
  },
  {
    name: 'nombreCargo',
    label: 'ROL',
    align: 'center',
    sortable: true,
    field: 'nombreCargo',
  },
];
export default defineComponent({
  name: 'PagePositions',
  components: {
    GeneralTableComponent,
  },
  setup() {
    const $q = useQuasar();
    const rows = ref<Position[]>([]);
    const isLoading = ref(false);
    const dialogRol = ref(false);
    const myForm = ref<any>(null);
    const position = ref({
      idCargo: 0,
      nombreCargo: '',
    });

    const getData = async () => {
      isLoading.value = true;
      try {
        const resRols = await get
          .getPosition()
          .then((response) => response.data);
        rows.value = [
          ...resRols.map((position) => {
            position.title = position.nombreCargo;
            position.btnEdit = true;
            position.btnDetail = true;
            return position;
          }),
        ];
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onSubmit = async () => {
      isLoading.value = true;
      try {
        const resRols = await post
          .createPosition(position.value)
          .then((response) => response.data);

        $q.notify({
          message: resRols.message,
          type: 'positive',
          position: 'bottom-right',
        });
        setTimeout(() => getData(), 200);
        position.value = {
          idCargo: 0,
          nombreCargo: '',
        };
        dialogRol.value = false;
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onReset = () => {
      position.value = {
        idCargo: 0,
        nombreCargo: '',
      };
      myForm.value.resetValidation();
      dialogRol.value = false;
    };

    const onEdit = (row: Position) => {
      position.value = row;
      dialogRol.value = true;
    };

    onMounted(() => getData());

    return {
      columns,
      rows,
      dialogRol,
      position,
      myForm,
      onSubmit,
      onReset,
      onEdit,
    };
  },
});
</script>
