import { api } from 'boot/axios';
import { Rols, DocumentType, UserData } from 'src/models/generals.models';

const getRols = async () => {
  return await api.get<Rols[]>('rols')
}

const getDocumentsType = async () => {
  return await api.get<DocumentType[]>('documents_type')
}

const getUsers = async () => {
  return await api.get<UserData[]>('users')
}

export default {
  getRols,
  getDocumentsType,
  getUsers
}
