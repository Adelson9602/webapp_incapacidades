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
        <q-tab name="departments" label="Departamentos" />
        <q-tab name="cities" label="Ciudades" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="departments">
          <q-card-section class="q-pb-none">
            <q-btn
              color="primary"
              icon="add"
              label="agregar depatamento"
              @click="dialogDepartment = true"
            />
            <q-dialog v-model="dialogDepartment" persistent>
              <q-card style="width: 450px; max-width: 90vw">
                <q-bar dark class="bg-primary text-white">
                  <q-btn dense flat round icon="list" color="white" />
                  <div class="col text-center text-weight-bold">
                    {{ department.idDepartamento ? 'Editar ' : 'Agregar ' }}
                    departamento
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
                <q-card-section>
                  <q-form
                    @submit="onSubmit"
                    @reset="onReset"
                    class="q-gutter-md"
                    ref="myForm"
                  >
                    <q-input
                      v-model="department.nombreDepartamento"
                      outlined
                      type="text"
                      label="Departamento"
                      :rules="[(val) => !!val || 'Departamento es requerido']"
                    />
                    <div class="row justify-end">
                      <q-btn label="Guardar" type="submit" color="primary" />
                      <q-btn
                        label="Cancelar"
                        type="reset"
                        color="primary"
                        flat
                        class="q-ml-sm"
                      />
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </q-dialog>
          </q-card-section>
          <general-table-component
            :columns="columns"
            :rows="rows"
            :grid="true"
            @on-edit="onEdit"
          />
        </q-tab-panel>

        <q-tab-panel name="cities">
          <q-card-section class="q-pb-none">
            <q-btn
              color="primary"
              icon="add"
              label="agregar ciudad"
              @click="dialogCity = true"
            />
            <q-dialog v-model="dialogCity" persistent>
              <q-card style="width: 450px; max-width: 90vw">
                <q-bar dark class="bg-primary text-white">
                  <q-btn dense flat round icon="list" color="white" />
                  <div class="col text-center text-weight-bold">
                    {{ city.idCiudad ? 'Editar ' : 'Agregar ' }}
                    ciudad
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
                <q-card-section>
                  <q-form
                    @submit="onSubmitCity"
                    @reset="onReset"
                    class="q-gutter-md"
                    ref="myForm"
                  >
                    <q-input
                      v-model="city.nombreCiudad"
                      outlined
                      type="text"
                      label="Ciudad"
                      :rules="[(val) => !!val || 'Ciudad es requerido']"
                    />
                    <q-select
                      v-model="city.fkIdDepartamento"
                      :options="optionDepartment"
                      label="Departamento"
                      outlined
                      map-options
                      emit-value
                      option-value="idDepartamento"
                      option-label="nombreDepartamento"
                      use-input
                      input-debounce="0"
                      @filter="filterDepartment"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                    <div class="row justify-end">
                      <q-btn label="Guardar" type="submit" color="primary" />
                      <q-btn
                        label="Cancelar"
                        type="reset"
                        color="primary"
                        flat
                        class="q-ml-sm"
                      />
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </q-dialog>
          </q-card-section>
          <general-table-component
            :columns="columnsCity"
            :rows="rowsCity"
            :grid="true"
            @on-edit="onEditCity"
          />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { City, Department } from 'src/models/generals.models';
import GeneralTableComponent from 'src/components/general/GeneralTableComponent.vue';
import { get, post } from 'src/requests';
import { controlError } from 'src/helpers/controlError';
import { useQuasar } from 'quasar';

const columns = [
  {
    name: 'idDepartamento',
    label: 'ID DEPARTAMENTO',
    align: 'center',
    sortable: true,
    field: 'idDepartamento',
  },
  {
    name: 'nombreDepartamento',
    label: 'DEPARTAMENTO',
    align: 'center',
    sortable: true,
    field: 'nombreDepartamento',
  },
];

const columnsCity = [
  {
    name: 'idCiudad',
    label: 'ID CIUDAD',
    align: 'center',
    sortable: true,
    field: 'idCiudad',
  },
  {
    name: 'nombreCiudad',
    label: 'CIUDAD',
    align: 'center',
    sortable: true,
    field: 'nombreCiudad',
  },
  {
    name: 'fkIdDepartamento',
    label: 'ID DEPARTAMENTO',
    align: 'center',
    sortable: true,
    field: 'fkIdDepartamento',
  },
];
export default defineComponent({
  name: 'PageDisabilityState',
  components: {
    GeneralTableComponent,
  },
  setup() {
    const $q = useQuasar();
    const rows = ref<Department[]>([]);
    const rowsCity = ref<City[]>([]);
    const isLoading = ref(false);
    const dialogDepartment = ref(false);
    const dialogCity = ref(false);
    const myForm = ref<any>(null);
    const tab = ref('departments');
    const department = ref({
      idDepartamento: 0,
      nombreDepartamento: '',
    });
    const optionDepartment = ref(rows);

    const city = ref({
      idCiudad: 0,
      nombreCiudad: '',
      fkIdDepartamento: 0,
    });

    const getData = async () => {
      isLoading.value = true;
      try {
        const resDeparment = await get
          .getDeparments()
          .then((response) => response.data);
        rows.value = [
          ...resDeparment.map((department) => {
            department.title = department.nombreDepartamento;
            department.btnEdit = true;
            return department;
          }),
        ];

        const resCity = await get.getCity().then((response) => response.data);
        rowsCity.value = [
          ...resCity.map((department) => {
            department.title = department.nombreCiudad;
            department.btnEdit = true;
            department.btnDetail = true;
            return department;
          }),
        ];
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onSubmit = async () => {
      isLoading.value = true;
      try {
        const resDeparment = await post
          .createDepartament(department.value)
          .then((response) => response.data);

        $q.notify({
          message: resDeparment.message,
          type: 'positive',
          position: 'bottom-right',
        });
        setTimeout(() => getData(), 200);
        department.value = {
          idDepartamento: 0,
          nombreDepartamento: '',
        };
        dialogDepartment.value = false;
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onSubmitCity = async () => {
      isLoading.value = true;
      try {
        const resCity = await post
          .createCity(city.value)
          .then((response) => response.data);

        $q.notify({
          message: resCity.message,
          type: 'positive',
          position: 'bottom-right',
        });
        setTimeout(() => getData(), 200);
        city.value = {
          idCiudad: 0,
          nombreCiudad: '',
          fkIdDepartamento: 0,
        };
        dialogCity.value = false;
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onReset = () => {
      department.value = {
        idDepartamento: 0,
        nombreDepartamento: '',
      };
      city.value = {
        idCiudad: 0,
        nombreCiudad: '',
        fkIdDepartamento: 0,
      };
      myForm.value.resetValidation();
      dialogDepartment.value = false;
      dialogCity.value = false;
    };

    const onEdit = (row: Department) => {
      department.value = row;
      dialogDepartment.value = true;
    };

    const onEditCity = (row: City) => {
      city.value = row;
      dialogCity.value = true;
    };

    // Filter select departamento
    const filterDepartment = (val: string, update: any) => {
      if (val === '') {
        update(() => {
          optionDepartment.value = rows.value;

          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        optionDepartment.value = rows.value.filter(
          (v) => v.nombreDepartamento.toLowerCase().indexOf(needle) > -1
        );
      });
    };

    onMounted(() => getData());

    return {
      columns,
      columnsCity,
      rows,
      rowsCity,
      dialogDepartment,
      dialogCity,
      department,
      myForm,
      tab,
      city,
      optionDepartment,
      onSubmit,
      onSubmitCity,
      onReset,
      onEdit,
      filterDepartment,
      onEditCity,
    };
  },
});
</script>
