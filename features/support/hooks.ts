import { After, AfterAll, Before, BeforeAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import type { ITestCaseHookParameter } from '@cucumber/cucumber';
import { actorInTheSpotlight, engage } from '@serenity-js/core';
import { TakeScreenshot } from '@serenity-js/web';
import { chromium, type Browser } from 'playwright';

import { ActoresDelNavegador } from './actors.js';

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
    return;
  }
});

AfterAll(async () => {
  await navegador?.close();
});
