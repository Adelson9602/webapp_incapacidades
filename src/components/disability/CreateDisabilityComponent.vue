<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-input
            outlined
            v-model="disability.radicado"
            type="text"
            label="RADICADO"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-input outlined v-model="disability.ibc" type="text" label="IBC" />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-input
            outlined
            v-model="disability.valor"
            type="text"
            label="VALOR"
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
            v-model="disability.fkEntidad"
            clearable
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="Entidad"
            :options="optionsArls"
            @filter="filterArl"
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
          <q-select
            outlined
            v-model="disability.fkIdTipoIncapacidad"
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
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-input
            outlined
            v-model="disability.fechaInicio"
            mask="date"
            :rules="['date']"
            label="Fecha inicio de incapacidad"
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
      </div>
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </transition>
  <q-inner-loading :showing="isLoading" class="full-height full-width">
    <q-spinner-gears size="100px" color="primary" />
    <p class="text-grey-6 text-body1">Por favor espere....</p>
  </q-inner-loading>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, toRefs } from 'vue';
import { date } from 'quasar';
import { get, post } from 'src/requests';
import {
  Company,
  Disability,
  DisabilityType,
  DocumentType,
  InformationDisability,
  Persona,
} from 'src/models/generals.models';
import { controlError } from 'src/helpers/controlError';
export default defineComponent({
  name: 'ComponentCreateDisability',
  emits: ['onReload'],
  props: {
    disabilityEdit: Object as PropType<InformationDisability>,
  },
  setup(props, { emit }) {
    const { disabilityEdit } = toRefs(props);
    const disability = ref<Disability>({
      radicado: '',
      fkIdTipoIncapacidad: 0,
      fkNitEmpresa: '',
      numeroIncapacidad: 0,
      fechaInicio: '',
      fechaFin: '',
      totalDias: 4,
      ibc: '',
      valor: '',
      fkIdEstadoIncapacidad: 0,
      fkDocumentoPersona: 0,
      fkEntidad: '',
    });
    const isLoading = ref(false);
    const companies = ref<Company[]>([]);
    const optionsCompanies = ref<Company[]>([]);
    const arls = ref<Company[]>([]);
    const optionsArls = ref<Company[]>([]);
    const afps = ref<Company[]>([]);
    const optionsAfps = ref<Company[]>([]);
    const eps = ref<Company[]>([]);
    const optionsEps = ref<Company[]>([]);
    const optionsDocumentTypes = ref<DocumentType[]>([]);
    const employes = ref<Persona[]>([]);
    const optionsEmployes = ref<Persona[]>([]);
    const disabilityType = ref<DisabilityType[]>([]);
    const optionsDisabilityType = ref<DisabilityType[]>([]);
    const files = ref<File[]>([]);
    const filesInput = ref();

    const getData = async () => {
      isLoading.value = true;
      try {
        const resCompany = await get
          .getCompanyByType(5)
          .then((response) => response.data);
        companies.value = [...resCompany];
        optionsCompanies.value = [...resCompany];

        const resArl = await get
          .getCompanyByType(2)
          .then((response) => response.data);
        arls.value = [...resArl];
        optionsArls.value = [...resArl];

        const resAfp = await get
          .getCompanyByType(3)
          .then((response) => response.data);
        afps.value = [...resAfp];
        optionsAfps.value = [...resAfp];

        const resEps = await get
          .getCompanyByType(1)
          .then((response) => response.data);
        eps.value = [...resEps];
        optionsEps.value = [...resEps];

        const resDocuments = await get
          .getDocumentsType()
          .then((response) => response.data);
        optionsDocumentTypes.value = [...resDocuments];

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
        const formattedString = date.formatDate(timeStamp, 'YYYY/MM/DD');
        disability.value.fechaInicio = formattedString;
        disability.value.fechaFin = formattedString;

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
      disability.value = {
        radicado: `${disabilityEdit.value?.radicado}`,
        fkIdTipoIncapacidad: disabilityEdit.value?.fkIdTipoIncapacidad || 0,
        fkNitEmpresa: `${disabilityEdit.value?.fkNitEmpresa}`,
        numeroIncapacidad: disabilityEdit.value?.numeroIncapacidad || 0,
        fechaInicio: `${disabilityEdit.value?.fechaInicio}`,
        fechaFin: `${disabilityEdit.value?.fechaFin}`,
        totalDias: disabilityEdit.value?.totalDias || 0,
        ibc: `${disabilityEdit.value?.ibc}`,
        valor: `${disabilityEdit.value?.valor}`,
        fkIdEstadoIncapacidad: disabilityEdit.value?.fkIdEstadoIncapacidad || 0,
        fkDocumentoPersona: disabilityEdit.value?.fkDocumentoPersona || 0,
        fkEntidad: `${disabilityEdit.value?.fkEntidad}`,
      };
    };

    const onSubmit = async () => {
      isLoading.value = true;
      try {
        const response = await post.createDisability(disability.value);
        console.log(response);
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
          (v) => v.razonSocial.toLowerCase().indexOf(needle) > -1
        );
      });
    };

    const filterArl = (val: string, update: any) => {
      if (val === '') {
        update(() => {
          optionsArls.value = arls.value;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        optionsArls.value = arls.value.filter(
          (v) => v.razonSocial.toLowerCase().indexOf(needle) > -1
        );
      });
    };

    const filterAfp = (val: string, update: any) => {
      if (val === '') {
        update(() => {
          optionsAfps.value = afps.value;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        optionsAfps.value = afps.value.filter(
          (v) => v.razonSocial.toLowerCase().indexOf(needle) > -1
        );
      });
    };

    const filterEps = (val: string, update: any) => {
      if (val === '') {
        update(() => {
          optionsEps.value = eps.value;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        optionsEps.value = eps.value.filter(
          (v) => v.razonSocial.toLowerCase().indexOf(needle) > -1
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
              .indexOf(needle) > -1
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

    const addFiles = (value: File[]) => {
      files.value = value;
      console.log(filesInput.value);
    };
    const onClick = () => {
      filesInput.value.upload();
    };

    onMounted(() => getData());

    return {
      disability,
      optionsCompanies,
      optionsArls,
      optionsAfps,
      optionsEps,
      optionsDocumentTypes,
      optionsEmployes,
      optionsDisabilityType,
      isLoading,
      files,
      filesInput,
      onSubmit,
      filterCompany,
      filterArl,
      filterAfp,
      filterEps,
      filterEmployes,
      filterDisabilityType,
      addFiles,
      onClick,
    };
  },
});
</script>
<style lang="sass" scoped>
.files
  border: 1px solid $primary
</style>
