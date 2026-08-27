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

export default common;