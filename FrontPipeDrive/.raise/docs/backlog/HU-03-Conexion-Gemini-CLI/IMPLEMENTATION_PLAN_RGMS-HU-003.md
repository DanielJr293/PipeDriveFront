# Plan de Implementación Detallado para HU-03: Conexión de Gemini CLI al Servidor MCP

**ID de la HU:** RGMS-HU-003
**Nombre de la HU:** Conexión de Gemini CLI al Servidor MCP

### Fase 0: Verificación de Prerrequisitos y Entidades Clave

*   **Servidor MCP Básico:** [X] Verificado. (Se asume completada la HU-02).
*   **Gemini CLI instalado:** [X] Verificado. (Confirmado que Gemini CLI está en uso).

---

## 1. Preparación y Configuración

- [X] Crear una nueva rama de Git para la implementación de esta HU (ej. `feature/RGMS-HU-003-connect-gemini-cli`).
- [X] Asegurarse de que el servidor MCP (`mcp_server.py`) esté listo para ejecutarse.

## 2. Diseño Detallado

- [X] Identificar la ubicación del archivo `.gemini/settings.json` (raíz del proyecto).
- [X] Definir la estructura JSON necesaria para configurar `mcpServers` con la URL del endpoint SSE del servidor local.

## 3. Desarrollo de Componentes

- [X] **`.gemini/settings.json`:**
    - [X] Crear el archivo `.gemini/settings.json` en la raíz del proyecto si no existe.
    - [X] Añadir la configuración para el servidor MCP bajo la clave `mcpServers`.
    - [X] Especificar la `url` del endpoint SSE (ej. `"url": "http://localhost:8080/sse"`).
    - [X] Opcionalmente, añadir `"trust": true` para facilitar el desarrollo inicial.

## 4. Pruebas Unitarias (No aplica directamente, es una configuración)

- [X] Validar la sintaxis del JSON en `settings.json` utilizando un linter de JSON.

## 5. Integración de Componentes

- [X] Iniciar el servidor MCP (`python mcp_server.py`).
- [X] Iniciar Gemini CLI desde el directorio raíz del proyecto (`gemini`).
- [X] Observar la consola de Gemini CLI para cualquier mensaje de error relacionado con la conexión del MCP.
- [X] Verificar la conexión exitosa del servidor MCP utilizando el comando interno `/mcp` en Gemini CLI; debe aparecer como "Ready" y listar las herramientas. (Verificado con `raise:ping`).

## 6. Pruebas de Aceptación (Mapeo a Criterios de Aceptación de la HU)

- [X] Verificar AC: Existe un archivo `.gemini/settings.json` en la raíz del proyecto.
- [X] Verificar AC: El archivo contiene la configuración `mcpServers` apuntando a la URL del servidor local (ej. `http://localhost:8080/sse`).
- [X] Verificar AC: La sintaxis del JSON es válida.
- [X] Verificar AC: Gemini CLI descubre las herramientas expuestas por el servidor MCP (ej. `raise:ping`).
- [X] Verificar AC: La herramienta `raise:ping` se puede invocar desde Gemini CLI y devuelve la respuesta esperada.

## 7. Desarrollo e Implementación de Herramientas RaiSE (Futuro)

- [X] Desarrollar la función `generar_prd` en `mcp_server.py` y decorarla con `@mcp.tool("raise:generar-prd")`.
- [X] Implementar la lógica dentro de `generar_prd` para: 
    - [X] Leer el contenido de la plantilla `.raise/templates/prd_template.md`.
    - [X] Procesar la plantilla con los datos de entrada (nombre del PRD, etc.).
    - [X] Escribir el resultado final en la ruta `.raise/docs/planning/PRD-{nombre_prd}.md`.
- [X] Añadir pruebas de aceptación para la herramienta `raise:generar-prd`, incluyendo la verificación de la creación del archivo y la conformidad del contenido con la plantilla.

## 8. Documentación

- [X] Añadir un ejemplo de `settings.json` al `README.md` del proyecto, explicando cómo configurar la conexión al servidor MCP.
- [X] Documentar cualquier paso adicional necesario para la configuración de Gemini CLI (ej. autenticación).

## 9. Refinamiento y Revisión Final

- [X] Realizar una revisión del archivo `settings.json`.
- [X] Asegurarse de que la configuración sea clara y fácil de entender.
- [X] Fusionar la rama de la característica (`feature/RGMS-HU-003-connect-gemini-cli`) en la rama principal.
