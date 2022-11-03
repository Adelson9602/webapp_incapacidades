<template>
  <q-page padding>
    <!-- content -->
    <q-card flat>
      <q-card-section class="q-pb-none">
        <q-btn
          color="primary"
          icon="add"
          label="agregar rol"
          @click="dialogRol = true"
        />
        <q-dialog v-model="dialogRol" persistent>
          <q-card style="width: 450px; max-width: 90vw">
            <q-bar dark class="bg-primary text-white">
              <q-btn dense flat round icon="list" color="white" />
              <div class="col text-center text-weight-bold">
                {{ rol.idRol ? 'Editar ' : 'Agregar ' }}rol
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
                  v-model="rol.nombreRol"
                  outlined
                  type="text"
                  label="Nombre del rol"
                  :rules="[(val) => !!val || 'Nombre rol es requerido']"
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
        title="Roles del sistema"
        :rows="rows"
        :grid="false"
        @on-edit="onEdit"
      />
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Rols } from 'src/models/generals.models';
import GeneralTableComponent from 'src/components/general/GeneralTableComponent.vue';
import { get, post } from 'src/requests';
import { controlError } from 'src/helpers/controlError';
import { QTableColumn, useQuasar } from 'quasar';

const columns: QTableColumn[] = [
  {
    name: 'idRol',
    label: 'ID ROL',
    align: 'center',
    sortable: true,
    field: 'idRol',
  },
  {
    name: 'nombreRol',
    label: 'ROL',
    align: 'center',
    sortable: true,
    field: 'nombreRol',
  },
];
export default defineComponent({
  name: 'PageRols',
  components: {
    GeneralTableComponent,
  },
  setup() {
    const $q = useQuasar();
    const rows = ref<Rols[]>([]);
    const isLoading = ref(false);
    const dialogRol = ref(false);
    const myForm = ref<any>(null);
    const rol = ref({
      idRol: 0,
      nombreRol: '',
    });

    const getData = async () => {
      isLoading.value = true;
      try {
        const resRols = await get.getRols().then((response) => response.data);
        rows.value = [
          ...resRols.map((rol) => {
            rol.title = rol.nombreRol;
            rol.btnEdit = true;
            return rol;
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
          .createRol(rol.value)
          .then((response) => response.data);

        $q.notify({
          message: resRols.message,
          type: 'positive',
          position: 'bottom-right',
        });
        setTimeout(() => getData(), 200);
        rol.value = {
          idRol: 0,
          nombreRol: '',
        };
        dialogRol.value = false;
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onReset = () => {
      rol.value = {
        idRol: 0,
        nombreRol: '',
      };
      myForm.value.resetValidation();
      dialogRol.value = false;
    };

    const onEdit = (row: Rols) => {
      rol.value = row;
      dialogRol.value = true;
    };

    onMounted(() => getData());

    return {
      columns,
      rows,
      dialogRol,
      rol,
      myForm,
      onSubmit,
      onReset,
      onEdit,
    };
  },
});
</script>
