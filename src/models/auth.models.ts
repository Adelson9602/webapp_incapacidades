import { UserData } from './generals.models';

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
}

export interface Menu {
  modulo: string;
}
