<template>
  <q-page padding>
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
