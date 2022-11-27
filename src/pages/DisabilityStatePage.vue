<template>
  <q-page padding>
    <!-- content -->
    <q-card flat>
      <q-card-section class="q-pb-none">
        <q-btn
          color="primary"
          icon="add"
          label="agregar estado incapacidad"
          @click="dialog = true"
        />
        <q-dialog v-model="dialog" persistent>
          <q-card style="width: 450px; max-width: 90vw">
            <q-bar dark class="bg-primary text-white">
              <q-btn dense flat round icon="list" color="white" />
              <div class="col text-center text-weight-bold">
                {{
                  disabilityState.idEstadoIncapacidad ? 'Editar ' : 'Agregar '
                }}tipo incapacidad
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
                  v-model="disabilityState.nombreEstadoIncapacidad"
                  outlined
                  type="text"
                  label="Estado incapacidad"
                  :rules="[(val) => !!val || 'Estado incapacidad es requerido']"
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
        title="Estados de incapacidad"
        :rows="rows"
        :grid="true"
        @on-edit="onEdit"
      />
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { StateDisability } from 'src/models/generals.models';
import GeneralTableComponent from 'src/components/general/GeneralTableComponent.vue';
import { get, post } from 'src/requests';
import { controlError } from 'src/helpers/controlError';
import { QTableColumn, useQuasar } from 'quasar';

const columns: QTableColumn[] = [
  {
    name: 'idEstadoIncapacidad',
    label: 'ID ESTADO INCAPACIDAD',
    align: 'center',
    sortable: true,
    field: 'idEstadoIncapacidad',
  },
  {
    name: 'nombreEstadoIncapacidad',
    label: 'ESTADO INCAPACIDAD',
    align: 'center',
    sortable: true,
    field: 'nombreEstadoIncapacidad',
  },
];
export default defineComponent({
  name: 'PageDisabilityState',
  components: {
    GeneralTableComponent,
  },
  setup() {
    const $q = useQuasar();
    const rows = ref<StateDisability[]>([]);
    const isLoading = ref(false);
    const dialog = ref(false);
    const myForm = ref<any>(null);
    const disabilityState = ref({
      idEstadoIncapacidad: 0,
      nombreEstadoIncapacidad: '',
    });

    const getData = async () => {
      isLoading.value = true;
      try {
        const resDisabilityState = await get
          .getStateDisability()
          .then((response) => response.data);
        rows.value = [
          ...resDisabilityState.map((disabilityState) => {
            disabilityState.title = disabilityState.nombreEstadoIncapacidad;
            disabilityState.btnEdit = true;
            return disabilityState;
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
        const resDisabilityState = await post
          .createStateDisability(disabilityState.value)
          .then((response) => response.data);

        $q.notify({
          message: resDisabilityState.message,
          type: 'positive',
          position: 'bottom-right',
        });
        setTimeout(() => getData(), 200);
        disabilityState.value = {
          idEstadoIncapacidad: 0,
          nombreEstadoIncapacidad: '',
        };
        dialog.value = false;
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onReset = () => {
      disabilityState.value = {
        idEstadoIncapacidad: 0,
        nombreEstadoIncapacidad: '',
      };
      myForm.value.resetValidation();
      dialog.value = false;
    };

    const onEdit = (row: StateDisability) => {
      disabilityState.value = row;
      dialog.value = true;
    };

    onMounted(() => getData());

    return {
      columns,
      rows,
      dialog,
      disabilityState,
      myForm,
      onSubmit,
      onReset,
      onEdit,
    };
  },
});
</script>
