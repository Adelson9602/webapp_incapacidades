import { api } from 'boot/axios';
import { Roles, DocumentType } from 'src/models/get.model';

const getRols = async () => {
  return await api.get<Roles[]>('rols')
}

const getDocumentsType = async () => {
  return await api.get<DocumentType[]>('documents_type')
}

export default {
  getRols,
  getDocumentsType
}
