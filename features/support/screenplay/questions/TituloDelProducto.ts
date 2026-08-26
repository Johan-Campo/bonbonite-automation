import type { QuestionAdapter } from '@serenity-js/core';

import { Producto } from '../ui/producto.js';

export const TituloDelProducto = (): QuestionAdapter<string> => Producto.titulo.text();
