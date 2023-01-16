<template>
  <q-layout view="hHh LpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <img src="img/logo.png" alt="Logo empresa" class="company-logo" />
          <q-toolbar-title shrink class="text-weight-bold">
            Incapacidades
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="YL__toolbar-input-container row no-wrap">
          <q-input
            dense
            outlined
            square
            v-model="search"
            placeholder="Buscar incapacidad por número de documento"
            class="bg-white col"
          />
          <q-btn
            class="YL__toolbar-input-btn"
            color="grey-3"
            text-color="grey-8"
            icon="search"
            unelevated
          />
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              {{ notifications.filter((i) => i.estado).length }}
            </q-badge>
            <!-- <q-tooltip>Notificaciones</q-tooltip> -->
            <q-menu anchor="top middle" self="bottom middle">
              <q-list style="min-width: 350px; max-width: 90vw">
                <q-item>
                  <q-item-section>
                    <NotificationsComponent :notifications="notifications" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img :src="dataUser.fotoPerfil" />
            </q-avatar>
            <!-- <q-tooltip>Cuenta</q-tooltip> -->
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :width="240"
    >
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <q-scroll-area class="fit">
          <q-list v-for="(item, key) in menu" :key="key">
            <q-item-label
              header
              class="text-weight-bold text-uppercase"
              v-if="item.modulo != 'Inicio'"
            >
              {{ item.modulo }}
            </q-item-label>
            <q-item
              v-for="link in item.items"
              :key="link.text"
              v-ripple
              clickable
              :to="link.route"
            >
              <q-item-section avatar>
                <q-icon color="grey" :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator spaced />
          </q-list>
          <q-list>
            <q-item v-ripple clickable @click="logout">
              <q-item-section avatar>
                <q-icon color="grey" name="logout" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Cerrar sesión</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </transition>
      <q-inner-loading :showing="isLoading" class="full-height full-width">
        <q-spinner-gears size="40px" color="primary" />
        <p class="text-grey-6 text-body1">Por favor espere....</p>
      </q-inner-loading>
    </q-drawer>

    <q-page-container>
      <router-view v-if="isAvaiable" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { useQuasar, LocalStorage } from 'quasar';
import { useRouter } from 'vue-router';
import { controlError } from 'src/helpers/controlError';
import { decryptJSON } from 'src/helpers/encrypt';
import {
  CompanyLogged,
  Modulo,
  Notifications,
} from 'src/models/generals.models';
import { get } from 'src/requests';
import NotificationsComponent from 'src/components/general/NotificationsComponent.vue';

export default {
  name: 'MyLayout',
  components: {
    NotificationsComponent,
  },
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const leftDrawerOpen = ref(false);
    const search = ref('');
    const isLoading = ref(false);
    const { dataUser } = decryptJSON(
      `${$q.localStorage.getItem('dataUsuario')}`
    ) as unknown as CompanyLogged;
    const menu = ref<Modulo[]>([]);
    const isAvaiable = ref(false);
    const notifications = ref<Notifications[]>([]);

    const getData = async () => {
      isLoading.value = true;
      isAvaiable.value = false;
      try {
        const { data } = await get.getPermissions(dataUser.documentoPersona);
        menu.value = [...data];
        LocalStorage.set('permisos', data);
        const resNotification = await get
          .getNotifications(dataUser.usuario)
          .then(({ data }) => data);

        notifications.value = [...resNotification];
        isAvaiable.value = true;
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const logout = () => {
      $q.loading.show({
        message: 'Cerrando sesión...',
      });
      setTimeout(() => {
        LocalStorage.remove('dataUsuario');
        router.push('/login');
        $q.loading.hide();
      }, 1000);
    };

    onMounted(() => getData());

    return {
      leftDrawerOpen,
      search,
      buttons1: [
        { text: 'About', route: '' },
        { text: 'Press', route: '' },
        { text: 'Copyright', route: '' },
        { text: 'Contact us', route: '' },
        { text: 'Creators', route: '' },
        { text: 'Advertise', route: '' },
        { text: 'Developers', route: '' },
      ],
      menu,
      isLoading,
      isAvaiable,
      dataUser,
      notifications,
      toggleLeftDrawer,
      logout,
    };
  },
};
</script>

<style lang="sass" scoped>
.company-logo
  height: 25px
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%
  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
.item
  color: grey
.custom-color
  color: $primary !important
</style>
