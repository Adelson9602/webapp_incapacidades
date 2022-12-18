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
        <q-tab name="disabilities" label="Incapacidades" />
        <q-tab
          name="add_disability"
          :label="disability ? 'Editar incapacidad' : 'Agregar incapacidad'"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="disabilities">
          <general-table-component
            :columns="columns"
            :rows="rows"
            @onEdit="onEdit"
            @onDetail="onDetail"
            :grid="false"
            :is-loading="isLoading"
          />
          <q-dialog v-model="dialogDetail" persistent full-width>
            <q-card>
              <q-bar dark class="bg-primary text-white">
                <q-icon dense round name="list" color="white" />
                <div class="col text-center text-weight-bold">
                  Detalle de incapacidad No. {{ disability?.radicado }}
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
              <q-card-section
                class="row"
                v-for="(item, key) in disabilityDetail"
                :key="key"
              >
                <div
                  class="col-xs-12 col-sm-6 col-md-3 q-pa-sm"
                  v-for="(sbItem, key) in item"
                  :key="key"
                >
                  <q-field :label="`${key}`" stack-label dense>
                    <template v-slot:control>
                      <div
                        class="self-center full-width no-outline"
                        tabindex="0"
                      >
                        {{ sbItem }}
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

        <q-tab-panel name="add_disability">
          <create-disability-component
            @on-reload="onReload"
            :disability-edit="disability"
          />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { get } from 'src/requests';
import { InformationDisability } from 'src/models/generals.models';
import { controlError } from 'src/helpers/controlError';
import GeneralTableComponent from 'src/components/general/GeneralTableComponent.vue';
import CreateDisabilityComponent from 'src/components/disability/CreateDisabilityComponent.vue';
import { QTableColumn } from 'quasar';

const columns: QTableColumn[] = [
  {
    name: 'radicado',
    align: 'center',
    label: 'No. RADICADO',
    sortable: true,
    field: 'radicado',
  },
  {
    name: 'fechaInicio',
    align: 'center',
    label: 'FECHA INICIO INCAPACIDAD',
    sortable: true,
    field: 'fechaInicio',
  },
  {
    name: 'fechaFin',
    align: 'center',
    label: 'FECHA FIN INCAPACIDAD',
    sortable: true,
    field: 'fechaFin',
  },
  {
    name: 'totalDias',
    align: 'center',
    label: 'TOTAL DÍAS',
    sortable: true,
    field: 'totalDias',
  },
  {
    name: 'nombreEstadoIncapacidad',
    align: 'center',
    label: 'ESTADO INCAPACIDAD',
    sortable: true,
    field: 'nombreEstadoIncapacidad',
  },
  {
    name: 'fkDocumentoPersona',
    align: 'center',
    label: 'DOCUMENTO INCAPACITADO',
    sortable: true,
    field: 'fkDocumentoPersona',
  },
  {
    name: 'nombreTipoDocumento',
    align: 'center',
    label: 'TIPO DOCUMENTO',
    sortable: true,
    field: 'nombreTipoDocumento',
  },
  {
    name: 'primerNombre',
    align: 'center',
    label: 'PRIMER NOMBRE',
    sortable: true,
    field: 'primerNombre',
  },
  {
    name: 'primerApellido',
    align: 'center',
    label: 'PRIMER APELLIDO',
    sortable: true,
    field: 'primerApellido',
  },
  {
    name: 'nombreTipoIncapacidad',
    align: 'center',
    label: 'TIPO INCAPACIDAD',
    sortable: true,
    field: 'nombreTipoIncapacidad',
  },
];

export default defineComponent({
  name: 'CompanyPage',
  components: {
    GeneralTableComponent,
    CreateDisabilityComponent,
  },
  setup() {
    const tab = ref('disabilities');
    const rows = ref<InformationDisability[]>();
    const disability = ref<InformationDisability>();
    const disabilityDetail = ref<any>();
    const dialogDetail = ref(false);
    const isLoading = ref(false);

    const getData = async () => {
      isLoading.value = true;
      try {
        const resDisabilities = await get
          .getDisability()
          .then((response) => response.data);

        rows.value = [
          ...resDisabilities.map((c) => {
            c.btnDetail = true;
            c.btnEdit = true;
            c.title = `${c.primerNombre} ${c.primerApellido}`;
            return c;
          }),
        ];
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onReload = () => {
      tab.value = 'disabilities';
      setTimeout(() => getData(), 300);
    };

    const onEdit = (row: InformationDisability) => {
      disability.value = row;
      tab.value = 'add_disability';
    };

    const onDetail = async (row: InformationDisability) => {
      try {
        const { data } = await get.getDisabilityById(row.radicado);
        disabilityDetail.value = {
          disability: {
            RADICADO: data.disability.radicado,
            CIE: data.disability.cie,
            'NIT EMPRESA': data.disability.fkNitEmpresa,
            'EMPRESA EMPLEADO': data.disability.empresaEmpleado,
            'NÚMERO INCAPACIDAD': data.disability.numeroIncapacidad,
            'FECHA INICIO': data.disability.fechaInicio,
            'FECHA FIN': data.disability.fechaFin,
            'TOTAL DÍAS': data.disability.totalDias,
            IBC: data.disability.ibc,
            VALOR: data.disability.valor,
            'ESTADO INCAPACIDAD': data.disability.nombreEstadoIncapacidad,
            'TIPO INCAPACIDAD': data.disability.nombreTipoIncapacidad,
            'NIT ENTIDAD': data.disability.fkEntidad,
            ENTIDAD: data.disability.razonSocialEntidad,
            'TIPO ENTIDAD': data.disability.tipoEntidad,
            CÓDIGO: data.disability.codigo,
            DESCRIPCIÓN: data.disability.descripcion,
            'CÓDIGO GRUPO': data.disability.grupoSubgrupo,
            'FECHA REGIRSTRO': data.disability.fechaRegistro,
          },
          employe: {
            DOCUMENTO: data.employe.documentoPersona,
            'PRIMER NOMBRE': data.employe.primerNombre,
            'SEGUNDO NOMBRE': data.employe.segundoNombre,
            'PRIMERA PELLIDO': data.employe.primerApellido,
            'SEGUNDO APELLIDO': data.employe.segundoApellido,
            GÉNERO: data.employe.genero,
            'FECHA NACIMIENTO': data.employe.fechaNacimiento,
            'DOCUMENTO EMPLEADO': data.employe.fkDocumentoPersona,
            DIRECCIÓN: data.employe.direccion,
            BARRIO: data.employe.barrio,
            CORREO: data.employe.correo,
            CELULAR: data.employe.celular,
            TELEFONO: data.employe.telefonoFijo,
            'CIUDAD RESIDENCIA': data.employe.nombreCiudad,
            'DEPARTAMENTO RESIDENCIA': data.employe.nombreDepartamento,
            CARGO: data.employe.nombreCargo,
            'TIPO DOCUMENTO': data.employe.nombreTipoDocumento,
          },
        };
        disability.value = row;
        dialogDetail.value = true;
      } catch (error) {
        controlError(error);
      } finally {
      }
    };

    watch(tab, (value) => {
      if (value == 'disabilities') {
        disability.value = undefined;
      }
    });

    onMounted(() => getData());

    return {
      tab,
      columns,
      rows,
      disability,
      dialogDetail,
      disabilityDetail,
      isLoading,
      onReload,
      onEdit,
      onDetail,
    };
  },
});
</script>
