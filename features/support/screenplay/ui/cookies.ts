import { By, PageElement } from '@serenity-js/web';

export const BannerDeCookies = {
  botonAceptarTodo: PageElement.located(
    By.role('button', { name: 'Aceptar todo', exact: false }),
  ).describedAs('botón "ACEPTAR TODO" del banner de cookies'),
};
