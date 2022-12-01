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
        <q-tab name="companies" label="Empresas" />
        <q-tab name="add_company" label="Agregar empresa" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="companies">
          <general-table-component
            :columns="columns"
            :rows="rows"
            @onEdit="onEdit"
            @onDetail="onDetail"
            :grid="true"
          />

          <q-dialog v-model="dialogDetail" persistent>
            <q-card style="width: 720px; max-width: 90vw">
              <q-bar dark class="bg-primary text-white">
                <q-icon dense round name="list" color="white" />
                <div class="col text-center text-weight-bold">
                  Detalle de {{ company?.razonSocial }}
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

        <q-tab-panel name="add_company">
          <create-company-component
            @on-reload="onReload"
            :company-edit="company"
          />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { get } from 'src/requests';
import { InformationCompany } from 'src/models/generals.models';
import { controlError } from 'src/helpers/controlError';
import GeneralTableComponent from 'src/components/general/GeneralTableComponent.vue';
import CreateCompanyComponent from 'src/components/company/CreateCompanyComponent.vue';
import { QTableColumn } from 'quasar';

const columns: QTableColumn[] = [
  {
    name: 'nit',
    align: 'center',
    label: 'NIT',
    sortable: true,
    field: 'nit',
  },
  {
    name: 'razonSocial',
    align: 'center',
    label: 'RAZÓN SOCIAL',
    sortable: true,
    field: 'razonSocial',
  },
  {
    name: 'nombreTipoEmpresa',
    align: 'center',
    label: 'TIPO EMPRESA',
    sortable: true,
    field: 'nombreTipoEmpresa',
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
    name: 'telefonoFijo',
    align: 'center',
    label: 'TELÉFONO',
    sortable: true,
    field: 'telefonoFijo',
  },
  {
    name: 'direccion',
    align: 'center',
    label: 'DIRECCIÓN',
    sortable: true,
    field: 'direccion',
  },
];

export default defineComponent({
  name: 'CompanyPage',
  components: {
    GeneralTableComponent,
    CreateCompanyComponent,
  },
  setup() {
    const tab = ref('companies');
    const rows = ref<InformationCompany[]>();
    const company = ref<InformationCompany>();
    const companyDetail = ref<any>();
    const dialogDetail = ref(false);

    const getData = async () => {
      try {
        const resCompnaies = await get
          .getCompanies()
          .then((response) => response.data);

        rows.value = [
          ...resCompnaies.map((c) => {
            c.btnDetail = true;
            c.btnEdit = true;
            c.title = c.razonSocial;
            return c;
          }),
        ];
      } catch (error) {
        controlError(error);
      }
    };

    const onReload = () => {
      tab.value = 'companies';
      setTimeout(() => getData(), 300);
    };

    const onEdit = (row: InformationCompany) => {
      company.value = row;
      tab.value = 'add_company';
    };

    const onDetail = (row: InformationCompany) => {
      companyDetail.value = {
        NIT: row.nit,
        'RAZÓN SOCIAL': row.razonSocial,
        'TIPO EMPRESA': row.nombreTipoEmpresa,
        DIRECCIÓN: row.direccion,
        BARRIO: row.barrio,
        CORREO: row.correo,
        CELULAR: row.celular,
        TELÉFONO: row.telefonoFijo,
        CIUDAD: row.nombreCiudad,
        DEPARTAMENTO: row.nombreDepartamento,
      };
      company.value = row;
      dialogDetail.value = true;
    };

    onMounted(() => getData());

    return {
      tab,
      columns,
      rows,
      company,
      dialogDetail,
      companyDetail,
      onReload,
      onEdit,
      onDetail,
    };
  },
});
</script>
