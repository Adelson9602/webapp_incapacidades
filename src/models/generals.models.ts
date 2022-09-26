
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
  title?: string;
}

export interface DocumentType {
  idTipoDocumento: number;
  nombreTipoDocumento: string;
}
