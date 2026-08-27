import { By, PageElement } from '@serenity-js/web';

export const Pagina = {
  cuerpo: PageElement.located(By.css('body')).describedAs('contenido de la página actual'),
};
