
export interface ActionsUser {
  btnEdit?: boolean;
  btnStatus?: boolean;
  btnDetail?: boolean;
}

export interface Persona {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  documentoPersona: number;
  genero: string;
  fkIdTipoDocumento: number;
  fechaNacimiento: string;
}

export interface UserData extends Persona, ActionsUser{
  password: string;
  usuario: number;
  fkIdRol: number;
  estadoUsuario: number;
  fotoPerfil: string;
  title?: string; // Titulo en la tabla
  rowKey?: number; // Idenfiticador único en la tabla
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
  nombreEstadoIncapacidad : string;
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

export interface Person extends Persona, Contact, ContactPerson {
// Se crea esta interfaz solo para unir propiedades de otras interfaces
}

export interface DisabilityType {
  idTipoIncapacidad: number;
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
  fieldCount: number,
  affectedRows: number,
  insertId: number,
  serverStatus: number,
  warningCount: number,
  message: string,
  protocol41: boolean,
  changedRows: number
}

export interface Adjunto {
  id: number | null;
  idPersona: null | string;
  url: null | string;
  tipoArchivo?: number | null;
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
  cities: City[]
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

export interface InabilityType {
  idEstadoIncapacidad: number;
  nombreEstadoIncapacidad: string;
}

export interface StateInability {
  nombreEstadoIncapacidad: string;
  idEstadoIncapacidad: number;
}

export interface Inability {
  radicado: string;
  fkIdTipoIncapacidad: number;
  fkNitEmpresa: number;
  numeroIncapacidad: number;
  fechaInicio: string;
  fechaFin: string;
  totalDias: number;
  ibc: string;
  valor: string;
  fkIdEstadoIncapacidad: number;
  fkDocumentoPersona: number;
  fkIdArl: number;
  fkIdAfp: number;
  fkIdEps: number;
}

export interface HistoryInability {
  idHistorialIncapacidad: number;
  fkRadicado: string;
  estadoIncapidad: number;
  fechaFin: string;
  fechaProrroga: string;
  observacion: string;
}
