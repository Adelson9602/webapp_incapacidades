<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-input outlined v-model="disability.ibc" type="text" label="IBC" />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-input
            outlined
            v-model="disability.valor"
            type="text"
            label="VALOR"
            disable
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-input
            outlined
            v-model="disability.numeroIncapacidad"
            type="text"
            label="NÚMERO INCAPACIDAD"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-select
            outlined
            v-model="disability.fkNitEmpresa"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="EMPRESA DONDE ES EMPLEADO"
            :options="optionsCompanies"
            @filter="filterCompany"
            option-label="razonSocial"
            option-value="nit"
            map-options
            emit-value
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-select
            outlined
            v-model="disability.fkDocumentoPersona"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="EMPLEADO"
            :options="optionsEmployes"
            @filter="filterEmployes"
            option-label="completeName"
            option-value="documentoPersona"
            map-options
            emit-value
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-field outlined label="DOCUMENTO" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ employe.documentoPersona }}
              </div>
            </template>
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-field outlined label="CARGO" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ employe.nombreCargo }}
              </div>
            </template>
          </q-field>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-select
            outlined
            v-model="idTipoIncapacidad"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="TIPO INCAPACIDAD"
            :options="optionsDisabilityType"
            @filter="filterDisabilityType"
            option-label="nombreTipoIncapacidad"
            option-value="idTipoIncapacidad"
            map-options
            emit-value
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm"
          v-if="idTipoIncapacidad == 1"
        >
          <q-select
            outlined
            v-model="disability.fkIdTipoIncapacidad"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="TIPO ENFERMEDAD"
            :options="optionsDisabilityTypeTwo"
            @filter="filterDisabilityType"
            option-label="nombreTipoIncapacidad"
            option-value="idTipoIncapacidad"
            map-options
            emit-value
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-select
            outlined
            v-model="disability.fkEntidad"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="ENTIDAD"
            :options="optionsEntyties"
            @filter="filterEntyties"
            option-label="razonSocial"
            option-value="nit"
            map-options
            emit-value
            :disable="disability.fkIdTipoIncapacidad ? false : true"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-select
            outlined
            v-model="cieCategorySelected"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="GRUPO CIE"
            :options="optionsCieCategory"
            @filter="filterCieCategory"
            option-label="descripcion"
            :disable="disability.fkIdTipoIncapacidad ? false : true"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" style="max-width: 500px">
                <q-item-section>
                  <q-item-label>{{ scope.opt.descripcion }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-select
            outlined
            v-model="disability.cie"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="CÓDIGO CIE"
            :options="optionsCieCode"
            @filter="filterCieCode"
            option-label="descripcion"
            option-value="codigo"
            map-options
            emit-value
            :disable="cieCategorySelected ? false : true"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-input
            outlined
            v-model="disability.fechaInicio"
            mask="date"
            :rules="['date']"
            label="Fecha inicio de incapacidad"
            hide-bottom-space
            :disable="disability.fkIdTipoIncapacidad ? false : true"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="disability.fechaInicio">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-input
            outlined
            v-model="disability.fechaFin"
            mask="date"
            :rules="['date']"
            label="Fecha fin de incapacidad"
            hide-bottom-space
            :disable="disability.fkIdTipoIncapacidad ? false : true"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="disability.fechaFin">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-field outlined label="TOTAL DÍAS" stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ numberDays }}
              </div>
            </template>
          </q-field>
        </div>
      </div>
      <div class="row" v-if="idTipoIncapacidad">
        <div
          class="col-xs-12 col-sm-6 col-md-3 q-pa-sm"
          v-for="(item, key) in files"
          :key="key"
        >
          <q-file
            bottom-slots
            v-model="item.file"
            :label="item.label"
            counter
            accept=".pdf"
            use-chips
            outlined
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" @click.stop.prevent />
            </template>
            <template v-slot:append>
              <q-icon
                name="close"
                @click.stop.prevent="item.file = null"
                class="cursor-pointer"
              />
            </template>
          </q-file>
        </div>
      </div>
      <div class="row" v-if="isHaveFile > 0">
        <div class="text-h6 col-xs-12 q-pa-sm text-grey-8">
          Archivos adjuntos
        </div>
        <div
          class="q-pa-sm row column items-center"
          v-for="(item, key) in files.filter((f) => f.url)"
          :key="key"
        >
          <q-btn
            dense
            icon="fa-solid fa-file-pdf"
            color="green"
            @click="openURL(`//${item.url}`)"
            size="40px"
          >
            <q-tooltip> Descargar archivo </q-tooltip>
          </q-btn>
          <p class="q-mt-md">{{ item.nombreArchivo }}</p>
        </div>
      </div>
      <div class="row justify-end">
        <q-btn label="Guardar" type="submit" color="primary" />
      </div>
    </q-form>
  </transition>
  <q-inner-loading :showing="isLoading" class="full-height full-width">
    <q-spinner-gears size="100px" color="primary" />
    <p class="text-grey-6 text-body1">Por favor espere....</p>
  </q-inner-loading>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, toRefs, watch } from 'vue';
import { date, useQuasar, openURL } from 'quasar';
import { get, post } from 'src/requests';
import {
  Adjunto,
  Cie,
  CieCode,
  Company,
  CompanyLogged,
  Disability,
  DisabilityType,
  DocumentType,
  InformationDisability,
  InformationEmploye,
  Persona,
} from 'src/models/generals.models';
import { controlError } from 'src/helpers/controlError';
import { countDays } from '../../helpers/globalFunctions';
import { decryptJSON } from 'src/helpers/encrypt';

export default defineComponent({
  name: 'ComponentCreateDisability',
  emits: ['onReload'],
  props: {
    disabilityEdit: Object as PropType<InformationDisability>,
  },
  setup(props, { emit }) {
    const $q = useQuasar();
    const { disabilityEdit } = toRefs(props);
    const disability = ref<Disability>({
      radicado: null,
      fkIdTipoIncapacidad: 0,
      fkNitEmpresa: '',
      numeroIncapacidad: 0,
      fechaInicio: '',
      fechaFin: '',
      totalDias: 0,
      ibc: 0,
      cie: '',
      valor: 0,
      fkIdEstadoIncapacidad: 1,
      fkDocumentoPersona: 0,
      fkEntidad: '',
      usuario: 0,
      files: [],
    });
    const idTipoIncapacidad = ref<number>(0);
    const employe = ref<InformationEmploye>({
      documentoPersona: null,
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      genero: '',
      fechaNacimiento: '',
      fkIdTipoDocumento: 0,
      fkIdContacto: 0,
      fkDocumentoPersona: 0,
      idContacto: 0,
      direccion: '',
      barrio: '',
      correo: '',
      celular: '',
      fkIdEmpresa: 0, // para cuando se crea empleado
      telefonoFijo: '',
      fkIdCiudad: 0,
      nombreCiudad: '',
      fkIdDepartamento: 0,
      nombreDepartamento: '',
      fkIdCargo: 0,
      nombreCargo: '',
      nombreTipoDocumento: '',
      isEmploye: false,
      fechaInicioLaboral: '',
    });
    const isLoading = ref<boolean>(false);
    const companies = ref<Company[]>([]);
    const optionsCompanies = ref<Company[]>([]);
    const optionsEntyties = ref<Company[]>([]);
    const entyties = ref<Company[]>([]);
    const optionsDocumentTypes = ref<DocumentType[]>([]);
    const employes = ref<Persona[]>([]);
    const optionsEmployes = ref<Persona[]>([]);
    const disabilityType = ref<DisabilityType[]>([]);
    const optionsDisabilityType = ref<DisabilityType[]>([]);
    const optionsDisabilityTypeTwo = ref<DisabilityType[]>([
      {
        idTipoIncapacidad: 2,
        nombreTipoIncapacidad: 'ENFERMEDAD GENERAL',
        codigoDianostico: '',
      },
      {
        idTipoIncapacidad: 6,
        nombreTipoIncapacidad: 'ENFERMEDAD LABORAL',
        codigoDianostico: '',
      },
    ]);
    const minimumSalary = ref<number>(0);
    const today = ref<string>('');
    const numberDays = ref<number>(0);
    const formatter = new Intl.NumberFormat('es-CO', {
      // style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    });
    const files = ref<Adjunto[]>([]);
    // const filesUploade = ref<Adjunto[]>([]); // contiene los archivos que se han adjuntado a la incapacidad, se visualiza cuando se edite la incapacidad
    const optionsCieCategory = ref<Cie[]>([]);
    const cieCategory = ref<Cie[]>([]);
    const optionsCieCode = ref<CieCode[]>([]);
    const cieCode = ref<CieCode[]>([]);
    const cieCategorySelected = ref<Cie>();
    const isHaveFile = ref(0); // Permite validar si hay archivos para editar
    const isEdit = ref(false);
    const { dataUser } = decryptJSON(
      `${$q.localStorage.getItem('dataUsuario')}`
    ) as unknown as CompanyLogged;

    const getData = async () => {
      isLoading.value = true;
      try {
        const resCie = await get.getCie().then((response) => response.data);
        cieCategory.value = [...resCie];
        optionsCieCategory.value = [...resCie];

        const resCompany = await get
          .getCompanyByType(5)
          .then((response) => response.data);
        companies.value = [...resCompany];
        optionsCompanies.value = [...resCompany];

        const resDocuments = await get
          .getDocumentsType()
          .then((response) => response.data);
        optionsDocumentTypes.value = [...resDocuments];

        const resSalary = await get
          .getSalary()
          .then((response) => response.data);
        minimumSalary.value = resSalary.salarioMinimo;

        const resEmployes = await get
          .getEmployesSelect()
          .then((response) => response.data);
        employes.value = [
          ...resEmployes.map((e) => {
            e.completeName = `${e.primerApellido} ${e.segundoApellido} ${e.primerNombre} ${e.segundoNombre}`;
            return e;
          }),
        ];
        optionsEmployes.value = [...employes.value];

        const resDisabilityType = await get
          .getDisabilityType()
          .then((response) => response.data);
        disabilityType.value = [...resDisabilityType];
        optionsDisabilityType.value = [...resDisabilityType];

        // Asignamos a los inputs tipo date la fecha actual del sistema
        const timeStamp = Date.now();
        today.value = date.formatDate(timeStamp, 'YYYY/MM/DD');
        disability.value.fechaInicio = today.value;
        disability.value.fechaFin = today.value;

        // Validamos si el prop disabilityEdit tiene algun valor, si tiene valor significa que se esta editando alguna incapacidad, entonces procedemos a asignar los datos a editar a los inputs
        if (disabilityEdit.value) {
          assignDataEdit();
        }
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const assignDataEdit = () => {
      const tempCategory = cieCategory.value.find(
        (e) => e.idGrupoCie == disabilityEdit.value?.idGrupoCie
      );

      cieCategorySelected.value = tempCategory;
      idTipoIncapacidad.value = disabilityEdit.value?.fkIdTipoIncapacidad || 0;
      disability.value = {
        radicado: disabilityEdit.value?.radicado,
        fkIdTipoIncapacidad: disabilityEdit.value?.fkIdTipoIncapacidad || 0,
        fkNitEmpresa: `${disabilityEdit.value?.fkNitEmpresa}`,
        numeroIncapacidad: disabilityEdit.value?.numeroIncapacidad || 0,
        fechaInicio: `${disabilityEdit.value?.fechaInicio}`,
        fechaFin: `${disabilityEdit.value?.fechaFin}`,
        totalDias: disabilityEdit.value?.totalDias || 0,
        ibc: disabilityEdit.value?.ibc || 0,
        cie: `${disabilityEdit.value?.cie}`,
        valor: disabilityEdit.value?.valor || 0,
        fkIdEstadoIncapacidad: disabilityEdit.value?.fkIdEstadoIncapacidad || 0,
        fkDocumentoPersona: disabilityEdit.value?.fkDocumentoPersona || 0,
        fkEntidad: `${disabilityEdit.value?.nitEntidad}`,
        usuario: dataUser.usuario,
      };

      setTimeout(() => {
        disability.value.cie = `${disabilityEdit.value?.cie}`;
        isEdit.value = true;
      }, 1000);
    };

    const onSubmit = async () => {
      if (isEdit.value) {
        $q.dialog({
          style: {
            textAlign: 'center',
          },
          title: 'Razón de edición de incapacidad',
          message: 'Por favor ingrese observaciones de los cambios realizados',
          prompt: {
            model: '',
            isValid: (val) => val.length > 2,
            type: 'textarea',
            filled: true,
          },
          cancel: true,
          persistent: true,
          ok: {
            label: 'Guardar cambios',
          },
        }).onOk(async (input) => {
          const observaciones = `[EDICIÓN] - ${input}`;
          const { data } = await post.createHistoricalDisability({
            idHistorico: null,
            observaciones,
            usuario: dataUser.usuario,
            idIncapacidad: disabilityEdit.value?.idIncapacidad,
          });
          $q.notify({
            message: data.message,
            type: 'positive',
            position: 'bottom-right',
          });
          await saveData();
        });
      } else {
        await saveData();
      }
    };

    // Envia los datos al server
    const saveData = async () => {
      isLoading.value = true;
      try {
        const formDataInd = new FormData();
        // let tempFiles: any = [];
        files.value.forEach((element) => {
          if (element.file) {
            const newFile = new File([element.file], `${element.label}.pdf`, {
              type: 'application/pdf',
            });
            formDataInd.append('files', newFile);
            formDataInd.append('typeFile', '1');
          }
        });

        let filesSend: Adjunto[] = [];
        const { data } = await post.uploadFiles(formDataInd);
        if (data) {
          data.forEach((file) => {
            const fileUpdate = files.value.find((e) =>
              e.nombreArchivo.includes(file.nameFile)
            );
            console.log(fileUpdate);
            filesSend.push({
              idFiles: fileUpdate?.idFiles,
              fkIdTipoFile: 1,
              nombreArchivo: file.nameFile,
              fkRadicado: null, // Se envia 0 y en el servidor se asigna
              url: file.url,
            });
          });
          disability.value.files = [...filesSend];
        }
        const response = await post.createDisability(disability.value);
        $q.notify({
          message: response.data.message,
          type: 'positive',
          position: 'bottom-right',
        });
        emit('onReload');
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    // Funciones para filtar datos de los selects
    const filterCompany = (val: string, update: any) => {
      if (val === '') {
        update(() => {
          optionsCompanies.value = companies.value;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        optionsCompanies.value = companies.value.filter(
          (v) =>
            v.razonSocial.toLowerCase().indexOf(needle) > -1 ||
            v.nit.toLowerCase().indexOf(needle) > -1
        );
      });
    };

    const filterEntyties = (val: string, update: any) => {
      if (val === '') {
        update(() => {
          optionsEntyties.value = entyties.value;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        optionsEntyties.value = entyties.value.filter(
          (v) =>
            v.razonSocial.toLowerCase().indexOf(needle) > -1 ||
            v.nit.toLowerCase().indexOf(needle) > -1
        );
      });
    };

    const filterEmployes = (val: string, update: any) => {
      if (val === '') {
        update(() => {
          optionsEmployes.value = employes.value;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        optionsEmployes.value = employes.value.filter(
          (v) =>
            `${v.primerApellido} ${v.segundoApellido} ${v.primerNombre} ${v.segundoNombre}`
              .toLowerCase()
              .indexOf(needle) > -1 ||
            `${v.documentoPersona}`.toLowerCase().indexOf(needle) > -1
        );
      });
    };

    const filterDisabilityType = (val: string, update: any) => {
      if (val === '') {
        update(() => {
          optionsDisabilityType.value = disabilityType.value;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        optionsDisabilityType.value = disabilityType.value.filter(
          (v) => v.nombreTipoIncapacidad.toLowerCase().indexOf(needle) > -1
        );
      });
    };

    const filterCieCategory = (val: string, update: any) => {
      if (val === '') {
        update(() => {
          optionsCieCategory.value = cieCategory.value;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        optionsCieCategory.value = cieCategory.value.filter(
          (v) =>
            v.descripcion.toLowerCase().indexOf(needle) > -1 ||
            v.grupoSubgrupo.toLowerCase().indexOf(needle) > -1
        );
      });
    };

    const filterCieCode = (val: string, update: any) => {
      if (val === '') {
        update(() => {
          optionsCieCode.value = cieCode.value;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        optionsCieCode.value = cieCode.value.filter(
          (v) =>
            v.descripcion.toLowerCase().indexOf(needle) > -1 ||
            v.codigo.toLowerCase().indexOf(needle) > -1
        );
      });
    };

    // Otras funciones
    const getEntityes = async (tipoIncapacidad: number) => {
      isLoading.value = true;
      try {
        if (
          tipoIncapacidad == 2 ||
          tipoIncapacidad == 3 ||
          tipoIncapacidad == 4
        ) {
          const resEps = await get
            .getCompanyByType(1)
            .then((response) => response.data);
          entyties.value = [...resEps];
          optionsEntyties.value = [...resEps];
        }

        if (tipoIncapacidad == 6) {
          const resArl = await get
            .getCompanyByType(2)
            .then((response) => response.data);
          entyties.value = [...resArl];
          optionsEntyties.value = [...resArl];
        }

        // const resAfp = await get
        //   .getCompanyByType(3)
        //   .then((response) => response.data);
        // afps.value = [...resAfp];
        // optionsAfps.value = [...resAfp];
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const calculateDisabilityCost = () => {
      // (1, 'ACCIDENTE DE TRÁNSITO', 'AC001'),
      // (2, 'ENFERMEDAD GENERAL', ''),
      // (3, 'LICENCIA DE MATERNIDAD', ''),
      // (4, 'LICENCIA PATERNIDAD', ''),
      // (5, 'ACCIDENTE LABORAL', ''),
      // (6, 'ENFERMEDAD LABORAL', ''),
      // (7, 'PRUEBA EDIT', 'PU001');
      // Calcula el número de días
      const totalDays = countDays(
        new Date(disability.value.fechaInicio),
        new Date(disability.value.fechaFin)
      );
      numberDays.value = totalDays;
      disability.value.totalDias = totalDays;

      const tempValue = (disability.value.ibc / 3) * 2;
      if (tempValue < minimumSalary.value) {
        // Cálculo para enfermedad general y
        if (
          (disability.value.fkIdTipoIncapacidad == 2 && numberDays.value > 2) ||
          (disability.value.fkIdTipoIncapacidad == 6 && numberDays.value > 2) ||
          (disability.value.fkIdTipoIncapacidad == 5 && numberDays.value > 2)
        ) {
          const value = Math.round(
            (minimumSalary.value / 30) * (numberDays.value - 2)
          );
          disability.value.valor = value;
        }
        // Cálculo para licencias de maternidad y paternidad
        if (
          disability.value.fkIdTipoIncapacidad == 3 ||
          disability.value.fkIdTipoIncapacidad == 4
        ) {
          const value = Math.round(
            (minimumSalary.value / 30) * numberDays.value
          );
          disability.value.valor = value;
        }
      } else {
        const value = Math.round((tempValue / 30) * numberDays.value);
        disability.value.valor = value;
      }
    };

    watch(
      () => disability.value.fechaInicio,
      (value, oldValue) => {
        if (oldValue != value) {
          calculateDisabilityCost();
        }
      }
    );

    watch(
      () => disability.value.fechaFin,
      (value, oldValue) => {
        if (oldValue != value) {
          calculateDisabilityCost();
        }
      }
    );

    watch(cieCategorySelected, (value) => {
      if (value) {
        disability.value.cie = '';
        cieCode.value = [...value.cieCodes];
        // optionsCieCode.value = [...value.cieCodes];
      }
    });

    watch(
      () => disability.value.fkDocumentoPersona,
      async (value) => {
        if (value) {
          isLoading.value = true;
          try {
            const { data } = await get.getEmploye(+value);
            employe.value = { ...data };
          } catch (error) {
            controlError(error);
          } finally {
            isLoading.value = false;
          }
        }
      }
    );

    watch(
      () => disability.value.ibc,
      () => {
        calculateDisabilityCost();
      }
    );

    watch(
      () => disability.value.fkIdTipoIncapacidad,
      (value) => {
        // Obtenemos los tipos de entidad
        getEntityes(value);
      }
    );

    watch(files, (value) => {
      if (disabilityEdit.value?.files && value) {
        value.forEach((e) => {
          const fileEdit = disabilityEdit.value?.files.find((i) =>
            i.nombreArchivo.includes(`${e.label}`)
          );
          if (fileEdit) {
            isHaveFile.value++;
            e.idFiles = fileEdit.idFiles;
            e.fkRadicado = fileEdit.fkRadicado;
            e.nombreArchivo = fileEdit.nombreArchivo;
            e.url = fileEdit.url;
            e.fkIdTipoFile = fileEdit.fkIdTipoFile;
          }
        });
      }
    });

    watch(idTipoIncapacidad, async (value) => {
      if (value != 1) {
        disability.value.fkIdTipoIncapacidad = value;
      }

      isLoading.value = true;
      try {
        files.value.length = 0;
        const { data } = await get.getDocumentsAttachByDisabilityType(value);
        data.forEach((e) => {
          files.value.push({
            idFiles: 0,
            fkRadicado: 0,
            nombreArchivo: '',
            url: '',
            fkIdTipoFile: 0,
            label: e.documento,
            file: null,
          });
        });
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    });

    onMounted(() => getData());

    return {
      disability,
      optionsCompanies,
      optionsDocumentTypes,
      optionsEmployes,
      optionsDisabilityType,
      isLoading,
      files,
      formatter,
      idTipoIncapacidad,
      optionsDisabilityTypeTwo,
      optionsEntyties,
      numberDays,
      employe,
      cieCategorySelected,
      optionsCieCategory,
      optionsCieCode,
      isHaveFile,
      onSubmit,
      filterCompany,
      filterEntyties,
      filterEmployes,
      filterDisabilityType,
      filterCieCategory,
      filterCieCode,
      openURL,
    };
  },
});
</script>
<style lang="sass" scoped>
.files
  border: 1px solid $primary
</style>
