import { After, AfterAll, Before, BeforeAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import type { ITestCaseHookParameter } from '@cucumber/cucumber';
import type { StageCrewMember } from '@serenity-js/core';
import { ArtifactArchiver, actorInTheSpotlight, configure, engage } from '@serenity-js/core';
import { ConsoleReporter } from '@serenity-js/console-reporter';
import { SerenityBDDReporter } from '@serenity-js/serenity-bdd';
import { TakeScreenshot } from '@serenity-js/web';
import { chromium, type Browser } from 'playwright';

import { ActoresDelNavegador } from './actors.js';

setDefaultTimeout(30_000);

let navegador: Browser;

BeforeAll(async () => {
  configure({
    crew: [
      ConsoleReporter.withDefaultColourSupport(),
      ArtifactArchiver.storingArtifactsAt('target/site/serenity'),
      SerenityBDDReporter.fromJSON({ specDirectory: './features' }) as unknown as StageCrewMember,
    ],
  });

  try {
    navegador = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
  } catch (error) {
    console.error('No se pudo iniciar el navegador en BeforeAll:', error);
    throw error;
  }
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
  } catch (error) {
    console.error(
      `No se pudo capturar la pantalla tras el fallo de "${escenario.pickle.name}":`,
      error,
    );
  }
});

AfterAll(async () => {
  try {
    await navegador?.close();
  } catch (error) {
    console.error('No se pudo cerrar el navegador en AfterAll:', error);
  }
});
