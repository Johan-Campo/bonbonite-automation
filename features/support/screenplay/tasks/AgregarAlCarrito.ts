import { Task, Wait } from '@serenity-js/core';
import { equals } from '@serenity-js/assertions';
import { Click, Navigate, Text } from '@serenity-js/web';

import { ContadorDelCarrito } from '../ui/carrito.js';
import { Producto } from '../ui/producto.js';

export const AgregarAlCarrito = () =>
  Task.where(
    `#actor agrega el producto al carrito`,
    Click.on(Producto.botonAnadirAlCarrito),
    Wait.until(Text.of(ContadorDelCarrito), equals('1')),
    Navigate.to('/carrito/'),
  );
