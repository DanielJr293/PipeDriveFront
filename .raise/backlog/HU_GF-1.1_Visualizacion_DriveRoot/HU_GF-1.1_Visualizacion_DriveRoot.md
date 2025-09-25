*ID JIRA:* GF-1.1
*Funcionalidad Relacionada:* [Gestión y Visualización de Google Drive](#)

*Como* Usuario
*Quiero* Ver el contenido de mi carpeta raíz de Google Drive (archivos y carpetas)
*Para* Tener un punto de partida para navegar mis documentos.

*Criterios de Aceptación*
```gherkin
# language: es
@historia-GF-1.1

Escenario: Visualización exitosa del contenido de la raíz
  @escenario-1
  Dado que el usuario accede a la sección "Drive", cuando la aplicación se carga
  Cuando se realiza una llamada `POST /DriveRoot` a la API de backend con mi `userId`
  Entonces el sistema debe mostrar una lista de archivos y carpetas en la interfaz de usuario.
  Y El listado debe mostrar el `name`, `id` y `mimeType` de cada ítem.
  Y Debe haber un indicador visual de carga mientras se espera la respuesta de la API.

Escenario: Manejo de errores en la visualización del contenido de la raíz
  @escenario-2
  Dado que la API responde con un error
  Cuando se produce un fallo en la llamada a la API
  Entonces el sistema debe mostrar un mensaje de error amigable y un indicador visual de fallo (ej. `NotificationSystem.jsx`).
```

*Detalles Técnicos*

*Componentes Clave*
```yaml
componentes:
  - nombre: "TranscriptionList.jsx"
    descripción: "Componente principal para navegación de Drive y visualización de archivos."
    responsabilidad: "Realizar la llamada a la API `/DriveRoot` y mostrar los resultados."
```

*Endpoints de API*
```yaml
api:
  - método: "POST"
    ruta: "/DriveRoot"
    propósito: "Obtener el contenido de la carpeta raíz de Google Drive."
    payload:
      userId: "string"
```

*Cambios en el Modelo de Datos*
```sql
-- No se requieren cambios directos en el modelo de datos de backend para esta HU.
-- El frontend manejará la estructura de datos recibida del backend.
```

*Consideraciones UI/UX*
- [x] Mostrar un spinner o esqueleto de carga mientras se obtienen los datos.
- [x] Presentar los archivos y carpetas de forma clara, con iconos distintivos.

*Mockups / Diseños*

![Mockup de la vista de la raíz de Google Drive](link-a-mockup-hu-1.1)

*Pruebas Requeridas*

- [x] *Pruebas Unitarias*
  ```typescript
  describe('TranscriptionList', () => {
    it('should display root drive content on successful API call', async () => {
      // Test case
    });
    it('should display error message on API call failure', async () => {
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

*Estimación*

| Métrica | Valor |
|---------|-------|
| Puntos de Historia | 5 |
| Tiempo Estimado | 8h |

*Notas Adicionales*

*Consideraciones Especiales*
- Asegurar que el `userId` se obtenga de forma segura y se envíe en la llamada a la API.

*Referencias*
- [Requisitos del Proyecto - PRD-PDF-001](.raise/project_requirements.md)
- [Diseño Técnico - TEC-PDF-001](.raise/tech_design.md)
- [Contratos API - CON-PDF-001](.raise/contracts.md)
