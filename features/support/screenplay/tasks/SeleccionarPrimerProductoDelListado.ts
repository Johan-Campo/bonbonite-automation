import { Task } from '@serenity-js/core';
import { Click } from '@serenity-js/web';

import { ListadoDeProductos } from '../ui/producto.js';

export const SeleccionarPrimerProductoDelListado = () =>
  Task.where(
    `#actor selecciona el primer producto disponible del listado`,
    Click.on(ListadoDeProductos.enlacesDeProducto.first()),
  );
