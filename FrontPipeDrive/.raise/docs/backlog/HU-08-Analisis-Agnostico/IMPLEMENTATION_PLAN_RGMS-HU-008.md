# Plan de Implementación Detallado para la HU-RGMS-008: Análisis Agnóstico de Código Fuente

## 1. Preparación y Configuración

- [ ] Crear una nueva rama en git para esta tarea: `feature/HU-RGMS-008-analisis-agnostico`.
- [ ] Crear la estructura de directorios para los artefactos de documentación generados en `.raise/docs/sar/analisis-agnostico-fuente`.

## 2. Ejecución de la Kata L2-02 (Análisis y Generación de Documentos)

### Fase 1: Descubrimiento de la Superficie de la API

- [ ] **Paso 1.1: Identificar Puntos de Entrada (Endpoints)**
    - [ ] Analizar `src/mcp_server.py` para localizar todas las herramientas FastMCP (`@mcp.tool`).
    - [ ] Generar una lista en `raise/docs/sar/analisis-agnostico-fuente/01-api-surface.md` documentando cada herramienta, su propósito (del docstring) y sus parámetros.
- [ ] **Paso 1.2: Definir Contratos de Datos (Data Contracts)**
    - [ ] Para cada herramienta, detallar los `type hints` de los parámetros (request) y el tipo de retorno (response).
    - [ ] Añadir esta información a `01-api-surface.md`.

### Fase 2: Análisis de Dependencias y Colaboraciones

- [ ] **Paso 2.1: Mapear Dependencias Salientes (Egress Dependencies)**
    - [ ] Revisar el código en busca de llamadas a servicios externos (APIs, etc.). Para este proyecto, se espera que no haya.
    - [ ] Documentar los hallazgos en `raise/docs/sar/analisis-agnostico-fuente/02-dependencies.md`.
- [ ] **Paso 2.2: Identificar Dependencias de Infraestructura**
    - [ ] Analizar `requirements.txt` para listar las bibliotecas de Python.
    - [ ] Analizar `src/mcp_server.py` y `src/prompt_utils.py` para identificar dependencias del sistema de archivos (lectura de prompts).
    - [ ] Documentar estas dependencias en `02-dependencies.md`, explicando su propósito.

### Fase 3: Análisis de Lógica de Negocio y Resiliencia

- [ ] **Paso 3.1: Extraer Conceptos del Dominio (Domain Concepts)**
    - [ ] Analizar las herramientas de `src/mcp_server.py` y las funciones en `src/prompt_utils.py` para identificar los conceptos clave del dominio RaiSE que se manejan.
    - [ ] Generar un resumen del modelo de dominio en `raise/docs/sar/analisis-agnostico-fuente/03-domain-model.md`.
- [ ] **Paso 3.2: Detectar Patrones de Resiliencia y Manejo de Errores**
    - [ ] Buscar sistemáticamente bloques `try/except` y cualquier otra estrategia de manejo de errores en el código.
    - [ ] Crear una guía de resiliencia en `raise/docs/sar/analisis-agnostico-fuente/04-resilience-guide.md`.
- [ ] **Paso 3.3: Mapear Casos de Uso de Negocio**
    - [ ] Traducir cada herramienta FastMCP a una capacidad de negocio clara.
    - [ ] Generar un documento de casos de uso en `raise/docs/sar/analisis-agnostico-fuente/05-use-cases.md`.

### Fase 4: Síntesis y Generación de Documentación

- [ ] **Paso 4.1: Ensamblar el Documento de Visión General del Servicio**
    - [ ] Consolidar la información clave de las fases anteriores en `raise/docs/sar/analisis-agnostico-fuente/service-overview.md`.
- [ ] **Paso 4.2: Formalizar y Versionar los Artefactos**
    - [ ] Revisar que todos los artefactos generados (`01` a `05` y `service-overview.md`) sean consistentes y estén bien estructurados.
- [ ] **Paso 4.3: Crear un README para la Documentación Generada**
    - [ ] Crear un `README.md` en `raise/docs/sar/analisis-agnostico-fuente/` que explique el propósito y contenido de cada archivo generado.

## 3. Pruebas de Aceptación

- [ ] Verificar que todos los documentos (`README.md`, `service-overview.md`, `01` a `05`) se hayan generado en la ruta correcta.
- [ ] Revisar que el contenido de los documentos sea preciso y refleje fielmente el estado actual del código fuente.

## 4. Refinamiento y Revisión Final

- [ ] Revisar todos los documentos generados para asegurar claridad, completitud y consistencia.
- [ ] Hacer commit de los cambios en la rama `feature/HU-RGMS-008-analisis-agnostico`.
