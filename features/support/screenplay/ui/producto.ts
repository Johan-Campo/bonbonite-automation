import { By, PageElement, PageElements } from '@serenity-js/web';

/**
 * DOM del listado de categoría y de la ficha de producto no fue inspeccionado en detalle
 * (solo se verificaron las URLs y los textos de los botones principales).
 * // TODO: verificar selector real contra el sitio — se asume el patrón estándar de
 * WooCommerce: cada producto del listado es un enlace <a> envolvente con la clase
 * "woocommerce-LoopProduct-link" cuyo nombre accesible es el título del producto.
 */
export const ListadoDeProductos = {
  enlacesDeProducto: PageElements.located(
    By.css('ul.products li.product a.woocommerce-LoopProduct-link'),
  ).describedAs('enlaces de producto del listado'),
};

/**
 * Sección "TALLA": botones con el número de talla, algunos deshabilitados por falta de
 * stock (hay que verificar isEnabled()/aria-disabled antes de hacer click y elegir la
 * primera talla habilitada).
 * // TODO: verificar selector real contra el sitio — se asume que los botones de talla
 * son <button> con el número como texto, dentro de la sección "TALLA"; falta confirmar
 * el contenedor exacto para acotar la búsqueda solo a esa sección.
 */
export const Producto = {
  botonesDeTalla: PageElements.located(By.css('button')).describedAs('botones de talla'),
  botonComprarAhora: PageElement.located(
    By.role('button', { name: 'COMPRAR AHORA', exact: true }),
  ).describedAs('botón "COMPRAR AHORA"'),
  botonAnadirAlCarrito: PageElement.located(
    By.role('button', { name: 'AÑADIR AL CARRITO', exact: false }),
  ).describedAs('botón "AÑADIR AL CARRITO"'),
};
