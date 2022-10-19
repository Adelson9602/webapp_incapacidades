import { api } from 'boot/axios';
import { UserData, Rols, DocumentType, StateDisability, Department, City, Position, InformationCompany, InformationEmploye, Disability } from '../models/generals.models'
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

const createPosition = async (data: Position) => {
  return await api.post('/position', data);
}

const createCompany = async (data: InformationCompany) => {
  return await api.post('/company', data);
}

const createPerson = async (data: InformationEmploye) => {
  return await api.post('/person', data);
}

const createDisability = async (data: Disability) => {
  return await api.post('/disability', data);
}

export default {
  createUser,
  updateRecovery,
  createRol,
  createDocumentType,
  createStateDisability,
  createDepartament,
  createCity,
  createPosition,
  createCompany,
  createPerson,
  createDisability
};
