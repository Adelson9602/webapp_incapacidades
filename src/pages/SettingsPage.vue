<template>
  <q-page padding>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4 q-pa-md">
        <q-card class="card-profile" flat>
          <q-card-section class="row justify-center">
            <div class="container-photo">
              <img :src="accountData?.urlLogo" />
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-center text-subtitle2 text-grey-8">
              Razón social
            </div>
            <div class="text-subtitle2 text-center" v-if="!isEdit">
              {{ accountData?.razonSocial }}
            </div>
            <q-input
              v-model="accountData.razonSocial"
              type="text"
              v-else
              dense
            />
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-center text-subtitle2 text-grey-8">
              Nit de la empresa
            </div>
            <div class="text-subtitle2 text-center" v-if="!isEdit">
              {{ accountData?.nitEmpresa }}
            </div>
            <q-input
              v-model="accountData.nitEmpresa"
              type="text"
              v-else
              dense
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-8 q-pa-md">
        <!-- content -->
        <q-card flat>
          <q-card-section>
            <q-list>
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
              <q-item class="row justify-end q-gutter-md">
                <q-btn
                  color="secondary"
                  :icon="isEdit ? 'cancel' : 'edit'"
                  :label="isEdit ? 'Cancelar' : 'Editar'"
                  unelevated
                  @click="isEdit = !isEdit"
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
import { CompanyLogged } from 'src/models/generals.models';
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

    const getData = () => {
      $q.loading.show({
        message: 'Obteniendo datos del servidor, por favor espere...',
      });
      try {
        accountData.value = decryptJSON(
          `${LocalStorage.getItem('dataUsuario')}`
        ) as unknown as CompanyLogged;
      } catch (error) {
        console.log(error);
      } finally {
        $q.loading.hide();
      }
    };

    onMounted(() => {
      getData();
    });

    return {
      accountData,
      text: ref(''),
      isEdit: ref(false),
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
