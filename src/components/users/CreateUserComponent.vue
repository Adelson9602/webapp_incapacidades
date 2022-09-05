<template>
  <div>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-form @submit="onSubmit" class="q-gutter-md" v-show="isVisibleForm">
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
            <q-input
              v-model="person.primerNombre"
              type="text"
              label="Primer nombre"
              filled
            />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
            <q-input
              v-model="person.segundoNombre"
              type="text"
              label="Segundo nombre"
              filled
            />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
            <q-input
              v-model="person.primerApellido"
              type="text"
              label="Primer apellido"
              filled
            />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
            <q-input
              v-model="person.segundoApellido"
              type="text"
              label="Segundo apellido"
              filled
            />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
            <q-select
              filled
              v-model="person.fkIdTipoDocumento"
              :options="optionsDocumentTypes"
              label="Tipo documento"
              option-label="nombreTipoDocumento"
              option-value="idRol"
              map-options
              emit-value
            />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
            <q-input
              v-model="person.documentoPersona"
              type="text"
              label="Número documento"
              filled
              mask="#################"
            />
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
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
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
              v-model="person.genero"
              :options="optionsGenres"
              label="Género"
              map-options
              emit-value
            />
          </div>
        </div>
        <div class="text-h6 q-pa-sm">Datos de la cuenta</div>
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
            <q-select
              v-model="person.fkIdRol"
              :options="optionsRoles"
              label="Rol"
              filled
              option-label="nombreRol"
              option-value="idTipoDocumento"
            />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
            <q-input
              v-model="person.documentoPersona"
              type="text"
              label="Usuario"
              readonly
              filled
              hint="El documento será el usuario"
            />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
            <q-input
              v-model="person.password"
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
              v-model="confirmPassword"
              :type="isPwd ? 'password' : 'text'"
              label="Confirmar contraseña"
              filled
              :rules="[(val) => !!val || 'Confirme la constraseña']"
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
            <q-select
              v-model="person.estadoUsuario"
              :options="optionsEstado"
              label="Estado"
              filled
              map-options
              emit-value
            />
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
    </transition>

    <q-inner-loading :showing="isLoading" class="full-height full-width">
      <q-spinner-gears size="100px" color="primary" />
      <p class="text-grey-6 text-body1">Por favor espere....</p>
    </q-inner-loading>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { get, post } from 'src/requests';
import { useQuasar } from 'quasar';
import { Roles } from 'src/models/get.model';
import { CreateUser } from 'src/models/post.models';
export default defineComponent({
  name: 'ComponentCreateUser',
  setup() {
    const $q = useQuasar();
    const text = ref('');
    const isPwd = ref(false);
    const isLoading = ref(false);
    const isVisibleForm = ref(false);
    const optionsRoles = ref<Roles[]>();
    const optionsDocumentTypes = ref<Roles[]>();
    const confirmPassword = ref<string>('');
    const person = ref<CreateUser>({
      documentoPersona: 0,
      fechaNacimiento: '',
      fkIdTipoDocumento: 0,
      genero: '',
      primerApellido: '',
      primerNombre: '',
      segundoApellido: '',
      segundoNombre: '',
      password: '',
      usuario: 0,
      estadoUsuario: 1,
      fkIdRol: 0,
      fotoPerfil: 'foto perfil',
    });

    const getData = async () => {
      isLoading.value = true;
      isVisibleForm.value = false;
      try {
        const resRols = await get.getRols().then((response) => response.data);
        optionsRoles.value = [...resRols];

        const resDocuments = await get
          .getDocumentsType()
          .then((response: any) => response.data);
        optionsDocumentTypes.value = [...resDocuments];

        isVisibleForm.value = true;
      } catch (error: any) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onSubmit = async () => {
      isLoading.value = true;
      try {
        const resCreate = await post
          .createUser(person.value)
          .then((response) => response.data);

        $q.notify({
          message: resCreate.message,
          type: 'positive',
          position: 'bottom-right',
        });
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
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
      optionsEstado: [
        {
          label: 'Activo',
          value: 1,
        },
        {
          label: 'Inactivo',
          value: 0,
        },
      ],
      optionsRoles,
      optionsDocumentTypes,
      isPwd,
      isLoading,
      isVisibleForm,
      person,
      confirmPassword,
      onSubmit,
    };
  },
});
</script>
