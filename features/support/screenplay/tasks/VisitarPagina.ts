import { Task } from '@serenity-js/core';
import { Navigate } from '@serenity-js/web';

import { AceptarCookiesSiAparecen } from './AceptarCookiesSiAparecen.js';

export const VisitarPagina = (ruta: string) =>
  Task.where(`#actor visita ${ruta}`, Navigate.to(ruta), AceptarCookiesSiAparecen());
