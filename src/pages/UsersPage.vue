<template>
  <q-page padding>
    <!-- content -->
    <q-card class="my-card" flat>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="users" label="Usuarios" />
        <q-tab name="createUser" label="Crear usuario" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="users">
          <general-table-component />
        </q-tab-panel>
        <q-tab-panel name="createUser">
          <create-user-component />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import GeneralTableComponent from 'components/general/GeneralTableComponent.vue';
import CreateUserComponent from 'components/users/CreateUserComponent.vue';

export default defineComponent({
  name: 'PageUsers',
  components: {
    GeneralTableComponent,
    CreateUserComponent,
  },
  setup() {
    const tab = ref('users');
    return {
      tab,
    };
  },
});
</script>
