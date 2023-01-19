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
                  <q-item-label caption lines="2" v-if="!isEdit">
                    {{ accountData?.nitEmpresa }}
                  </q-item-label>
                  <q-input
                    v-model="accountData.nitEmpresa"
                    type="text"
                    v-else
                    dense
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Razón social</q-item-label>
                  <q-item-label caption lines="2" v-if="!isEdit">
                    {{ accountData?.razonSocial }}
                  </q-item-label>
                  <q-input
                    v-model="accountData.razonSocial"
                    type="text"
                    v-else
                    dense
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Nombre sistema</q-item-label>
                  <q-item-label caption lines="2" v-if="!isEdit">
                    {{ accountData?.nombreSistema }}
                  </q-item-label>
                  <q-input
                    v-model="accountData.nombreSistema"
                    type="text"
                    v-else
                    dense
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Dirección</q-item-label>
                  <q-item-label caption lines="2" v-if="!isEdit">
                    {{ accountData?.direccion }}
                  </q-item-label>
                  <q-input
                    v-model="accountData.direccion"
                    type="text"
                    v-else
                    dense
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Email</q-item-label>
                  <q-item-label caption lines="2" v-if="!isEdit">
                    {{ accountData?.email }}
                  </q-item-label>
                  <q-input
                    v-model="accountData.email"
                    type="text"
                    v-else
                    dense
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Teléfono</q-item-label>
                  <q-item-label caption lines="2" v-if="!isEdit">
                    {{ accountData?.telefono }}
                  </q-item-label>
                  <q-input
                    v-model="accountData.telefono"
                    type="text"
                    v-else
                    dense
                  />
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
              <q-separator />
              <q-item>
                <q-item-section>
                  <q-item-label>Salario mínimo para este sistema</q-item-label>
                  <q-item-label caption lines="2" v-if="!isEdit">
                    {{ minimumSalary }}
                  </q-item-label>
                  <q-input v-model="minimumSalary" type="number" v-else dense />
                </q-item-section>
              </q-item>
              <q-item class="row justify-end q-gutter-md">
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
                />
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-8 q-pa-md">
        <!-- content -->
        <q-card class="card-profile shadow-1">
          <q-bar dark class="bg-white text-black">
            <div class="col text-center text-weight-bold">Datos de usuario</div>
          </q-bar>
          <q-separator />
          <q-card-section class="row justify-center">
            <div class="container-photo">
              <img :src="dataUser.fotoPerfil" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label>Primer nombre</q-item-label>
                  <q-item-label caption lines="2" v-if="!isEdit">
                    {{ dataUser?.primerNombre }}
                  </q-item-label>
                  <q-input
                    v-model="dataUser.primerNombre"
                    type="text"
                    v-else
                    dense
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Segundo nombre</q-item-label>
                  <q-item-label caption lines="2" v-if="!isEdit">
                    {{ dataUser?.segundoNombre }}
                  </q-item-label>
                  <q-input
                    v-model="dataUser.segundoNombre"
                    type="text"
                    v-else
                    dense
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Primer apellido</q-item-label>
                  <q-item-label caption lines="2" v-if="!isEdit">
                    {{ dataUser?.primerApellido }}
                  </q-item-label>
                  <q-input
                    v-model="dataUser.primerApellido"
                    type="text"
                    v-else
                    dense
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Segundo apellido</q-item-label>
                  <q-item-label caption lines="2" v-if="!isEdit">
                    {{ dataUser?.segundoApellido }}
                  </q-item-label>
                  <q-input
                    v-model="dataUser.segundoApellido"
                    type="text"
                    v-else
                    dense
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Tipo documento</q-item-label>
                  <q-item-label caption lines="2" v-if="!isEdit">
                    {{ dataUser?.fkIdTipoDocumento }}
                  </q-item-label>
                  <q-input
                    v-model="dataUser.fkIdTipoDocumento"
                    type="text"
                    v-else
                    dense
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Número documento</q-item-label>
                  <q-item-label caption lines="2" v-if="!isEdit">
                    {{ dataUser?.documentoPersona }}
                  </q-item-label>
                  <q-input
                    v-model="dataUser.documentoPersona"
                    type="text"
                    v-else
                    dense
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Género</q-item-label>
                  <q-item-label caption lines="2" v-if="!isEdit">
                    {{ dataUser?.genero }}
                  </q-item-label>
                  <q-input v-model="dataUser.genero" type="text" v-else dense />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Estado</q-item-label>
                  <q-item-label caption lines="2">
                    {{ dataUser?.estadoUsuario ? 'Activo' : 'Inactivo' }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="row justify-end q-gutter-md">
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
                />
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { decryptJSON } from '../helpers/encrypt';
import { useQuasar, LocalStorage } from 'quasar';
import {
  Actions,
  CompanyLogged,
  DataUser,
  Modulo,
} from 'src/models/generals.models';
import { useRouter } from 'vue-router';
import { controlError } from 'src/helpers/controlError';
import { get } from 'src/requests';
export default defineComponent({
  name: 'PageSetting',
  setup() {
    const $q = useQuasar();
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

    const getData = async () => {
      $q.loading.show({
        message: 'Obteniendo datos del servidor, por favor espere...',
      });
      try {
        accountData.value = decryptJSON(
          `${LocalStorage.getItem('dataUsuario')}`
        ) as unknown as CompanyLogged;
        dataUser.value = accountData.value.dataUser;

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
      text: ref(''),
      isEdit: ref(false),
      actions,
      dataUser,
      minimumSalary,
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
