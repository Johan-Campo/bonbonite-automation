import { Given, Then, When } from '@cucumber/cucumber';
import { actorCalled, actorInTheSpotlight } from '@serenity-js/core';
import { Ensure, includes } from '@serenity-js/assertions';
import { Click, Enter, Navigate, Page, isVisible } from '@serenity-js/web';

import { MensajeDeConfirmacion } from '../support/screenplay/questions/MensajeDeConfirmacion.js';
import { AceptarCookiesSiAparecen } from '../support/screenplay/tasks/AceptarCookiesSiAparecen.js';
import { MiCuenta } from '../support/screenplay/ui/miCuenta.js';
import { Registrarse, datosDeRegistroUnicos } from '../support/screenplay/tasks/Registrarse.js';
import type { DatosDeRegistro } from '../support/screenplay/tasks/Registrarse.js';

const datosRegistradosPorActor = new Map<string, DatosDeRegistro>();

Given('que {word} visita la página de "Mi cuenta" de Bon-bonite', async (nombreActor: string) => {
  await actorCalled(nombreActor).attemptsTo(Navigate.to('/mi-cuenta/'), AceptarCookiesSiAparecen());
});

When(
  'se registra con una cédula, nombres, apellidos, correo y contraseña válidos y únicos',
  async () => {
    const actor = actorInTheSpotlight();
    const datos = datosDeRegistroUnicos();
    datosRegistradosPorActor.set(actor.name, datos);

    await actor.attemptsTo(Registrarse(datos));
  },
);

Then('el sistema confirma que la cuenta fue creada exitosamente', async () => {
  await actorInTheSpotlight().attemptsTo(
    Ensure.that(Page.current().url().pathname, includes('/mi-cuenta/orders')),
  );
});

Given('que {word} ha iniciado sesión con una cuenta previamente registrada', async (nombreActor: string) => {
  const datos = datosDeRegistroUnicos();
  datosRegistradosPorActor.set(nombreActor, datos);

  await actorCalled(nombreActor).attemptsTo(
    Navigate.to('/mi-cuenta/'),
    AceptarCookiesSiAparecen(),
    Registrarse(datos),
  );
});

When('actualiza su nombre desde "Mi cuenta"', async () => {
  const actor = actorInTheSpotlight();
  const datosPrevios = datosRegistradosPorActor.get(actor.name);
  const nuevoNombre = `${datosPrevios?.nombres ?? 'Camila'}Actualizada`;

  await actor.attemptsTo(
    Navigate.to('/mi-cuenta/edit-account/'),
    Enter.theValue(nuevoNombre).into(MiCuenta.cuentaLogueada.campoNombre),
  );
});

When('guarda los cambios', async () => {
  await actorInTheSpotlight().attemptsTo(
    Click.on(MiCuenta.cuentaLogueada.botonGuardarCambios),
  );
});

Then('el sistema confirma que los datos fueron actualizados correctamente', async () => {
  await actorInTheSpotlight().attemptsTo(
    Ensure.that(MensajeDeConfirmacion.elemento(), isVisible()),
  );
});
