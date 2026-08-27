import type { QuestionAdapter } from '@serenity-js/core';
import { By, PageElement } from '@serenity-js/web';

const mensajeVisible = () =>
  PageElement.located(By.role('status')).describedAs('mensaje de confirmación visible en la página');

export const MensajeDeConfirmacion = {
  mostrado: (): QuestionAdapter<string> => mensajeVisible().text(),
  elemento: () => mensajeVisible(),
};
