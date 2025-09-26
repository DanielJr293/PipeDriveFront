*ID JIRA:* GF-1.3
*Funcionalidad Relacionada:* [Gestión y Visualización de Google Drive](#)

*Como* Usuario
*Quiero* Poder regresar a la carpeta visitada anteriormente
*Para* Navegar de forma eficiente por el historial de mi Google Drive.

*Criterios de Aceptación*
```gherkin
# language: es
@historia-GF-1.3

Escenario: Retorno exitoso a la carpeta anterior
  @escenario-1
  Dado que he navegado a una subcarpeta
  Cuando hago clic en un botón "Volver"
  Entonces el sistema debe mostrar el contenido de la carpeta anterior.
  Y El sistema debe mantener un historial de `folderId`s visitados para la funcionalidad "Volver".
  Y El botón "Volver" solo debe estar visible si hay una carpeta anterior en el historial.

Escenario: Botón "Volver" no visible en la raíz
  @escenario-2
  Dado que estoy en la carpeta raíz de Google Drive
  Cuando no hay una carpeta anterior en el historial
  Entonces el botón "Volver" no debe estar visible.
```

*Detalles Técnicos*

*Componentes Clave*
```yaml
componentes:
  - nombre: "TranscriptionList.jsx"
    descripción: "Componente principal para navegación de Drive y visualización de archivos."
    responsabilidad: "Gestionar el historial de navegación de carpetas y controlar la visibilidad y acción del botón 'Volver'."
```

*Endpoints de API*
```yaml
api:
  - método: "N/A"
    ruta: "N/A"
    propósito: "Esta HU no requiere una llamada a API directa, sino la gestión del estado de navegación en el frontend."
```

*Cambios en el Modelo de Datos*
```sql
-- No se requieren cambios directos en el modelo de datos de backend para esta HU.
-- El frontend necesitará un mecanismo para almacenar el historial de `folderId`s (ej. un array en el estado).
```

*Consideraciones UI/UX*
- [x] El botón "Volver" debe ser intuitivo y estar claramente posicionado.
- [x] La visibilidad del botón debe gestionarse dinámicamente.

*Mockups / Diseños*

![Mockup del botón Volver](link-a-mockup-hu-1.3)

*Pruebas Requeridas*

- [x] *Pruebas Unitarias*
  ```typescript
  describe('TranscriptionList', () => {
    it('should navigate back to previous folder on "Volver" button click', () => {
      // Test case
    });
    it('should hide "Volver" button when at root folder', () => {
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
| GF-1.2 | HU | Navegación entre Carpetas de Google Drive | Pendiente |

*Estimación*

| Métrica | Valor |
|---------|-------|
| Puntos de Historia | 5 |
| Tiempo Estimado | 6h |

*Notas Adicionales*

*Consideraciones Especiales*
- Determinar la profundidad máxima del historial de navegación si es necesario.

*Referencias*
- [Requisitos del Proyecto - PRD-PDF-001](.raise/project_requirements.md)
- [Diseño Técnico - TEC-PDF-001](.raise/tech_design.md)
- [Contratos API - CON-PDF-001](.raise/contracts.md)
