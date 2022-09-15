import { api } from 'boot/axios';
import { UserData } from 'src/models/auth.models';
import { Roles, DocumentType } from 'src/models/get.model';

const getRols = async () => {
  return await api.get<Roles[]>('rols')
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
