export interface ActionsUser {
  btnEdit?: boolean;
  btnStatus?: boolean;
  btnDelete?: boolean;
  btnDetail?: boolean;
  btnAddExtension?: boolean;
}

export interface Persona {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  documentoPersona: number | null;
  genero: string;
  fkIdTipoDocumento: number | null;
  oldDocumentoPersona?: number;
  fechaNacimiento: string;
  completeName?: string;
}

export interface UserToNotification {
  idUsuarioNotificar: number;
  usuario: number;
  email: string;
  estado: boolean;
}

export interface UserData extends Persona, ActionsUser {
  password: string;
  usuario: number | null;
  fkIdRol: number | null;
  estadoUsuario: number;
  fotoPerfil: string;
  title?: string; // Titulo en la tabla
  rowKey?: number; // Idenfiticador único en la tabla
  avatar?: string; // Avatar en la tabla
  permisos?: Permisos | Modulo[];
  isNotified: boolean;
  email?: string;
  idUsuarioNotificar?: number;
}

export interface Rols extends ActionsUser {
  idRol: number;
  nombreRol: string;
  title?: string; // Titulo en la tabla
}

export interface DocumentType extends ActionsUser {
  idTipoDocumento: number;
  nombreTipoDocumento: string;
  title?: string; // Titulo en la tabla
}

export interface StateDisability extends ActionsUser {
  idEstadoIncapacidad: number;
  nombreEstadoIncapacidad: string;
  title?: string; // Titulo en la tabla
}

export interface TypeCompany {
  idTipoEmpresa?: number;
  nombreTipoEmpresa: string;
}

export interface Contact {
  idContacto: number | null;
  direccion: string;
  barrio: string;
  correo: string;
  celular: string;
  telefonoFijo: string;
  fkIdCiudad: number | null;
}

export interface ContactCompany {
  fkNit?: string;
  fkidContacto?: number;
}

export interface Company {
  nit: string;
  oldNit?: string;
  razonSocial: string;
  fkIdTipoEmpresa: number | null;
}

export interface ContactPerson {
  fkIdContacto: number;
  fkDocumentoPersona: number;
}

export interface InformationEmploye extends ActionsUser {
  documentoPersona: number | null;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  genero: string;
  fechaNacimiento: string;
  fkIdTipoDocumento: number | null;
  fkIdContacto: number | null;
  fkDocumentoPersona: number | null;
  idContacto: number | null;
  direccion: string;
  barrio: string;
  correo: string;
  celular: string;
  telefonoFijo: string;
  fkIdCiudad: number | null;
  razonSocial?: string;
  fkIdEmpresa: number;
  nombreCiudad?: string;
  fkIdDepartamento?: number | null;
  nombreDepartamento?: string;
  fkIdCargo: number | null;
  nombreCargo?: string;
  nombreTipoDocumento?: string;
  title?: string;
  isEmploye: boolean;
  fechaInicioLaboral: string;
}

export interface DisabilityType extends ActionsUser {
  title?: string;
  idTipoIncapacidad: number | null;
  nombreTipoIncapacidad: string;
  codigoDianostico: string;
}

export interface Position extends ActionsUser {
  idCargo: number;
  nombreCargo: string;
  title?: string;
}

export interface Employe {
  fkDocumentoPersona: number;
  fkIdCargo: number;
}

export interface ResultSql {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
}

export interface Rol {
  idRol: number;
  nombreRol: string;
}

export interface DocumentType {
  idTipoDocumento: number;
  nombreTipoDocumento: string;
}

export interface Department extends ActionsUser {
  idDepartamento: number;
  nombreDepartamento: string;
  title?: string;
}

export interface City extends ActionsUser {
  idCiudad: number;
  nombreCiudad: string;
  fkIdDepartamento: number;
  title?: string;
}

export interface DepartemtAndCity extends Department {
  cities: City[];
}

export interface InformationCompany extends ActionsUser {
  nit: string;
  oldNit?: string;
  razonSocial: string;
  fkIdTipoEmpresa: number | null;
  nombreTipoEmpresa: string;
  fkNit: string;
  idContacto: number | null;
  fkidContacto: number | null;
  direccion: string;
  barrio: string;
  correo: string;
  celular: string;
  telefonoFijo: string;
  fkIdCiudad: number | null;
  nombreCiudad: string;
  fkIdDepartamento: number | null;
  nombreDepartamento: string;
  title?: string;
}

export interface NewState {
  idIncapacidad: number;
  estado: number;
  observacion: string;
}

export interface StateNotification {
  idNotificacion: number;
  estado: number;
}

export interface Disability {
  radicado?: number | null;
  fkIdTipoIncapacidad: number;
  fkNitEmpresa: string;
  numeroIncapacidad: number;
  fechaInicio: string;
  fechaFin: string;
  totalDias: number;
  ibc: number;
  valor: number;
  fkIdEstadoIncapacidad: number;
  fkDocumentoPersona: number;
  fkEntidad: string;
  cie: string;
  usuario: number;
  files?: Adjunto[];
}

export interface InformationDisability extends ActionsUser {
  idIncapacidad: number;
  radicado: number;
  fkIdTipoIncapacidad: number;
  fkNitEmpresa: string;
  numeroIncapacidad: number;
  fechaInicio: string;
  fechaFin: string;
  totalDias: number;
  ibc: number;
  valor: number;
  idGrupoCie: number;
  fkIdEstadoIncapacidad: number;
  cie: string;
  fkDocumentoPersona: number;
  fkEntidad: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  genero: string;
  fechaNacimiento: string;
  fkIdTipoDocumento: number;
  nombreTipoDocumento: string;
  nombreTipoIncapacidad: string;
  codigoDianostico: string;
  nit: string;
  nitEntidad: string;
  razonSocial: string;
  fkIdTipoEmpresa: number;
  nitArl: string;
  razonSocialArl: string;
  nitAfp: string;
  razonSocialAfp: string;
  nitEps: string;
  razonSocialEps: string;
  nombreEstadoIncapacidad: string;
  fechaRegistro: string;
  title?: string;
  files: Adjunto[];
}

// Interfaces para mostrar información en un dialog de manera ordenada
export interface DesabilityDetail {
  disability: DisabilityDetail;
  employe: EmployeDetail;
}

export interface DisabilityDetail {
  'NIT EMPRESA': string;
  'EMPRESA EMPLEADO': string;
  'NÚMERO INCAPACIDAD': number;
  'FECHA INICIO': string;
  'FECHA FIN': string;
  'TOTAL DÍAS': number;
  IBC: number;
  VALOR: number;
  'ESTADO INCAPACIDAD': string;
  'TIPO INCAPACIDAD': string;
  'NIT ENTIDAD': string;
  ENTIDAD: string;
  'TIPO ENTIDAD': string;
  CIE: string;
  CÓDIGO: string;
  DESCRIPCIÓN: string;
  'CÓDIGO GRUPO': string;
  'FECHA REGIRSTRO': string;
}

export interface EmployeDetail {
  DOCUMENTO: number;
  'PRIMER NOMBRE': string;
  'SEGUNDO NOMBRE': string;
  'PRIMERA PELLIDO': string;
  'SEGUNDO APELLIDO': string;
  GÉNERO: string;
  'FECHA NACIMIENTO': string;
  'DOCUMENTO EMPLEADO': number;
  DIRECCIÓN: string;
  BARRIO: string;
  CORREO: string;
  CELULAR: string;
  TELEFONO: string;
  'CIUDAD RESIDENCIA': string;
  'DEPARTAMENTO RESIDENCIA': string;
  CARGO: string;
  'TIPO DOCUMENTO': string;
}

export interface ResponseDashboard {
  totalDisabilities: TotalDisabilities;
  totalDisabilitiesByEps: TotalDisabilitiesByEps[];
  totalDisabilitiesByStatus: TotalDisabilitiesByStatus[];
}

export interface TotalDisabilities {
  numeroIncapacidades: number;
  totalIncapacidades: number;
}

export interface TotalDisabilitiesByEps {
  razonSocial: string;
  numeroIncapacidades: number;
  totalIncapacidades: number;
}

export interface TotalDisabilitiesByStatus {
  nombreEstadoIncapacidad: string;
  numeroIncapacidades: number;
  totalIncapacidades: number;
}

export interface Cards {
  title: string;
  value: number | string;
  icon: string;
  color: string;
}

export interface LatestDisabilities {
  id: number;
  radicado: number;
  fkIdTipoIncapacidad: number;
  fkNitEmpresa: string;
  numeroIncapacidad: number;
  fechaInicio: string;
  fechaFin: string;
  totalDias: number;
  ibc: string;
  valor: number;
  fkIdEstadoIncapacidad: number;
  fkDocumentoPersona: number;
  fkIdArl: string;
  fkIdAfp: string;
  fkIdEps: string;
  fechaRegistro: string;
}

export interface Salary {
  salarioMinimo: number;
}

export interface Adjunto {
  idFiles?: number | null;
  fkRadicado?: number | null;
  nombreArchivo: string;
  url: string;
  fkIdTipoFile: number;
  label?: string;
  file?: File | null;
}

export interface ResponseFile {
  saved: boolean;
  typeFile: number | null;
  nameFile: string;
  url: string;
}

export interface Cie {
  idGrupoCie: number;
  grupoSubgrupo: string;
  descripcion: string;
  cieCodes: CieCode[];
}

export interface CieCode {
  idCodigoCie: number;
  codigo: string;
  descripcion: string;
  idGrupo: number;
}

export interface DisabilityExtension {
  idProrrogaIncapacidad: number | null;
  fkIdIncapacidad: number;
  fechaIniciaProrroga: string;
  fechaFinProrroga: string;
  diasProrroga: number;
  valor: number;
  ibc: number;
  usuario: number;
  observacion: string;
}

export interface HistoricalDisability {
  idHistorico?: number | null;
  idIncapacidad?: number;
  usuario: number;
  nombres?: string;
  observaciones: string;
}

export interface DisabilityWithCie {
  radicado: number;
  fkIdTipoIncapacidad: number;
  cie: string;
  fkNitEmpresa: string;
  numeroIncapacidad: number;
  fechaInicio: string;
  fechaFin: string;
  totalDias: number;
  ibc: string;
  valor: number;
  fkIdEstadoIncapacidad: number;
  fkDocumentoPersona: number;
  fkEntidad: string;
  fechaRegistro: string;
  nombreEstadoIncapacidad: string;
  nombreTipoIncapacidad: string;
  nitEntidad: string;
  razonSocialEntidad: string;
  empresaEmpleado: string;
  tipoEntidad: string;
  idCodigoCie: number;
  codigo: string;
  descripcion: string;
  idGrupo: number;
  idGrupoCie: number;
  grupoSubgrupo: string;
}

export interface DetailDisability {
  disability: DisabilityWithCie;
  employe: InformationEmploye;
  files: Adjunto[];
  prorroga?: DisabilityExtension[];
  history?: HistoricalDisability[];
}

export interface CompanyLogged {
  idEmpresa: number;
  razonSocial: string;
  nitEmpresa: string;
  nombreSistema: string;
  urlLogo: string;
  nombreBase: string;
  estado: number;
  direccion: string;
  telefono: string;
  email: string;
  dataUser: DataUser;
}

export interface DataUser {
  usuario: number;
  password: string;
  fkIdRol: number;
  estadoUsuario: number;
  fotoPerfil: string;
  documentoPersona: number;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  genero: string;
  fechaNacimiento: string;
  fkIdTipoDocumento: number;
}

export interface Actions {
  leer: boolean;
  borrar: boolean;
  update: boolean;
  insert: boolean;
}

export interface Item {
  icon: string;
  text: string;
  route: string;
  actions: Actions;
  selected?: boolean;
}

export interface Modulo {
  selected?: boolean;
  modulo: string;
  items: Item[];
}

export interface Permisos {
  idPermisosUsuario: number;
  permisos: Modulo[] | string;
  usuario: number;
}

export interface ResDocumentsAttach {
  documento: string;
}
export interface Notifications {
  idNotificacion: number;
  usuario: number;
  mensaje: string;
  estado: number;
}

export interface DocumentsAttach extends ActionsUser {
  documento: string;
  idDocumentoAdjuntar?: number | null;
  descripcion?: string;
  title?: string;

}
