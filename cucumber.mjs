const common = {
  import: [
    './tsx-register.js',
    'features/step_definitions/**/*.ts',
    'features/support/**/*.ts',
  ],
  format: ['@serenity-js/cucumber'],
  formatOptions: { useSerenityJsReporters: true },
  paths: ['features/**/*.feature'],
  publishQuiet: true,
};

// export default debe ser el objeto de configuración plano, no { default: common }:
// cucumber-js ya trata el "default" del namespace ESM como el perfil "default": envolverlo
// otra vez hace que la validación de esquema descarte todo el contenido como clave
// desconocida y ningún archivo de step_definitions/support llegue a importarse.
export default common;