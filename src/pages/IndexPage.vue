<template>
  <q-page padding>
    <div class="text-body1 q-pa-md">Aprobadas y Rechazadas, no son reales</div>
    <div class="row">
      <div
        class="col-xs-12 col-sm-6 col-md-3 q-pa-sm"
        v-for="(item, index) in cardsData"
        :key="index"
      >
        <q-card class="card" :class="item.color" flat>
          <q-card-section horizontal>
            <q-card-section class="col-9 q-pt-xs text-white">
              <div class="text-h6 text-weight-light q-mt-sm q-mb-xs">
                {{ item.title }}
              </div>
              <div class="text-h6">{{ item.value }}</div>
            </q-card-section>

            <q-card-section class="col-3 flex flex-center">
              <q-btn color="white" :icon="item.icon" size="md" round outline />
            </q-card-section>
          </q-card-section>

          <q-separator color="white" />

          <q-card-actions>
            <p class="text-overline text-white q-ma-none">
              <q-icon name="history" color="white" size="24px" />
              Actualizado 7:30PM
            </p>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div class="row q-pt-md">
      <div class="col-xs-12 col-md-6">
        <apexchart
          type="bar"
          height="350"
          :options="settingsChart"
          :series="quantityDisabilities"
          v-if="labelStatus.length > 0"
        />
      </div>
      <div class="col-xs-12 col-md-6">
        <apexchart
          type="bar"
          height="350"
          :options="settingsChartCost"
          :series="costDisabilities"
          v-if="labelStatus.length > 0"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { get } from 'src/requests';
import { useQuasar, date } from 'quasar';
import { controlError } from 'src/helpers/controlError';
import VueApexCharts from 'vue3-apexcharts';
import { Cards, ResponseDashboard } from 'src/models/generals.models';

interface DataDashboard {
  nombreEstadoIncapacidad: string;
  numeroIncapacidades: number;
  totalIncapacidades: number;
}

const defaultSettignsChart = {
  chart: {
    height: 350,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: '20%',
      distributed: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    y: {
      formatter: (value: number) => {
        return value;
      },
    },
  },
  yaxis: {
    title: {
      text: 'Cantidad de incapacidades',
    },
    labels: {
      formatter: (value: string) => {
        return value;
      },
    },
  },
  stroke: {
    width: 2,
  },
  grid: {
    row: {
      colors: ['#fff', '#f2f2f2'],
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'horizontal',
      shadeIntensity: 0.25,
      gradientToColors: undefined,
      inverseColors: true,
      opacityFrom: 0.85,
      opacityTo: 0.85,
      stops: [50, 0, 100],
    },
  },
};

export default defineComponent({
  name: 'IndexPage',
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const $q = useQuasar();
    const labelStatus = ref<string[]>([]);
    const settingsChart = ref({
      ...defaultSettignsChart,
      xaxis: {
        labels: {
          // rotate: -45,
          style: {
            fontSize: '9px',
            fontWeight: 400,
          },
        },
        categories: labelStatus.value,
        tickPlacement: 'on',
      },
    });
    const settingsChartCost = ref({
      ...defaultSettignsChart,
      yaxis: {
        title: {
          text: 'Valor de las incapacidades',
        },
        labels: {
          formatter: (value: number) => {
            return new Intl.NumberFormat().format(value) + ' $';
          },
        },
      },
      tooltip: {
        labels: {
          formatter: (value: number) => {
            return new Intl.NumberFormat().format(value) + '$';
          },
        },
      },
      xaxis: {
        labels: {
          // rotate: -45,
          style: {
            fontSize: '9px',
            fontWeight: 400,
          },
        },
        categories: labelStatus.value,
        tickPlacement: 'on',
      },
    });
    // Datos para la grafica de cantidad de incapacidades
    const data1 = ref<number[]>([]);
    const quantityDisabilities = ref([
      {
        name: 'Cantidad',
        data: data1.value,
      },
    ]);
    // Datos para la grafica de costos de incapacidades
    const data2 = ref<number[]>([]);
    const costDisabilities = ref([
      {
        name: 'Valor',
        data: data2.value,
      },
    ]);
    // Tarjetas
    const cardsData = ref<Cards[]>([
      {
        title: 'Aprobadas',
        value: 4,
        icon: 'done',
        color: 'bg-c-yellow',
      },
      {
        title: 'Rechazadas',
        value: 20,
        icon: 'cancel',
        color: 'bg-c-green',
      },
      {
        title: 'Incapacidades registradas',
        value: 10,
        icon: 'post_add',
        color: 'bg-c-pink',
      },
      {
        title: 'Total incapacidades',
        value: 0,
        icon: 'paid',
        color: 'bg-c-lite',
      },
    ]);

    const getData = async () => {
      $q.loading.show({
        message: 'Obteniendo datos, por favor espere...',
      });
      try {
        const { data } = await get.getDataDashboard();
        const {
          totalDisabilitiesByStatus,
          totalDisabilities,
        }: ResponseDashboard = data as unknown as ResponseDashboard;

        cardsData.value[2].value = totalDisabilities.numeroIncapacidades;
        cardsData.value[3].value = new Intl.NumberFormat().format(
          totalDisabilities.totalIncapacidades
        );

        data1.value.length = 0;
        data2.value.length = 0;
        labelStatus.value.length = 0;
        totalDisabilitiesByStatus.forEach((element: DataDashboard) => {
          data1.value.push(element.numeroIncapacidades);
          data2.value.push(element.totalIncapacidades);
          labelStatus.value.push(element.nombreEstadoIncapacidad);
        });
      } catch (error) {
        controlError(error);
      } finally {
        $q.loading.hide();
      }
    };

    onMounted(() => getData());

    return {
      cardsData,
      date,
      quantityDisabilities,
      costDisabilities,
      settingsChart,
      settingsChartCost,
      labelStatus,
    };
  },
});
</script>
<style lang="sass" scoped>
.card
  height: 150px
.bg-c-yellow
  background: linear-gradient(to right,#0ac282,#0df3a3)
.bg-c-green
  background: linear-gradient(to right,#fe5d70,#fe909d)
.bg-c-pink
  background: linear-gradient(to right,#fe9365,#feb798)
.bg-c-lite
  background: linear-gradient(to right,#01a9ac,#01dbdf)
</style>
