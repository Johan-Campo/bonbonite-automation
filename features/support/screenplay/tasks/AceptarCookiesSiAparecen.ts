import { Check } from '@serenity-js/core';
import { Click, isVisible } from '@serenity-js/web';

import { BannerDeCookies } from '../ui/cookies.js';

/**
 * El banner de cookies solo aparece en un navegador sin consentimiento previo (ver
 * comentario en ui/cookies.ts), así que este paso es condicional: no falla si el
 * banner nunca aparece.
 */
export const AceptarCookiesSiAparecen = () =>
  Check.whether(BannerDeCookies.botonAceptarTodo, isVisible()).andIfSo(
    Click.on(BannerDeCookies.botonAceptarTodo),
  );
