*ID JIRA:* GF-1.2
*Funcionalidad Relacionada:* [Gestión y Visualización de Google Drive](#)

*Como* Usuario
*Quiero* Poder navegar por las subcarpetas de mi Google Drive
*Para* Acceder a documentos específicos dentro de una estructura organizada.

*Criterios de Aceptación*
```gherkin
# language: es
@historia-GF-1.2

Escenario: Navegación exitosa a una subcarpeta
  @escenario-1
  Dado que estoy viendo el contenido de una carpeta
  Cuando hago clic en un ítem de tipo "carpeta"
  Entonces se debe realizar una llamada `POST /DriveFolderArch` a la API de backend con mi `userId` y el `folderId` de la carpeta seleccionada.
  Y el sistema debe actualizar la vista para mostrar el contenido de la nueva carpeta.
  Y Debe haber un indicador visual de carga mientras se espera la respuesta de la API.
  Y El componente `FileOrFolder.jsx` debe ser adaptable para manejar el clic y diferenciar entre archivos y carpetas.

Escenario: Manejo de errores en la navegación de carpetas
  @escenario-2
  Dado que la API responde con un error
  Cuando se produce un fallo en la llamada a la API `POST /DriveFolderArch`
  Entonces el sistema debe mostrar un mensaje de error amigable y un indicador visual de fallo.
```

*Detalles Técnicos*

*Componentes Clave*
```yaml
componentes:
  - nombre: "TranscriptionList.jsx"
    descripción: "Componente principal para navegación de Drive y visualización de archivos."
    responsabilidad: "Gestionar el estado de la carpeta actual y realizar llamadas a la API para navegar."
  - nombre: "FileOrFolder.jsx"
    descripción: "Componente reutilizable para ítems de Drive."
    responsabilidad: "Renderizar un ítem de Drive y manejar el evento de clic, diferenciando entre archivo y carpeta."
```

*Endpoints de API*
```yaml
api:
  - método: "POST"
    ruta: "/DriveFolderArch"
    propósito: "Obtener el contenido de una carpeta específica de Google Drive."
    payload:
      userId: "string"
      folderId: "string"
```

*Cambios en el Modelo de Datos*
```sql
-- No se requieren cambios directos en el modelo de datos de backend para esta HU.
-- El frontend necesitará mantener un estado de la carpeta actual y posiblemente un historial de navegación.
```

*Consideraciones UI/UX*
- [x] Los elementos de carpeta deben ser claramente identificables y clicables.
- [x] Mostrar un indicador de carga al navegar a una nueva carpeta.

*Mockups / Diseños*

![Mockup de navegación entre carpetas](link-a-mockup-hu-1.2)

*Pruebas Requeridas*

- [x] *Pruebas Unitarias*
  ```typescript
  describe('TranscriptionList', () => {
    it('should navigate to a subfolder on folder click', async () => {
      // Test case
    });
    it('should display error on subfolder navigation failure', async () => {
      // Test case
    });
  });

  describe('FileOrFolder', () => {
    it('should trigger navigation function on folder click', () => {
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
| NS-4.2 | HU | Sistema Global de Notificaciones | Pendiente |
| GF-1.5 | HU | Adaptación del Componente FileOrFolder | Pendiente |

*Estimación*

| Métrica | Valor |
|---------|-------|
| Puntos de Historia | 8 |
| Tiempo Estimado | 12h |

*Notas Adicionales*

*Consideraciones Especiales*
- Se debe considerar cómo manejar la navegación hacia atrás (volver a la carpeta anterior).

*Referencias*
- [Requisitos del Proyecto - PRD-PDF-001](.raise/project_requirements.md)
- [Diseño Técnico - TEC-PDF-001](.raise/tech_design.md)
- [Contratos API - CON-PDF-001](.raise/contracts.md)
