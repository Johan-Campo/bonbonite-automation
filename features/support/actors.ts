import { Cast, type Actor } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright';
import type { Browser } from 'playwright';

const URL_BASE_DEL_SITIO = 'https://www.bon-bonite.com';

export class ActoresDelNavegador extends Cast {
  constructor(private readonly navegador: Browser) {
    super();
  }

  prepare(actor: Actor): Actor {
    return actor.whoCan(
      BrowseTheWebWithPlaywright.using(
        this.navegador,
        { baseURL: URL_BASE_DEL_SITIO },
        // El sitio hace enrutamiento del lado del cliente: al hacer clic en un enlace
        // de producto, la URL cambia pero los botones de talla no quedan realmente
        // interactivos hasta que la página termina de hidratarse. Se verificó con un
        // script de Playwright aislado que "networkidle" es una señal fiable de que
        // ya se puede interactuar (a diferencia de "load", que se cumple antes).
        { defaultNavigationWaitUntil: 'networkidle' },
      ),
    );
  }
}
