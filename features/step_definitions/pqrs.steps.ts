import { Given, Then, When } from '@cucumber/cucumber';

// El formulario de PQRS exige adjuntar un archivo (input de tipo file, obligatorio) y no
// se verificó su DOM exacto. Estos steps existen para que el escenario cargue y falle de
// forma explícita, nunca en falso, hasta que se implemente el flujo completo.

const pendienteDeImplementar = (paso: string): never => {
  throw new Error(`Pendiente de implementar: ${paso}`);
};

Given('que {word} visita el módulo "PQRS"', () => {
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
