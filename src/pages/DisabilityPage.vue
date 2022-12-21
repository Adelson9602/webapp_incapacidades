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
            @onAddExtension="addExtension"
            :grid="false"
            :is-loading="isLoading"
          />
          <!-- Dialogo para el detalle de incapacidad -->
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
                class="row q-pb-none"
                v-for="(item, key) in disabilityDetail"
                :key="key"
              >
                <div class="col-xs-12 text-h6 text-grey-8 text-weight-light">
                  {{
                    `${key}` == 'employe'
                      ? 'Datos de empleado'
                      : 'Datos empresa'
                  }}
                </div>
                <div
                  class="col-xs-12 col-sm-6 col-md-3 col-lg-2 q-pa-xs"
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
              <q-card-section>
                <div class="text-h6 text-grey-8 text-weight-light q-mb-md">
                  Prorrogas
                </div>
                <q-table
                  :rows="history"
                  flat
                  :columns="columnsProrroga"
                  row-key="name"
                />
              </q-card-section>
              <q-card-section>
                <div class="text-h6 text-grey-8 text-weight-light q-mb-md">
                  Archivos adjuntos
                </div>
                <q-list bordered separator>
                  <q-item v-for="(file, index) in files" :key="index">
                    <q-item-section>
                      {{ file.nombreArchivo }}
                    </q-item-section>
                    <q-item-section avatar>
                      <q-icon
                        class="cursor-pointer"
                        color="primary"
                        name="download_for_offline"
                        @click="openURL(`//${file.url}`)"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
              <q-card-actions vertical align="right">
                <q-btn flat label="Ok" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <!-- Dialogo para la prorroga de la incapacidad -->
          <q-dialog v-model="dialogExtension" persistent>
            <q-card style="width: 700px; max-width: 90vw">
              <q-form @submit="onSubmit" class="q-gutter-md">
                <q-card-section class="q-pb-none row">
                  <q-field
                    outlined
                    class="col-xs-12 col-sm-6 q-pa-sm"
                    stack-label
                    label="Fecha inicio incapacidad"
                  >
                    <template v-slot:control>
                      <div
                        class="self-center full-width no-outline"
                        tabindex="0"
                      >
                        {{ disability?.fechaInicio }}
                      </div>
                    </template>
                  </q-field>
                  <q-field
                    outlined
                    class="col-xs-12 col-sm-6 q-pa-sm"
                    stack-label
                    label="Fecha fin incapacidad"
                  >
                    <template v-slot:control>
                      <div
                        class="self-center full-width no-outline"
                        tabindex="0"
                      >
                        {{ disability?.fechaFin }}
                      </div>
                    </template>
                  </q-field>
                  <div class="col-xs-12 q-pa-sm">
                    <q-input
                      v-model="historyDisability.fechaProrroga"
                      mask="date"
                      :rules="['date']"
                      label="Fecha de prorroga"
                      hide-bottom-space
                      outlined
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="historyDisability.fechaProrroga">
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Aceptar"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-xs-12 q-pa-sm">
                    <q-input
                      v-model="historyDisability.observacion"
                      outlined
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Observación es requerida',
                      ]"
                      type="textarea"
                      label="Observación"
                    />
                  </div>
                </q-card-section>
                <q-card-actions align="right" class="q-px-md q-pb-md q-pt-none">
                  <q-btn
                    label="Cancelar"
                    color="primary"
                    flat
                    class="q-ml-sm"
                    v-close-popup
                  />
                  <q-btn
                    label="Agregar prorroga"
                    type="submit"
                    color="primary"
                  />
                </q-card-actions>
              </q-form>
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
import { get, post } from 'src/requests';
import {
  Adjunto,
  CompanyLogged,
  DisabilityHistory,
  InformationDisability,
} from 'src/models/generals.models';
import { controlError } from 'src/helpers/controlError';
import GeneralTableComponent from 'src/components/general/GeneralTableComponent.vue';
import CreateDisabilityComponent from 'src/components/disability/CreateDisabilityComponent.vue';
import { QTableColumn, openURL, useQuasar, date } from 'quasar';
import { decryptJSON } from 'src/helpers/encrypt';
import { calculateDisabilityCost } from 'src/helpers/globalFunctions';

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

const columnsProrroga: QTableColumn[] = [
  {
    name: 'idHistorialIncapacidad',
    align: 'center',
    label: '#',
    sortable: true,
    field: 'idHistorialIncapacidad',
  },
  {
    name: 'fechaProrroga',
    align: 'center',
    label: 'FECHA PRORROGA',
    sortable: true,
    field: 'fechaProrroga',
  },
  {
    name: 'diasProrroga',
    align: 'center',
    label: 'DÍAS PRORROGA',
    sortable: true,
    field: 'diasProrroga',
  },
  {
    name: 'valor',
    align: 'center',
    label: 'VALOR',
    sortable: true,
    field: 'valor',
  },
  {
    name: 'observacion',
    align: 'center',
    label: 'OBSERVACIÓN',
    sortable: true,
    field: 'observacion',
  },
  {
    name: 'usuario',
    align: 'center',
    label: 'USUARIO',
    sortable: true,
    field: 'usuario',
  },
];

export default defineComponent({
  name: 'CompanyPage',
  components: {
    GeneralTableComponent,
    CreateDisabilityComponent,
  },
  setup() {
    const $q = useQuasar();
    const tab = ref('disabilities');
    const { dataUser } = decryptJSON(
      `${$q.localStorage.getItem('dataUsuario')}`
    ) as unknown as CompanyLogged;
    const rows = ref<InformationDisability[]>();
    const disability = ref<InformationDisability>();
    const disabilityDetail = ref<any>();
    const dialogDetail = ref(false);
    const isLoading = ref(false);
    const dialogExtension = ref(false);
    const files = ref<Adjunto[]>([]);
    const historyDisability = ref<DisabilityHistory>({
      idHistorialIncapacidad: null,
      fkRadicado: 0,
      fechaProrroga: '',
      diasProrroga: 0,
      valor: 0,
      usuario: 0,
      observacion: '',
    });
    const minimumSalary = ref<number>(0);
    const history = ref<DisabilityHistory[]>([]);

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
            c.btnAddExtension = true;
            c.title = `${c.primerNombre} ${c.primerApellido}`;
            return c;
          }),
        ];

        const resSalary = await get
          .getSalary()
          .then((response) => response.data);
        minimumSalary.value = resSalary.salarioMinimo;
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
      $q.loading.show({
        message: 'Por favor espere...',
      });
      try {
        const { data } = await get.getDisabilityById(row.radicado);
        disabilityDetail.value = {
          disability: {
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
        files.value = [...data.files];

        if (data.history) {
          history.value = [...data.history];
        }

        disability.value = row;
        dialogDetail.value = true;
      } catch (error) {
        controlError(error);
      } finally {
        $q.loading.hide();
      }
    };

    const addExtension = (row: InformationDisability) => {
      historyDisability.value.fkRadicado = row.radicado;
      historyDisability.value.usuario = dataUser.documentoPersona;
      disability.value = row;
      // Asignamos a los inputs tipo date la fecha actual del sistema
      const timeStamp = Date.now();
      historyDisability.value.fechaProrroga = date.formatDate(
        timeStamp,
        'YYYY/MM/DD'
      );

      dialogExtension.value = true;
    };

    const onSubmit = async () => {
      $q.loading.show({
        message: 'Guardando, por favor espere...',
      });
      try {
        await post.createHistoryDisability(historyDisability.value);
        $q.notify({
          message: 'Prorroga adicionada',
          type: 'positive',
          position: 'bottom-right',
        });

        dialogExtension.value = false;
        disability.value = undefined;
        historyDisability.value = {
          idHistorialIncapacidad: null,
          fkRadicado: 0,
          fechaProrroga: '',
          diasProrroga: 0,
          valor: 0,
          usuario: 0,
          observacion: '',
        };
      } catch (error) {
        controlError(error);
      } finally {
        $q.loading.hide();
      }
    };

    watch(tab, (value) => {
      if (value == 'disabilities') {
        disability.value = undefined;
      }
    });

    watch(
      () => historyDisability.value.fechaProrroga,
      (value) => {
        if (disability.value?.fechaInicio) {
          if (value < disability.value?.fechaFin) {
            historyDisability.value.fechaProrroga = `${disability.value?.fechaFin}`;
            $q.notify({
              message:
                'La fecha de prorroga no puede ser inferior a la fecha fin de incapacidad',
              type: 'warning',
            });
          } else {
            const totalDaysPro =
              date.getDateDiff(value, disability.value.fechaFin, 'days') + 1;
            const totalDays =
              date.getDateDiff(value, disability.value.fechaInicio, 'days') + 1;
            historyDisability.value.diasProrroga = totalDaysPro;

            historyDisability.value.valor = calculateDisabilityCost(
              disability.value.fkIdTipoIncapacidad,
              minimumSalary.value,
              totalDays,
              disability.value.ibc
            );
          }
        }
      }
    );

    onMounted(() => getData());

    return {
      tab,
      columns,
      rows,
      disability,
      dialogDetail,
      disabilityDetail,
      isLoading,
      files,
      dialogExtension,
      historyDisability,
      history,
      columnsProrroga,
      onSubmit,
      addExtension,
      openURL,
      onReload,
      onEdit,
      onDetail,
    };
  },
});
</script>
