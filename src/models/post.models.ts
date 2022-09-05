
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

export interface CreateUser extends Persona{
  password: string;
  usuario: number;
  fkIdRol: number;
  estadoUsuario: number;
  fotoPerfil: string;
}
