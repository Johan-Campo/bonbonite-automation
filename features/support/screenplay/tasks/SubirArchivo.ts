import type { Answerable } from '@serenity-js/core';
import { Interaction } from '@serenity-js/core';
import type { PageElement } from '@serenity-js/web';
import type { Locator } from 'playwright';

export const SubirArchivo = (rutaArchivo: string, campo: Answerable<PageElement>) =>
  Interaction.where(`#actor sube el archivo ${rutaArchivo}`, async (actor) => {
    const elemento = await actor.answer(campo);
    const nativo = (await elemento.nativeElement()) as Locator;
    await nativo.setInputFiles(rutaArchivo);
  });
