import { By, PageElement } from '@serenity-js/web';

export const MiCuenta = {
  enlaceRegistrate: PageElement.located(By.id('show_register')).describedAs(
    'enlace "¿Eres nuevo? Regístrate"',
  ),

  login: {
    campoCedula: PageElement.located(By.id('username')).describedAs('campo de cédula (login)'),
    campoContrasena: PageElement.located(By.id('password')).describedAs(
      'campo de contraseña (login)',
    ),
    botonIniciarSesion: PageElement.located(
      By.role('button', { name: 'Iniciar sesión', exact: false }),
    ).describedAs('botón "INICIAR SESIÓN"'),
  },

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
    checkboxNovedades: PageElement.located(By.id('newsletter_authorization')).describedAs(
      'checkbox de novedades por correo',
    ),
    checkboxAutorizacionDatos: PageElement.located(By.id('privacy_policy_reg')).describedAs(
      'checkbox de autorización de tratamiento de datos',
    ),
    botonRegistrarme: PageElement.located(
      By.role('button', { name: 'Registrarme', exact: false }),
    ).describedAs('botón "REGISTRARME"'),
  },

  cuentaLogueada: {
    enlaceCerrarSesion: PageElement.located(
      By.role('link', { name: 'Cerrar sesión', exact: false }),
    ).describedAs('enlace "Cerrar sesión"'),
    campoNombre: PageElement.located(By.id('first_name')).describedAs(
      'campo "Nombre" en edición de cuenta',
    ),
    botonGuardarCambios: PageElement.located(
      By.role('button', { name: 'Guardar cambios', exact: false }),
    ).describedAs('botón "Guardar cambios"'),
  },
};
