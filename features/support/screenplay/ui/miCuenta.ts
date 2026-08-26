import type { Answerable } from '@serenity-js/core';
import { By, PageElement } from '@serenity-js/web';

/**
 * Los campos de texto y correo tienen rol ARIA implícito "textbox", así que el rol
 * accesible + nombre basta para ubicarlos y, de paso, Playwright excluye por defecto
 * los elementos ocultos al resolver por rol — lo que desambigua automáticamente entre
 * el formulario de login y el de registro cuando comparten una etiqueta (ej. "Número
 * de cédula"), ya que solo el formulario visible tras el toggle aparece en el árbol
 * de accesibilidad.
 */
const campoDeTexto = (etiqueta: string) =>
  PageElement.located(By.role('textbox', { name: etiqueta, exact: true }));

/**
 * Los campos de tipo password NO tienen rol ARIA implícito, por lo que no pueden
 * ubicarse con By.role. Se localizan por el texto de su <label> (patrón WooCommerce
 * clásico: el <input> vive anidado dentro del <label>).
 * // TODO: verificar selector real contra el sitio — si bon-bonite usa label[for] + id
 * en vez de anidamiento, este XPath debe ajustarse.
 */
const campoDeContrasenaDentroDe = (contenedor: Answerable<PageElement>, etiquetaXPath: string) =>
  PageElement.of(
    PageElement.located(By.xpath(`.//label[${etiquetaXPath}]/input`)),
    contenedor,
  );

const formularioLogin = PageElement.located(By.css('form.woocommerce-form-login')).describedAs(
  'formulario de inicio de sesión',
);

const formularioRegistro = PageElement.located(By.css('form.woocommerce-form-register')).describedAs(
  'formulario de registro',
);

const xpathSoloContrasena = 'starts-with(normalize-space(.), "Contraseña") and not(contains(., "Confirmar"))';
const xpathConfirmarContrasena = 'contains(normalize-space(.), "Confirmar contraseña")';

export const MiCuenta = {
  enlaceRegistrate: PageElement.located(
    By.role('link', { name: '¿Eres nuevo? Regístrate' }),
  ).describedAs('enlace "¿Eres nuevo? Regístrate"'),

  login: {
    campoCedula: campoDeTexto('Número de cédula'),
    campoContrasena: campoDeContrasenaDentroDe(formularioLogin, xpathSoloContrasena),
    botonIniciarSesion: PageElement.located(
      By.role('button', { name: 'INICIAR SESIÓN', exact: true }),
    ).describedAs('botón "INICIAR SESIÓN"'),
  },

  registro: {
    campoCedula: campoDeTexto('Número de cédula'),
    campoNombres: campoDeTexto('Nombres'),
    campoApellidos: campoDeTexto('Apellidos'),
    campoCorreo: campoDeTexto('Dirección de correo electrónico'),
    campoContrasena: campoDeContrasenaDentroDe(formularioRegistro, xpathSoloContrasena),
    campoConfirmarContrasena: campoDeContrasenaDentroDe(formularioRegistro, xpathConfirmarContrasena),
    // TODO: verificar selector real contra el sitio — se asume que el texto accesible
    // del checkbox coincide con el texto visible de su <label>; si hay un enlace anidado
    // (ej. a la política de datos) el nombre accesible completo podría variar.
    checkboxNovedades: PageElement.located(
      By.role('checkbox', {
        name: 'Quiero recibir información sobre las novedades de bon-bonite en mi e-mail.',
        exact: false,
      }),
    ).describedAs('checkbox de novedades por correo'),
    checkboxAutorizacionDatos: PageElement.located(
      By.role('checkbox', { name: 'Autorizo el tratamiento de mis datos personales', exact: false }),
    ).describedAs('checkbox de autorización de tratamiento de datos'),
    botonRegistrarme: PageElement.located(
      By.role('button', { name: 'REGISTRARME', exact: true }),
    ).describedAs('botón "REGISTRARME"'),
  },

  cuentaLogueada: {
    enlaceCerrarSesion: PageElement.located(
      By.role('link', { name: 'Cerrar sesión' }),
    ).describedAs('enlace "Cerrar sesión" (marcador estándar de WooCommerce de sesión activa)'),
    // TODO: verificar selector real contra el sitio — DOM de "Mi cuenta" > "Editar datos
    // de la cuenta" no fue inspeccionado; se asume la etiqueta estándar de WooCommerce.
    campoNombre: campoDeTexto('Nombre'),
    botonGuardarCambios: PageElement.located(
      By.role('button', { name: 'Guardar cambios', exact: false }),
    ).describedAs('botón "Guardar cambios"'),
  },
};
