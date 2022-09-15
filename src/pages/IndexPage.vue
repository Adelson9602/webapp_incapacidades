<template>
  <q-page class="row items-center justify-evenly">
    <h1>{{ data }}</h1>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup() {
    const data = ref('Bienvenido');
    return {
      data,
    };
  },
});
</script>
