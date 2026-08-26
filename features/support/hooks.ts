import { After, AfterAll, Before, BeforeAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import type { ITestCaseHookParameter } from '@cucumber/cucumber';
import { actorInTheSpotlight, engage } from '@serenity-js/core';
import { TakeScreenshot } from '@serenity-js/web';
import { chromium, type Browser } from 'playwright';

import { ActoresDelNavegador } from './actors.js';

// El timeout por defecto de Cucumber (5s) no alcanza para navegar contra el sitio
// real en producción (banner de envíos, imágenes, scripts de terceros como Yotpo).
setDefaultTimeout(30_000);

let navegador: Browser;

BeforeAll(async () => {
  navegador = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
});

Before(() => {
  engage(new ActoresDelNavegador(navegador));
});

After(async function (escenario: ITestCaseHookParameter) {
  if (escenario.result?.status !== Status.FAILED) {
    return;
  }

  try {
    await actorInTheSpotlight().attemptsTo(
      TakeScreenshot.of(`Fallo en "${escenario.pickle.name}"`),
    );
  } catch {
    // no había un actor activo (fallo antes de interactuar con el navegador);
    // no se oculta el fallo original del escenario por no poder tomar la captura.
  }
});

AfterAll(async () => {
  await navegador?.close();
});
