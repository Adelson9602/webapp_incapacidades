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
        <q-tab name="employes" label="Empleados" />
        <q-tab
          name="add_employe"
          :label="isEdit ? 'Editar empleado' : 'Agregar empleado'"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="employes">
          <general-table-component
            :columns="columns"
            :rows="rows"
            @onEdit="onEdit"
            @onDetail="onDetail"
            :grid="false"
          />

          <q-dialog v-model="dialogDetail" persistent>
            <q-card style="width: 720px; max-width: 90vw">
              <q-bar dark class="bg-primary text-white">
                <q-icon dense round name="list" color="white" />
                <div class="col text-center text-weight-bold">
                  Detalle de {{ employe?.primerNombre }}
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
                <div
                  class="col-xs-12 col-sm-6 q-pa-sm"
                  v-for="(item, key) in companyDetail"
                  :key="key"
                >
                  <q-field :label="`${key}`" stack-label>
                    <template v-slot:control>
                      <div
                        class="self-center full-width no-outline"
                        tabindex="0"
                      >
                        {{ item }}
                      </div>
                    </template>
                  </q-field>
                </div>
              </q-card-section>
              <q-card-actions vertical align="right">
                <q-btn flat label="Ok" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-tab-panel>

        <q-tab-panel name="add_employe">
          <create-employe-component
            @onReload="onReload"
            :employe-edit="employe"
          />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { get } from 'src/requests';
import { InformationEmploye } from 'src/models/generals.models';
import { controlError } from 'src/helpers/controlError';
import GeneralTableComponent from 'src/components/general/GeneralTableComponent.vue';
import CreateEmployeComponent from 'src/components/Person/CreateEmployeComponent.vue';
import { employeStore } from 'stores/employe';
import { storeToRefs } from 'pinia';
import { QTableColumn } from 'quasar';

const columns: QTableColumn[] = [
  {
    name: 'documentoPersona',
    align: 'center',
    label: 'DOCUMENTO',
    sortable: true,
    field: 'documentoPersona',
  },
  {
    name: 'primerNombre',
    align: 'center',
    label: 'PRIMER NOMBRE',
    sortable: true,
    field: 'primerNombre',
  },
  {
    name: 'segundoNombre',
    align: 'center',
    label: 'SEGUNDO NOMBRE',
    sortable: true,
    field: 'segundoNombre',
  },
  {
    name: 'primerApellido',
    align: 'center',
    label: 'PRIMER APELLIDO',
    sortable: true,
    field: 'primerApellido',
  },
  {
    name: 'segundoApellido',
    align: 'center',
    label: 'SEGUNDO APELLIDO',
    sortable: true,
    field: 'segundoApellido',
  },
  {
    name: 'correo',
    align: 'center',
    label: 'CORREO',
    sortable: true,
    field: 'correo',
  },
  {
    name: 'celular',
    align: 'center',
    label: 'CELULAR',
    sortable: true,
    field: 'celular',
  },
  {
    name: 'razonSocial',
    align: 'center',
    label: 'EMPRESA',
    sortable: true,
    field: 'razonSocial',
  },
];

export default defineComponent({
  name: 'CompanyPage',
  components: {
    GeneralTableComponent,
    CreateEmployeComponent,
  },
  setup() {
    const tab = ref('employes');
    const rows = ref<InformationEmploye[]>();
    const employe = ref<InformationEmploye>();
    const companyDetail = ref<any>();
    const dialogDetail = ref(false);
    const { contact, isEdit, fkIdDepartamento, person } = storeToRefs(
      employeStore()
    );

    const getData = async () => {
      try {
        const resEmployes = await get
          .getEmployes()
          .then((response) => response.data);

        rows.value = [
          ...resEmployes.map((c) => {
            c.btnDetail = true;
            c.btnEdit = true;
            c.title = `${c.primerNombre} ${c.primerApellido}`;
            return c;
          }),
        ];
      } catch (error) {
        controlError(error);
      }
    };

    const onReload = () => {
      tab.value = 'employes';
      setTimeout(() => getData(), 300);
    };

    const onEdit = (row: InformationEmploye) => {
      employe.value = row;
      contact.value = {
        idContacto: row.idContacto,
        fkIdCiudad: row.fkIdCiudad,
        direccion: row.direccion,
        barrio: row.barrio,
        correo: row.correo,
        celular: row.celular,
        telefonoFijo: row.telefonoFijo,
      };

      person.value = {
        documentoPersona: row.documentoPersona,
        fechaNacimiento: row.fechaNacimiento,
        fkIdTipoDocumento: row.fkIdTipoDocumento,
        genero: row.genero,
        primerApellido: row.primerApellido,
        primerNombre: row.primerNombre,
        segundoApellido: row.segundoApellido,
        segundoNombre: row.segundoNombre,
      };

      fkIdDepartamento.value = Number(row.fkIdDepartamento);
      isEdit.value = true;
      tab.value = 'add_employe';
    };

    const onDetail = (row: InformationEmploye) => {
      companyDetail.value = {
        'TIPO DOCUMENTO': row.nombreTipoDocumento,
        DOCUMENTO: row.documentoPersona,
        'PRIMER NOMBRE': row.primerNombre,
        'SEGUNDO NOMBRE': row.segundoNombre,
        'PRIMERA PELLIDO': row.primerApellido,
        'SEGUNDO APELLIDO': row.segundoApellido,
        GÉNERO: row.genero,
        'FECHA NACIMIENTO': row.fechaNacimiento,
        DIRECCIÓN: row.direccion,
        BARRIO: row.barrio,
        CORREO: row.correo,
        CELULAR: row.celular,
        TELEFONOFIJO: row.telefonoFijo,
        DEPARTAMENTO: row.nombreDepartamento,
        CIUDAD: row.nombreCiudad,
        CARGO: row.nombreCargo,
      };
      employe.value = row;
      dialogDetail.value = true;
    };

    watch(tab, (value) => {
      if (value === 'employes') {
        isEdit.value = false;
        contact.value = {
          idContacto: null,
          fkIdCiudad: null,
          direccion: '',
          barrio: '',
          correo: '',
          celular: '',
          telefonoFijo: '',
        };
        person.value = {
          documentoPersona: null,
          fechaNacimiento: '',
          fkIdTipoDocumento: null,
          genero: '',
          primerApellido: '',
          primerNombre: '',
          segundoApellido: '',
          segundoNombre: '',
        };
        fkIdDepartamento.value = 0;
      }
    });

    onMounted(() => getData());

    return {
      tab,
      columns,
      rows,
      employe,
      dialogDetail,
      companyDetail,
      isEdit,
      onReload,
      onEdit,
      onDetail,
    };
  },
});
</script>
