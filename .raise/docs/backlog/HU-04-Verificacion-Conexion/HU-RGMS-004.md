*ID JIRA:* RGMS-HU-004
*Funcionalidad Relacionada:* [Épica 1: Configuración e Integración del Servidor MCP](../../planning/HU-RGMS-001.md#épica-1-configuración-e-integración-del-servidor-mcp)

*Como* desarrollador
*Quiero:* usar el comando `/mcp` en Gemini CLI mientras mi servidor local está corriendo
*Para:* verificar que la conexión es exitosa y que el estado del servidor aparece como "Ready".

*Criterios de Aceptación*
```gherkin
# language: es
@historia-RGMS-HU-004

Escenario: Conexión exitosa del servidor MCP
  @escenario-1
  Dado que mi servidor MCP está corriendo y Gemini CLI está configurado para conectarse a él
  Cuando ejecuto el comando `/mcp` en Gemini CLI
  Entonces el servidor configurado aparece en la lista con el estado "Ready"

```

*Detalles Técnicos*

*Componentes Clave*
```yaml
componentes:
  - nombre: "Gemini CLI"
    descripción: "Cliente que se conecta al servidor MCP."
    responsabilidad: "Mostrar el estado de la conexión del servidor MCP."
  - nombre: "Servidor MCP"
    descripción: "Servidor FastMCP que expone el endpoint SSE."
    responsabilidad: "Mantener la conexión activa y reportar su estado."
```

*Endpoints de API*
*(No aplica directamente a esta HU, es una verificación de conexión)*

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
  - Verificación manual de la salida del comando `/mcp`.
- [ ] *Pruebas de UI*
- [ ] *Pruebas de Rendimiento*
- [ ] *Pruebas de Seguridad*
- [ ] *Pruebas de Accesibilidad*

*Dependencias*

| ID | Tipo | Descripción | Estado |
|----|------|-------------|--------|
| RGMS-HU-003 | HU | Conexión de Gemini CLI al Servidor MCP | Completada |

*Estimación*

| Métrica | Valor |
|---------|-------|
| Puntos de Historia | 1 |
| Tiempo Estimado | 0.5h |

*Notas Adicionales*
- Este es un paso crucial para validar la configuración inicial.

*Consideraciones Especiales*
- Posibles problemas de firewall o red podrían impedir la conexión.

*Referencias*
- [Documentación Gemini CLI: Comando /mcp](https://cloud.google.com/gemini/docs/codeassist/gemini-cli#mcp-servers)
