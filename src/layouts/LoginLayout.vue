<template>
  <q-layout class="layout-login">
    <div class="row justify-center items-center" style="height: 100vh">
      <div class="col-xs-12 col-sm-10 col-md-6">
        <q-card class="card-login border-radius text-center text-weight-light">
          <q-card-section horizontal class="row">
            <q-card-section class="col-xs-12 col-sm-6 col-md-6 form-login">
              <section>
                <div class="text-h6">BIENVENIDO A</div>
                <img
                  src="img/logo.png"
                  alt="Logo empresa"
                  class="company-logo q-my-md"
                />
                <div class="q-mb-xl">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptates vel numquam temporibus in quae
                  </p>
                </div>
              </section>
              <section>
                <!-- Formulario login -->
                <q-form @submit="onSubmit" class="q-gutter-md">
                  <q-input
                    v-model="usuario"
                    outlined
                    rounded
                    dense
                    :rules="[(val) => !!val || 'Ingrese su usuario']"
                    type="text"
                    label="Usuario"
                    mask="############################################"
                    @update:model-value="
                      () => {
                        msgError = '';
                      }
                    "
                  >
                    <template v-slot:prepend>
                      <img src="img/icons/user.png" class="custom-icons" />
                    </template>
                  </q-input>
                  <q-input
                    v-model="password"
                    outlined
                    rounded
                    dense
                    :rules="[(val) => !!val || 'Ingrese su contraseña']"
                    :type="isPwd ? 'password' : 'text'"
                    label="Contraseña"
                    @update:model-value="
                      () => {
                        msgError = '';
                      }
                    "
                  >
                    <template v-slot:prepend>
                      <img src="img/icons/lock.png" class="custom-icons" />
                    </template>
                    <template v-slot:append>
                      <q-icon class="cursor-pointer" @click="isPwd = !isPwd">
                        <img
                          :src="`img/icons/${isPwd ? 'help' : 'close'}.png`"
                          class="custom-icons help_icon"
                        />
                      </q-icon>
                    </template>
                  </q-input>
                  <div class="text-body1 text-negative">{{ msgError }}</div>
                  <div>
                    <q-btn
                      label="Iniciar sesión"
                      type="submit"
                      color="positive"
                      unelevated
                      rounded
                      class="full-width shadow-positive"
                    />
                  </div>
                  <div class="forgot_password">
                    <a href="#" class="q-mt-xl">Recuperar contraseña</a>
                  </div>
                  <q-separator />
                  <p>Siguenos en nuestras redes</p>
                  <div class="q-gutter-sm">
                    <q-btn
                      round
                      color="primary"
                      text-color="white"
                      icon="fa-brands fa-facebook"
                    />
                    <q-btn
                      round
                      text-color="red"
                      icon="fa-brands fa-instagram"
                    />
                    <q-btn
                      round
                      color="blue"
                      text-color="white"
                      icon="fa-brands fa-twitter"
                    />
                  </div>
                </q-form>

                <!-- Dialog para mostrar las empresas en las que esta registrado el usuario -->
                <q-dialog
                  v-model="dialogCompanies"
                  position="bottom"
                  persistent
                >
                  <q-card style="width: 450px; max-width: 90vw">
                    <q-bar dark class="bg-transparent text-black">
                      <div class="col text-center text-weight-bold">
                        Seleccione una empresa
                      </div>
                      <q-btn
                        dense
                        flat
                        icon="minimize"
                        @click="minimize = true"
                      />
                      <q-btn
                        dense
                        flat
                        icon="crop_square"
                        @click="minimize = false"
                      />
                      <q-btn dense flat icon="close" v-close-popup />
                    </q-bar>
                    <q-card-section
                      class="row"
                      :class="minimize ? 'minimize' : ''"
                    >
                      <div
                        class="col-xs-6 col-sm-6 col-md-4 q-pa-sm"
                        v-for="(item, index) in companiesUser"
                        :key="index"
                      >
                        <q-btn
                          class="card-company cursor-pointer"
                          flat
                          @click="onSelection(item)"
                        >
                          <div class="q-py-none">
                            <q-img
                              :src="item.urlLogo"
                              fit="contain"
                              spinner-color="primary"
                              spinner-size="40px"
                              class="img-logo"
                              height="70"
                            />
                          </div>
                          <p
                            class="text-center text-body2 q-pa-none q-ma-none ellipsis-2-lines"
                          >
                            {{ item.razonSocial }}
                          </p>
                        </q-btn>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-dialog>
              </section>
            </q-card-section>

            <q-separator vertical />

            <q-card-section
              class="col-xs-12 col-sm-6 col-md-6 column justify-center banner"
            >
              <!-- Logo y eslogan del sistema -->
              <div class="opacity"></div>
              <img
                src="img/logo_white.png"
                alt="Logo empresa"
                class="company-logo self-center"
              />
              <p class="q-mt-md">{{ lorem }}</p>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-layout>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { controlError } from 'src/helpers/controlError';
import { LocalStorage, useQuasar } from 'quasar';
import { encryptJSON } from '../helpers/encrypt';
import { auth } from '../requests';
import { api } from 'boot/axios';
import { Cliente } from '../models/auth.models';

export default {
  name: 'LayoutLogin',
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const loading = ref(false);
    const usuario = ref<string>('');
    const password = ref<string>('');
    const msgError = ref<string>('');
    const dialogCompanies = ref<boolean>(false);
    const companiesUser = ref<Cliente[]>([]);
    const minimize = ref<boolean>(false);

    // Funcion para hacer login en el sistema
    const onSubmit = async () => {
      try {
        loading.value = true;
        const { data, headers } = await auth
          .postLogin({
            usuario: +usuario.value,
            password: password.value,
          })
          .then((response) => response);

        companiesUser.value = [...data];
        LocalStorage.set('token', headers['auth-token']);
        api.defaults.headers.common['x-access-token'] = headers['auth-token'];

        dialogCompanies.value = true;
      } catch (error: any) {
        if (error.response && error.response.status == 401) {
          return (msgError.value = error.response.data.message);
        }
        error.response ? (error.message = error.response.data.message) : error;
        controlError(error);
      } finally {
        loading.value = false;
      }
    };

    const onSelection = (company: Cliente) => {
      LocalStorage.set(
        'dataUsuario',
        encryptJSON(JSON.parse(JSON.stringify(company)))
      );
      api.defaults.headers.common['base'] = company.nombreBase;

      router.push('inicio');
      $q.notify({
        message: 'Bienvenido',
        type: 'positive',
        position: 'bottom-right',
      });
    };

    return {
      lorem:
        'La plataforma en líena para el control y gestión de procesos administrativos de tu empresa.',
      usuario,
      password,
      msgError,
      isPwd: ref(false),
      dialogCompanies,
      companiesUser,
      minimize,
      onSubmit,
      onSelection,
    };
  },
};
</script>
<style scoped lang="sass">
.layout-login
  background-image: url("img/banner_login.jpg")
  /* object-fit: cover */
  position: fixed

.form-login
  padding: 8%

.company-logo
  height: 50px

.banner
  background-image: url("img/banner_login2.jpg")
  background-position: center
  background-size: cover
  color: #fff
  font-weight: bold
  z-index: 1000

.opacity
  content: ""
  width: 100%
  height: 100%
  background-color: #40c25ec9
  position: absolute
  left: -0px
  z-index: -1000
  border-bottom-right-radius: 20px
  border-top-right-radius: 20px
  opacity: 0.4
  color: white

.help_icon
  height: 17px
  width: 17px

.forgot_password a
  text-decoration: none


.forgot_password a:hover
  color: #40c25ec9
  font-weight: bold

.card-company
  height: 130px
  &
    .img-logo
      height: 40px
      width: 80px

.minimize
  display: none
  overflow: hidden

@media (max-width: 600px)
  .card-login
    background: transparent
    box-shadow: none
</style>
