import { Task } from '@serenity-js/core';
import { Click } from '@serenity-js/web';

import { Producto } from '../ui/producto.js';

export const ElegirTallaDisponible = () =>
  Task.where(`#actor elige una talla disponible`, Click.on(Producto.botonesDeTalla.first()));
