import { defineStore } from 'pinia';
import { Contact, Persona } from 'src/models/generals.models';

export const employeStore = defineStore('counter', {
  state: () => {
    const contact: Contact = {
      idContacto: null,
      fkIdCiudad: null,
      direccion: '',
      barrio: '',
      correo: '',
      celular: '',
      telefonoFijo: '',
    };
    const person: Persona = {
      documentoPersona: null,
      fechaNacimiento: '',
      fkIdTipoDocumento: null,
      genero: '',
      primerApellido: '',
      primerNombre: '',
      segundoApellido: '',
      segundoNombre: '',
      oldDocumentoPersona: 0
    };
    const fkIdDepartamento = 0

    return {
      isEdit: false,
      contact,
      person,
      fkIdDepartamento
    };
  },

  getters: {
  },

  actions: {
  },
});
