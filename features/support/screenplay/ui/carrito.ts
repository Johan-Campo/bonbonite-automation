import { By, PageElements } from '@serenity-js/web';

import { Pagina } from './pagina.js';

export const Carrito = {
  contenido: Pagina.cuerpo,
};

export const ContadorDelCarrito = PageElements.located(By.css('a.cart-contents'))
  .first()
  .describedAs('contador de artículos del carrito');
