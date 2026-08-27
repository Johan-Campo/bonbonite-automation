import { By, PageElement } from '@serenity-js/web';

export const MiCuenta = {
  enlaceRegistrate: PageElement.located(By.id('show_register')).describedAs(
    'enlace "¿Eres nuevo? Regístrate"',
  ),

  registro: {
    campoCedula: PageElement.located(By.id('reg_username')).describedAs(
      'campo de cédula (registro)',
    ),
    campoNombres: PageElement.located(By.id('first_name')).describedAs('campo de nombres'),
    campoApellidos: PageElement.located(By.id('last_name')).describedAs('campo de apellidos'),
    campoCorreo: PageElement.located(By.id('reg_email')).describedAs(
      'campo de correo electrónico',
    ),
    campoContrasena: PageElement.located(By.id('reg_password')).describedAs(
      'campo de contraseña (registro)',
    ),
    campoConfirmarContrasena: PageElement.located(By.id('reg_password2')).describedAs(
      'campo de confirmar contraseña',
    ),
    checkboxAutorizacionDatos: PageElement.located(By.id('privacy_policy_reg')).describedAs(
      'checkbox de autorización de tratamiento de datos',
    ),
    botonRegistrarme: PageElement.located(
      By.role('button', { name: 'Registrarme', exact: false }),
    ).describedAs('botón "REGISTRARME"'),
  },

  cuentaLogueada: {
    botonActualizarInformacion: PageElement.located(
      By.role('button', { name: 'Actualizar Información', exact: false }),
    ).describedAs('botón "Actualizar Información"'),
    campoNombre: PageElement.located(By.css('input[name="first_name"]')).describedAs(
      'campo "Nombre" en edición de cuenta',
    ),
    botonGuardar: PageElement.located(
      By.role('button', { name: 'Guardar', exact: true }),
    ).describedAs('botón "Guardar"'),
  },
};
