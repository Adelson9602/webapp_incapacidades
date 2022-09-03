export interface Todo {
  id: number;
  content: string;
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
