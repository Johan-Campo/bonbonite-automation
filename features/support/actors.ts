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
        { defaultNavigationWaitUntil: 'networkidle' },
      ),
    );
  }
}
