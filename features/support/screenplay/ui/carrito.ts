import { By, PageElement, PageElements } from '@serenity-js/web';

/**
 * // TODO: verificar selector real contra el sitio — la estructura exacta de la tabla
 * del carrito (clases CSS de fila/columna) no fue inspeccionada. Se usa el contenido
 * completo de la página como ámbito de verificación, suficiente para confirmar que el
 * nombre del producto agregado aparece en el carrito (verificado manualmente: el
 * nombre del producto en el carrito incluye la talla, ej. "Mocasín en cuero miel - 37").
 */
export const Carrito = {
  contenido: PageElement.located(By.css('body')).describedAs('contenido de la página del carrito'),
};

/**
 * Verificado contra el sitio real: el enlace del ícono del carrito en la barra de
 * navegación lleva la clase "cart-contents" y su texto es el número de artículos
 * (ej. "3"). Es más confiable que el mensaje de confirmación "SE HA AÑADIDO A TU
 * CARRITO", que es un toast transitorio que puede desaparecer antes de poder leerlo.
 *
 * Hay dos elementos con esta clase en la página (la barra de navegación de
 * escritorio y la del menú móvil oculto); se toma el primero explícitamente porque
 * un locator ambiguo hace fallar a Playwright en modo estricto.
 */
export const ContadorDelCarrito = PageElements.located(By.css('a.cart-contents'))
  .first()
  .describedAs('contador de artículos del carrito');
