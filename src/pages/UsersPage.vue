<template>
  <q-page padding>
    <!-- content -->
    <q-card flat>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="users" label="Usuarios" />
        <q-tab name="createUser" label="Crear usuario" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="users">
          <general-table-component
            :columns="columns"
            :rows="rows"
            :avatar="true"
            @on-edit="onEdit"
            @on-status="onStatus"
          />
        </q-tab-panel>
        <q-tab-panel name="createUser">
          <create-user-component
            @on-reload="onReload"
            :user-edit="dataUserEdit"
          />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import GeneralTableComponent from 'components/general/GeneralTableComponent.vue';
import CreateUserComponent from 'components/users/CreateUserComponent.vue';
import { UserData } from 'src/models/generals.models';
import { controlError } from 'src/helpers/controlError';
import { get, post } from 'src/requests';
import { QTableColumn, useQuasar } from 'quasar';
import { decryptedAES } from 'src/helpers/encrypt';

const columns: QTableColumn[] = [
  {
    name: 'usuario',
    label: 'USUARIO',
    align: 'center',
    sortable: true,
    field: 'usuario',
  },
  {
    name: 'primerNombre',
    label: 'PRIMER NOMBRE',
    align: 'center',
    sortable: true,
    field: 'primerNombre',
  },
  {
    name: 'segundoNombre',
    label: 'SEGUNDO NOMBRE',
    align: 'center',
    sortable: true,
    field: 'segundoNombre',
  },
  {
    name: 'primerApellido',
    label: 'PRIMER APELLIDO',
    align: 'center',
    sortable: true,
    field: 'primerApellido',
  },
  {
    name: 'segundoApellido',
    label: 'SEGUNDO APELLIDO',
    align: 'center',
    sortable: true,
    field: 'segundoApellido',
  },
  {
    name: 'documentoPersona',
    label: 'DOCUMENTO',
    align: 'center',
    sortable: true,
    field: 'documentoPersona',
  },
  {
    name: 'genero',
    label: 'GÉNERO',
    align: 'center',
    sortable: true,
    field: 'genero',
  },
  {
    name: 'fechaNacimiento',
    label: 'FECHA NACIMIENTO',
    align: 'center',
    sortable: true,
    field: 'fechaNacimiento',
  },
  {
    name: 'estadoUsuario',
    label: 'ESTADO',
    align: 'center',
    sortable: true,
    field: 'estadoUsuario',
  },
];

export default defineComponent({
  name: 'PageUsers',
  components: {
    GeneralTableComponent,
    CreateUserComponent,
  },
  setup() {
    const $q = useQuasar();
    const tab = ref('users');
    const rows = ref<UserData[]>([]);
    const isLoading = ref(false);
    const dataUserEdit = ref<UserData>();

    const onReload = () => {
      tab.value = 'users';
      setTimeout(() => getData(), 300);
    };

    // rows.value.sort(() => -1 + Math.floor(3 * Math.random()));

    const getData = async () => {
      isLoading.value = true;
      try {
        const resRols = await get.getUsers().then((response) => response.data);
        rows.value = [
          ...resRols.map((item) => {
            item.title = `${item.primerApellido} ${item.segundoApellido} ${item.primerNombre} ${item.segundoNombre}`;
            item.btnEdit = true;
            item.btnStatus = true;
            return item;
          }),
        ];
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onEdit = (row: UserData) => {
      dataUserEdit.value = row;
      tab.value = 'createUser';
    };

    const onStatus = (row: UserData) => {
      $q.dialog({
        message: `<p class="text-center text-body1"><b>El usuario está ${
          row.estadoUsuario === 1 ? 'activo' : 'inactivo'
        }</b></p> <p class="text-center text-body1">¿Desea ${
          row.estadoUsuario === 1 ? 'inactivarlo' : 'activarlo'
        }?</p>`,
        html: true,
        cancel: {
          label: 'Cancelar',
          flat: true,
        },
        ok: {
          label: 'Si',
          unelevated: true,
        },
        persistent: true,
      }).onOk(async () => {
        try {
          row.estadoUsuario = row.estadoUsuario === 1 ? 0 : 1;
          row.password = decryptedAES(row.password);
          const resCreate = await post
            .createUser(row)
            .then((response) => response.data);

          $q.notify({
            message: resCreate.message,
            type: 'positive',
            position: 'bottom-right',
          });

          setTimeout(() => getData(), 200);
        } catch (error) {
          controlError(error);
        } finally {
          isLoading.value = false;
        }
      });
    };

    onMounted(() => getData());
    return {
      tab,
      isLoading,
      rows,
      columns,
      dataUserEdit,
      onEdit,
      onReload,
      onStatus,
    };
  },
});
</script>
