import { By, PageElement, PageElements } from '@serenity-js/web';

export const ListadoDeProductos = {
  enlacesDeProducto: PageElements.located(By.css('.product_list a.relative')).describedAs(
    'enlaces de producto del listado',
  ),
};

export const Producto = {
  titulo: PageElement.located(By.css('h1')).describedAs('título del producto'),
  botonesDeTalla: PageElements.located(By.css('button.variation-button')).describedAs(
    'botones de talla',
  ),
  botonComprarAhora: PageElement.located(
    By.role('button', { name: 'Comprar ahora', exact: false }),
  ).describedAs('botón "Comprar ahora"'),
  botonAnadirAlCarrito: PageElement.located(
    By.role('button', { name: 'Añadir al carrito', exact: false }),
  ).describedAs('botón "Añadir al carrito"'),
};
