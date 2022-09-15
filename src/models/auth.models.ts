import { UserData } from './post.models';

export interface User {
  usuario: number;
  password: string;
}

export interface Token {
  id: number;
  pwd: string;
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
