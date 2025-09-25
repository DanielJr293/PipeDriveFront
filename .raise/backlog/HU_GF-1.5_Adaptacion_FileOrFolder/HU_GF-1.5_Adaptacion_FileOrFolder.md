*ID JIRA:* GF-1.5
*Funcionalidad Relacionada:* [Gestión y Visualización de Google Drive](#)

*Como* Desarrollador
*Quiero* Reutilizar y adaptar el componente `FileOrFolder.jsx`
*Para* Representar de manera consistente los ítems de Google Drive y manejar sus acciones.

*Criterios de Aceptación*
```gherkin
# language: es
@historia-GF-1.5

Escenario: Componente `FileOrFolder.jsx` acepta props correctas
  @escenario-1
  Dado que el componente `FileOrFolder.jsx` es renderizado
  Cuando se le pasan `id`, `name`, `mimeType` como props
  Entonces el componente debe renderizar correctamente la información del ítem.

Escenario: Lógica de clic diferencia entre archivos y carpetas
  @escenario-2
  Dado que el componente `FileOrFolder.jsx` es renderizado
  Cuando se hace clic en un ítem
  Entonces la lógica de clic del componente debe invocar la función de navegación a carpeta si el `mimeType` es de carpeta, o la función de selección de archivo si el `mimeType` es de archivo.

Escenario: Visualización de iconos según el `mimeType`
  @escenario-3
  Dado que el componente `FileOrFolder.jsx` es renderizado con diferentes `mimeType`s
  Cuando se muestra un ítem
  Entonces el componente debe mostrar un icono o una representación visual diferente para archivos y carpetas.
```

*Detalles Técnicos*

*Componentes Clave*
```yaml
componentes:
  - nombre: "FileOrFolder.jsx"
    descripción: "Componente reutilizable para ítems de Drive."
    responsabilidad: "Renderizar la información de un archivo o carpeta, manejar eventos de clic y mostrar el icono correcto basado en el `mimeType`."
```

*Endpoints de API*
```yaml
api:
  - método: "N/A"
    ruta: "N/A"
    propósito: "Esta HU se centra en la adaptación del componente frontend y no interactúa directamente con una API."
```

*Cambios en el Modelo de Datos*
```sql
-- No se requieren cambios en el modelo de datos de backend para esta HU.
```

*Consideraciones UI/UX*
- [x] Los iconos de archivo y carpeta deben ser claros y fácilmente distinguibles.
- [x] El área clicable de cada ítem debe ser generosa para una buena usabilidad en diferentes dispositivos.

*Mockups / Diseños*

![Mockup de FileOrFolder con diferentes iconos](link-a-mockup-hu-1.5)

*Pruebas Requeridas*

- [x] *Pruebas Unitarias*
  ```typescript
  describe('FileOrFolder', () => {
    it('should render file details (id, name, mimeType)', () => {
      // Test case
    });
    it('should call onFolderClick when mimeType is a folder and clicked', () => {
      // Test case
    });
    it('should call onFileClick when mimeType is a file and clicked', () => {
      // Test case
    });
    it('should display folder icon for folder mimeTypes', () => {
      // Test case
    });
    it('should display file icon for file mimeTypes', () => {
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
| GF-1.1 | HU | Visualización del Contenido de la Raíz de Google Drive | Pendiente |
| GF-1.2 | HU | Navegación entre Carpetas de Google Drive | Pendiente |
| GF-1.4 | HU | Visualización del Contenido de Archivos Seleccionados | Pendiente |

*Estimación*

| Métrica | Valor |
|---------|-------|
| Puntos de Historia | 5 |
| Tiempo Estimado | 8h |

*Notas Adicionales*

*Consideraciones Especiales*
- Se debe utilizar la biblioteca `lucide-react` para los iconos.
- La diferenciación de `mimeType` para archivos `.doc` será crucial para HUs futuras.

*Referencias*
- [Requisitos del Proyecto - PRD-PDF-001](.raise/project_requirements.md)
- [Diseño Técnico - TEC-PDF-001](.raise/tech_design.md)
