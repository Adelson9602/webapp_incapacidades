<template>
  <q-page padding>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
        <q-card class="card-profile" flat>
          <q-card-section class="row justify-center">
            <div class="container-photo">
              <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-center">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-center">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-8 q-pa-md">
        <!-- content -->
        <q-list bordered>
          <q-item
            clickable
            v-ripple
            v-for="(item, index) in accountData"
            :key="index"
          >
            <q-item-section>
              <q-item-label>{{ index }}</q-item-label>
              <q-item-label caption lines="2">{{ item }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { decryptJSON } from '../helpers/encrypt';
import { useQuasar, LocalStorage } from 'quasar';
export default defineComponent({
  name: 'PageSetting',
  setup() {
    const $q = useQuasar();
    const accountData = ref(
      decryptJSON(LocalStorage.getItem('dataUsuario') || '')
    );

    const getData = () => {
      $q.loading.show({
        message: 'Obteniendo datos del servidor, por favor espere...',
      });
      try {
        console.log(accountData.value);
      } catch (error) {
        console.log(error);
      } finally {
        $q.loading.hide();
      }
    };

    onMounted(() => {
      getData();
    });

    return {
      accountData,
    };
  },
});
</script>

<style lang="sass" scoped>
img
  border-radius: 50% !important
  height: 170px
  width: 170px
  margin: auto

.container-photo
  border: 3px solid $primary
  border-radius: 50%
  height: 176px
  width: 176px
</style>
