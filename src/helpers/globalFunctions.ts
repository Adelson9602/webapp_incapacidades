import { Notify, date } from 'quasar';

// Calcula el número de dias entre 2 fechas
export const countDays = (startDate: Date, endDate: Date): number => {
  if (endDate < startDate) {
    Notify.create({
      message: 'La fecha final no puede ser inferior a la fecha de inicio',
      type: 'warning',
    });
    return 1;
  } else {
    return date.getDateDiff(endDate, startDate, 'days') + 1;
  }
};

// (1, 'ACCIDENTE DE TRÁNSITO', 'AC001'),
// (2, 'ENFERMEDAD GENERAL', ''),
// (3, 'LICENCIA DE MATERNIDAD', ''),
// (4, 'LICENCIA PATERNIDAD', ''),
// (5, 'ACCIDENTE LABORAL', ''),
// (6, 'ENFERMEDAD LABORAL', ''),
// Calcula el número de días
export const calculateDisabilityCost = (
  tipoIncapacidad: number,
  minimumSalary: number,
  totalDays: number,
  ibc: number
): number => {
  const tempValue = (ibc / 3) * 2;

  if (tempValue < minimumSalary) {
    // Cálculo para enfermedad general y laboral
    if (
      (tipoIncapacidad == 2 && totalDays > 2) ||
      (tipoIncapacidad == 6 && totalDays > 2) ||
      (tipoIncapacidad == 5 && totalDays > 2) // Posiblemente halla que quitar esta validacion
    ) {
      return Math.round((minimumSalary / 30) * (totalDays - 2));
    } else {
      // Cálculo para licencias de maternidad y paternidad
      return Math.round((minimumSalary / 30) * totalDays);
    }
  } else {
    return Math.round((tempValue / 30) * totalDays);
  }
};
