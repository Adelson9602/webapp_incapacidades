<template>
  <div>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-form @submit="onSubmit" class="q-gutter-md">
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
            <q-input
              v-model="person.primerNombre"
              type="text"
              label="Primer nombre"
              filled
              @update:model-value="
                (val) => {
                  person.primerNombre = `${val}`.toUpperCase();
                }
              "
            />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
            <q-input
              v-model="person.segundoNombre"
              type="text"
              label="Segundo nombre"
              filled
              @update:model-value="
                (val) => {
                  person.segundoNombre = `${val}`.toUpperCase();
                }
              "
            />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
            <q-input
              v-model="person.primerApellido"
              type="text"
              label="Primer apellido"
              filled
              @update:model-value="
                (val) => {
                  person.primerApellido = `${val}`.toUpperCase();
                }
              "
            />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
            <q-input
              v-model="person.segundoApellido"
              type="text"
              label="Segundo apellido"
              filled
              @update:model-value="
                (val) => {
                  person.segundoApellido = `${val}`.toUpperCase();
                }
              "
            />
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
            <q-select
              filled
              v-model="person.fkIdTipoDocumento"
              :options="optionsDocumentTypes"
              label="Tipo documento"
              option-label="nombreTipoDocumento"
              option-value="idTipoDocumento"
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
              v-model="person.fechaNacimiento"
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
                    <q-date v-model="person.fechaNacimiento">
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
              option-value="idRol"
              map-options
              emit-value
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
          <!-- <q-btn
            label="Limpiar formulario"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          /> -->
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
import { defineComponent, ref, onMounted, PropType, toRefs } from 'vue';
import { get, post } from 'src/requests';
import { useQuasar } from 'quasar';
import { UserData, Rols } from 'src/models/generals.models';
import { controlError } from 'src/helpers/controlError';
import { decryptedAES } from 'src/helpers/encrypt';
export default defineComponent({
  name: 'ComponentCreateUser',
  emits: ['onReload'],
  props: {
    userEdit: Object as PropType<UserData>,
  },
  setup(props, { emit }) {
    const $q = useQuasar();
    const isPwd = ref(true);
    const isLoading = ref(false);
    const optionsRoles = ref<Rols[]>();
    const optionsDocumentTypes = ref<Rols[]>();
    const confirmPassword = ref<string>('');
    const { userEdit } = toRefs(props);
    const person = ref<UserData>({
      documentoPersona: null,
      fechaNacimiento: '',
      fkIdTipoDocumento: null,
      genero: '',
      primerApellido: '',
      primerNombre: '',
      segundoApellido: '',
      segundoNombre: '',
      password: '',
      usuario: null,
      estadoUsuario: 1,
      fkIdRol: null,
      fotoPerfil: '',
    });

    const getData = async () => {
      isLoading.value = true;
      try {
        person.value.fotoPerfil = `https://ui-avatars.com/api/?name=${person.value.primerNombre}&background=00ab55&color=fff&rounded=true`;
        const resRols = await get.getRols().then((response) => response.data);
        optionsRoles.value = [...resRols];

        const resDocuments = await get
          .getDocumentsType()
          .then((response: any) => response.data);
        optionsDocumentTypes.value = [...resDocuments];
        if (userEdit.value) {
          assingData(userEdit.value);
        }
      } catch (error: any) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    };

    const onSubmit = async () => {
      isLoading.value = true;
      try {
        person.value.usuario = person.value.documentoPersona;
        const resCreate = await post
          .createUser(person.value)
          .then((response) => response.data);

        $q.notify({
          message: resCreate.message,
          type: 'positive',
          position: 'bottom-right',
        });

        emit('onReload');
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    const assingData = (data: UserData) => {
      person.value = {
        documentoPersona: data.documentoPersona,
        fechaNacimiento: data.fechaNacimiento,
        fkIdTipoDocumento: data.fkIdTipoDocumento,
        genero: data.genero,
        primerApellido: data.primerApellido,
        primerNombre: data.primerNombre,
        segundoApellido: data.segundoApellido,
        segundoNombre: data.segundoNombre,
        password: decryptedAES(decryptedAES(data.password)),
        usuario: data.usuario,
        estadoUsuario: data.estadoUsuario,
        fkIdRol: data.fkIdRol,
        fotoPerfil: data.fotoPerfil,
      };
      confirmPassword.value = decryptedAES(decryptedAES(data.password));
    };

    onMounted(() => {
      getData();
    });

    return {
      optionsGenres: [
        {
          label: 'MASCULINO',
          value: 'M',
        },
        {
          label: 'FEMENINO',
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
      person,
      confirmPassword,
      onSubmit,
    };
  },
});
</script>
