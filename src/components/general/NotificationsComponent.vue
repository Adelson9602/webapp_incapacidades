<template>
  <q-tabs
    v-model="tabNotifcation"
    dense
    class="text-grey"
    active-color="primary"
    indicator-color="primary"
    align="justify"
    narrow-indicator
    no-caps
  >
    <q-tab name="alls" label="Todas" />
    <q-tab name="read" label="Leídas" />
    <q-tab name="unread" label="No leídas" />
  </q-tabs>

  <q-separator />
  <q-tab-panels v-model="tabNotifcation" animated>
    <q-tab-panel name="alls">
      <q-virtual-scroll
        style="height: 300px"
        :items="notifications"
        separator
        v-slot="{ item, index }"
      >
        <q-item clickable :key="index" @click="readNotification(item)">
          <q-tooltip>
            {{ item.estado ? 'Marcar como leído' : 'Marcar como no leído' }}
          </q-tooltip>
          <q-item-section>{{ item.mensaje }}</q-item-section>
          <q-item-section avatar v-if="item.estado">
            <div class="text-grey-8 q-gutter-xs">
              <q-icon name="lens" size="15px" color="primary" />
            </div>
          </q-item-section>
        </q-item>
      </q-virtual-scroll>
    </q-tab-panel>

    <q-tab-panel name="read">
      <q-virtual-scroll
        style="max-height: 300px"
        :items="notifications.filter((i) => !i.estado)"
        separator
        v-slot="{ item, index }"
      >
        <q-item clickable :key="index" @click="readNotification(item)">
          <q-tooltip>
            {{ item.estado ? 'Marcar como leído' : 'Marcar como no leído' }}
          </q-tooltip>
          <q-item-section>{{ item.mensaje }} </q-item-section>
          <q-item-section avatar v-if="item.estado">
            <div class="text-grey-8 q-gutter-xs">
              <q-icon name="lens" size="15px" color="primary" />
            </div>
          </q-item-section>
        </q-item>
      </q-virtual-scroll>
    </q-tab-panel>

    <q-tab-panel name="unread">
      <q-virtual-scroll
        style="max-height: 300px"
        :items="notifications.filter((i) => i.estado)"
        separator
        v-slot="{ item, index }"
      >
        <q-item clickable :key="index" @click="readNotification(item)">
          <q-tooltip>
            {{ item.estado ? 'Marcar como leído' : 'Marcar como no leído' }}
          </q-tooltip>
          <q-item-section>{{ item.mensaje }}</q-item-section>
          <q-item-section avatar v-if="item.estado">
            <div class="text-grey-8 q-gutter-xs">
              <q-icon name="lens" size="15px" color="primary" />
            </div>
          </q-item-section>
        </q-item>
      </q-virtual-scroll>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { PropType, ref } from 'vue';
import { Notifications } from 'src/models/generals.models';
import { controlError } from 'src/helpers/controlError';
import { put } from 'src/requests';
// import { useRouter } from 'vue-router';

export default {
  props: {
    notifications: {
      required: true,
      type: Array as PropType<Notifications[]>,
    },
  },
  setup() {
    const $q = useQuasar();
    const isLoading = ref(false);

    const readNotification = async (notification: Notifications) => {
      try {
        const estado = notification.estado ? 0 : 1;
        notification.estado = estado;
        const { data } = await put.updateStateNotification({
          estado: estado,
          idNotificacion: notification.idNotificacion,
        });

        $q.notify({
          message: data.message,
          type: 'positive',
          position: 'bottom-right',
        });
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };
    return {
      tabNotifcation: ref('alls'),
      readNotification,
    };
  },
};
</script>

<style lang="sass"></style>
