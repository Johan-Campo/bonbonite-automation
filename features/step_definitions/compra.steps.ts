import { Given, Then, When } from '@cucumber/cucumber';

// Checkout/pago real queda fuera de alcance de esta iteración (no se debe procesar un
// pago real contra producción). Estos steps existen para que el escenario cargue y
// falle de forma explícita, nunca en falso, hasta que se implemente el flujo completo
// con los locators de features/support/screenplay/ui/producto.ts.

const pendienteDeImplementar = (paso: string): never => {
  throw new Error(`Pendiente de implementar: ${paso}`);
};

Given('que {word} navega al módulo "Zapatos"', () => {
  pendienteDeImplementar('navegar al módulo "Zapatos"');
});

When('selecciona el primer producto disponible del listado', () => {
  pendienteDeImplementar('seleccionar el primer producto disponible del listado');
});

When('elige una talla disponible', () => {
  pendienteDeImplementar('elegir una talla disponible (verificar isEnabled() antes de hacer click)');
});

When('lo agrega al carrito', () => {
  pendienteDeImplementar('agregar el producto al carrito');
});

Then('el carrito refleja el producto agregado', () => {
  pendienteDeImplementar('verificar que el carrito refleja el producto agregado');
});
