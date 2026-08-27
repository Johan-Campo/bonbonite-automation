import { By, PageElement, PageElements } from '@serenity-js/web';

export const Carrito = {
  contenido: PageElement.located(By.css('body')).describedAs('contenido de la página del carrito'),
};

export const ContadorDelCarrito = PageElements.located(By.css('a.cart-contents'))
  .first()
  .describedAs('contador de artículos del carrito');
