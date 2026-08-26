import { By, PageElement } from '@serenity-js/web';

/**
 * Verificado en una corrida real con un navegador Playwright limpio (sin cookies
 * previas): el sitio muestra "ESTE SITIO WEB UTILIZA COOKIES" con botones "ACEPTAR
 * TODO" / "RECHAZAR TODO". No apareció durante la exploración manual anterior porque
 * esa sesión de Chrome ya tenía el consentimiento guardado de visitas previas — con
 * un contexto de navegador nuevo (como el que usa esta automatización) sí aparece.
 */
export const BannerDeCookies = {
  botonAceptarTodo: PageElement.located(
    By.role('button', { name: 'Aceptar todo', exact: false }),
  ).describedAs('botón "ACEPTAR TODO" del banner de cookies'),
};
