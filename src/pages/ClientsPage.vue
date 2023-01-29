<template>
  <q-page padding>
    <!-- content -->
    <q-card flat>
      <q-card-section>
        <q-btn
          color="primary"
          icon="add"
          label="agregar cliente"
          @click="dialog = true"
          v-if="actions.insert"
        />
        <general-table-component
          :columns="columns"
          :rows="rows"
          @onEdit="onEdit"
          :grid="true"
          :avatar="true"
        />

        <q-dialog v-model="dialog" persistent>
          <q-card style="width: 720px; max-width: 90vw">
            <q-form @submit="onSubmit" class="q-gutter-md">
              <q-bar dark class="bg-primary text-white">
                <q-icon dense round name="list" color="white" />
                <div class="col text-center text-weight-bold">
                  {{ isEdit ? 'Editar' : 'Crear' }} cliente
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
              <q-card-section class="row">
                <div class="col-xs-12 col-sm-6 q-pa-sm">
                  <q-file v-model="file" label="Logo empresa" />
                </div>
                <div class="col-xs-12 col-sm-6 q-pa-sm">
                  <q-input
                    v-model="client.razonSocial"
                    type="text"
                    label="RAZÓN SOCIAL"
                    :rules="[(val) => !!val || 'Razón social es requerido']"
                  />
                </div>
                <div class="col-xs-12 col-sm-6 q-pa-sm">
                  <q-input
                    v-model="client.nitEmpresa"
                    type="text"
                    label="NIT"
                    :rules="[(val) => !!val || 'NIT es requerido']"
                  />
                </div>
                <div class="col-xs-12 col-sm-6 q-pa-sm">
                  <q-input
                    v-model="client.nombreSistema"
                    type="text"
                    label="NOMBRE SISTEMA"
                    :rules="[(val) => !!val || 'Nombre sistema es requerido']"
                  />
                </div>
                <div class="col-xs-12 col-sm-6 q-pa-sm">
                  <q-input
                    v-model="client.nombreBase"
                    type="text"
                    label="NOMBRE BASE"
                    :rules="[(val) => !!val || 'Nombre base es requerido']"
                  />
                </div>
                <div class="col-xs-12 col-sm-6 q-pa-sm">
                  <q-select
                    v-model="client.estado"
                    :options="states"
                    label="ESTADO"
                    map-options
                    emit-value
                  />
                </div>
                <div class="col-xs-12 col-sm-6 q-pa-sm">
                  <q-input
                    v-model="client.direccion"
                    type="text"
                    label="DIRECCIÓN"
                    :rules="[(val) => !!val || 'Dirección es requerido']"
                  />
                </div>
                <div class="col-xs-12 col-sm-6 q-pa-sm">
                  <q-input
                    v-model="client.telefono"
                    type="text"
                    label="TELÉFONO"
                    :rules="[(val) => !!val || 'Teléfono es requerido']"
                  />
                </div>
                <div class="col-xs-12 col-sm-6 q-pa-sm">
                  <q-input
                    v-model="client.email"
                    type="text"
                    label="EMAIl"
                    :rules="[(val) => !!val || 'Email es requerido']"
                  />
                </div>
                <div class="col-xs-12 col-sm-6 q-pa-sm">
                  <q-input
                    v-model="client.salarioMinimo"
                    type="text"
                    label="SALARIO"
                    :rules="[(val) => !!val || 'Salario es requerido']"
                  />
                </div>
              </q-card-section>
              <q-card-actions align="right" class="q-gutter-x-md">
                <q-btn flat label="Cancelar" color="primary" v-close-popup />
                <q-btn label="Guardar" type="submit" color="primary" />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { get, post } from 'src/requests';
import { Actions, Cliente, Modulo } from 'src/models/generals.models';
import { controlError } from 'src/helpers/controlError';
import GeneralTableComponent from 'src/components/general/GeneralTableComponent.vue';
import { QTableColumn, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const columns: QTableColumn[] = [
  {
    name: 'idEmpresa',
    align: 'center',
    label: 'ID EMPRESA',
    sortable: true,
    field: 'idEmpresa',
  },
  {
    name: 'razonSocial',
    align: 'center',
    label: 'RAZÓN SOCIAL',
    sortable: true,
    field: 'razonSocial',
  },
  {
    name: 'nitEmpresa',
    align: 'center',
    label: 'NIT',
    sortable: true,
    field: 'nitEmpresa',
  },
  {
    name: 'nombreSistema',
    align: 'center',
    label: 'NOMBRE SISTEMA',
    sortable: true,
    field: 'nombreSistema',
  },
  {
    name: 'nombreBase',
    align: 'center',
    label: 'nombreBase',
    sortable: true,
    field: 'nombreBase',
  },
  {
    name: 'estado',
    align: 'center',
    label: 'ESTADO',
    sortable: true,
    field: 'estado',
  },
  {
    name: 'direccion',
    align: 'center',
    label: 'DIRECCIÓN',
    sortable: true,
    field: 'direccion',
  },
  {
    name: 'telefono',
    align: 'center',
    label: 'TELÉFONO',
    sortable: true,
    field: 'telefono',
  },
  {
    name: 'email',
    align: 'center',
    label: 'EMAIL',
    sortable: true,
    field: 'email',
  },
];

export default defineComponent({
  name: 'CompanyPage',
  components: {
    GeneralTableComponent,
  },
  setup() {
    const $q = useQuasar();
    const rows = ref<Cliente[]>();
    const client = ref<Cliente>({
      idEmpresa: 0,
      razonSocial: '',
      nitEmpresa: '',
      nombreSistema: '',
      urlLogo: '',
      nombreBase: '',
      estado: 0,
      direccion: '',
      telefono: '',
      email: '',
      salarioMinimo: 0,
    });
    const dialog = ref(false);
    const permisos = $q.localStorage.getItem('permisos') as Modulo[];
    const { currentRoute } = useRouter();
    const actions = ref<Actions>({
      borrar: false,
      insert: false,
      leer: false,
      update: false,
    });
    const file = ref<any>();
    const isEdit = ref(false);
    const states = ref([
      {
        label: 'ACTIVO',
        value: 1,
      },
      {
        label: 'INACTIVO',
        value: 0,
      },
    ]);

    const getData = async () => {
      try {
        const resCompnaies = await get
          .getClients()
          .then((response) => response.data);

        rows.value = [
          ...resCompnaies.map((c) => {
            c.btnEdit = true;
            c.title = c.razonSocial;
            c.avatar = c.urlLogo;
            return c;
          }),
        ];
      } catch (error) {
        controlError(error);
      }
    };

    const onSubmit = async () => {
      try {
        if (file.value) {
          const formDataInd = new FormData();
          formDataInd.append('files', file.value);

          const [resFile] = await post
            .uploadOtherFiles(formDataInd, 'clientes', 'images')
            .then((res) => res.data);

          client.value.urlLogo = resFile.url;
        }

        const { data } = await post.createClient(client.value);

        dialog.value = false;

        $q.notify({
          message: data.message,
          type: 'positive',
          position: 'bottom-right',
        });

        setTimeout(() => getData(), 300);
      } catch (error) {
        controlError(error);
      }
    };

    const onReload = () => {
      setTimeout(() => getData(), 300);
    };

    const onEdit = (row: any) => {
      client.value = row;
      dialog.value = true;
      isEdit.value = true;
    };

    watch(dialog, (value) => {
      if (!value) {
        client.value = {
          idEmpresa: 0,
          razonSocial: '',
          nitEmpresa: '',
          nombreSistema: '',
          urlLogo: '',
          nombreBase: '',
          estado: 0,
          direccion: '',
          telefono: '',
          email: '',
          salarioMinimo: 0,
        };
        isEdit.value = false;
      }
    });

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
      client,
      dialog,
      actions,
      states,
      isEdit,
      file,
      onReload,
      onEdit,
      onSubmit,
    };
  },
});
</script>
