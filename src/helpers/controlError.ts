import { Notify } from 'quasar';
import { Dialog, Loading, LocalStorage } from 'quasar';
/* eslint-disable */
const controlError = (e: any) => {
  let icon = 'error';
  let type = 'negative';
  console.error(e);
  if (e.message) {
    if(e.response){
      e.message = e.response.data.message
      console.error(e.response)
      console.error(e.response.data)
      e.message = e.response.data.message
      if(e.response.status === 401){
        // validación aplica para cuando el token ha expirado
        Dialog.create({
          title: 'Sesión expirada',
          message: 'Su sesión ha expirado, por favor inicie sesión nuevamente'
        }).onOk(() => {
          Loading.show({
            message: 'Cerrando sesión...',
          });
          setTimeout(() => {
            LocalStorage.remove('dataUsuario');
            LocalStorage.remove('token');
            Loading.hide();
            location.reload()
          }, 1000);
        })
      }
    } else if (e.message === 'Network Error') {
      e.message = 'Error de conexión';
      icon = 'signal_wifi_statusbar_connected_no_internet_4';
      type = 'warning';
    } else if (e.message === 'Request failed with status code 404') {
      e.message = 'Error: Servicio solicitado no existe, código 404';
      type = 'warning';
    } else if (e.message.includes('is not defined')) {
      const variableUndefined = e.message.split(' ')[0];
      e.message = 'Variable ' + variableUndefined + ' no esta definida';
    }

    Notify.create({
      message: e.message,
      type,
      position: 'bottom-right',
      icon,
    });
  } else {
    Notify.create({
      message: e,
      type,
      position: 'bottom-right',
      icon,
    });
  }
};

export { controlError };
