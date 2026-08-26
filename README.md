# bonbonite-automation

Automatización E2E con **Serenity/JS** (patrón Screenplay) sobre Playwright y Cucumber.js, contra el sitio real [bon-bonite.com](https://www.bon-bonite.com/).

## Instalación

```bash
npm install
```

## Comandos

```bash
npm run typecheck        # compila TypeScript sin emitir (tsc --noEmit)
npx cucumber-js --dry-run  # valida que Cucumber carga escenarios y steps sin ejecutarlos
npm test                 # ejecuta cucumber-js contra el sitio real
```

> `npm test` navega y envía formularios contra producción (registra un usuario real, entre
> otras acciones). Ejecutar solo de forma intencional.

## Estructura

```
features/
├── *.feature                  # escenarios en Gherkin (español)
├── step_definitions/          # steps de Cucumber
└── support/
    ├── actors.ts               # Cast de actores (Serenity/JS + Playwright)
    ├── hooks.ts                # ciclo de vida del navegador y captura de pantalla en fallo
    └── screenplay/
        ├── ui/                 # locators (PageElement/By)
        ├── tasks/               # Tasks del patrón Screenplay
        └── questions/           # Questions del patrón Screenplay
```

## Estado

- **Registro y edición de cuenta**: implementado.
- **Compra de producto**: steps pendientes (`Pendiente de implementar`); no se procesa pago real.
- **PQRS**: steps pendientes (`Pendiente de implementar`); falta adjuntar evidencia real.
