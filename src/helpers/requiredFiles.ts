// Definimos los tipos de archivos que se van a requerir segun el tipo de incapacidad

// ACCIDENTE TRANSITO
export const filesAccidente = [
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label: 'Epicrisis o Historia clínica',
    file: null,
  },
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label: 'Formato de  Incapacidad',
    file: null,
  },
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label: 'Documento FURIPS accidente de tránsito',
    file: null,
  },
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label: 'Documento SOAT',
    file: null,
  },
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label: 'Fotocopia de la cédula',
    file: null,
  },
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label: 'Fotocopia tarjeta de propiedad',
    file: null,
  },
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label: 'licencia para conducción (obligatorio si es régimen subsidiado)',
    file: null,
  },
];

// ENFERMEDAD GENERAL
export const filesEnfermedadGeneral = [
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label: 'Formato de Incapacidad',
    file: null,
  },
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label: 'Epicrisis o Historia clínica',
    file: null,
  },
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label: 'Fotocopia de la cédula',
    file: null,
  },
];

// LICENCIA MATERNIDAD Y PATERNIDAD
export const filesLicencias = [
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label: 'Historia clínica de la madre',
    file: null,
  },
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label: 'Registro civil o nacido vivo',
    file: null,
  },
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label: 'Formato de Incapacidad de la madre',
    file: null,
  },
];

export const filesAccidenteLaboral = [
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label: 'Formato de Incapacidad',
    file: null,
  },
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label: 'Historia clínica o epicrisis',
    file: null,
  },
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label: 'FURAT',
    file: null,
  },
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label:
      'Fotocopia de la cédula (obligatorio en caso de tramitar directamente con ARL)',
    file: null,
  },
];

export const filesEnfermedadLaboral = [
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label: 'Formato de Incapacidad',
    file: null,
  },
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label: 'Historia clínica o epicrisis',
    file: null,
  },
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label: 'FURAT',
    file: null,
  },
  {
    idFiles: 0,
    fkRadicado: 0,
    nombreArchivo: '',
    url: '',
    fkIdTipoFile: 0,
    label:
      'Dictamen de calificación de origen profesional (opcional de acuerdo con la entidad)',
    file: null,
  },
];

export const resetFilesAdjuntos = () => {
  filesAccidente.forEach(e => e.file = null)
  filesEnfermedadGeneral.forEach(e => e.file = null)
  filesLicencias.forEach(e => e.file = null)
  filesAccidenteLaboral.forEach(e => e.file = null)
  filesEnfermedadLaboral.forEach(e => e.file = null)
}
