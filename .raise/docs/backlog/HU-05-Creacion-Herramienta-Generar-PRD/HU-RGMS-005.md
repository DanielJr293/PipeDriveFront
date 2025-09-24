*ID JIRA:* RGMS-HU-005
*Funcionalidad Relacionada:* [Épica 2: Herramienta de Generación de PRD por Síntesis](../../planning/HU-RGMS-001.md#épica-2-herramienta-de-generación-de-prd-por-síntesis)

*Como* desarrollador
*Quiero:* definir una herramienta llamada `raise:generar_prd` en el servidor MCP que acepte una lista opcional de rutas de archivos de contexto
*Para:* poder invocar el proceso de generación de documentos desde Gemini CLI.

*Criterios de Aceptación*
```gherkin
# language: es
@historia-RGMS-HU-005

Escenario: Herramienta `raise:generar_prd` definida y visible
  @escenario-1
  Dado que tengo un servidor MCP básico corriendo y conectado a Gemini CLI
  Cuando defino la función `generar_prd` en `mcp_server.py` y la decoro con `@mcp.tool`
  Entonces existe una función decorada con `@mcp.tool` en `mcp_server.py`
  Y la función acepta un parámetro `rutas_contexto: list[str]` que es opcional
  Y al ejecutar `/mcp` en Gemini CLI, la herramienta `raise:generar_prd` aparece en la lista de herramientas disponibles para el servidor

```

*Detalles Técnicos*

*Componentes Clave*
```yaml
componentes:
  - nombre: "mcp_server.py"
    descripción: "Archivo principal del servidor MCP."
    responsabilidad: "Contener la definición de la herramienta `generar_prd`."
```

*Endpoints de API*
*(No aplica directamente a esta HU, es la definición de una herramienta interna del MCP)*

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
  # from fastmcp import FastMCP
  # from unittest.mock import MagicMock
  # mcp = FastMCP(name="TestServer")
  # @mcp.tool
  # def generar_prd(rutas_contexto: list[str] = None):
  #     pass
  # # Verificar que la función existe y acepta el parámetro
  # assert hasattr(generar_prd, "__wrapped__") # Verifica que es una herramienta FastMCP
  # assert "rutas_contexto" in generar_prd.__wrapped__.__annotations__
  ```
- [ ] *Pruebas de Integración*
  - Verificación manual de la visibilidad de la herramienta con `/mcp` en Gemini CLI.
- [ ] *Pruebas de UI*
- [ ] *Pruebas de Rendimiento*
- [ ] *Pruebas de Seguridad*
- [ ] *Pruebas de Accesibilidad*

*Dependencias*

| ID | Tipo | Descripción | Estado |
|----|------|-------------|--------|
| RGMS-HU-004 | HU | Verificación de la Conexión | Completada |

*Estimación*

| Métrica | Valor |
|---------|-------|
| Puntos de Historia | 2 |
| Tiempo Estimado | 3h |

*Notas Adicionales*
- La definición de la herramienta debe ser clara para que FastMCP infiera correctamente el esquema.

*Consideraciones Especiales*
- Asegurarse de que los `type hints` sean correctos para `list[str]` y que el parámetro sea realmente opcional.

*Referencias*
- [Documentación FastMCP: Decorador @mcp.tool](https://gofastmcp.com/tutorials/create-mcp-server#defining-tools)
