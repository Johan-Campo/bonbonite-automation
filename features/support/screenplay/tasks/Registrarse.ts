import { Task, the } from '@serenity-js/core';
import { Click, Enter } from '@serenity-js/web';

import { MiCuenta } from '../ui/miCuenta.js';

export interface DatosDeRegistro {
  cedula: string;
  nombres: string;
  apellidos: string;
  correo: string;
  contrasena: string;
}

export const datosDeRegistroUnicos = (): DatosDeRegistro => {
  const marcaDeTiempo = Date.now();
  return {
    cedula: marcaDeTiempo.toString().slice(-10),
    nombres: 'Camila',
    apellidos: `Automatizada${marcaDeTiempo}`,
    correo: `camila.qa.${marcaDeTiempo}@bonbonite-automation.test`,
    contrasena: 'ClaveSegura#2026',
  };
};

export const Registrarse = (datos: DatosDeRegistro) =>
  Task.where(
    the`#actor se registra con la cédula ${datos.cedula} y el correo ${datos.correo}`,
    Click.on(MiCuenta.enlaceRegistrate),
    Enter.theValue(datos.cedula).into(MiCuenta.registro.campoCedula),
    Enter.theValue(datos.nombres).into(MiCuenta.registro.campoNombres),
    Enter.theValue(datos.apellidos).into(MiCuenta.registro.campoApellidos),
    Enter.theValue(datos.correo).into(MiCuenta.registro.campoCorreo),
    Enter.theValue(datos.contrasena).into(MiCuenta.registro.campoContrasena),
    Enter.theValue(datos.contrasena).into(MiCuenta.registro.campoConfirmarContrasena),
    Click.on(MiCuenta.registro.checkboxAutorizacionDatos),
    Click.on(MiCuenta.registro.botonRegistrarme),
  );
