<template>
  <q-page padding>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
        <q-card class="card-profile shadow-1">
          <q-bar dark class="bg-white text-black">
            <div class="col text-center text-weight-bold">Datos de empresa</div>
          </q-bar>
          <q-separator />
          <q-card-section class="row justify-center">
            <div class="container-photo">
              <img :src="accountData?.urlLogo" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label> Nit de la empresa</q-item-label>
                  <q-item-label caption lines="2">
                    {{ accountData?.nitEmpresa }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Razón social</q-item-label>
                  <q-item-label caption lines="2">
                    {{ accountData?.razonSocial }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Nombre sistema</q-item-label>
                  <q-item-label caption lines="2">
                    {{ accountData?.nombreSistema }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Dirección</q-item-label>
                  <q-item-label caption lines="2">
                    {{ accountData?.direccion }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Email</q-item-label>
                  <q-item-label caption lines="2">
                    {{ accountData?.email }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Teléfono</q-item-label>
                  <q-item-label caption lines="2">
                    {{ accountData?.telefono }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Estado</q-item-label>
                  <q-item-label caption lines="2">
                    {{ accountData?.estado ? 'Activo' : 'Inactivo' }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-8 q-pa-md">
        <!-- content -->
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-card class="card-profile shadow-1">
            <q-form @submit="onSubmit">
              <q-bar dark class="bg-white text-black">
                <div class="col text-center text-weight-bold">
                  Datos de usuario
                </div>
              </q-bar>
              <q-separator />
              <q-card-section class="row justify-center">
                <div class="container-photo">
                  <img :src="dataUser.fotoPerfil" />
                </div>
              </q-card-section>
              <q-card-section class="row">
                <div class="col-xs-12 col-sm-6 q-pa-md">
                  <q-input
                    label="Primer nombre"
                    v-model="dataUser.primerNombre"
                    type="text"
                    dense
                    :disable="isEdit ? false : true"
                    :rules="[(val) => !!val || 'Primer nombre es requerido']"
                    hide-bottom-space
                  />
                </div>
                <div class="col-xs-12 col-sm-6 q-pa-md">
                  <q-input
                    label="Segundo nombre"
                    v-model="dataUser.segundoNombre"
                    type="text"
                    dense
                    :disable="isEdit ? false : true"
                  />
                </div>
                <div class="col-xs-12 col-sm-6 q-pa-md">
                  <q-input
                    label="Primer apellido"
                    v-model="dataUser.primerApellido"
                    type="text"
                    dense
                    :disable="isEdit ? false : true"
                    :rules="[(val) => !!val || 'Primer apellido es requerido']"
                    hide-bottom-space
                  />
                </div>
                <div class="col-xs-12 col-sm-6 q-pa-md">
                  <q-input
                    label="Segundo apellido"
                    v-model="dataUser.segundoApellido"
                    type="text"
                    dense
                    :disable="isEdit ? false : true"
                  />
                </div>
                <div class="col-xs-12 col-sm-6 q-pa-md">
                  <q-input
                    label="Número documento"
                    v-model="dataUser.documentoPersona"
                    type="text"
                    dense
                    :disable="isEdit ? false : true"
                    :rules="[(val) => !!val || 'Documento es requerido']"
                    hide-bottom-space
                  />
                </div>
                <div class="col-xs-12 col-sm-6 q-pa-md">
                  <q-input
                    label="Género"
                    v-model="dataUser.genero"
                    type="text"
                    dense
                    :disable="isEdit ? false : true"
                    :rules="[(val) => !!val || 'Género es requerido']"
                    hide-bottom-space
                  />
                </div>
                <div class="col-xs-12 col-sm-6 q-pa-md">
                  <q-input
                    label="Contraseña"
                    v-model="dataUser.password"
                    type="text"
                    dense
                    :disable="isEdit ? false : true"
                    :rules="[(val) => !!val || 'Contraseña es requerido']"
                    hide-bottom-space
                  />
                </div>
                <div class="col-xs-12 col-sm-6 q-pa-md">
                  <q-input
                    label="Repetir contraseña"
                    v-model="repeatPassowrd"
                    type="text"
                    dense
                    :disable="isEdit ? false : true"
                    :rules="[
                      (val) => !!val || 'Contraseña es requerido',
                      (val) =>
                        val === dataUser.password ||
                        'Las contraseñas no coinciden',
                    ]"
                    hide-bottom-space
                  />
                </div>
                <!-- <div class="col-xs-12 col-sm-6 q-pa-sm">
                <q-field label="Estado" stack-label dense>
                  <template v-slot:control>
                    <div class="self-center full-width no-outline" tabindex="0">
                      {{ dataUser?.estadoUsuario ? 'Activo' : 'Inactivo' }}
                    </div>
                  </template>
                </q-field>
              </div> -->
                <div class="col-xs-12 q-pa-md row justify-end q-gutter-x-md">
                  <q-btn
                    color="secondary"
                    :icon="isEdit ? 'cancel' : 'edit'"
                    :label="isEdit ? 'Cancelar' : 'Editar'"
                    unelevated
                    @click="isEdit = !isEdit"
                    v-if="actions.update"
                  />
                  <q-btn
                    v-if="isEdit"
                    color="primary"
                    icon="check"
                    label="Guardar cambios"
                    unelevated
                    type="submit"
                  />
                </div>
              </q-card-section>
            </q-form>
          </q-card>
        </transition>
        <q-inner-loading :showing="isLoading" class="full-height full-width">
          <q-spinner-gears size="100px" color="primary" />
          <p class="text-grey-6 text-body1">Por favor espere....</p>
        </q-inner-loading>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { decryptJSON, encryptJSON } from '../helpers/encrypt';
import { useQuasar, LocalStorage } from 'quasar';
import {
  Actions,
  CompanyLogged,
  DataUser,
  Modulo,
} from 'src/models/generals.models';
import { useRouter } from 'vue-router';
import { controlError } from '../helpers/controlError';
import { decryptedAES } from '../helpers/encrypt';
import { get, put } from 'src/requests';
export default defineComponent({
  name: 'PageSetting',
  setup() {
    const $q = useQuasar();
    const isEdit = ref(false);
    const accountData = ref<CompanyLogged>({
      idEmpresa: 0,
      razonSocial: '',
      nitEmpresa: '',
      nombreSistema: '',
      urlLogo: '',
      nombreBase: '',
      estado: 0,
      direccion: '',
      telefono: '',
      email: '',
      dataUser: {
        usuario: 0,
        password: '',
        fkIdRol: 0,
        estadoUsuario: 0,
        fotoPerfil: '',
        documentoPersona: 0,
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        genero: '',
        fechaNacimiento: '',
        fkIdTipoDocumento: 0,
      },
    });
    const permisos = $q.localStorage.getItem('permisos') as Modulo[];
    const { currentRoute } = useRouter();
    const actions = ref<Actions>({
      borrar: false,
      insert: false,
      leer: false,
      update: false,
    });
    const dataUser = ref<DataUser>({
      usuario: 0,
      password: '',
      fkIdRol: 0,
      estadoUsuario: 0,
      fotoPerfil: '',
      documentoPersona: 0,
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      genero: '',
      fechaNacimiento: '',
      fkIdTipoDocumento: 0,
    });
    const minimumSalary = ref(0);
    const isLoading = ref(false);

    const getData = async () => {
      $q.loading.show({
        message: 'Obteniendo datos del servidor, por favor espere...',
      });
      try {
        accountData.value = decryptJSON(
          `${LocalStorage.getItem('dataUsuario')}`
        ) as unknown as CompanyLogged;

        dataUser.value = {
          ...accountData.value.dataUser,
          password: decryptedAES(accountData.value.dataUser.password),
        };

        const resSalary = await get
          .getSalary()
          .then((response) => response.data);
        minimumSalary.value = resSalary.salarioMinimo;
      } catch (error) {
        controlError(error);
      } finally {
        $q.loading.hide();
      }
    };

    const onSubmit = async () => {
      isLoading.value = true;
      try {
        // Edita información del usuario
        dataUser.value.fotoPerfil = `https://ui-avatars.com/api/?name=${dataUser.value.primerNombre}&background=00ab55&color=fff&rounded=true`;

        const { data } = await put.updateUser(dataUser.value);
        accountData.value.dataUser = { ...data.data };
        LocalStorage.set(
          'dataUsuario',
          encryptJSON(JSON.parse(JSON.stringify(accountData.value)))
        );

        $q.notify({
          message: data.message,
          type: 'positive',
          position: 'bottom-right',
        });
        isEdit.value = false;
        location.reload();
      } catch (error) {
        controlError(error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      getData();

      // Validamos las acciones del usuario, permisos que tiene asignado
      const currentPath = currentRoute.value.path;
      permisos.forEach((p) => {
        const path = p.items.find((i) => i.route == currentPath);
        if (path) {
          actions.value = { ...path.actions };
        }
      });
    });

    return {
      accountData,
      isEdit,
      actions,
      dataUser,
      minimumSalary,
      isPassword: ref(false),
      repeatPassowrd: ref(''),
      isLoading,
      onSubmit,
    };
  },
});
</script>

<style lang="sass" scoped>
img
  border-radius: 50% !important
  height: 170px
  width: 170px
  margin: auto
  object-fit: contain
  padding: 5px

.container-photo
  border: 3px solid $primary
  border-radius: 50%
  height: 176px
  width: 176px
</style>
\
