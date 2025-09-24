*ID JIRA:* RGMS-HU-009
*Funcionalidad Relacionada:* Épica 3: Automatización de Análisis de Arquitectura (SAR)

*Como* desarrollador
*Quiero* implementar las herramientas MCP `raise:planificar-analisis-sar` y `raise:ejecutar-analisis-sar`
*Para* poder automatizar la generación de documentación de arquitectura (SAR) siguiendo la Kata L2-02 de forma modular y controlada.

*Criterios de Aceptación*
```gherkin
# language: es
@historia-RGMS-HU-009

Escenario: Planificación del Análisis SAR
  @escenario-1
  Dado que el servidor MCP está corriendo
  Cuando invoco la herramienta `raise:planificar-analisis-sar` con rutas a código fuente
  Entonces la herramienta genera un prompt que instruye al LLM a crear un plan de implementación
  Y se crea un archivo `.raise/docs/sar/IMPLEMENTATION_PLAN_SAR.md` con el plan detallado.

Escenario: Ejecución del Análisis SAR
  @escenario-2
  Dado que existe un plan de implementación en `.raise/docs/sar/IMPLEMENTATION_PLAN_SAR.md`
  Cuando invoco la herramienta `raise:ejecutar-analisis-sar` con la ruta al plan y al código fuente
  Entonces la herramienta genera un prompt que instruye al LLM a seguir el plan
  Y se crean múltiples archivos de documentación (service-overview.md, dependencies.md, etc.) en el directorio `.raise/docs/sar/`.

Escenario: Nuevos artefactos de servidor implementados
  @escenario-3
  Dado que se ha implementado la funcionalidad
  Entonces existen los archivos `src/prompts/planificar_sar_prompt.txt` y `src/prompts/ejecutar_sar_prompt.txt`
  Y el archivo `src/mcp_server.py` contiene las definiciones de las dos nuevas herramientas.
```

*Dependencias*

| ID | Tipo | Descripción | Estado |
|----|------|-------------|--------|
| N/A | N/A | N/A | N/A |

*Estimación*

| Métrica | Valor |
|---------|-------|
| Puntos de Historia | 8 |
| Tiempo Estimado | 12h |
