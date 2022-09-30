import { api } from 'boot/axios';
import { Rols, DocumentType, UserData, StateDisability, Department, City, Position, InformationCompany, TypeCompany, DepartemtAndCity, InformationEmploye, InformationDisability } from 'src/models/generals.models';

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

const getPosition = async () => {
  return await api.get<Position[]>('position')
}

const getCompanies = async () => {
  return await api.get<InformationCompany[]>('company')
}

const getCompanyType = async () => {
  return await api.get<TypeCompany[]>('company_type')
}

const getDepartmentAndCity = async () => {
  return await api.get<DepartemtAndCity[]>('department_and_city')
}

const getEmployes = async () => {
  return await api.get<InformationEmploye[]>('employe')
}

const getDisability = async () => {
  return await api.get<InformationDisability[]>('disability')
}

export default {
  getRols,
  getDocumentsType,
  getUsers,
  getStateDisability,
  getDeparments,
  getCity,
  getPosition,
  getCompanies,
  getCompanyType,
  getDepartmentAndCity,
  getEmployes,
  getDisability
}
