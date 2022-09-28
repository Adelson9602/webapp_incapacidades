<template>
  <div class="row">
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
        :disable="!optionDepartment ? true : false"
        :loading="!optionDepartment ? true : false"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> Sin resultados </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
      <q-select
        v-model="contact.fkIdCiudad"
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
        :disable="!optionCities ? true : false"
        :loading="!optionCities && isEdit ? true : false"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> Sin resultados </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
      <q-input
        v-model="contact.direccion"
        type="text"
        label="Dirección"
        outlined
        :rules="[(val) => !!val || 'Dirección es requerido']"
        @update:model-value="
          (val) => {
            contact.direccion = `${val}`.toUpperCase();
          }
        "
      />
    </div>
    <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
      <q-input
        v-model="contact.barrio"
        type="text"
        label="Barrio"
        outlined
        :rules="[(val) => !!val || 'Barrio es requerido']"
        @update:model-value="
          (val) => {
            contact.barrio = `${val}`.toUpperCase();
          }
        "
      />
    </div>
    <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
      <q-input
        v-model="contact.correo"
        type="text"
        label="Correo"
        outlined
        :rules="[(val) => !!val || 'Razón social es requerido']"
        @update:model-value="
          (val) => {
            contact.correo = `${val}`.toUpperCase();
          }
        "
      />
    </div>
    <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
      <q-input
        v-model="contact.celular"
        type="text"
        label="Celular"
        outlined
        :rules="[
          (val) => !!val || 'Celular es requerido',
          (val) => val.length === 10 || 'Mímino 10 dígitos',
        ]"
        mask="##########"
      />
    </div>
    <div class="col-xs-12 col-sm-6 col-md-3 q-pa-sm">
      <q-input
        v-model="contact.telefonoFijo"
        type="text"
        label="Teléfono"
        outlined
        :rules="[
          (val) => !!val || 'Teléfono es requerido',
          (val) => val.length === 7 || 'Mímino 7 dígitos',
        ]"
        mask="#######"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import { get } from 'src/requests';
import { controlError } from 'src/helpers/controlError';
import {
  City,
  DepartemtAndCity,
  InformationEmploye,
} from 'src/models/generals.models';
import { employeStore } from 'stores/employe';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'ComponentCreateContact',
  props: {
    employeEdit: Object as PropType<InformationEmploye>,
  },
  setup() {
    const isLoading = ref(false);
    const optionDepartment = ref<DepartemtAndCity[]>();
    const department = ref<DepartemtAndCity[]>();
    const departmentSelected = ref();
    const cities = ref<City[]>();
    const optionCities = ref<City[]>();
    const { contact, isEdit, fkIdDepartamento } = storeToRefs(employeStore());

    const getData = async () => {
      isLoading.value = true;
      try {
        const resDepartment = await get
          .getDepartmentAndCity()
          .then((response) => response.data);
        department.value = [...resDepartment];
        optionDepartment.value = [...resDepartment];

        if (isEdit.value) {
          departmentSelected.value = department.value.find(
            (d) => d.idDepartamento === fkIdDepartamento.value
          );
        }
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
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

    watch(departmentSelected, (value: DepartemtAndCity) => {
      cities.value = [...value.cities];
      optionCities.value = [...cities.value];
    });

    onMounted(() => {
      getData();
    });

    return {
      optionDepartment,
      departmentSelected,
      optionCities,
      contact,
      isEdit,
      filterDeparment,
      filterCity,
    };
  },
});
</script>
