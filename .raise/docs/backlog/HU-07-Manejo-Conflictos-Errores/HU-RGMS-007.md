*ID JIRA:* RGMS-HU-007
*Funcionalidad Relacionada:* [Épica 2: Herramienta de Generación de PRD por Síntesis](../../planning/HU-RGMS-001.md#épica-2-herramienta-de-generación-de-prd-por-síntesis)

*Como* desarrollador
*Quiero:* que el prompt generado incluya instrucciones para que el agente de Gemini maneje errores comunes de forma interactiva
*Para:* prevenir la pérdida accidental de datos y mejorar la resiliencia de la herramienta.

*Criterios de Aceptación*
```gherkin
# language: es
@historia-RGMS-HU-007

Escenario: Manejo de archivo de salida existente
  @escenario-1
  Dado que la herramienta `raise:generar_prd` ha construido un prompt de síntesis
  Cuando el prompt instruye al agente de Gemini a verificar si el archivo de salida ya existe
  Entonces el agente de Gemini pregunta al usuario si desea sobrescribir el archivo antes de proceder

Escenario: Manejo de plantilla no encontrada
  @escenario-2
  Dado que la herramienta `raise:generar_prd` ha construido un prompt de síntesis
  Cuando el prompt instruye al agente de Gemini a verificar que la plantilla PRD existe
  Entonces si la plantilla no se encuentra, el agente informa al usuario y pregunta cómo proceder (ej. cancelar o continuar sin plantilla)

Escenario: Manejo de archivo de contexto no encontrado
  @escenario-3
  Dado que la herramienta `raise:generar_prd` ha construido un prompt de síntesis
  Cuando el prompt instruye al agente de Gemini a verificar que los archivos de contexto existen
  Entonces si un archivo de contexto no se encuentra, el agente informa al usuario y pregunta cómo proceder (ej. continuar con contexto parcial o cancelar)

```

*Detalles Técnicos*

*Componentes Clave*
```yaml
componentes:
  - nombre: "Lógica de `generar_prd`"
    descripción: "Implementación de la lógica condicional dentro del prompt de síntesis."
    responsabilidad: "Asegurar que el prompt generado contenga las instrucciones para la interacción con el usuario en caso de conflictos o errores."
```

*Endpoints de API*
*(No aplica directamente a esta HU)*

*Cambios en el Modelo de Datos*
*(No aplica directamente a esta HU)*

*Consideraciones UI/UX*
- La claridad de las preguntas al usuario por parte de Gemini CLI es crucial para una buena experiencia.

*Mockups / Diseños*
*(No aplica directamente a esta HU)*

*Pruebas Requeridas*

- [ ] *Pruebas Unitarias*
  ```python
  # Ejemplo de prueba unitaria (conceptual)
  # from mcp_server import generar_prd
  # from unittest.mock import patch
  # 
  # def test_prompt_includes_overwrite_logic():
  #     # Simular la generación del prompt y verificar que contiene las frases clave
  #     result_prompt = generar_prd(rutas_contexto=[])
  #     assert 'pregúntale al usuario EXACTAMENTE lo siguiente: "El archivo' in result_prompt
  #     assert '¿Deseas sobrescribirlo? (sí/no)"' in result_prompt
  # 
  # def test_prompt_includes_template_check_logic():
  #     result_prompt = generar_prd(rutas_contexto=[])
  #     assert 'verifica si la ruta de la plantilla existe' in result_prompt
  ```
- [ ] *Pruebas de Integración*
  - Invocación de la herramienta desde Gemini CLI en escenarios de conflicto (archivo existente, plantilla/contexto faltante) y verificación de la interacción correcta con el usuario.
- [ ] *Pruebas de UI*
- [ ] *Pruebas de Rendimiento*
- [ ] *Pruebas de Seguridad*
- [ ] *Pruebas de Accesibilidad*

*Dependencias*

| ID | Tipo | Descripción | Estado |
|----|------|-------------|--------|
| RGMS-HU-006 | HU | Construcción de Prompt de Síntesis con Nombre de Archivo Único | Completada |

*Estimación*

| Métrica | Valor |
|---------|-------|
| Puntos de Historia | 3 |
| Tiempo Estimado | 6h |

*Notas Adicionales*
- La redacción precisa de las instrucciones en el prompt es vital para que Gemini CLI las interprete correctamente.

*Consideraciones Especiales*
- El agente de Gemini debe ser capaz de entender y actuar sobre las instrucciones condicionales del prompt.

*Referencias*
- [Diseño Técnico: Raise-Gemini MCP Server](TEC-RGMS-001.md)
