import { Given, Then, When } from '@cucumber/cucumber';
import { Duration, Wait, actorInTheSpotlight, actorCalled } from '@serenity-js/core';
import { Ensure, includes } from '@serenity-js/assertions';
import { Click, Page } from '@serenity-js/web';

import { DiligenciarFormularioPQRS, datosDePQRSUnicos } from '../support/screenplay/tasks/DiligenciarFormularioPQRS.js';
import { VisitarPagina } from '../support/screenplay/tasks/VisitarPagina.js';
import { PQRS } from '../support/screenplay/ui/pqrs.js';

Given('que {word} visita el módulo "PQRS"', async (nombreActor: string) => {
  await actorCalled(nombreActor).attemptsTo(VisitarPagina('/pqrs/'));
});

When('diligencia el formulario con sus datos de contacto y adjunta una evidencia', async () => {
  const datos = datosDePQRSUnicos();
  await actorInTheSpotlight().attemptsTo(DiligenciarFormularioPQRS(datos));
});

When('lo envía', async () => {
  await actorInTheSpotlight().attemptsTo(
    Click.on(PQRS.botonCrearPQRS),
    Wait.upTo(Duration.ofSeconds(10)).until(
      Page.current().url().pathname,
      includes('/pqrs-radicada'),
    ),
  );
});

Then('el sistema confirma la recepción de la PQRS', async () => {
  await actorInTheSpotlight().attemptsTo(
    Ensure.that(Page.current().url().pathname, includes('/pqrs-radicada')),
  );
});
