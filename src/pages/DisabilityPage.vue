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
                <div
                  class="col-xs-12 col-sm-6 col-md-3 col-lg-2 q-pa-sm"
                  v-for="(sbItem, key) in item"
                  :key="key"
                >
                  <q-field :label="`${key}`" stack-label dense borderless>
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
                <div class="text-h6 text-grey-8">Archivos adjuntos</div>
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
                <q-card-section class="q-pb-none">
                  <q-input
                    v-model="historyDisability.fechaProrroga"
                    mask="date"
                    :rules="['date']"
                    label="Fecha de prorroga"
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
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
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
                </q-card-section>
                <q-card-actions align="right" class="q-px-md q-pb-md q-pt-none">
                  <q-btn
                    label="Cancelar"
                    type="reset"
                    color="primary"
                    flat
                    class="q-ml-sm"
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
import { QTableColumn, openURL, useQuasar } from 'quasar';
import { decryptJSON } from 'src/helpers/encrypt';

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
      usuario: 0,
      observacion: '',
    });

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
        disability.value = row;
        dialogDetail.value = true;
      } catch (error) {
        controlError(error);
      } finally {
      }
    };

    const addExtension = (row: InformationDisability) => {
      historyDisability.value.fkRadicado = row.radicado;
      historyDisability.value.usuario = dataUser.documentoPersona;
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
