import { api } from 'boot/axios';
import { Rols, DocumentType, UserData, StateDisability, Department, City, Position, InformationCompany, TypeCompany, DepartemtAndCity, InformationEmploye, InformationDisability, Company, Persona, DisabilityType } from 'src/models/generals.models';

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

const getEmployesSelect = async () => {
  return await api.get<Persona[]>('employe_select')
}

const getDisability = async () => {
  return await api.get<InformationDisability[]>('disability')
}

const getCompanyByType = async (idTipo: number) => {
  return await api.get<Company[]>(`company_by_type/${idTipo}`)
}

const getDisabilityType = async () => {
  return await api.get<DisabilityType[]>('disability_type')
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
  getDisability,
  getCompanyByType,
  getEmployesSelect,
  getDisabilityType
}
