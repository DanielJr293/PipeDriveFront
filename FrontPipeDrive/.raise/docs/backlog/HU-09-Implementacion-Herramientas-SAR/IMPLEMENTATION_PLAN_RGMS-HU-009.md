# Plan de Implementación para HU-RGMS-009: Implementación de Herramientas SAR

**ID de la HU:** RGMS-HU-009
**Nombre de la HU:** Implementación de Herramientas MCP para Análisis SAR (`planificar` y `ejecutar`)

### Fase 0: Verificación de Prerrequisitos

*   [ ] **Conocimiento de la Arquitectura del Servidor:** El desarrollador debe estar familiarizado con la estructura de `mcp_server.py` y el uso de la utilidad `crear_prompt_documento`.
*   [ ] **Entorno de Desarrollo:** El entorno virtual con las dependencias (`fastmcp`) debe estar activo.

---

## 1. Preparación y Configuración

- [ ] **Control de Versiones:** Crear una nueva rama de Git para la tarea: `feature/RGMS-HU-009-sar-tools`.
- [ ] **Creación de Prompts:** Crear los dos nuevos archivos de prompt en el directorio `src/prompts/`:
    - [ ] `planificar_sar_prompt.txt`
    - [ ] `ejecutar_sar_prompt.txt`

## 2. Diseño Detallado

- [ ] **Diseño de Prompt de Planificación:** Definir el contenido exacto para `planificar_sar_prompt.txt`, incluyendo los placeholders para las Katas (`{KATA_ANALISIS_FILES}`, `{KATA_PLANIFICACION_FILES}`) y el código fuente (`{CONTEXT_PATHS}`).
- [ ] **Diseño de Prompt de Ejecución:** Definir el contenido para `ejecutar_sar_prompt.txt`, incluyendo placeholders para el plan (`{CONTEXT_PATHS}`), el código fuente (`{SOURCE_CODE_PATHS}`) y las plantillas SAR (`{SAR_TEMPLATE_FILES}`).
- [ ] **Diseño de Firmas de Herramientas:** Definir las firmas de las funciones `planificar_analisis_sar` y `ejecutar_analisis_sar` en `mcp_server.py`, asegurando que los `type hints` y los docstrings sean claros.

## 3. Desarrollo de Componentes

- [ ] **Implementar `planificar_analisis_sar`:**
    - [ ] En `mcp_server.py`, añadir la función `planificar_analisis_sar` con el decorador `@mcp.tool`.
    - [ ] Implementar la lógica que llama a `crear_prompt_documento` con la ruta al nuevo prompt y las rutas a las Katas L2-02 y L1-04.
- [ ] **Implementar `ejecutar_analisis_sar`:**
    - [ ] En `mcp_server.py`, añadir la función `ejecutar_analisis_sar` con el decorador `@mcp.tool`.
    - [ ] Implementar la lógica para encontrar dinámicamente las plantillas en `.raise/templates/sar/`.
    - [ ] Implementar la llamada a `crear_prompt_documento`, pasando la ruta al plan, las rutas a las plantillas y las rutas al código fuente a través de los `kwargs`.

## 4. Pruebas Unitarias

- [ ] **Pruebas para `planificar_analisis_sar`:** Escribir una prueba que invoque la función y verifique que el prompt resultante contiene las rutas a las Katas y el placeholder del contexto.
- [ ] **Pruebas para `ejecutar_analisis_sar`:** Escribir una prueba que invoque la función y verifique que el prompt resultante contiene los placeholders para el código fuente y las rutas a las plantillas SAR.

## 5. Integración de Componentes

- [ ] Iniciar el servidor MCP (`python src/mcp_server.py`).
- [ ] En otra terminal, iniciar Gemini CLI (`gemini`).
- [ ] Ejecutar el comando `/mcp` y verificar que las nuevas herramientas `raise:planificar-analisis-sar` y `raise:ejecutar-analisis-sar` aparecen en la lista y están `Ready`.

## 6. Pruebas de Aceptación

- [ ] **Verificar Escenario 1 (Planificación):**
    - [ ] Invocar `raise:planificar-analisis-sar` con una ruta de código fuente de prueba.
    - [ ] Confirmar que el archivo `.raise/docs/sar/IMPLEMENTATION_PLAN_SAR.md` se crea correctamente.
- [ ] **Verificar Escenario 2 (Ejecución):**
    - [ ] Invocar `raise:ejecutar-analisis-sar` usando el plan generado y el código de prueba.
    - [ ] Confirmar que los documentos de arquitectura (ej. `service-overview.md`) se crean en `.raise/docs/sar/`.
- [ ] **Verificar Escenario 3 (Artefactos):**
    - [ ] Confirmar la existencia de los dos nuevos archivos de prompt en `src/prompts/`.
    - [ ] Revisar el código de `src/mcp_server.py` para confirmar que las nuevas funciones están presentes.

## 7. Documentación

- [ ] Actualizar el `README.md` del proyecto para incluir las nuevas herramientas SAR, explicando su propósito y cómo usarlas en secuencia.

## 8. Refinamiento y Revisión Final

- [ ] Realizar una revisión de código de las nuevas funciones y prompts.
- [ ] Asegurarse de que el código sigue las convenciones del proyecto.
- [ ] Fusionar la rama `feature/RGMS-HU-009-sar-tools` a la rama principal.