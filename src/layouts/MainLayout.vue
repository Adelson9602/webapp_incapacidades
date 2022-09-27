<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
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
            placeholder="Search"
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
          <q-btn
            round
            dense
            flat
            color="grey-8"
            icon="video_call"
            v-if="$q.screen.gt.sm"
          >
            <q-tooltip>Create a video or post</q-tooltip>
          </q-btn>
          <q-btn
            round
            dense
            flat
            color="grey-8"
            icon="apps"
            v-if="$q.screen.gt.sm"
          >
            <q-tooltip>Apps</q-tooltip>
          </q-btn>
          <q-btn
            round
            dense
            flat
            color="grey-8"
            icon="message"
            v-if="$q.screen.gt.sm"
          >
            <q-tooltip>Messages</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating> 2 </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
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
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            v-for="link in links1"
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

          <q-separator class="q-mt-md q-mb-xs" />

          <q-item-label header class="text-weight-bold text-uppercase">
            PRINCIPALES DEL SISTEMA
          </q-item-label>

          <q-item
            v-for="link in links3"
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

          <q-separator class="q-my-md" />

          <q-item-label header class="text-weight-bold text-uppercase">
            DATOS MAESTROS
          </q-item-label>

          <q-item
            v-for="link in links2"
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

          <q-separator class="q-my-md" />

          <q-item
            v-for="link in links4"
            :key="link.text"
            v-ripple
            clickable
            :to="link.route"
            active-class="custom-color"
            class="item"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-lg" />
          <q-item v-ripple clickable @click="logout">
            <q-item-section avatar>
              <q-icon color="grey" name="logout" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Cerrar sesión</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator class="q-mt-md q-mb-lg" />

          <div class="q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a
                v-for="button in buttons1"
                :key="button.text"
                class="YL__drawer-footer-link"
                href="javascript:void(0)"
              >
                {{ button.text }}
              </a>
            </div>
          </div>
          <div class="q-py-md q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a
                v-for="button in buttons2"
                :key="button.text"
                class="YL__drawer-footer-link"
                href="javascript:void(0)"
              >
                {{ button.text }}
              </a>
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { fabAccusoft } from '@quasar/extras/fontawesome-v6';
import { useQuasar, LocalStorage } from 'quasar';
import { useRouter } from 'vue-router';

export default {
  name: 'MyLayout',
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const leftDrawerOpen = ref(false);
    const search = ref('');
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
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
    return {
      fabAccusoft,
      leftDrawerOpen,
      search,
      links1: [
        { icon: 'home', text: 'Home', route: '/inicio' },
        { icon: 'whatshot', text: 'Usuarios', route: '/users' },
      ],
      links2: [
        { icon: 'admin_panel_settings', text: 'Roles', route: '/rols' },
        { icon: 'folder', text: 'Tipo documentos', route: '/document_type' },
        {
          icon: 'hourglass_empty',
          text: 'Estado incapacidad',
          route: '/disability_state',
        },
        { icon: 'location_on', text: 'Ubicación', route: '/ubication' },
        { icon: 'groups', text: 'Cargos', route: '/position' },
      ],
      links3: [
        {
          icon: 'fa-solid fa-building',
          text: 'Empresas',
          route: 'company',
        },
        { icon: 'local_movies', text: 'Movies & Shows' },
        { icon: 'videogame_asset', text: 'Gaming', route: '' },
        { icon: 'live_tv', text: 'Live', route: '' },
      ],
      links4: [
        { icon: 'settings', text: 'Settings', route: 'settings' },
        { icon: 'flag', text: 'Report history', route: '' },
        { icon: 'help', text: 'Help', route: '' },
        { icon: 'feedback', text: 'Send feedback', route: '' },
      ],
      buttons1: [
        { text: 'About', route: '' },
        { text: 'Press', route: '' },
        { text: 'Copyright', route: '' },
        { text: 'Contact us', route: '' },
        { text: 'Creators', route: '' },
        { text: 'Advertise', route: '' },
        { text: 'Developers', route: '' },
      ],
      buttons2: [
        { text: 'Terms' },
        { text: 'Privacy' },
        { text: 'Policy & Safety' },
        { text: 'Test new features' },
      ],
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
