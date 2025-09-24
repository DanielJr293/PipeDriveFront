*ID JIRA:* RGMS-HU-003
*Funcionalidad Relacionada:* [Épica 1: Configuración e Integración del Servidor MCP](../../planning/HU-RGMS-001.md#épica-1-configuración-e-integración-del-servidor-mcp)

*Como* desarrollador
*Quiero:* crear y configurar un archivo `.gemini/settings.json` para que Gemini CLI se conecte al endpoint SSE de mi servidor MCP local
*Para:* permitir que la CLI descubra y se comunique con el servidor.

*Criterios de Aceptación*
```gherkin
# language: es
@historia-RGMS-HU-003

Escenario: Archivo settings.json configurado correctamente
  @escenario-1
  Dado que tengo un servidor MCP básico corriendo
  Cuando creo y configuro el archivo `.gemini/settings.json`
  Entonces existe un archivo `.gemini/settings.json` en la raíz del proyecto
  Y el archivo contiene la configuración `mcpServers` apuntando a la URL del servidor local (ej. `http://localhost:8080/sse`)
  Y la sintaxis del JSON es válida

```

*Detalles Técnicos*

*Componentes Clave*
```yaml
componentes:
  - nombre: ".gemini/settings.json"
    descripción: "Archivo de configuración de Gemini CLI."
    responsabilidad: "Definir la conexión al servidor MCP local."
```

*Endpoints de API*
*(No aplica directamente a esta HU, configura la conexión a un endpoint existente)*

*Cambios en el Modelo de Datos*
*(No aplica directamente a esta HU)*

*Consideraciones UI/UX*
- (No aplica directamente a esta HU)

*Mockups / Diseños*
*(No aplica directamente a esta HU)*

*Pruebas Requeridas*

- [ ] *Pruebas Unitarias*
  *(No aplica directamente a esta HU)*
- [ ] *Pruebas de Integración*
  - Verificación manual de la configuración del `settings.json`.
- [ ] *Pruebas de UI*
- [ ] *Pruebas de Rendimiento*
- [ ] *Pruebas de Seguridad*
- [ ] *Pruebas de Accesibilidad*

*Dependencias*

| ID | Tipo | Descripción | Estado |
|----|------|-------------|--------|
| RGMS-HU-002 | HU | Creación del Servidor MCP Básico | Completada |

*Estimación*

| Métrica | Valor |
|---------|-------|
| Puntos de Historia | 1 |
| Tiempo Estimado | 1h |

*Notas Adicionales*
- Asegurarse de que la URL en `settings.json` coincida con el puerto en el que se ejecuta el servidor FastMCP.

*Consideraciones Especiales*
- La ruta del archivo `settings.json` es crucial para que Gemini CLI lo detecte.

*Referencias*
- [Documentación Gemini CLI: Configuración de mcpServers](https://cloud.google.com/gemini/docs/codeassist/gemini-cli#mcp-servers)
