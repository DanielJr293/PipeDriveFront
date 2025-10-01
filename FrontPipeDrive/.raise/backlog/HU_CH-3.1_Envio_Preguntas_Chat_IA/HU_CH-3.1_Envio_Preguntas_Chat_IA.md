*ID JIRA:* CH-3.1
*Funcionalidad Relacionada:* [Chat de Inteligencia Artificial](#)

*Como* Usuario
*Quiero* Escribir y enviar preguntas a la IA en el chat contextual
*Para* Obtener información o realizar análisis sobre el documento seleccionado.

*Criterios de Aceptación*
```gherkin
# language: es
@historia-CH-3.1

Escenario: Envío exitoso de una pregunta a la IA
  @escenario-1
  Dado que el `AIChat.jsx` está visible
  Cuando escribo una pregunta en el campo de entrada y la envío
  Entonces se debe realizar una llamada `POST /ai-chat` a la API de backend con mi `userId`, el `documentId` del archivo seleccionado y mi `query`.
  Y El campo de entrada para la pregunta debe ser claro y fácil de usar.
  Y Debe haber un indicador visual de carga mientras se espera la respuesta de la IA.
```

*Detalles Técnicos*

*Componentes Clave*
```yaml
componentes:
  - nombre: "AIChat.jsx"
    descripción: "Interfaz de chat con IA."
    responsabilidad: "Proporcionar un campo de entrada para el usuario, manejar el evento de envío y realizar la llamada a la API `/ai-chat`."
```

*Endpoints de API*
```yaml
api:
  - método: "POST"
    ruta: "/ai-chat"
    propósito: "Enviar una pregunta a la IA sobre un documento específico y recibir una respuesta."
    payload:
      userId: "string"
      documentId: "string"
      query: "string"
```

*Cambios en el Modelo de Datos*
```sql
-- No se requieren cambios en el modelo de datos de backend para esta HU.
-- El frontend necesitará un estado para almacenar el historial de preguntas y respuestas del chat.
```

*Consideraciones UI/UX*
- [x] El campo de entrada de texto debe ser fácilmente accesible y permitir entradas multilínea si es necesario.
- [x] Mostrar un indicador visual claro (ej. spinner) mientras se espera la respuesta de la IA.

*Mockups / Diseños*

![Mockup de AIChat con campo de entrada](link-a-mockup-hu-3.1)

*Pruebas Requeridas*

- [x] *Pruebas Unitarias*
  ```typescript
  describe('AIChat', () => {
    it('should send a query to the AI API on submit', async () => {
      // Test case
    });
    it('should display a loading indicator after sending a query', () => {
      // Test case
    });
    it('should clear the input field after sending a query', () => {
      // Test case
    });
  });
- [ ] *Pruebas de Integración*
- [ ] *Pruebas de UI*
- [ ] *Pruebas de Rendimiento*
- [ ] *Pruebas de Seguridad*
- [ ] *Pruebas de Accesibilidad*

*Dependencias*

| ID | Tipo | Descripción | Estado |
|----|------|-------------|--------|
| IA-2.2 | HU | Apertura del Chat de IA al Seleccionar Acción de .doc | Pendiente |

*Estimación*

| Métrica | Valor |
|---------|-------|
| Puntos de Historia | 5 |
| Tiempo Estimado | 8h |

*Notas Adicionales*

*Consideraciones Especiales*
- Manejar la asociación del `documentId` correcto con la consulta de la IA.
- Implementar una buena experiencia de usuario para el historial del chat.

*Referencias*
- [Requisitos del Proyecto - PRD-PDF-001](.raise/project_requirements.md)
- [Diseño Técnico - TEC-PDF-001](.raise/tech_design.md)
- [Contratos API - CON-PDF-001](.raise/contracts.md)
