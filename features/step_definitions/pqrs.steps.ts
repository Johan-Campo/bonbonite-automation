import { Given, Then, When } from '@cucumber/cucumber';

const pendienteDeImplementar = (paso: string): never => {
  throw new Error(`Pendiente de implementar: ${paso}`);
};

Given('que {word} visita el módulo "PQRS"', (_nombreActor: string) => {
  pendienteDeImplementar('visitar el módulo "PQRS"');
});

When('diligencia el formulario con sus datos de contacto y adjunta una evidencia', () => {
  pendienteDeImplementar('diligenciar el formulario de PQRS y adjuntar una evidencia');
});

When('lo envía', () => {
  pendienteDeImplementar('enviar el formulario de PQRS');
});

Then('el sistema confirma la recepción de la PQRS', () => {
  pendienteDeImplementar('verificar la confirmación de recepción de la PQRS');
});
