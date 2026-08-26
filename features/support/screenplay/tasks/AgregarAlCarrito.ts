import { Task, Wait } from '@serenity-js/core';
import { equals } from '@serenity-js/assertions';
import { Click, Navigate, Text } from '@serenity-js/web';

import { ContadorDelCarrito } from '../ui/carrito.js';
import { Producto } from '../ui/producto.js';

/**
 * "Añadir al carrito" no navega a otra página (el sitio muestra un mensaje de
 * confirmación transitorio sobre la misma ficha de producto), así que hay que navegar
 * al carrito explícitamente para poder verificarlo después.
 *
 * Se espera a que el contador del carrito llegue a "1" antes de navegar: se comprobó
 * que clicar "Añadir al carrito" inmediatamente después de elegir la talla, sin
 * esperar a que el estado de la página se actualice, puede no registrar el producto
 * (el carrito queda vacío pese a que el clic "tuvo éxito"). Asume que el navegador
 * arranca con el carrito vacío (contexto de Playwright sin cookies previas).
 */
export const AgregarAlCarrito = () =>
  Task.where(
    `#actor agrega el producto al carrito`,
    Click.on(Producto.botonAnadirAlCarrito),
    Wait.until(Text.of(ContadorDelCarrito), equals('1')),
    Navigate.to('/carrito/'),
  );
