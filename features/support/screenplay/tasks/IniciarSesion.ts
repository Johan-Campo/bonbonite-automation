import { Task, the } from '@serenity-js/core';
import { Click, Enter } from '@serenity-js/web';

import { MiCuenta } from '../ui/miCuenta.js';

export interface CredencialesDeInicioDeSesion {
  cedula: string;
  contrasena: string;
}

export const IniciarSesion = (credenciales: CredencialesDeInicioDeSesion) =>
  Task.where(
    the`#actor inicia sesión con la cédula ${credenciales.cedula}`,
    Enter.theValue(credenciales.cedula).into(MiCuenta.login.campoCedula),
    Enter.theValue(credenciales.contrasena).into(MiCuenta.login.campoContrasena),
    Click.on(MiCuenta.login.botonIniciarSesion),
  );
