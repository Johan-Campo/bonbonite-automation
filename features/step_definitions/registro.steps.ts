import { Before, Given, Then, When } from '@cucumber/cucumber';
import { actorCalled, actorInTheSpotlight, Wait } from '@serenity-js/core';
import { Ensure, includes } from '@serenity-js/assertions';
import { Click, Enter, Navigate, Page, Text, isVisible } from '@serenity-js/web';

import { obtenerOFallar } from '../support/obtenerOFallar.js';
import { MiCuenta } from '../support/screenplay/ui/miCuenta.js';
import { Pagina } from '../support/screenplay/ui/pagina.js';
import { Registrarse, datosDeRegistroUnicos } from '../support/screenplay/tasks/Registrarse.js';
import { VisitarPagina } from '../support/screenplay/tasks/VisitarPagina.js';
import type { DatosDeRegistro } from '../support/screenplay/tasks/Registrarse.js';

const datosRegistradosPorActor = new Map<string, DatosDeRegistro>();
const nuevoNombrePorActor = new Map<string, string>();

Before(() => {
  datosRegistradosPorActor.clear();
  nuevoNombrePorActor.clear();
});

Given('que {word} visita la página de "Mi cuenta" de Bon-bonite', async (nombreActor: string) => {
  await actorCalled(nombreActor).attemptsTo(VisitarPagina('/mi-cuenta/'));
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

  await actorCalled(nombreActor).attemptsTo(VisitarPagina('/mi-cuenta/'), Registrarse(datos));
});

When('actualiza su nombre desde "Mi cuenta"', async () => {
  const actor = actorInTheSpotlight();
  const datosPrevios = datosRegistradosPorActor.get(actor.name);
  const nuevoNombre = `${datosPrevios?.nombres ?? 'Camila'}Actualizada`;
  nuevoNombrePorActor.set(actor.name, nuevoNombre);

  await actor.attemptsTo(
    Navigate.to('/mi-cuenta/edit-account/'),
    Click.on(MiCuenta.cuentaLogueada.botonActualizarInformacion),
    Enter.theValue(nuevoNombre).into(MiCuenta.cuentaLogueada.campoNombre),
  );
});

When('guarda los cambios', async () => {
  await actorInTheSpotlight().attemptsTo(
    Click.on(MiCuenta.cuentaLogueada.botonGuardar),
    Wait.until(MiCuenta.cuentaLogueada.botonActualizarInformacion, isVisible()),
  );
});

Then('el sistema confirma que los datos fueron actualizados correctamente', async () => {
  const actor = actorInTheSpotlight();
  const nuevoNombre = obtenerOFallar(
    nuevoNombrePorActor,
    actor.name,
    'No se capturó el nuevo nombre en un paso previo.',
  );

  await actor.attemptsTo(Ensure.that(Text.of(Pagina.cuerpo), includes(nuevoNombre)));
});
