import { api } from 'boot/axios';
import { UserData, Rols, DocumentType, StateDisability, Department, City } from '../models/generals.models'
import { User } from '../models/auth.models'

const createUser = async (data: UserData) => {
  return await api.post('/user', data);
};

const updateRecovery = async (data: User) => {
  return await api.post('/update_recovery_password', data);
}

const createRol = async (data: Rols) => {
  return await api.post('/rol', data);
}

const createDocumentType = async (data: DocumentType) => {
  return await api.post('/document_type', data);
}

const createStateDisability = async (data: StateDisability) => {
  return await api.post('/disability_state', data);
}

const createDepartament = async (data: Department) => {
  return await api.post('/department', data);
}

const createCity = async (data: City) => {
  return await api.post('/city', data);
}

export default {
  createUser,
  updateRecovery,
  createRol,
  createDocumentType,
  createStateDisability,
  createDepartament,
  createCity
};
