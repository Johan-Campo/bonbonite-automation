# bonbonite-automation

Automatización E2E con **Serenity/JS** (patrón Screenplay) sobre Playwright y Cucumber.js, contra el sitio real [bon-bonite.com](https://www.bon-bonite.com/).

## Instalación

```bash
npm install
```

Para generar el reporte HTML con evidencias (`npm run report`) se necesita además un **Java Runtime Environment (JRE)** instalado y disponible en el `PATH` (o vía la variable `JAVA_HOME`) — no hace falta para escribir ni correr las pruebas, solo para ese paso de reporte.

## Comandos

```bash
npm run typecheck        # compila TypeScript sin emitir (tsc --noEmit)
npm run lint              # revisa el código con ESLint
npm run lint:fix          # aplica las correcciones automáticas de ESLint
npx cucumber-js --dry-run  # valida que Cucumber carga escenarios y steps sin ejecutarlos
npm test                 # ejecuta cucumber-js contra el sitio real
npm run report            # genera el reporte HTML de Serenity BDD a partir de la última corrida
npm run test:report       # corre las pruebas y genera el reporte en un solo paso
```

> `npm test` navega y envía formularios contra producción (registra un usuario real, entre
> otras acciones). Ejecutar solo de forma intencional.

El reporte generado por `npm run report` queda en `target/site/serenity/index.html`.

## Estructura

```
features/
├── *.feature                  # escenarios en Gherkin (español)
├── step_definitions/          # steps de Cucumber
└── support/
    ├── actors.ts               # Cast de actores (Serenity/JS + Playwright)
    ├── hooks.ts                # ciclo de vida del navegador, reporters y captura de pantalla en fallo
    └── screenplay/
        ├── ui/                 # locators (PageElement/By)
        ├── tasks/               # Tasks del patrón Screenplay
        └── questions/           # Questions del patrón Screenplay
```

## Estado

- **Registro y edición de cuenta**: implementado y verificado contra el sitio real.
- **Compra de producto**: implementado y verificado contra el sitio real; no se procesa pago real (se detiene en la verificación del carrito).
- **PQRS**: steps pendientes (`Pendiente de implementar`); falta adjuntar evidencia real.
