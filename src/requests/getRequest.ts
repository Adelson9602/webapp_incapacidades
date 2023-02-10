import { api } from 'boot/axios';
import {
  Rols,
  DocumentType,
  UserData,
  StateDisability,
  Department,
  City,
  Position,
  InformationCompany,
  TypeCompany,
  DepartemtAndCity,
  InformationEmploye,
  InformationDisability,
  Company,
  Persona,
  DisabilityType,
  LatestDisabilities,
  ResponseDashboard,
  Salary,
  Cie,
  DetailDisability,
  Modulo,
  ResDocumentsAttach,
  Notifications,
  TypeDocumentsAttach,
  Cliente,
} from 'src/models/generals.models';

const getRols = async () => {
  return await api.get<Rols[]>('rols');
};

const getDocumentsType = async () => {
  return await api.get<DocumentType[]>('documents_type');
};

const getUsers = async () => {
  return await api.get<UserData[]>('users');
};

const getStateDisability = async () => {
  return await api.get<StateDisability[]>('disability_state');
};

const getDeparments = async () => {
  return await api.get<Department[]>('department');
};

const getCity = async () => {
  return await api.get<City[]>('city');
};

const getPosition = async () => {
  return await api.get<Position[]>('position');
};

const getCompanies = async (condition?: number) => {
  return await api.get<InformationCompany[]>(`company${condition ? `?typeCompany=${condition}` : ''}`);
};

const getCompanyType = async () => {
  return await api.get<TypeCompany[]>('company_type');
};

const getDepartmentAndCity = async () => {
  return await api.get<DepartemtAndCity[]>('department_and_city');
};

const getEmployes = async () => {
  return await api.get<InformationEmploye[]>('employe');
};

const getEmploye = async (documentoPersona: number) => {
  return await api.get<InformationEmploye>(
    `employe?documentoPersona=${documentoPersona}`
  );
};

const getEmployesSelect = async () => {
  return await api.get<Persona[]>('employe_select');
};

const getDisability = async () => {
  return await api.get<InformationDisability[]>('disability');
};

const getCompanyByType = async (idTipo: number) => {
  return await api.get<Company[]>(`company_by_type/${idTipo}`);
};

const getDisabilityType = async () => {
  return await api.get<DisabilityType[]>('disability_type');
};

const getDataDashboard = async () => {
  return await api.get<ResponseDashboard>('dashboard');
};

const getLatestDisabilities = async () => {
  return await api.get<LatestDisabilities[]>('last_disabilities');
};

const getSalary = async () => {
  return await api.get<Salary>('salary');
};

const getCie = async () => {
  return await api.get<Cie[]>('cie');
};

const getDisabilityById = async (radicado: number) => {
  return await api.get<DetailDisability>(`disability_by_id/${radicado}`);
};

const getPermissions = async (usuario: number) => {
  return await api.get<Modulo[]>(`permissions/${usuario}`);
};

const getPermissionsByRol = async (rol: number) => {
  return await api.get<Modulo[]>(`permissions_rol/${rol}`);
};

const getDocumentsAttachByDisabilityType = async (idTipoIncapacidad: number) => {
  return await api.get<ResDocumentsAttach[]>(`documents_attach_by_disability_type/${idTipoIncapacidad}`);
};

const getDisabilityDelete = async () => {
  return await api.get<InformationDisability[]>('disability_delete');
};

const getNotifications = async (usuario: number) => {
  return await api.get<Notifications[]>(`notifications/${usuario}`);
};

const disabilityByRange = async (from: string, to: string) => {
  return await api.get<InformationDisability[]>(`disability_by_range?from=${from}&to=${to}`);
};

const getDisabilitiesByDocument = async (document: string) => {
  return await api.get<InformationDisability[]>(`disability_by_range/${document}`);
};

const getTypeOfDocumentToAttach = async () => {
  return await api.get<TypeDocumentsAttach[]>('type_of_document_to_attach');
};

const getClients = async () => {
  return await api.get<Cliente[]>('clients');
};

const getReport = async (typeReport: string, queryParameter?: string) => {
  let parameter = ''
  if(typeReport === 'cliente'){
    parameter = `?nit=${queryParameter}`
  } else if ( typeReport === 'empleado') {
    parameter = `?cc=${queryParameter}`
  }else if ( typeReport === 'entidad'){
    parameter = `?nitEntidad=${queryParameter}`
  }
  return await api.get<any>(`/excel_report/${typeReport}${parameter}`);
};

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
  getDisabilityType,
  getDataDashboard,
  getLatestDisabilities,
  getSalary,
  getEmploye,
  getCie,
  getDisabilityById,
  getPermissions,
  getPermissionsByRol,
  getDocumentsAttachByDisabilityType,
  getDisabilityDelete,
  getReport,
  getNotifications,
  disabilityByRange,
  getDisabilitiesByDocument,
  getTypeOfDocumentToAttach,
  getClients
};
