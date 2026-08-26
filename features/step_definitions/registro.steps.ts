import { Given, Then, When } from '@cucumber/cucumber';
import { actorCalled, actorInTheSpotlight } from '@serenity-js/core';
import { Ensure } from '@serenity-js/assertions';
import { Click, Enter, Navigate, isVisible } from '@serenity-js/web';

import { MensajeDeConfirmacion } from '../support/screenplay/questions/MensajeDeConfirmacion.js';
import { MiCuenta } from '../support/screenplay/ui/miCuenta.js';
import { Registrarse, datosDeRegistroUnicos } from '../support/screenplay/tasks/Registrarse.js';
import type { DatosDeRegistro } from '../support/screenplay/tasks/Registrarse.js';

// Guarda, por nombre de actor, los datos de registro generados en el escenario para
// poder reutilizarlos en un paso posterior (ej. actualizar el nombre tras registrarse).
const datosRegistradosPorActor = new Map<string, DatosDeRegistro>();

Given('que {word} visita la página de "Mi cuenta" de Bon-bonite', async (nombreActor: string) => {
  await actorCalled(nombreActor).attemptsTo(Navigate.to('/mi-cuenta/'));
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
    Ensure.that(MiCuenta.cuentaLogueada.enlaceCerrarSesion, isVisible()),
  );
});

Given('que {word} ha iniciado sesión con una cuenta previamente registrada', async (nombreActor: string) => {
  // El sitio real no ofrece un mecanismo de fixtures/API para sembrar una cuenta de
  // antemano, así que se registra una cuenta nueva y única en este mismo paso.
  // WooCommerce autentica al cliente automáticamente tras un registro exitoso, lo que
  // cumple el propósito de "cuenta previamente registrada e iniciada sesión" sin
  // depender de credenciales fijas que podrían no existir en el ambiente de prueba.
  const datos = datosDeRegistroUnicos();
  datosRegistradosPorActor.set(nombreActor, datos);

  await actorCalled(nombreActor).attemptsTo(
    Navigate.to('/mi-cuenta/'),
    Registrarse(datos),
  );
});

When('actualiza su nombre desde "Mi cuenta"', async () => {
  const actor = actorInTheSpotlight();
  const datosPrevios = datosRegistradosPorActor.get(actor.name);
  const nuevoNombre = `${datosPrevios?.nombres ?? 'Camila'}Actualizada`;

  await actor.attemptsTo(
    Navigate.to('/mi-cuenta/editar-cuenta/'),
    // TODO: verificar selector real contra el sitio — ver comentario en miCuenta.ts
    // sobre el campo "Nombre" del formulario de edición de cuenta.
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
