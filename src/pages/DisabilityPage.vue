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
        <q-tab name="disabilities" label="Incapacidades" v-if="actions.leer" />
        <q-tab
          name="add_disability"
          :label="
            disability.idIncapacidad
              ? 'Editar incapacidad'
              : 'Agregar incapacidad'
          "
          v-if="actions.insert || tab == 'add_disability'"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="disabilities">
          <q-banner
            inline-actions
            rounded
            class="bg-orange-3 text-balck text-bold"
            v-if="isFilterByDate"
          >
            Viendo incapaciades en un rago de fecha desde {{ range.from }} hasta
            {{ range.to }}

            <template v-slot:action>
              <q-btn flat label="Ver todos" @click="getData" />
            </template>
          </q-banner>
          <general-table-component
            :columns="columns"
            :rows="rows"
            @onEdit="onEdit"
            @onDetail="onDetail"
            @onAddExtension="addExtension"
            @onDelete="deleteDisability"
            @onStatus="openDialogchangeStatus"
            :grid="false"
            :is-loading="isLoading"
          >
            <template v-slot:btn-1>
              <q-btn
                color="primary"
                icon="mdi-microsoft-excel"
                class="q-ml-sm"
                dense
                outline
                @click="dialogReport = true"
                v-if="actions.leer"
              >
                <q-tooltip> Generar reportes </q-tooltip>
              </q-btn>
            </template>
            <template v-slot:btn-2>
              <q-btn
                color="negative"
                icon="delete"
                class="q-ml-sm"
                dense
                outline
                @click="viewDeleteDisability"
                v-if="actions.borrar"
              >
                <q-tooltip> Ver incapacidades eliminadas </q-tooltip>
              </q-btn>
            </template>
            <template v-slot:btn-3>
              <q-btn
                icon="event"
                class="q-ml-sm"
                outline
                dense
                color="secondary"
              >
                <q-tooltip>
                  Consultar incapacidades por rango de fecha
                </q-tooltip>
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="range" range mask="YYYY-MM-DD">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn
                        label="Cancelar"
                        color="primary"
                        flat
                        @click="onReset"
                        v-close-popup
                      />
                      <q-btn
                        label="OK"
                        color="primary"
                        flat
                        v-close-popup
                        :disable="range.from || range ? false : true"
                        @click="filterDisability"
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-btn>
            </template>
          </general-table-component>
          <!-- Dialogo para el detalle de incapacidad -->
          <q-dialog v-model="dialogDetail" persistent full-width>
            <DetailDisabilityComponent
              :disability="disability"
              :disabilityDetail="disabilityDetail"
              :prorroga="prorroga"
              :history="history"
              :files="files"
            />
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
                  <div class="col-xs-12 col-sm-6 q-pa-sm">
                    <q-input
                      v-model="DisabilityExtension.ibc"
                      :rules="[(val) => !!val || 'Ingreso base es requerido']"
                      label="IBC"
                      hide-bottom-space
                      outlined
                    />
                  </div>
                  <q-field
                    outlined
                    class="col-xs-12 col-sm-6 q-pa-sm"
                    stack-label
                    label="Valor prorroga"
                  >
                    <template v-slot:control>
                      <div
                        class="self-center full-width no-outline"
                        tabindex="0"
                      >
                        {{ DisabilityExtension.valor }}
                      </div>
                    </template>
                  </q-field>
                  <div class="col-xs-12 col-sm-6 q-pa-sm">
                    <q-input
                      v-model="DisabilityExtension.fechaIniciaProrroga"
                      mask="date"
                      :rules="['date']"
                      label="Fecha inicia prorroga"
                      hide-bottom-space
                      outlined
                      :disable="DisabilityExtension.ibc ? false : true"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="DisabilityExtension.fechaIniciaProrroga"
                            >
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
                  <div class="col-xs-12 col-sm-6 q-pa-sm">
                    <q-input
                      v-model="DisabilityExtension.fechaFinProrroga"
                      mask="date"
                      :rules="['date']"
                      label="Fecha fin prorroga"
                      hide-bottom-space
                      outlined
                      :disable="DisabilityExtension.ibc ? false : true"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="DisabilityExtension.fechaFinProrroga"
                            >
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
                      v-model="DisabilityExtension.observacion"
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

          <!-- Dialogo para generar reportes de excel -->
          <q-dialog v-model="dialogReport" persistent>
            <q-card>
              <q-bar dark class="bg-primary text-white">
                <div class="col text-center text-weight-bold">
                  Seleccione tipo de reporte
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
              <q-card-section class="row items-center">
                <q-form @submit="genreReport" class="q-gutter-md">
                  <span class="q-ml-sm">
                    <q-radio
                      name="shape"
                      v-model="typeReport"
                      val="empleador"
                      label="Empleador"
                    />
                    <q-radio
                      name="shape"
                      v-model="typeReport"
                      val="cliente"
                      label="Cliente"
                    />
                    <q-radio
                      name="shape"
                      v-model="typeReport"
                      val="empleado"
                      label="Empleado"
                    />
                    <q-radio
                      name="shape"
                      v-model="typeReport"
                      val="entidad"
                      label="Entidad"
                    />
                  </span>
                  <q-input
                    filled
                    v-model="document"
                    :label="
                      typeReport === 'cliente'
                        ? 'Ingrese nit del cliente'
                        : typeReport === 'empleado'
                        ? 'Ingrese documento del empleado'
                        : 'Ingrese nit de la entidad'
                    "
                    :rules="[(val) => !!val || 'Campo requerido']"
                    v-if="
                      typeReport === 'cliente' ||
                      typeReport === 'empleado' ||
                      typeReport === 'entidad'
                    "
                  />
                  <div class="row justify-end">
                    <q-btn
                      label="Generar reporte"
                      type="submit"
                      color="primary"
                      v-if="typeReport"
                    />
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </q-dialog>

          <!-- Dailogo para ver las incapacidades eliminadas -->
          <q-dialog v-model="dialogDeleteDisability" persistent>
            <q-card style="width: 1366px; max-width: 90vw">
              <q-bar dark class="bg-primary text-white">
                <q-icon name="delete" />
                <div class="col text-center text-weight-bold">
                  Vista de incapacidades eliminadas
                </div>
                <q-btn dense flat round icon="close" v-close-popup />
              </q-bar>
              <q-card-section>
                <q-table
                  flat
                  :rows="rowsDisabilityDelete"
                  :columns="columns"
                  :loading="isLoading"
                >
                  <template v-slot:header="props">
                    <q-tr :props="props">
                      <q-th auto-width />
                      <q-th
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                      >
                        {{ col.label }}
                      </q-th>
                    </q-tr>
                  </template>

                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td auto-width>
                        <q-btn
                          size="sm"
                          color="positive"
                          round
                          dense
                          icon="replay"
                          @click="restoreDisability(props.row)"
                        >
                          <q-tooltip> Restaurar incapacidad </q-tooltip>
                        </q-btn>
                      </q-td>
                      <q-td
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                      >
                        {{ col.value }}
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-card-section>
            </q-card>
          </q-dialog>

          <!-- Dialogo para cambiar estado de la incapacidad -->
          <q-dialog v-model="dialogStatus" persistent>
            <q-card style="width: 480px; max-width: 90vw">
              <q-bar dark class="bg-primary text-white">
                <q-icon name="list" />
                <div class="col text-center text-weight-bold">
                  Actualizar estado incapacidad
                </div>
                <q-btn dense flat round icon="close" v-close-popup />
              </q-bar>
              <q-form @submit="changeStatus">
                <q-card-section class="row items-center">
                  <div class="col-xs-12">
                    <q-select
                      v-model="newStateInability.estado"
                      :options="optionsStatus"
                      label="Estado incapacidad"
                      option-label="nombreEstadoIncapacidad"
                      option-value="idEstadoIncapacidad"
                      emit-value
                      map-options
                    />
                  </div>
                  <div
                    class="col-xs-12 q-py-md"
                    v-if="
                      newStateInability.estado == 5 ||
                      newStateInability.estado == 6
                    "
                  >
                    <q-input
                      v-model="newStateInability.observacion"
                      filled
                      label="Observaciones"
                      :rules="[(val) => !!val || 'Observaciones es requerido']"
                      row="3"
                      type="textarea"
                    />
                  </div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="negative" v-close-popup />
                  <q-btn
                    flat
                    label="Actualizar"
                    color="primary"
                    type="submit"
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
import { delet, get, post, put } from 'src/requests';
import {
  Actions,
  Adjunto,
  CompanyLogged,
  DesabilityDetail,
  DisabilityExtension,
  HistoricalDisability,
  InformationDisability,
  Modulo,
  NewState,
  StateDisability,
} from 'src/models/generals.models';
import { controlError } from 'src/helpers/controlError';
import { QTableColumn, openURL, useQuasar, date } from 'quasar';
import { decryptJSON } from 'src/helpers/encrypt';
import { calculateDisabilityCost } from 'src/helpers/globalFunctions';
import { useRouter } from 'vue-router';
import {
  informationDisability,
  disabilityDetailDefinition,
} from 'src/helpers/globalDefinitions';
// Components
import GeneralTableComponent from 'src/components/general/GeneralTableComponent.vue';
import CreateDisabilityComponent from 'src/components/disability/CreateDisabilityComponent.vue';
import DetailDisabilityComponent from 'src/components/disability/DetailDisabilityComponent.vue';
import DeleteDialogComponent from 'src/components/general/DeleteDialogComponent.vue';

const columns: QTableColumn[] = [
  {
    name: 'idIncapacidad',
    align: 'center',
    label: 'ID INCAPACIDAD',
    sortable: true,
    field: 'idIncapacidad',
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
    DetailDisabilityComponent,
  },
  setup() {
    const $q = useQuasar();
    const tab = ref('disabilities');
    const { dataUser } = decryptJSON(
      `${$q.localStorage.getItem('dataUsuario')}`
    ) as unknown as CompanyLogged;
    const rows = ref<InformationDisability[]>();
    const rowsDisabilityDelete = ref<InformationDisability[]>();
    const disability = ref<InformationDisability>({ ...informationDisability });
    const disabilityDetail = ref<DesabilityDetail>({
      ...disabilityDetailDefinition,
    });
    const dialogDetail = ref(false);
    const isLoading = ref(false);
    const dialogExtension = ref(false);
    const files = ref<Adjunto[]>([]);
    const DisabilityExtension = ref<DisabilityExtension>({
      idProrrogaIncapacidad: null,
      fkIdIncapacidad: 0,
      fechaIniciaProrroga: '',
      fechaFinProrroga: '',
      diasProrroga: 0,
      ibc: 0,
      valor: 0,
      usuario: 0,
      observacion: '',
    });
    const dateToday = ref<string>('');
    const minimumSalary = ref<number>(0);
    const prorroga = ref<DisabilityExtension[]>([]);
    const history = ref<HistoricalDisability[]>([]);
    const dialogReport = ref(false);
    const dialogDeleteDisability = ref(false);
    const dialogStatus = ref(false);
    const typeReport = ref('');
    const document = ref('');
    const optionsStatus = ref<StateDisability[]>([]);
    const newStateInability = ref<NewState>({
      idIncapacidad: 0,
      estado: 0,
      observacion: '',
    });
    const permisos = $q.localStorage.getItem('permisos') as Modulo[];
    const { currentRoute } = useRouter();
    const actions = ref<Actions>({
      borrar: false,
      insert: false,
      leer: false,
      update: false,
    });
    const range = ref({ from: '', to: '' });
    const isFilterByDate = ref(false);

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
            c.btnDelete = true;
            c.title = `${c.primerNombre} ${c.primerApellido}`;
            return c;
          }),
        ];

        const resSalary = await get
          .getSalary()
          .then((response) => response.data);
        minimumSalary.value = resSalary.salarioMinimo;

        isFilterByDate.value = false;
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
        const { data } = await get.getDisabilityById(+row.idIncapacidad);
        disabilityDetail.value = {
          disability: {
            'NIT EMPRESA': data.disability.fkNitEmpresa,
            'EMPRESA EMPLEADO': data.disability.empresaEmpleado,
            'NÚMERO INCAPACIDAD': data.disability.numeroIncapacidad,
            'FECHA INICIO': data.disability.fechaInicio,
            'FECHA FIN': data.disability.fechaFin,
            'TOTAL DÍAS': data.disability.totalDias,
            IBC: +data.disability.ibc,
            VALOR: data.disability.valor,
            'ESTADO INCAPACIDAD': data.disability.nombreEstadoIncapacidad,
            'TIPO INCAPACIDAD': data.disability.nombreTipoIncapacidad,
            'NIT ENTIDAD': data.disability.fkEntidad,
            ENTIDAD: data.disability.razonSocialEntidad,
            'TIPO ENTIDAD': data.disability.tipoEntidad,
            CIE: data.disability.cie,
            CÓDIGO: data.disability.codigo,
            DESCRIPCIÓN: data.disability.descripcion,
            'CÓDIGO GRUPO': data.disability.grupoSubgrupo,
            'FECHA REGIRSTRO': data.disability.fechaRegistro,
          },
          employe: {
            DOCUMENTO: data.employe.documentoPersona || 0,
            'PRIMER NOMBRE': data.employe.primerNombre,
            'SEGUNDO NOMBRE': data.employe.segundoNombre,
            'PRIMERA PELLIDO': data.employe.primerApellido,
            'SEGUNDO APELLIDO': data.employe.segundoApellido,
            GÉNERO: data.employe.genero,
            'FECHA NACIMIENTO': data.employe.fechaNacimiento,
            'DOCUMENTO EMPLEADO': data.employe.fkDocumentoPersona || 0,
            DIRECCIÓN: data.employe.direccion,
            BARRIO: data.employe.barrio,
            CORREO: data.employe.correo,
            CELULAR: data.employe.celular,
            TELEFONO: data.employe.telefonoFijo,
            'CIUDAD RESIDENCIA': `${data.employe.nombreCiudad}`,
            'DEPARTAMENTO RESIDENCIA': `${data.employe.nombreDepartamento}`,
            CARGO: `${data.employe.nombreCargo}`,
            'TIPO DOCUMENTO': `${data.employe.nombreTipoDocumento}`,
          },
        };

        files.value = [...data.files];

        if (data.prorroga) {
          prorroga.value = [...data.prorroga];
        }

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
      DisabilityExtension.value.fkIdIncapacidad = row.radicado;
      DisabilityExtension.value.usuario = dataUser.documentoPersona;
      disability.value = row;
      // Asignamos a los inputs tipo date la fecha actual del sistema
      // const timeStamp = Date.now();
      // DisabilityExtension.value.fechaIniciaProrroga = date.formatDate(
      //   timeStamp,
      //   'YYYY/MM/DD'
      // );
      // DisabilityExtension.value.fechaFinProrroga = date.formatDate(
      //   timeStamp,
      //   'YYYY/MM/DD'
      // );
      dateToday.value = DisabilityExtension.value.fechaFinProrroga;

      dialogExtension.value = true;
    };

    const onSubmit = async () => {
      $q.loading.show({
        message: 'Guardando, por favor espere...',
      });
      try {
        await post.createDisabilityExtension(DisabilityExtension.value);
        $q.notify({
          message: 'Prorroga adicionada',
          type: 'positive',
          position: 'bottom-right',
        });

        dialogExtension.value = false;
        disability.value = { ...informationDisability };
        DisabilityExtension.value = {
          idProrrogaIncapacidad: null,
          fkIdIncapacidad: 0,
          fechaIniciaProrroga: '',
          fechaFinProrroga: '',
          diasProrroga: 0,
          valor: 0,
          ibc: 0,
          usuario: 0,
          observacion: '',
        };
      } catch (error) {
        controlError(error);
      } finally {
        $q.loading.hide();
      }
    };

    const genreReport = async () => {
      $q.loading.show({
        message: 'Generando reporte, por favor espere...',
      });
      try {
        const { data } = await get.getReport(typeReport.value, document.value);
        openURL(data.urlFile);
      } catch (error) {
        controlError(error);
      } finally {
        $q.loading.hide();
      }
    };

    const calculateDays = (fecha1: string, fecha2: string) => {
      return date.getDateDiff(new Date(fecha1), new Date(fecha2), 'days') + 1;
    };

    const viewDeleteDisability = async () => {
      isLoading.value = true;
      try {
        const { data } = await get.getDisabilityDelete();
        rowsDisabilityDelete.value = [
          ...data.map((c) => {
            c.title = `${c.primerNombre} ${c.primerApellido}`;
            return c;
          }),
        ];
        dialogDeleteDisability.value = true;
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const deleteDisability = (row: InformationDisability) => {
      $q.dialog({
        component: DeleteDialogComponent,
        componentProps: {
          title: 'Eliminar incapacidad',
          message: 'Esta seguro de eliminar esta incapacidad?',
          labelBtn: 'Eliminar',
        },
      }).onOk(async () => {
        try {
          const { data } = await delet.deleteDisability(row.numeroIncapacidad);
          $q.notify({
            message: data.message,
            type: 'positive',
          });
        } catch (error) {
          controlError(error);
        } finally {
        }
      });
    };

    const restoreDisability = (row: InformationDisability) => {
      $q.dialog({
        component: DeleteDialogComponent,
        componentProps: {
          title: 'Restaurar incapacidad',
          message: 'Esta seguro de restaurar esta incapacidad?',
          labelBtn: 'Restaurar',
        },
      }).onOk(async () => {
        try {
          const { data } = await put.restoreDisability(row.numeroIncapacidad);
          $q.notify({
            message: data.message,
            type: 'positive',
          });
          dialogDeleteDisability.value = false;
          setTimeout(() => getData(), 300);
        } catch (error) {
          controlError(error);
        } finally {
        }
      });
    };

    const openDialogchangeStatus = async (row: InformationDisability) => {
      isLoading.value = true;
      try {
        disability.value = row;
        const { data } = await get.getStateDisability();
        optionsStatus.value = [
          ...data.filter((e) => e.idEstadoIncapacidad != 7),
        ];
        newStateInability.value.idIncapacidad = row.numeroIncapacidad;
        dialogStatus.value = true;
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const changeStatus = async () => {
      isLoading.value = true;
      try {
        const { data } = await put.updateStateDisability(
          newStateInability.value
        );
        const observaciones = `[CAMBIO ESTADO] - ${
          newStateInability.value.observacion
            ? newStateInability.value.observacion
            : 'N/A'
        }`;
        const resHistory = await post.createHistoricalDisability({
          idHistorico: null,
          observaciones,
          usuario: dataUser.usuario,
          idIncapacidad: newStateInability.value.idIncapacidad,
        });

        dialogStatus.value = false;
        newStateInability.value = {
          idIncapacidad: 0,
          estado: 0,
          observacion: '',
        };

        $q.notify({
          message: resHistory.data.message,
          type: 'positive',
          position: 'bottom-right',
        });
        $q.notify({
          message: data.message,
          type: 'positive',
          position: 'bottom-right',
        });
        setTimeout(() => getData(), 300);
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const filterDisability = async () => {
      isLoading.value = true;
      try {
        let from = '';
        let to = '';

        if (typeof range.value === 'string') {
          from = range.value;
        } else {
          from = range.value.from;
          to = range.value.to;
        }
        const { data } = await get.disabilityByRange(from, to);

        rows.value = [
          ...data.map((c) => {
            c.btnDetail = true;
            c.btnEdit = true;
            c.btnAddExtension = true;
            c.btnDelete = true;
            c.title = `${c.primerNombre} ${c.primerApellido}`;
            return c;
          }),
        ];
        isFilterByDate.value = true;
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onReset = () => {
      if (range.value.from && range.value.to) {
        range.value.from = '';
        range.value.to = '';
        getData();
      }
    };

    watch(dialogStatus, (value) => {
      if (!value) {
        newStateInability.value = {
          idIncapacidad: 0,
          estado: 0,
          observacion: '',
        };
      }
    });

    watch(tab, (value) => {
      if (value == 'disabilities') {
        disability.value = { ...informationDisability };
      }
    });

    watch(typeReport, () => {
      document.value = '';
    });

    watch(
      () => DisabilityExtension.value.fechaIniciaProrroga,
      (value) => {
        if (disability.value?.fechaFin) {
          if (value < disability.value?.fechaFin) {
            DisabilityExtension.value.fechaIniciaProrroga = dateToday.value;
            DisabilityExtension.value.fechaFinProrroga = dateToday.value;
            $q.notify({
              message:
                'La fecha de prorroga no puede ser inferior a la fecha fin de incapacidad',
              type: 'warning',
            });
          } else if (DisabilityExtension.value.ibc) {
            const totalDaysPro = calculateDays(
              DisabilityExtension.value.fechaFinProrroga,
              value
            );
            DisabilityExtension.value.diasProrroga = totalDaysPro;

            DisabilityExtension.value.valor = calculateDisabilityCost(
              disability.value.fkIdTipoIncapacidad,
              minimumSalary.value,
              totalDaysPro,
              DisabilityExtension.value.ibc
            );
          }
        }
      }
    );

    watch(
      () => DisabilityExtension.value.fechaFinProrroga,
      (value) => {
        if (disability.value?.fechaInicio) {
          if (value < DisabilityExtension.value.fechaIniciaProrroga) {
            DisabilityExtension.value.fechaFinProrroga = dateToday.value;
            $q.notify({
              message:
                'La fecha de prorroga no puede ser inferior a la fecha fin de incapacidad',
              type: 'warning',
            });
          } else if (DisabilityExtension.value.ibc) {
            const totalDaysPro = calculateDays(
              value,
              DisabilityExtension.value.fechaIniciaProrroga
            );
            DisabilityExtension.value.diasProrroga = totalDaysPro;

            DisabilityExtension.value.valor = calculateDisabilityCost(
              disability.value.fkIdTipoIncapacidad,
              minimumSalary.value,
              totalDaysPro,
              DisabilityExtension.value.ibc
            );
          }
        }
      }
    );

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
      tab,
      columns,
      rows,
      disability,
      dialogDetail,
      disabilityDetail,
      isLoading,
      files,
      dialogExtension,
      DisabilityExtension,
      prorroga,
      history,
      dialogReport,
      typeReport,
      document,
      dialogDeleteDisability,
      rowsDisabilityDelete,
      dialogStatus,
      optionsStatus,
      newStateInability,
      actions,
      range,
      isFilterByDate,
      getData,
      onSubmit,
      genreReport,
      addExtension,
      openURL,
      onReload,
      onEdit,
      onDetail,
      deleteDisability,
      viewDeleteDisability,
      changeStatus,
      openDialogchangeStatus,
      filterDisability,
      onReset,
      restoreDisability,
    };
  },
});
</script>
