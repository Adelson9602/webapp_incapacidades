<template>
  <div>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div v-show="isLoading">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel
        magna eu risus laoreet tristique. Nulla ut fermentum elit, nec consequat
        augue. Morbi et dolor nec metus tincidunt pellentesque. Nullam non
        semper ante. Fusce pellentesque sagittis felis quis porta. Aenean
        condimentum neque sed erat suscipit malesuada. Nulla eget rhoncus enim.
        Duis dictum interdum eros.
      </div>
    </transition>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-input v-model="text" type="text" label="Primer nombre" filled />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-input v-model="text" type="text" label="Segundo nombre" filled />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-input v-model="text" type="text" label="Primer apellido" filled />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-input v-model="text" type="text" label="Segundo apellido" filled />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-select
            filled
            v-model="text"
            :options="options"
            label="Tipo documento"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-input v-model="text" type="text" label="Número documento" filled />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-input
            filled
            v-model="text"
            mask="date"
            :rules="['date']"
            label="Fecha nacimiento"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="text">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-select
            filled
            v-model="text"
            :options="optionsGenres"
            label="Género"
          />
        </div>
      </div>
      <div class="text-h6 q-pa-sm">Datos de la cuenta</div>
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-select v-model="text" :options="options" label="Rol" filled />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-input
            v-model="text"
            type="text"
            label="Usuario"
            readonly
            filled
            hint="El documento será el usuario"
          />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-input
            v-model="text"
            :type="isPwd ? 'password' : 'text'"
            label="Contraseña"
            filled
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility' : 'visibility_off'"
                @click="isPwd = !isPwd"
                class="cursor-pointer"
              />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-input
            v-model="text"
            :type="isPwd ? 'password' : 'text'"
            label="Confirmar contraseña"
            filled
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility' : 'visibility_off'"
                @click="isPwd = !isPwd"
                class="cursor-pointer"
              />
            </template>
          </q-input>
        </div>
      </div>
      <div class="row justify-end">
        <q-btn
          label="Limpiar formulario"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
        <q-btn
          icon="save"
          label="Crear usuario"
          type="submit"
          color="primary"
        />
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { get } from 'src/requests';
import { useQuasar } from 'quasar';
export default defineComponent({
  name: 'ComponentCreateUser',
  setup() {
    const $q = useQuasar();
    const text = ref('');
    const isPwd = ref(false);
    const isLoading = ref(false);

    const getData = async () => {
      isLoading.value = true;
      try {
        const resRols = await get
          .getRols()
          .then((response: any) => response.data);
        console.log(resRols);

        const resDocuments = await get
          .getDocumentsType()
          .then((response: any) => response.data);
        console.log(resDocuments);
      } catch (error) {
        console.error(error);
      }
    };

    const onSubmit = () => {
      console.log('HOla');
    };

    onMounted(() => {
      getData();
    });

    return {
      text,
      options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
      optionsGenres: [
        {
          label: 'Masculino',
          value: 'M',
        },
        {
          label: 'Fémenino',
          value: 'F',
        },
      ],
      isPwd,
      isLoading,
      onSubmit,
    };
  },
});
</script>
