# bonbonite-automation

Automatización de pruebas end-to-end para el sitio [bon-bonite.com](https://www.bon-bonite.com/), usando el patrón **Screenplay** de Serenity/JS.

## Sobre este proyecto

Bon-bonite es una tienda de calzado, bolsos, cinturones y accesorios que puso en funcionamiento la primera versión de su sitio web. Este proyecto automatiza tres flujos críticos de esa primera versión, verificados contra el sitio real en producción:

- **Registro y edición de cuenta**: un cliente se registra con datos únicos y luego modifica su nombre desde "Mi cuenta".
- **Compra de producto**: un cliente navega un módulo del catálogo, selecciona un producto y una talla disponible, y lo agrega al carrito.
- **Radicación de PQRS**: un cliente diligencia el formulario de peticiones, quejas y reclamos, adjunta una evidencia y confirma la recepción de su solicitud.

Cada escenario está escrito en Gherkin (español) y se ejecuta con Cucumber.js orquestando actores de Serenity/JS, que a su vez controlan un navegador real vía Playwright — sin mocks ni ambiente de pruebas aislado: las pruebas interactúan con bon-bonite.com tal como lo haría un cliente real.

## Estructura del proyecto

```
features/
├── *.feature                          # Los 3 escenarios, escritos en Gherkin (español)
├── step_definitions/                  # Conecta cada línea del .feature con el código que la ejecuta
│   ├── registro.steps.ts
│   ├── compra.steps.ts
│   └── pqrs.steps.ts
└── support/
    ├── actors.ts                      # Configura el actor y la navegación (URL base, esperas)
    ├── hooks.ts                       # Ciclo de vida: abre/cierra el navegador, reportes, captura en fallos
    ├── fixtures/                      # Archivos de prueba (ej. evidencia para adjuntar en PQRS)
    └── screenplay/                    # El patrón Screenplay de Serenity/JS
        ├── ui/                        # Dónde están los elementos en cada página (selectores)
        ├── tasks/                     # Qué hace el actor (ej. "Registrarse", "AgregarAlCarrito")
        └── questions/                 # Qué puede consultar el actor (ej. el título de un producto)
```

## Stack tecnológico

| Herramienta | Para qué se usa |
|---|---|
| **TypeScript** | Lenguaje en el que está escrito todo el código de automatización |
| **Serenity/JS** | Framework de automatización con el patrón Screenplay (Actor, Task, Question) |
| **Playwright** | Motor que controla el navegador real (Chromium) |
| **Cucumber.js** | Permite escribir los escenarios de prueba en español, en lenguaje natural |
| **ESLint** | Revisa la calidad y consistencia del código |
| **Serenity BDD** | Genera el reporte HTML final con capturas de pantalla como evidencia (requiere Java, ver más abajo) |

## Cómo ejecutar el proyecto

Esta guía asume que no tienes nada instalado todavía. Sigue los pasos en orden.

### 1. Instalar Node.js

Node.js es el programa que permite ejecutar este proyecto.

1. Entra a [nodejs.org](https://nodejs.org/) y descarga la versión **LTS** (la recomendada).
2. Instálalo como cualquier programa (siguiente, siguiente, finalizar).
3. Para confirmar que quedó instalado, abre una terminal (en Windows: busca "cmd" o "PowerShell" en el menú de inicio; en Mac: busca "Terminal") y escribe:

   ```bash
   node -v
   ```

   Si ves un número de versión (por ejemplo `v24.18.1`), quedó instalado correctamente.

### 2. Descargar el proyecto

Si tienes Git instalado, en la terminal escribe:

```bash
git clone https://github.com/Johan-Campo/bonbonite-automation.git
cd bonbonite-automation
```

Si no tienes Git, puedes descargar el proyecto como archivo ZIP desde GitHub (botón verde "Code" → "Download ZIP") y descomprimirlo en tu computador. Luego, en la terminal, entra a esa carpeta con `cd` seguido de la ruta donde la descomprimiste.

### 3. Instalar las dependencias del proyecto

Dentro de la carpeta del proyecto (en la terminal), escribe:

```bash
npm install
```

Esto descarga todas las librerías que el proyecto necesita para funcionar. Puede tardar uno o dos minutos.

### 4. Instalar el navegador que usarán las pruebas

```bash
npx playwright install chromium
```

Esto descarga una versión de Chromium (el navegador que usa Google Chrome) que Playwright controla automáticamente durante las pruebas. Es independiente del Chrome que ya tengas instalado.

### 5. Ejecutar las pruebas

```bash
npm test
```

Esto abre un navegador de forma automática y ejecuta los escenarios de prueba contra el sitio real bon-bonite.com. Verás en la terminal, paso a paso, qué está haciendo cada prueba y si pasó o falló.

> **Importante:** estas pruebas interactúan con el sitio real en producción — registran un usuario real y radican una PQRS real, entre otras acciones. No es un ambiente de pruebas aislado.

### 6. Generar el reporte con evidencias (opcional)

Este paso genera un reporte HTML navegable, con capturas de pantalla, mostrando el resultado de cada prueba paso a paso.

Requiere tener instalado un **JRE (Java Runtime Environment)** — no todo Java, solo la parte necesaria para ejecutar programas ya compilados:

1. Descarga un JRE gratuito, por ejemplo desde [adoptium.net](https://adoptium.net/) (elige la opción "JRE", no "JDK").
2. Instálalo.
3. En la terminal, confirma que quedó instalado:

   ```bash
   java -version
   ```

Con Java instalado, corre las pruebas y genera el reporte en un solo paso:

```bash
npm run test:report
```

O si ya corriste `npm test` antes y solo quieres generar el reporte de esa corrida:

```bash
npm run report
```

El reporte queda en el archivo `target/site/serenity/index.html` — ábrelo con doble clic para verlo en tu navegador.

### Otros comandos disponibles

```bash
npm run typecheck   # Verifica que el código no tenga errores de tipos
npm run lint         # Revisa el código con ESLint
npm run lint:fix     # Corrige automáticamente lo que ESLint pueda arreglar solo
```
