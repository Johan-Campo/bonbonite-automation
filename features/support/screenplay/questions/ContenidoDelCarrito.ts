import type { QuestionAdapter } from '@serenity-js/core';

import { Carrito } from '../ui/carrito.js';

export const ContenidoDelCarrito = (): QuestionAdapter<string> => Carrito.contenido.text();
