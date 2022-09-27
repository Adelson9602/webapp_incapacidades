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
            :grid="true"
          />
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

const columns = [
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

    onMounted(() => getData());

    return {
      tab,
      columns,
      rows,
      company,
      onReload,
      onEdit,
    };
  },
});
</script>
