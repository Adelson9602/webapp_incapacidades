<template>
  <q-page padding>
    <div class="text-body1 q-pa-md">Datos de prueba, no son reales</div>
    <div class="row">
      <div
        class="col-xs-12 col-sm-6 col-md-3 q-pa-sm"
        v-for="(item, index) in dataDash"
        :key="index"
      >
        <q-card class="card" :class="item.color" flat>
          <q-card-section horizontal>
            <q-card-section class="col-9 q-pt-xs text-white">
              <div class="text-h6 text-weight-light q-mt-sm q-mb-xs">
                {{ item.title }}
              </div>
              <div class="text-h6">Total {{ item.total }}</div>
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
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { get } from 'src/requests';
import { useQuasar, date } from 'quasar';
import { controlError } from 'src/helpers/controlError';

const dataDash = [
  {
    title: 'Aprobadas',
    total: 4,
    icon: 'done',
    color: 'bg-c-yellow',
  },
  {
    title: 'Rechazadas',
    total: 20,
    icon: 'cancel',
    color: 'bg-c-green',
  },
  {
    title: 'En proceso',
    total: 10,
    icon: 'post_add',
    color: 'bg-c-pink',
  },
  {
    title: 'Mis radicaciones',
    total: 34,
    icon: 'topic',
    color: 'bg-c-lite',
  },
];

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup() {
    const $q = useQuasar();
    const data = ref('Bienvenido');

    const getData = async () => {
      $q.loading.show({
        message: 'Obteniendo datos, por favor espere...',
      });
      try {
        const { data } = await get.getDataDashboard();
        console.log(data);
      } catch (error) {
        controlError(error);
      } finally {
        $q.loading.hide();
      }
    };

    onMounted(() => getData());

    return {
      data,
      dataDash,
      date,
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
