import { By, PageElement, PageElements } from '@serenity-js/web';

/**
 * El tema del sitio no usa el markup clásico de WooCommerce (verificado: no existen
 * enlaces "woocommerce-LoopProduct-link" ni texto/alt accesible en las imágenes de
 * producto — el alt viene vacío), así que no hay alternativa a un selector CSS aquí.
 * Verificado contra /categoria-producto/zapatos-mujer/: único contenedor
 * ".product_list" en la página, con un enlace "a.relative" por producto.
 */
export const ListadoDeProductos = {
  enlacesDeProducto: PageElements.located(By.css('.product_list a.relative')).describedAs(
    'enlaces de producto del listado',
  ),
};

/**
 * Verificado en un producto real (/producto/mocasin-en-cuero-miel/): los botones de
 * talla llevan la clase "variation-button" y el número como texto. El sitio NO usa el
 * atributo HTML "disabled" para marcar tallas agotadas (se confirmó "disabled: false"
 * en las 7 tallas de un producto con stock completo), así que no hay una señal de
 * accesibilidad fiable para descartar tallas agotadas desde este locator.
 * // TODO: si el escenario resulta flaky contra un producto agotado en alguna talla,
 * inspeccionar cómo se marca visualmente esa talla (probablemente otra clase CSS) y
 * filtrar por ella antes de elegir la primera.
 */
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
