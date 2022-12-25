<template>
  <div>
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-form @submit="onSubmit" class="q-gutter-md" ref="formUser">
        <q-stepper v-model="step" ref="stepper" color="primary" animated flat>
          <q-step
            :name="1"
            title="Datos de usuario"
            icon="person"
            :done="step > 1"
          >
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
                  :rules="[(val) => !!val || 'Primer nombre es requerido']"
                  hide-bottom-space
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
                  :rules="[(val) => !!val || 'Primer apellido es requerido']"
                  hide-bottom-space
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
                  :rules="[(val) => !!val || 'Tipo de documento es requerido']"
                  hide-bottom-space
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
                <q-input
                  v-model="person.documentoPersona"
                  type="text"
                  label="Número documento"
                  filled
                  mask="#################"
                  :rules="[
                    (val) => !!val || 'Número de documento es requerido',
                  ]"
                  hide-bottom-space
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
                <q-input
                  filled
                  v-model="person.fechaNacimiento"
                  mask="date"
                  :rules="['date']"
                  label="Fecha nacimiento"
                  hide-bottom-space
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
                  :rules="[(val) => !!val || 'Género es requerido']"
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
                  :rules="[(val) => !!val || 'Rol es requerido']"
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
                  :rules="[(val) => !!val || 'Contraseña es requerido']"
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
                  :rules="[
                    (val) => !!val || 'Confirme la constraseña',
                    (val) =>
                      val == person.password || 'Las contraseñas no coinciden',
                  ]"
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
          </q-step>

          <q-step
            :name="2"
            title="Permisos de usuario"
            icon="format_list_bulleted"
            :done="step > 2"
          >
            <div class="row">
              <div class="col-xs-12 q-pa-sm">
                <div class="text-h6">Módulos del sistema</div>
                <q-list bordered class="rounded-borders">
                  <q-expansion-item
                    expand-separator
                    :label="item.modulo"
                    v-for="(item, key) in permissionsByRol"
                    :key="key"
                    :default-opened="key == 0 ? true : false"
                  >
                    <q-card>
                      <q-card-section class="row">
                        <div
                          class="col-xs-12 col-sm-6 q-pa-sm"
                          v-for="(sbItem, sbKey) in item.items"
                          :key="sbKey"
                        >
                          <q-list dense bordered>
                            <q-item>
                              <q-item-section>
                                <q-checkbox
                                  v-model="sbItem.selected"
                                  :label="sbItem.text"
                                />
                                <div class="q-px-md">
                                  <div
                                    class="text-body2"
                                    v-if="sbItem.selected"
                                  >
                                    Acciones para el usuario
                                  </div>
                                  <div
                                    class="q-gutter-sm"
                                    v-if="sbItem.selected"
                                  >
                                    <q-checkbox
                                      v-model="sbItem.actions.leer"
                                      label="Leer"
                                    />
                                    <q-checkbox
                                      v-model="sbItem.actions.insert"
                                      label="Crear"
                                    />
                                    <q-checkbox
                                      v-model="sbItem.actions.update"
                                      label="Actualizar"
                                    />
                                    <q-checkbox
                                      v-model="sbItem.actions.borrar"
                                      label="Eliminar"
                                    />
                                  </div>
                                </div>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-list>
              </div>
            </div>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                :label="step == 1 ? 'Continuar' : 'Crear usuario'"
                type="submit"
                color="primary"
              />
              <!-- <q-btn
                v-if="step > 1"
                flat
                color="primary"
                @click="$refs.stepper.previous()"
                label="Back"
                class="q-ml-sm"
              /> -->
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </q-form>
    </transition>

    <q-inner-loading :showing="isLoading" class="full-height full-width">
      <q-spinner-gears size="100px" color="primary" />
      <p class="text-grey-6 text-body1">Por favor espere....</p>
    </q-inner-loading>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType, toRefs, watch } from 'vue';
import { get, post } from 'src/requests';
import { useQuasar } from 'quasar';
import { UserData, Rols, Modulo, Item } from 'src/models/generals.models';
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
    const step = ref(1);
    const stepper = ref();
    const formUser = ref();
    const permissionsByRol = ref<Modulo[]>([]);

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

    const onSubmit = () => {
      formUser.value.validate().then(async (success: boolean) => {
        if (success) {
          if (step.value == 2) {
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
          } else {
            stepper.value.next();
          }
        }
      });
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

    watch(
      () => person.value.fkIdRol,
      async (value) => {
        if (value) {
          $q.loading.show({
            message: 'Obteniendo permisos, por favor espere...',
          });
          try {
            const { data } = await get.getPermissionsByRol(value);
            permissionsByRol.value = [
              ...data.map((e) => {
                e.items.forEach((i) => {
                  i.selected = false;
                });
                return e;
              }),
            ];
            console.log(permissionsByRol.value);
          } catch (error) {
            controlError(error);
          } finally {
            $q.loading.hide();
          }
        }
      }
    );

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
      step,
      stepper,
      formUser,
      value: ref(false),
      value1: ref(false),
      permissionsByRol,
      onSubmit,
    };
  },
});
</script>
