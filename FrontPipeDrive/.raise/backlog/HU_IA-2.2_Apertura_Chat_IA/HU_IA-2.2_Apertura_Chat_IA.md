*ID JIRA:* IA-2.2
*Funcionalidad Relacionada:* [Interacción Contextual con Documentos .doc](#)

*Como* Usuario
*Quiero* Que se abra la interfaz de chat con IA al hacer clic en un botón de acción de un documento `.doc`
*Para* Iniciar la interacción inteligente sobre el contenido del documento.

*Criterios de Aceptación*
```gherkin
# language: es
@historia-IA-2.2

Escenario: Apertura del chat de IA al hacer clic en un botón de acción
  @escenario-1
  Dado que el componente `DocActions.jsx` está visible
  Cuando hago clic en cualquiera de sus botones de acción
  Entonces el componente `AIChat.jsx` debe activarse y volverse visible.
  Y El contenido del archivo `.doc` previamente seleccionado debe ser accesible para el componente `AIChat.jsx`.
  Y Se debe establecer un estado (`isAIChatActive`) para controlar la visibilidad del chat.
```

*Detalles Técnicos*

*Componentes Clave*
```yaml
componentes:
  - nombre: "DocActions.jsx"
    descripción: "Componente que muestra botones de acción contextuales para archivos .doc."
    responsabilidad: "Emitir un evento o cambiar un estado global que active la visibilidad del chat de IA al hacer clic en un botón."
  - nombre: "AIChat.jsx"
    descripción: "Interfaz de chat con IA."
    responsabilidad: "Controlar su visibilidad en función de un estado (`isAIChatActive`) y recibir el contenido del documento para la interacción."
  - nombre: "TranscriptionList.jsx"
    descripción: "Componente principal para navegación de Drive y visualización de archivos."
    responsabilidad: "Gestionar el estado `isAIChatActive` y el contenido del archivo seleccionado."
```

*Endpoints de API*
```yaml
api:
  - método: "N/A"
    ruta: "N/A"
    propósito: "Esta HU se enfoca en la interacción entre componentes frontend, no en llamadas directas a la API."
```

*Cambios en el Modelo de Datos*
```sql
-- No se requieren cambios en el modelo de datos de backend para esta HU.
-- El frontend necesitará un estado booleano (`isAIChatActive`) para controlar la visibilidad del chat y una forma de pasar el contenido del documento.
```

*Consideraciones UI/UX*
- [x] La apertura del chat debe ser una transición suave y clara.
- [x] El chat debe mostrar el contexto del documento con el que se está interactuando.

*Mockups / Diseños*

![Mockup de AIChat abriéndose](link-a-mockup-hu-2.2)

*Pruebas Requeridas*

- [x] *Pruebas Unitarias*
  ```typescript
  describe('DocActions', () => {
    it('should set isAIChatActive to true on action button click', () => {
      // Test case
    });
  });

  describe('AIChat', () => {
    it('should be visible when isAIChatActive is true', () => {
      // Test case
    });
    it('should receive document content when activated', () => {
      // Test case
    });
  });
  ```
- [ ] *Pruebas de Integración*
- [ ] *Pruebas de UI*
- [ ] *Pruebas de Rendimiento*
- [ ] *Pruebas de Seguridad*
- [ ] *Pruebas de Accesibilidad*

*Dependencias*

| ID | Tipo | Descripción | Estado |
|----|------|-------------|--------|
| IA-2.1 | HU | Activación de Botones de Acción para Archivos .doc | Pendiente |
| GF-1.4 | HU | Visualización del Contenido de Archivos Seleccionados | Pendiente |

*Estimación*

| Métrica | Valor |
|---------|-------|
| Puntos de Historia | 5 |
| Tiempo Estimado | 6h |

*Notas Adicionales*

*Consideraciones Especiales*
- Decidir si el estado `isAIChatActive` se manejará localmente en `TranscriptionList.jsx` o globalmente (ej. con Context API o Redux).

*Referencias*
- [Requisitos del Proyecto - PRD-PDF-001](.raise/project_requirements.md)
- [Diseño Técnico - TEC-PDF-001](.raise/tech_design.md)
- [Service Overview - SVC-PDF-001](.raise/service-overview.md)
