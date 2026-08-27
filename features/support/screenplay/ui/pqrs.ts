import { By, PageElement } from '@serenity-js/web';

export const PQRS = {
  selectPuntoDeVenta: PageElement.located(By.css('select[name="select-1"]')).describedAs(
    'select "Punto de Venta"',
  ),
  campoNombreCompleto: PageElement.located(By.css('input[name="name-1"]')).describedAs(
    'campo "Nombre completo del cliente"',
  ),
  campoDireccionCiudad: PageElement.located(
    By.css('input[name="address-1-street_address"]'),
  ).describedAs('campo "Dirección y ciudad"'),
  selectTipoDocumento: PageElement.located(By.css('select[name="select-2"]')).describedAs(
    'select "Tipo de documento"',
  ),
  campoNumeroDocumento: PageElement.located(By.css('input[name="text-1"]')).describedAs(
    'campo "Número de documento"',
  ),
  campoTelefono: PageElement.located(By.css('input[name="phone-1"]')).describedAs(
    'campo "Teléfono"',
  ),
  campoCorreo: PageElement.located(By.css('input[name="email-1"]')).describedAs(
    'campo "Correo electrónico"',
  ),
  selectTipo: PageElement.located(By.css('select[name="select-3"]')).describedAs('select "Tipo"'),
  selectCausa: PageElement.located(By.css('select[name="select-4"]')).describedAs(
    'select "Causa relacionada"',
  ),
  campoDescripcion: PageElement.located(By.css('textarea[name="textarea-1"]')).describedAs(
    'campo "Descripción de la solicitud"',
  ),
  campoArchivo: PageElement.located(By.css('input[name="upload-1[]"]')).describedAs(
    'campo "Adjuntar archivos"',
  ),
  checkboxConsentimiento: PageElement.located(
    By.css('input[name="consent-1"] + span.forminator-checkbox-box'),
  ).describedAs('checkbox de consentimiento'),
  botonCrearPQRS: PageElement.located(
    By.role('button', { name: 'Crear PQRS', exact: false }),
  ).describedAs('botón "CREAR PQRS"'),
};
