import { api } from 'boot/axios';
import {
  UserData,
  Rols,
  DocumentType,
  StateDisability,
  Department,
  City,
  Position,
  InformationCompany,
  InformationEmploye,
  Disability,
  DisabilityType,
  ResponseFile,
  DisabilityExtension,
  HistoricalDisability,
  TypeDocumentsAttach,
  DocumentsAttachSave,
} from '../models/generals.models'
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

const createDisabilityType = async (data: DisabilityType) => {
  return await api.post('/disability_type', data);
}

const createDisabilityExtension = async (data: DisabilityExtension) => {
  return await api.post('/disability_extension', data);
}

const createHistoricalDisability = async (data: HistoricalDisability) => {
  return await api.post('/history_disability', data);
}

const createTypeOfDocumentToAttach = async (data: TypeDocumentsAttach) => {
  return await api.post('/type_of_document_to_attach', data);
}

const createDocumentToAttach = async (data: DocumentsAttachSave[]) => {
  return await api.post('/document_to_attach', {
    idTipoIncapacidad: data[0].idTipoIncapacidad,
    documents: data
  });
}

const uploadFiles = async (data: FormData) => {
  return await api.post<ResponseFile[]>(`/upload_file/${api.defaults.headers.common.base}/documents`, data);
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
  createDisability,
  createDisabilityType,
  uploadFiles,
  createDisabilityExtension,
  createHistoricalDisability,
  createTypeOfDocumentToAttach,
  createDocumentToAttach
};
