# IMPLEMENTATION_PLAN_GF-1.1.md

## Plan de Implementación Detallado para HU GF-1.1: Visualización del Contenido de la Raíz de Google Drive

### 1. Preparación y Configuración

- [ ] Crear nueva rama de desarrollo para la HU (ej. `feature/GF-1.1-drive-root-view`).
- [ ] Revisar `dependencies.yaml` para asegurar que las librerías necesarias (ej. `axios` para llamadas API, `lucide-react` para iconos) estén configuradas. (Ref: L2-01-frontend-dependency-management.mdc)
- [ ] Asegurar que el `userId` esté disponible para las llamadas a la API (ej. desde el contexto de la aplicación o la URL).

### 2. Diseño Detallado (si es necesario para componentes complejos)

- [ ] Definir la estructura del estado en `TranscriptionList.jsx` para `driveItems` (archivos/carpetas), `isLoading` y `error`. (Ref: L2-02-react-state-management.mdc)
- [ ] Diseñar la integración del `NotificationSystem.jsx` para que reciba y muestre los mensajes de error/éxito de las llamadas a la API. (Ref: L2-03-react-component-composition.mdc)

### 3. Desarrollo de Componentes

#### 3.1. `TranscriptionList.jsx` - Componente Principal

- [ ] Modificar `TranscriptionList.jsx` para realizar la llamada `POST /DriveRoot` al montar el componente (ej. usando `useEffect`). (Ref: L2-04-react-api-integration.mdc)
- [ ] Implementar la lógica para manejar el estado de carga (`isLoading`) y error (`error`) durante la llamada a la API. (Ref: L2-04-react-api-integration.mdc, L3-03-frontend-error-handling.mdc)
- [ ] Renderizar condicionalmente un spinner o mensaje de carga mientras `isLoading` es `true`. (Ref: L2-05-react-conditional-rendering.mdc)
- [ ] Mapear la respuesta de la API (`GoogleDrive.files`) a la estructura de datos interna para `driveItems`. (Ref: L3-01-data-transformation.mdc)
- [ ] Pasar `driveItems` a `FileOrFolder.jsx` para su renderizado. (Ref: L2-03-react-component-composition.mdc)

#### 3.2. `NotificationSystem.jsx` - Manejo de Notificaciones

- [ ] Implementar/Modificar `NotificationSystem.jsx` para mostrar notificaciones tipo "toast" para éxito y error. (Ref: L2-06-react-ui-components.mdc, L3-03-frontend-error-handling.mdc)
- [ ] Integrar `NotificationSystem.jsx` en `TranscriptionList.jsx` para mostrar errores de la API `POST /DriveRoot`.

#### 3.3. `FileOrFolder.jsx` - Renderizado de Ítem

- [ ] Asegurar que `FileOrFolder.jsx` acepte `id`, `name`, `mimeType` como props. (Ref: L2-06-react-ui-components.mdc)
- [ ] Implementar la lógica para mostrar un icono diferente según el `mimeType` (carpeta o archivo). (Ref: L3-02-iconography-and-visual-feedback.mdc)

### 4. Pruebas Unitarias

- [ ] Escribir pruebas unitarias para `TranscriptionList.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [ ] Que la llamada a `POST /DriveRoot` se realiza al montar.
    - [ ] Manejo correcto de los estados `isLoading` y `error`.
    - [ ] Renderizado condicional del spinner/mensaje de carga.
    - [ ] Renderizado de `FileOrFolder.jsx` con los datos correctos.
- [ ] Escribir pruebas unitarias para `FileOrFolder.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [ ] Renderizado correcto del nombre y el icono según `mimeType`.
- [ ] Escribir pruebas unitarias para `NotificationSystem.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [ ] Mostrar mensajes de éxito y error.

### 5. Integración de Componentes

- [ ] Verificar que `TranscriptionList.jsx` integre y utilice correctamente `FileOrFolder.jsx` para cada ítem de Drive.
- [ ] Asegurar que `TranscriptionList.jsx` dispare notificaciones a través de `NotificationSystem.jsx` en caso de éxito o error de la API.

### 6. Pruebas de Aceptación

- [ ] Verificar AC: Dado que el usuario accede a la sección "Drive", cuando la aplicación se carga, entonces se debe realizar una llamada `POST /DriveRoot` a la API de backend con mi `userId`. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: Dado que la API responde con éxito, entonces el sistema debe mostrar una lista de archivos y carpetas en la interfaz de usuario. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: Dado que la API responde con un error, entonces el sistema debe mostrar un mensaje de error amigable y un indicador visual de fallo (ej. `NotificationSystem.jsx`). (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: El listado debe mostrar el `name`, `id` y `mimeType` de cada ítem. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: Debe haber un indicador visual de carga mientras se espera la respuesta de la API. (Estrategia guiada por L3-05 Testing Estratégico)

### 7. Documentación

- [ ] Añadir comentarios y `docstrings` relevantes al código de los componentes modificados/creados. (Ref: L3-04-code-documentation.mdc)
- [ ] Actualizar el `README.md` del proyecto con cualquier nueva sección de configuración o uso si aplica.

### 8. Refinamiento y Revisión Final

- [ ] Realizar una revisión de código por pares.
- [ ] Limpiar código, eliminar código comentado y asegurar la adherencia a los estándares de codificación.
- [ ] Verificar el cumplimiento de todos los Requisitos No Funcionales (NFRs) relevantes (Rendimiento, Usabilidad, Resiliencia) para esta HU, como se detalla en `project_requirements.md` y `tech_design.md`.
- [ ] Confirmar que no se han introducido regresiones en la funcionalidad existente.
