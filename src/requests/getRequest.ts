import { api } from 'boot/axios';
import { Rols, DocumentType, UserData, StateDisability, Department, City } from 'src/models/generals.models';

const getRols = async () => {
  return await api.get<Rols[]>('rols')
}

const getDocumentsType = async () => {
  return await api.get<DocumentType[]>('documents_type')
}

const getUsers = async () => {
  return await api.get<UserData[]>('users')
}

const getStateDisability = async () => {
  return await api.get<StateDisability[]>('disability_state')
}

const getDeparments = async () => {
  return await api.get<Department[]>('department')
}

const getCity = async () => {
  return await api.get<City[]>('city')
}

export default {
  getRols,
  getDocumentsType,
  getUsers,
  getStateDisability,
  getDeparments,
  getCity
}
