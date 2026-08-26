import type { QuestionAdapter } from '@serenity-js/core';
import { By, PageElement } from '@serenity-js/web';

/**
 * Lee el mensaje de confirmación/estado que WooCommerce muestra tras una acción
 * (registro, actualización de cuenta, envío de formulario, etc.).
 * // TODO: verificar selector real contra el sitio — se asume que WooCommerce anota
 * sus avisos con role="alert" (patrón estándar de la plantilla woocommerce-message).
 */
const mensajeVisible = () =>
  PageElement.located(By.role('alert')).describedAs('mensaje de confirmación visible en la página');

export const MensajeDeConfirmacion = {
  mostrado: (): QuestionAdapter<string> => mensajeVisible().text(),
  elemento: () => mensajeVisible(),
};
