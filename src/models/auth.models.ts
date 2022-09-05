export interface User {
  usuario: number;
  password: string;
}

export interface Token {
  id: number;
  pwd: string;
}

export interface UserData {
  usuario: number;
  password: string;
  fkIdRol: number;
  estadoUsuario: number;
  documentoPersona: number;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  genero: string;
  fechaNacimiento: string;
  fkIdTipoDocumento: number;
}

export interface Cliente {
  idEmpresa: number;
  razonSocial: string;
  nombreSistema: string;
  urlLogo: string;
  nombreBase: string;
  estado: number;
  direccion: string;
  telefono: string;
  email: string;
  dataUser: UserData;
  label?: string; //Se usan solo en el login, menu de empresas
  img?: string; //Se usan solo en el login, menu de empresas
  id?: number; //Se usan solo en el login, menu de empresas
}

export interface Menu {
  modulo: string;
}
