import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { LocalStorage } from 'quasar';
import { Cliente } from 'src/models/auth.models';
import { decryptJSON } from 'src/helpers/encrypt';

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.__URLAPI__ });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  const token = LocalStorage.getItem('token') as unknown as string;
  const empresa = decryptJSON(JSON.parse(JSON.stringify(LocalStorage.getItem('dataUsuario')))) as unknown as Cliente;

  api.defaults.headers.common['x-access-token'] = token;
  api.defaults.headers.common['base'] = empresa.nombreBase;

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
