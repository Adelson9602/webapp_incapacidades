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
              </section>
            </q-card-section>

            <q-separator vertical />

            <q-card-section
              class="col-xs-12 col-sm-6 col-md-6 column justify-center banner"
            >
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

    const onSubmit = async () => {
      try {
        loading.value = true;
        const { data, headers } = await auth
          .postLogin({
            usuario: +usuario.value,
            password: password.value,
          })
          .then((response) => response);

        let actions: Cliente[] = [];
        data.forEach((empresa) => {
          empresa.label = empresa.nombreSistema;
          empresa.img = empresa.urlLogo;
          empresa.id = empresa.idEmpresa;
          actions.push(empresa);
        });
        $q.bottomSheet({
          // title: 'Por favor, seleccione una empresa',
          message: 'Por favor, seleccione una empresa',
          grid: true,
          actions,
        }).onOk((action: Cliente) => {
          LocalStorage.set(
            'dataUsuario',
            encryptJSON(JSON.parse(JSON.stringify(action)))
          );
          LocalStorage.set('token', headers['auth-token']);
          api.defaults.headers.common['x-access-token'] = headers['auth-token'];
          api.defaults.headers.common['base'] = action.nombreBase;

          router.push('inicio');
          $q.notify({
            message: 'Bienvenido',
            type: 'positive',
            position: 'bottom-right',
          });
        });
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

    return {
      lorem:
        'La plataforma en líena para el control y gestión de procesos administrativos de tu empresa.',
      usuario,
      password,
      isPwd: ref(false),
      onSubmit,
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


@media (max-width: 600px)
  .card-login
    background: transparent
    box-shadow: none
</style>
