<template>
  <q-page padding>
    <!-- content -->
    <q-card flat>
      <q-card-section class="q-pb-none">
        <q-btn
          color="primary"
          icon="add"
          label="agregar tipo incapacidad"
          @click="dialog = true"
          v-if="actions.insert"
        />
        <q-dialog v-model="dialog" persistent>
          <q-card style="width: 450px; max-width: 90vw">
            <q-bar dark class="bg-primary text-white">
              <q-btn dense flat round icon="list" color="white" />
              <div class="col text-center text-weight-bold">
                {{
                  disabilityType.idTipoIncapacidad ? 'Editar ' : 'Agregar '
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
                  v-model="disabilityType.nombreTipoIncapacidad"
                  outlined
                  type="text"
                  label="Nombre tipo de incapacidad"
                  :rules="[
                    (val) => !!val || 'Nombre tipo incapacidad es requerido',
                  ]"
                  @update:model-value="
                    (val) => {
                      disabilityType.nombreTipoIncapacidad =
                        `${val}`.toUpperCase();
                    }
                  "
                />
                <q-input
                  v-model="disabilityType.codigoDianostico"
                  outlined
                  type="text"
                  label="Código diagnóstico"
                  :rules="[(val) => !!val || 'Código diagnóstico es requerido']"
                  @update:model-value="
                    (val) => {
                      disabilityType.codigoDianostico = `${val}`.toUpperCase();
                    }
                  "
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
        title="Tipos de incapacidad"
        :rows="rows"
        :grid="true"
        @on-edit="onEdit"
      />
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Actions, DisabilityType, Modulo } from 'src/models/generals.models';
import GeneralTableComponent from 'src/components/general/GeneralTableComponent.vue';
import { get, post } from 'src/requests';
import { controlError } from 'src/helpers/controlError';
import { QTableColumn, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const columns: QTableColumn[] = [
  {
    name: 'idTipoIncapacidad',
    label: 'ID TIPO INCAPACIDAD',
    align: 'center',
    sortable: true,
    field: 'idTipoIncapacidad',
  },
  {
    name: 'nombreTipoIncapacidad',
    label: 'TIPO INCAPACIDAD',
    align: 'center',
    sortable: true,
    field: 'nombreTipoIncapacidad',
  },
  {
    name: 'codigoDianostico',
    label: 'CÓDIGO DIAGNÓSTICO',
    align: 'center',
    sortable: true,
    field: 'codigoDianostico',
  },
];
export default defineComponent({
  name: 'PageTypeDocument',
  components: {
    GeneralTableComponent,
  },
  setup() {
    const $q = useQuasar();
    const rows = ref<DisabilityType[]>([]);
    const isLoading = ref(false);
    const dialog = ref(false);
    const myForm = ref<any>(null);
    const disabilityType = ref<DisabilityType>({
      idTipoIncapacidad: null,
      nombreTipoIncapacidad: '',
      codigoDianostico: '',
    });
    const permisos = $q.localStorage.getItem('permisos') as Modulo[];
    const { currentRoute } = useRouter();
    const actions = ref<Actions>({
      borrar: false,
      insert: false,
      leer: false,
      update: false,
    });

    const getData = async () => {
      isLoading.value = true;
      try {
        const resDisabilityType = await get
          .getDisabilityType()
          .then((response) => response.data);
        rows.value = [
          ...resDisabilityType.map((disabilityType) => {
            disabilityType.title = disabilityType.nombreTipoIncapacidad;
            disabilityType.btnEdit = true;
            return disabilityType;
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
        const resTypeDoc = await post
          .createDisabilityType(disabilityType.value)
          .then((response) => response.data);

        $q.notify({
          message: resTypeDoc.message,
          type: 'positive',
          position: 'bottom-right',
        });
        setTimeout(() => getData(), 200);
        disabilityType.value = {
          idTipoIncapacidad: 0,
          nombreTipoIncapacidad: '',
          codigoDianostico: '',
        };
        dialog.value = false;
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onReset = () => {
      disabilityType.value = {
        idTipoIncapacidad: 0,
        nombreTipoIncapacidad: '',
        codigoDianostico: '',
      };
      myForm.value.resetValidation();
      dialog.value = false;
    };

    const onEdit = (row: DisabilityType) => {
      disabilityType.value = row;
      dialog.value = true;
    };

    onMounted(() => {
      getData();

      // Validamos las acciones del usuario, permisos que tiene asignado
      const currentPath = currentRoute.value.path;
      permisos.forEach((p) => {
        const path = p.items.find((i) => i.route == currentPath);
        if (path) {
          actions.value = { ...path.actions };
        }
      });
    });

    return {
      columns,
      rows,
      dialog,
      disabilityType,
      myForm,
      actions,
      onSubmit,
      onReset,
      onEdit,
    };
  },
});
</script>
