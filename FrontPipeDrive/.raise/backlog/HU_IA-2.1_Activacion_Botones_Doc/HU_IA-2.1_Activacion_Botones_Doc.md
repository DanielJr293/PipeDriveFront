*ID JIRA:* IA-2.1
*Funcionalidad Relacionada:* [Interacción Contextual con Documentos .doc](#)

*Como* Usuario
*Quiero* Ver botones de acción específicos (ej., "Resumen de la Llamada", "Propuesta") cuando selecciono un archivo `.doc`
*Para* Acceder rápidamente a funcionalidades inteligentes para ese tipo de documento.

*Criterios de Aceptación*
```gherkin
# language: es
@historia-IA-2.1

Escenario: Botones de acción visibles para archivos .doc
  @escenario-1
  Dado que he seleccionado un archivo con `mimeType` correspondiente a un `.doc`
  Cuando se carga el componente `DocActions.jsx`
  Entonces el componente `DocActions.jsx` debe volverse visible.
  Y El sistema debe identificar los `mimeType` correctos para documentos `.doc` (ej., `application/vnd.google-apps.document`, `application/msword`).
  Y Los botones de acción deben incluir al menos "Resumen de la Llamada", "Propuesta", "Preguntas" y "Acciones".

Escenario: Botones de acción ocultos para archivos que no son .doc
  @escenario-2
  Dado que he seleccionado un archivo que NO es `.doc`
  Cuando se carga el componente `DocActions.jsx`
  Entonces el componente `DocActions.jsx` debe estar oculto.
```

*Detalles Técnicos*

*Componentes Clave*
```yaml
componentes:
  - nombre: "DocActions.jsx"
    descripción: "Componente que muestra botones de acción contextuales para archivos .doc."
    responsabilidad: "Controlar su visibilidad en función del `mimeType` del archivo seleccionado y renderizar los botones de acción."
  - nombre: "TranscriptionList.jsx"
    descripción: "Componente principal para navegación de Drive y visualización de archivos."
    responsabilidad: "Gestionar el estado del archivo seleccionado y pasar su `mimeType` a `DocActions.jsx`."
```

*Endpoints de API*
```yaml
api:
  - método: "N/A"
    ruta: "N/A"
    propósito: "Esta HU no interactúa directamente con una API, se enfoca en la lógica de visibilidad del componente de acciones."
```

*Cambios en el Modelo de Datos*
```sql
-- No se requieren cambios en el modelo de datos de backend para esta HU.
-- El frontend necesitará un estado para almacenar el `mimeType` del archivo seleccionado.
```

*Consideraciones UI/UX*
- [x] Los botones de acción deben ser claros y distintivos.
- [x] La transición de visibilidad del componente `DocActions.jsx` debe ser fluida.

*Mockups / Diseños*

![Mockup de DocActions visible e invisible](link-a-mockup-hu-2.1)

*Pruebas Requeridas*

- [x] *Pruebas Unitarias*
  ```typescript
  describe('DocActions', () => {
    it('should be visible when a .doc file is selected', () => {
      // Test case
    });
    it('should be hidden when a non-.doc file is selected', () => {
      // Test case
    });
    it('should display specific action buttons', () => {
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
| GF-1.4 | HU | Visualización del Contenido de Archivos Seleccionados | Pendiente |

*Estimación*

| Métrica | Valor |
|---------|-------|
| Puntos de Historia | 5 |
| Tiempo Estimado | 8h |

*Notas Adicionales*

*Consideraciones Especiales*
- Es importante tener una lista exhaustiva de `mimeType`s que corresponden a documentos `.doc` (incluyendo Google Docs y Microsoft Word).

*Referencias*
- [Requisitos del Proyecto - PRD-PDF-001](.raise/project_requirements.md)
- [Diseño Técnico - TEC-PDF-001](.raise/tech_design.md)
- [Modelo de Dominio - DOM-PDF-001](.raise/domain-model.md)
