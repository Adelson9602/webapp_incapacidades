<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <q-form @submit="onSubmit" @reset="onReset" class="row">
      <div class="col-xs-12 text-h6 q-pa-sm">
        <div>Datos básicos de la empresa</div>
        <q-separator />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
        <q-select
          v-model="company.fkIdTipoEmpresa"
          use-input
          input-debounce="0"
          label="Tipo empresa"
          outlined
          :options="optionsCompanyType"
          @filter="filterCompanyType"
          option-value="idTipoEmpresa"
          option-label="nombreTipoEmpresa"
          map-options
          emit-value
          :rules="[(val) => !!val || 'Tipo empresa es requerido']"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Sin resultados
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
        <q-input
          v-model="company.nit"
          type="text"
          label="Nit"
          outlined
          :rules="[(val) => !!val || 'Nit es requerido']"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
        <q-input
          v-model="company.razonSocial"
          type="text"
          label="Razón social"
          outlined
          :rules="[(val) => !!val || 'Razón social es requerido']"
        />
      </div>
      <div class="col-xs-12 text-h6 q-pa-sm">
        <div>Datos de contacto de la empresa</div>
        <q-separator />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
        <q-select
          v-model="departmentSelected"
          use-input
          input-debounce="0"
          label="Departamento"
          outlined
          :options="optionDepartment"
          @filter="filterDeparment"
          option-label="nombreDepartamento"
          :rules="[(val) => !!val || 'Departamento es requerido']"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Sin resultados
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
        <q-select
          v-model="company.fkIdCiudad"
          use-input
          input-debounce="0"
          label="Ciudad"
          outlined
          :options="optionCities"
          @filter="filterCity"
          option-value="idCiudad"
          option-label="nombreCiudad"
          map-options
          emit-value
          :rules="[(val) => !!val || 'Ciudad es requerido']"
          :disable="optionCities?.length == 0 ? true : false"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Sin resultados
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
        <q-input
          v-model="company.direccion"
          type="text"
          label="Dirección"
          outlined
          :rules="[(val) => !!val || 'Dirección es requerido']"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
        <q-input
          v-model="company.barrio"
          type="text"
          label="Barrio"
          outlined
          :rules="[(val) => !!val || 'Barrio es requerido']"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
        <q-input
          v-model="company.correo"
          type="text"
          label="Correo"
          outlined
          :rules="[(val) => !!val || 'Razón social es requerido']"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
        <q-input
          v-model="company.celular"
          type="text"
          label="Celular"
          outlined
          :rules="[(val) => !!val || 'Celular es requerido']"
        />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
        <q-input
          v-model="company.telefonoFijo"
          type="text"
          label="Teléfono"
          outlined
          :rules="[(val) => !!val || 'Teléfono es requerido']"
        />
      </div>
      <div class="col-xs-12 row justify-end">
        <q-btn
          label="Limpiar formulario"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
        <q-btn icon="save" label="Guardar" type="submit" color="primary" />
      </div>
    </q-form>
  </transition>
  <q-inner-loading :showing="isLoading" class="full-height full-width">
    <q-spinner-gears size="100px" color="primary" />
    <p class="text-grey-6 text-body1">Por favor espere....</p>
  </q-inner-loading>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, PropType, toRefs } from 'vue';
import { controlError } from 'src/helpers/controlError';
import {
  City,
  DepartemtAndCity,
  InformationCompany,
  TypeCompany,
} from 'src/models/generals.models';
import { get, post } from 'src/requests';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'ComponentCreateCompany',
  emits: ['onReload'],
  props: {
    companyEdit: Object as PropType<InformationCompany>,
  },
  setup(props, { emit }) {
    const $q = useQuasar();
    const company = ref<InformationCompany>({
      nit: '',
      razonSocial: '',
      fkIdTipoEmpresa: null,
      idContacto: null,
      direccion: '',
      barrio: '',
      correo: '',
      celular: '',
      telefonoFijo: '',
      fkIdCiudad: null,
      oldNit: '', // Se asigna valor solo cuando se esta editando el nit
      fkidContacto: null,
      nombreCiudad: '',
      fkIdDepartamento: null,
      nombreDepartamento: '',
      fkNit: '',
      nombreTipoEmpresa: '',
    });
    const compnayType = ref<TypeCompany[]>();
    const optionsCompanyType = ref<TypeCompany[]>();
    const optionDepartment = ref<DepartemtAndCity[]>();
    const department = ref<DepartemtAndCity[]>();
    const departmentSelected = ref();
    const cities = ref<City[]>();
    const optionCities = ref<City[]>();
    const isLoading = ref(false);
    const { companyEdit } = toRefs(props);

    const getData = async () => {
      isLoading.value = true;
      try {
        const resTypeCompany = await get
          .getCompanyType()
          .then((response) => response.data);

        compnayType.value = [...resTypeCompany];
        optionsCompanyType.value = [...compnayType.value];

        const resDepartment = await get
          .getDepartmentAndCity()
          .then((response) => response.data);
        department.value = [...resDepartment];
        optionDepartment.value = [...department.value];

        // Si se esta editando se asignan los datos de la empresa a editar
        if (companyEdit.value) {
          departmentSelected.value = department.value.find(
            (d) => d.idDepartamento === companyEdit.value?.fkIdDepartamento
          );
          company.value = {
            nit: companyEdit.value.nit,
            razonSocial: companyEdit.value.razonSocial,
            fkIdTipoEmpresa: companyEdit.value.fkIdTipoEmpresa,
            idContacto: companyEdit.value.idContacto,
            direccion: companyEdit.value.direccion,
            barrio: companyEdit.value.barrio,
            correo: companyEdit.value.correo,
            celular: companyEdit.value.celular,
            telefonoFijo: companyEdit.value.telefonoFijo,
            fkIdCiudad: companyEdit.value.fkIdCiudad,
            oldNit: companyEdit.value.oldNit,
            fkidContacto: companyEdit.value.fkidContacto,
            nombreCiudad: companyEdit.value.nombreCiudad,
            fkIdDepartamento: companyEdit.value.fkIdDepartamento,
            nombreDepartamento: companyEdit.value.nombreDepartamento,
            fkNit: companyEdit.value.fkNit,
            nombreTipoEmpresa: companyEdit.value.nombreTipoEmpresa,
          };
        }
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onSubmit = async () => {
      isLoading.value = true;
      try {
        const resSave = await post
          .createCompany(company.value)
          .then((response) => response.data);

        $q.notify({
          message: resSave.message,
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

    const onReset = () => {
      console.log('hola');
    };

    const filterCompanyType = (val: string, update: any) => {
      if (val === '') {
        update(() => {
          optionsCompanyType.value = compnayType.value;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        optionsCompanyType.value = compnayType.value?.filter(
          (v) => v.nombreTipoEmpresa.toLowerCase().indexOf(needle) > -1
        );
      });
    };

    const filterDeparment = (val: string, update: any) => {
      if (val === '') {
        update(() => {
          optionDepartment.value = department.value;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        optionDepartment.value = department.value?.filter(
          (v) => v.nombreDepartamento.toLowerCase().indexOf(needle) > -1
        );
      });
    };

    const filterCity = (val: string, update: any) => {
      if (val === '') {
        update(() => {
          optionCities.value = cities.value;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        optionCities.value = cities.value?.filter(
          (v) => v.nombreCiudad.toLowerCase().indexOf(needle) > -1
        );
      });
    };

    watch(
      () => company.value.nit,
      (value, oldValue) => {
        // Si se esta editando se asignan los datos de la empresa a editar
        if (companyEdit.value) {
          company.value.oldNit = oldValue;
        }
      }
    );

    watch(departmentSelected, (value: DepartemtAndCity) => {
      cities.value = [...value.cities];
      optionCities.value = [...cities.value];
    });

    onMounted(() => getData());

    return {
      company,
      optionsCompanyType,
      optionDepartment,
      departmentSelected,
      optionCities,
      isLoading,
      onSubmit,
      onReset,
      filterCompanyType,
      filterDeparment,
      filterCity,
    };
  },
});
</script>
