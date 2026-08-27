import { Given, Then, When } from '@cucumber/cucumber';
import { actorCalled, actorInTheSpotlight } from '@serenity-js/core';
import { Ensure, includes } from '@serenity-js/assertions';
import { Navigate } from '@serenity-js/web';

import { ContenidoDelCarrito } from '../support/screenplay/questions/ContenidoDelCarrito.js';
import { TituloDelProducto } from '../support/screenplay/questions/TituloDelProducto.js';
import { AceptarCookiesSiAparecen } from '../support/screenplay/tasks/AceptarCookiesSiAparecen.js';
import { AgregarAlCarrito } from '../support/screenplay/tasks/AgregarAlCarrito.js';
import { ElegirTallaDisponible } from '../support/screenplay/tasks/ElegirTallaDisponible.js';
import { SeleccionarPrimerProductoDelListado } from '../support/screenplay/tasks/SeleccionarPrimerProductoDelListado.js';

const URL_MODULOS: Record<string, string> = {
  Zapatos: '/categoria-producto/zapatos-mujer/',
  Bolsos: '/categoria-producto/bolsos-mujer/',
  Cinturones: '/categoria-producto/cinturones-mujer/',
  Accesorios: '/categoria-producto/accesorios-mujer/',
  Outlet: '/categoria-producto/outlet/',
};

const productoSeleccionadoPorActor = new Map<string, string>();

Given('que {word} navega al módulo {string}', async (nombreActor: string, modulo: string) => {
  const ruta = URL_MODULOS[modulo];
  if (!ruta) {
    throw new Error(`Módulo "${modulo}" no tiene una URL configurada en URL_MODULOS.`);
  }

  await actorCalled(nombreActor).attemptsTo(Navigate.to(ruta), AceptarCookiesSiAparecen());
});

When('selecciona el primer producto disponible del listado', async () => {
  const actor = actorInTheSpotlight();
  await actor.attemptsTo(SeleccionarPrimerProductoDelListado());

  const titulo = await actor.answer(TituloDelProducto());
  productoSeleccionadoPorActor.set(actor.name, titulo);
});

When('elige una talla disponible', async () => {
  await actorInTheSpotlight().attemptsTo(ElegirTallaDisponible());
});

When('lo agrega al carrito', async () => {
  await actorInTheSpotlight().attemptsTo(AgregarAlCarrito());
});

Then('el carrito refleja el producto agregado', async () => {
  const actor = actorInTheSpotlight();
  const titulo = productoSeleccionadoPorActor.get(actor.name);
  if (!titulo) {
    throw new Error('No se capturó el título del producto seleccionado en un paso previo.');
  }

  await actor.attemptsTo(Ensure.that(ContenidoDelCarrito(), includes(titulo)));
});
