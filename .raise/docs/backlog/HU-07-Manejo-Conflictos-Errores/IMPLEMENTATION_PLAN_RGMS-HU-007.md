# Plan de Implementación Detallado para HU-07: Manejo Interactivo de Conflictos y Errores

**ID de la HU:** RGMS-HU-007
**Nombre de la HU:** Manejo Interactivo de Conflictos y Errores

### Fase 0: Verificación de Prerrequisitos y Entidades Clave

*   **Prompt de Síntesis Construido:** [X] Verificado. (Se asume completada la HU-06).
*   **Conocimiento de Interacción de Gemini CLI:** [ ] Verificado. (El desarrollador debe entender cómo Gemini CLI maneja las preguntas al usuario y las respuestas).

---

## 1. Preparación y Configuración

- [ ] Crear una nueva rama de Git para la implementación de esta HU (ej. `feature/RGMS-HU-007-interactive-error-handling`).
- [ ] Asegurarse de que el entorno virtual esté activado y el servidor MCP pueda iniciarse.

## 2. Diseño Detallado

- [ ] Refinar la estructura del prompt de síntesis (`generar_prd_prompt.txt`) para incluir las instrucciones condicionales para el manejo de errores y conflictos.
- [ ] Definir las frases exactas que Gemini CLI debe usar para preguntar al usuario (ej. para sobrescribir, para continuar con contexto parcial).
- [ ] Identificar las herramientas internas de Gemini CLI que se pueden usar para verificar la existencia de archivos (ej. `read_file` o `glob` con manejo de errores).

## 3. Desarrollo de Componentes

- [ ] **`generar_prd_prompt.txt` (o similar):**
    - [ ] Añadir instrucciones al prompt para que Gemini CLI verifique la existencia del archivo de salida antes de escribir.
    - [ ] Incluir la pregunta exacta al usuario para sobrescribir si el archivo existe (ej. `El archivo 'X' ya existe. ¿Deseas sobrescribirlo? (sí/no)`).
    - [ ] Añadir instrucciones para que Gemini CLI verifique la existencia de la plantilla PRD.
    - [ ] Incluir lógica para informar al usuario si la plantilla PRD no se encuentra y cómo proceder.
    - [ ] Añadir instrucciones para que Gemini CLI verifique la existencia de cada archivo de contexto proporcionado.
    - [ ] Incluir lógica para informar al usuario si un archivo de contexto no se encuentra y preguntar si desea continuar con el contexto parcial o cancelar.

- [ ] **`mcp_server.py` (dentro de `generar_prd` función):**
    - [ ] Asegurarse de que la función `generar_prd` inyecta correctamente estas nuevas instrucciones condicionales en el prompt final.

## 4. Pruebas Unitarias

- [ ] **`generar_prd` función:**
    - [ ] Escribir prueba unitaria para verificar que el prompt generado contiene la lógica de verificación de archivo de salida y la pregunta de sobrescritura.
    - [ ] Escribir prueba unitaria para verificar que el prompt contiene la lógica de verificación de la plantilla PRD y el mensaje de error/pregunta.
    - [ ] Escribir prueba unitaria para verificar que el prompt contiene la lógica de verificación de los archivos de contexto y el mensaje de error/pregunta.

## 5. Integración de Componentes

- [ ] Iniciar el servidor MCP.
- [ ] Invocar la herramienta `raise:generar_prd` desde Gemini CLI en los siguientes escenarios:
    - [ ] El archivo de salida ya existe (verificar que se pregunta al usuario).
    - [ ] La plantilla PRD no existe (verificar que se informa al usuario).
    - [ ] Uno o más archivos de contexto no existen (verificar que se informa al usuario y se pregunta cómo proceder).
- [ ] Verificar que la interacción con el usuario es clara y que las acciones resultantes son las esperadas (sobrescribir, cancelar, continuar).

## 6. Pruebas de Aceptación (Mapeo a Criterios de Aceptación de la HU)

- [ ] Verificar AC: El prompt instruye al agente a verificar si el archivo de salida ya existe y, de ser así, pedir confirmación al usuario antes de sobrescribir.
- [ ] Verificar AC: El prompt instruye al agente a verificar que los archivos de plantilla y de contexto existan, informando al usuario si alguno no se encuentra y preguntando cómo proceder.

## 7. Documentación

- [ ] Actualizar la documentación de la herramienta `raise:generar_prd` para explicar el manejo interactivo de errores y conflictos.
- [ ] Añadir ejemplos de uso que demuestren cómo el usuario interactúa con la herramienta en escenarios de error.

## 8. Refinamiento y Revisión Final

- [ ] Realizar una revisión de código de la lógica de manejo de errores en el prompt.
- [ ] Asegurarse de que las instrucciones para Gemini CLI sean lo más claras y concisas posible para evitar ambigüedades.
- [ ] Fusionar la rama de la característica (`feature/RGMS-HU-007-interactive-error-handling`) en la rama principal.
