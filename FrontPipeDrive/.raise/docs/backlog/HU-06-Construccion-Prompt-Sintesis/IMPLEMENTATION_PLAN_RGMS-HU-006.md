# Plan de Implementación Detallado para HU-06: Construcción de Prompt de Síntesis con Nombre de Archivo Único

**ID de la HU:** RGMS-HU-006
**Nombre de la HU:** Construcción de Prompt de Síntesis con Nombre de Archivo Único

### Fase 0: Verificación de Prerrequisitos y Entidades Clave

*   **Herramienta `generar_prd` definida:** [X] Verificado. (Se asume completada la HU-05).
*   **Plantilla PRD (`prd_template.md`):** [X] Verificado. (Asegurarse de que la plantilla exista en `.raise/templates/solution/project_requirements.md`).
*   **Plantilla de Prompt de Síntesis (ej. `generar_prd_prompt.txt`):** [X] Verificado. (Crear un archivo de texto con la estructura base del prompt de síntesis).

---

## 1. Preparación y Configuración

- [X] Crear una nueva rama de Git para la implementación de esta HU (ej. `feature/RGMS-HU-006-synthesis-prompt`).
- [X] Crear el archivo `generar_prd_prompt.txt` (o similar) en una ubicación accesible por el servidor MCP, conteniendo la estructura base del prompt de síntesis para Gemini CLI.

## 2. Diseño Detallado

- [X] Definir la lógica para generar un nombre de archivo único para el PRD (ej. usando `datetime` para un timestamp).
- [X] Diseñar la estructura del prompt de síntesis en `generar_prd_prompt.txt`, incluyendo placeholders para la plantilla PRD, el archivo de salida y las rutas de contexto.
- [X] Identificar las rutas absolutas para la plantilla PRD (`.raise/templates/solution/project_requirements.md`) y el directorio de salida (`.raise/docs/planning/`).

## 3. Desarrollo de Componentes

- [X] **`mcp_server.py` (dentro de `generar_prd` función):**
    - [X] Implementar la lógica para generar un nombre de archivo único para el PRD (ej. `PRD-YYYYMMDDHHMMSS.md`).
    - [X] Leer el contenido de la plantilla de prompt de síntesis (`generar_prd_prompt.txt`).
    - [X] Construir las rutas absolutas para la plantilla PRD y el archivo de salida.
    - [X] Formatear el prompt de síntesis, inyectando:
        - La ruta absoluta de la plantilla PRD.
        - La ruta absoluta del archivo de salida generado.
        - Las rutas absolutas de los archivos de contexto (`rutas_contexto`) en un formato que Gemini CLI pueda interpretar (ej. una lista de `- 'ruta'`).
    - [X] La función `generar_prd` debe devolver este prompt de síntesis formateado.

## 4. Pruebas Unitarias

- [ ] **`generar_prd` función:**
    - [ ] Escribir prueba unitaria para verificar que se genera un nombre de archivo único cada vez que se invoca la función.
    - [ ] Escribir prueba unitaria para verificar que el prompt de síntesis se construye correctamente, incluyendo todas las rutas y placeholders esperados.
    - [ ] Escribir prueba unitaria para verificar que las rutas de contexto se inyectan correctamente en el prompt.

## 5. Integración de Componentes

- [ ] Iniciar el servidor MCP.
- [ ] Invocar la herramienta `raise:generar_prd` desde Gemini CLI (con y sin `rutas_contexto`).
- [ ] Observar la respuesta de Gemini CLI para verificar que el prompt de síntesis se está enviando correctamente y que la IA comienza a procesarlo (aunque aún no maneje la interacción completa).

## 6. Pruebas de Aceptación (Mapeo a Criterios de Aceptación de la HU)

- [ ] Verificar AC: La lógica de la herramienta genera un string único para el nombre del archivo de salida (ej. `PRD-nombre_base-YYYYMMDD.md`).
- [ ] Verificar AC: La herramienta lee una plantilla de prompt base desde un archivo de texto.
- [ ] Verificar AC: La herramienta inyecta dinámicamente las rutas absolutas de la plantilla PRD, el archivo de salida único y todos los archivos de contexto en el prompt.
- [ ] Verificar AC: El prompt final contiene instrucciones explícitas para que el LLM realice la tarea de síntesis.

## 7. Documentación

- [ ] Documentar la estructura y el contenido de la plantilla de prompt de síntesis (`generar_prd_prompt.txt`).
- [ ] Actualizar la documentación de la herramienta `raise:generar_prd` para explicar cómo se construye el prompt.

## 8. Refinamiento y Revisión Final

- [ ] Realizar una revisión de código de la lógica de construcción del prompt.
- [ ] Asegurarse de que el prompt sea lo suficientemente claro y robusto para Gemini CLI.
- [ ] Fusionar la rama de la característica (`feature/RGMS-HU-006-synthesis-prompt`) en la rama principal.
