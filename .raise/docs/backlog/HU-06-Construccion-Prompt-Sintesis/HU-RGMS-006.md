*ID JIRA:* RGMS-HU-006
*Funcionalidad Relacionada:* [Épica 2: Herramienta de Generación de PRD por Síntesis](../../planning/HU-RGMS-001.md#épica-2-herramienta-de-generación-de-prd-por-síntesis)

*Como* desarrollador
*Quiero:* que la herramienta `raise:generar_prd` construya dinámicamente un prompt de síntesis que incluya un nombre de archivo de salida único y todas las instrucciones necesarias
*Para:* instruir al agente de Gemini a realizar la tarea completa de generación de documentos en un solo paso.

*Criterios de Aceptación*
```gherkin
# language: es
@historia-RGMS-HU-006

Escenario: Prompt de síntesis generado correctamente
  @escenario-1
  Dado que la herramienta `raise:generar_prd` es invocada con o sin rutas de contexto
  Cuando la herramienta construye el prompt de síntesis
  Entonces la lógica de la herramienta genera un string único para el nombre del archivo de salida (ej. `PRD-nombre_base-YYYYMMDD.md`)
  Y la herramienta lee una plantilla de prompt base desde un archivo de texto
  Y la herramienta inyecta dinámicamente las rutas absolutas de la plantilla PRD, el archivo de salida único y todos los archivos de contexto en el prompt
  Y el prompt final contiene instrucciones explícitas para que el LLM realice la tarea de síntesis

```

*Detalles Técnicos*

*Componentes Clave*
```yaml
componentes:
  - nombre: "Lógica de `generar_prd`"
    descripción: "Implementación de la construcción del prompt de síntesis."
    responsabilidad: "Generar el nombre de archivo único y ensamblar el prompt con las instrucciones y rutas de contexto."
  - nombre: "Plantillas de Prompt (ej. `generar_prd_prompt.txt`)"
    descripción: "Archivos de texto que contienen la estructura base de los prompts para el LLM."
    responsabilidad: "Proveer la base para los prompts dinámicos."
```

*Endpoints de API*
*(No aplica directamente a esta HU)*

*Cambios en el Modelo de Datos*
*(No aplica directamente a esta HU)*

*Consideraciones UI/UX*
- (No aplica directamente a esta HU)

*Mockups / Diseños*
*(No aplica directamente a esta HU)*

*Pruebas Requeridas*

- [ ] *Pruebas Unitarias*
  ```python
  # Ejemplo de prueba unitaria (conceptual)
  # from mcp_server import generar_prd # Asumiendo que la función está en mcp_server
  # from unittest.mock import patch
  # 
  # def test_generar_prd_prompt_construction():
  #     with patch('builtins.open', mock_open(read_data='Template content {template_path} {output_path} {context_paths}')) as mock_file:
  #         # Simular la invocación de la herramienta
  #         result_prompt = generar_prd(rutas_contexto=['/path/to/context1.txt'])
  #         # Verificar que el prompt generado contiene las rutas y la lógica esperada
  #         assert 'Template content' in result_prompt
  #         assert 'PRD-' in result_prompt # Verifica la generación del nombre único
  #         assert '/path/to/context1.txt' in result_prompt
  ```
- [ ] *Pruebas de Integración*
  - Invocación de la herramienta desde Gemini CLI y verificación del prompt generado en los logs (si es posible) o del resultado final del documento.
- [ ] *Pruebas de UI*
- [ ] *Pruebas de Rendimiento*
- [ ] *Pruebas de Seguridad*
- [ ] *Pruebas de Accesibilidad*

*Dependencias*

| ID | Tipo | Descripción | Estado |
|----|------|-------------|--------|
| RGMS-HU-005 | HU | Creación de la Herramienta `generar_prd` | Completada |

*Estimación*

| Métrica | Valor |
|---------|-------|
| Puntos de Historia | 5 |
| Tiempo Estimado | 8h |

*Notas Adicionales*
- La complejidad de esta HU radica en la correcta construcción del prompt y el manejo de las rutas absolutas.

*Consideraciones Especiales*
- El formato exacto del prompt es crucial para que Gemini CLI lo interprete correctamente.

*Referencias*
- [Diseño Técnico: Raise-Gemini MCP Server](TEC-RGMS-001.md)
