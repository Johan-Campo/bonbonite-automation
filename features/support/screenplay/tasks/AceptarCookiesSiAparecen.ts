import { Check } from '@serenity-js/core';
import { Click, isVisible } from '@serenity-js/web';

import { BannerDeCookies } from '../ui/cookies.js';

export const AceptarCookiesSiAparecen = () =>
  Check.whether(BannerDeCookies.botonAceptarTodo, isVisible()).andIfSo(
    Click.on(BannerDeCookies.botonAceptarTodo),
  );
