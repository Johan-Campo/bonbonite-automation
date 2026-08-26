import { Cast, type Actor } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright';
import type { Browser } from 'playwright';

export class ActoresDelNavegador extends Cast {
  constructor(private readonly navegador: Browser) {
    super();
  }

  prepare(actor: Actor): Actor {
    return actor.whoCan(BrowseTheWebWithPlaywright.using(this.navegador));
  }
}
