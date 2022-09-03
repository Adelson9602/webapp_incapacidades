import { api } from 'boot/axios';
import { LocalStorage } from 'quasar';
import { decryptJSON } from 'src/helpers/encrypt';

const getRols = async () => {
  console.log(decryptJSON(LocalStorage.getItem('dataUsuario') || ''))
  return await api.get('rols')
}

const getDocumentsType = async () => {
  return await api.get('documents_type')
}

export default {
  getRols,
  getDocumentsType
}
