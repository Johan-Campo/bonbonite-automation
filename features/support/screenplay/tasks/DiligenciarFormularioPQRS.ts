import { Check, Task } from '@serenity-js/core';
import { Click, Enter, Select, isVisible } from '@serenity-js/web';
import path from 'node:path';

import { PQRS } from '../ui/pqrs.js';
import { SubirArchivo } from './SubirArchivo.js';

export interface DatosDePQRS {
  nombreCompleto: string;
  direccionCiudad: string;
  numeroDocumento: string;
  telefono: string;
  correo: string;
  descripcion: string;
}

export const datosDePQRSUnicos = (): DatosDePQRS => {
  const marcaDeTiempo = Date.now();
  return {
    nombreCompleto: `Camila Automatizada QA ${marcaDeTiempo}`,
    direccionCiudad: 'Calle de prueba automatizada, Medellín',
    numeroDocumento: marcaDeTiempo.toString().slice(-10),
    telefono: '3001234567',
    correo: `camila.qa.pqrs.${marcaDeTiempo}@bonbonite-automation.test`,
    descripcion: `Solicitud de prueba generada por automatización el ${new Date(marcaDeTiempo).toISOString()}.`,
  };
};

const rutaEvidencia = path.resolve('features/support/fixtures/evidencia-pqrs.txt');

export const DiligenciarFormularioPQRS = (datos: DatosDePQRS) =>
  Task.where(
    `#actor diligencia el formulario de PQRS con el correo ${datos.correo}`,
    Select.option('Bon-Bonite Virtual').from(PQRS.selectPuntoDeVenta),
    Enter.theValue(datos.nombreCompleto).into(PQRS.campoNombreCompleto),
    Enter.theValue(datos.direccionCiudad).into(PQRS.campoDireccionCiudad),
    Select.option('Cédula de Ciudadanía (CC)').from(PQRS.selectTipoDocumento),
    Enter.theValue(datos.numeroDocumento).into(PQRS.campoNumeroDocumento),
    Enter.theValue(datos.telefono).into(PQRS.campoTelefono),
    Enter.theValue(datos.correo).into(PQRS.campoCorreo),
    Select.option('Consultas y solicitudes de información').from(PQRS.selectTipo),
    Check.whether(PQRS.selectCausa, isVisible()).andIfSo(
      Select.option('Víctima de un fraude').from(PQRS.selectCausa),
    ),
    Enter.theValue(datos.descripcion).into(PQRS.campoDescripcion),
    SubirArchivo(rutaEvidencia, PQRS.campoArchivo),
    Click.on(PQRS.checkboxConsentimiento),
  );
