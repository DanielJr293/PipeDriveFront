---
document_id: "HU-RGMS-001"
title: "Historias de Usuario: Implementación del Raise-Gemini MCP Server"
project_name: "Raise-Gemini MCP Server"
related_docs:
  - "PRD-RGMS-001"
  - "TEC-RGMS-001"
status: "Draft"
---

# Historias de Usuario: Implementación del Raise-Gemini MCP Server

Este documento desglosa el trabajo definido en el Diseño Técnico (`TEC-RGMS-001`) en Historias de Usuario (HUs) accionables. Están agrupadas por épicas para organizar la implementación.

## Épica 1: Configuración e Integración del Servidor MCP

*Objetivo: Establecer la comunicación fundamental entre un servidor MCP de Python básico y la Gemini CLI.* 

---

### HU-01: Configuración del Entorno del Servidor

- **Como:** desarrollador,
- **Quiero:** configurar un entorno virtual de Python e instalar las dependencias necesarias (FastMCP),
- **Para:** poder empezar a desarrollar el servidor MCP sin conflictos de dependencias.

**Criterios de Aceptación:**
- [ ] Se ha creado un entorno virtual (ej. con `uv venv`).
- [ ] La dependencia `fastmcp` está instalada dentro del entorno virtual.
- [ ] Se puede ejecutar un script de Python simple desde el entorno activado.

---

### HU-02: Creación del Servidor MCP Básico

- **Como:** desarrollador,
- **Quiero:** crear un archivo `mcp_server.py` que inicie un servidor FastMCP básico con un endpoint SSE,
- **Para:** tener la estructura fundamental del servidor lista para añadirle herramientas.

**Criterios de Aceptación:**
- [ ] Existe un archivo `mcp_server.py`.
- [ ] El archivo contiene el código para instanciar `FastMCP` y ejecutarlo con `mcp.run()` en un puerto específico (ej. 8080) para SSE.
- [ ] El script se puede ejecutar (`python mcp_server.py`) y se mantiene corriendo sin errores.

---

### HU-03: Conexión de Gemini CLI al Servidor MCP

- **Como:** desarrollador,
- **Quiero:** crear y configurar un archivo `.gemini/settings.json` para que Gemini CLI se conecte al endpoint SSE de mi servidor MCP local,
- **Para:** permitir que la CLI descubra y se comunique con el servidor.

**Criterios de Aceptación:**
- [ ] Existe un archivo `.gemini/settings.json` en la raíz del proyecto.
- [ ] El archivo contiene la configuración `mcpServers` apuntando a la URL del servidor local (ej. `http://localhost:8080/sse`).
- [ ] La sintaxis del JSON es válida.

---

### HU-04: Verificación de la Conexión

- **Como:** desarrollador,
- **Quiero:** usar el comando `/mcp` en Gemini CLI mientras mi servidor local está corriendo,
- **Para:** verificar que la conexión es exitosa y que el estado del servidor aparece como "Ready".

**Criterios de Aceptación:**
- [ ] Al ejecutar `python mcp_server.py` y luego `gemini` en otra terminal, la CLI se inicia sin errores de conexión.
- [ ] Al escribir `/mcp` en el prompt de Gemini, se lista el servidor configurado en `settings.json` con el estado "Ready".

## Épica 2: Herramienta de Generación de PRD por Síntesis

*Objetivo: Implementar la funcionalidad principal de la herramienta `raise:generar-prd`, capaz de sintetizar documentos a partir de un contexto.* 

---

### HU-05: Creación de la Herramienta `generar_prd`

- **Como:** desarrollador,
- **Quiero:** definir una herramienta llamada `raise:generar_prd` en el servidor MCP que acepte una lista opcional de rutas de archivos de contexto,
- **Para:** poder invocar el proceso de generación de documentos desde Gemini CLI.

**Criterios de Aceptación:**
- [ ] En `mcp_server.py`, existe una función decorada con `@mcp.tool`.
- [ ] La función acepta un parámetro `rutas_contexto: list[str]` que es opcional.
- [ ] Al ejecutar `/mcp` en Gemini CLI, la herramienta `raise:generar_prd` aparece en la lista de herramientas disponibles para el servidor.

---

### HU-06: Construcción de Prompt de Síntesis con Nombre de Archivo Único

- **Como:** desarrollador,
- **Quiero:** que la herramienta `raise:generar_prd` construya dinámicamente un prompt de síntesis que incluya un nombre de archivo de salida único y todas las instrucciones necesarias,
- **Para:** instruir al agente de Gemini a realizar la tarea completa de generación de documentos en un solo paso.

**Criterios de Aceptación:**
- [ ] La lógica de la herramienta genera un string único para el nombre del archivo de salida (ej. `PRD-nombre_base-YYYYMMDD.md`).
- [ ] La herramienta lee una plantilla de prompt base desde un archivo de texto.
- [ ] La herramienta inyecta dinámicamente las rutas absolutas de la plantilla PRD, el archivo de salida único y todos los archivos de contexto en el prompt.
- [ ] El prompt final contiene instrucciones explícitas para que el LLM realice la tarea de síntesis.

---

### HU-07: Manejo Interactivo de Conflictos y Errores

- **Como:** desarrollador,
- **Quiero:** que el prompt generado incluya instrucciones para que el agente de Gemini maneje errores comunes de forma interactiva,
- **Para:** prevenir la pérdida accidental de datos y mejorar la resiliencia de la herramienta.

**Criterios de Aceptación:**
- [ ] El prompt instruye al agente a verificar si el archivo de salida ya existe y, de ser así, pedir confirmación al usuario antes de sobrescribir.
- [ ] El prompt instruye al agente a verificar que los archivos de plantilla y de contexto existan, informando al usuario si alguno no se encuentra y preguntando cómo proceder.
