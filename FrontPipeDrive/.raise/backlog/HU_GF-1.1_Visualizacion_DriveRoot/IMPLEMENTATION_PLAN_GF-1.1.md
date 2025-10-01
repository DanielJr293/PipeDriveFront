# IMPLEMENTATION_PLAN_GF-1.1.md

## Plan de Implementación Detallado para HU GF-1.1: Visualización del Contenido de la Raíz de Google Drive

### 1. Preparación y Configuración

- [x] Crear nueva rama de desarrollo para la HU (ej. `feature/GF-1.1-drive-root-view`).
- [x] Revisar `dependencies.yaml` para asegurar que las librerías necesarias (ej. `axios` para llamadas API, `lucide-react` para iconos) estén configuradas. (Ref: L2-01-frontend-dependency-management.mdc)
- [x] Asegurar que el `userId` esté disponible para las llamadas a la API (ej. desde el contexto de la aplicación o la URL).

### 2. Diseño Detallado (si es necesario para componentes complejos)

- [x] Definir la estructura del estado en `TranscriptionList.jsx` para `driveItems` (archivos/carpetas), `isLoading` y `error`. (Ref: L2-02-react-state-management.mdc)
- [x] Diseñar la integración del `NotificationSystem.jsx` para que reciba y muestre los mensajes de error/éxito de las llamadas a la API. (Ref: L2-03-react-component-composition.mdc)

### 3. Desarrollo de Componentes

#### 3.1. `TranscriptionList.jsx` - Componente Principal

- [x] Modificar `TranscriptionList.jsx` para realizar la llamada `POST /DriveRoot` al montar el componente (ej. usando `useEffect`). (Ref: L2-04-react-api-integration.mdc)
- [x] Implementar la lógica para manejar el estado de carga (`isLoading`) y error (`error`) durante la llamada a la API. (Ref: L2-04-react-api-integration.mdc, L3-03-frontend-error-handling.mdc)
- [x] Renderizar condicionalmente un spinner o mensaje de carga mientras `isLoading` es `true`. (Ref: L2-05-react-conditional-rendering.mdc)
- [x] Mapear la respuesta de la API (`GoogleDrive.files`) a la estructura de datos interna para `driveItems`. (Ref: L3-01-data-transformation.mdc)
- [x] Pasar `driveItems` a `FileOrFolder.jsx` para su renderizado. (Ref: L2-03-react-component-composition.mdc)

#### 3.2. `NotificationSystem.jsx` - Manejo de Notificaciones

- [x] Implementar/Modificar `NotificationSystem.jsx` para mostrar notificaciones tipo "toast" para éxito y error. (Ref: L2-06-react-ui-components.mdc, L3-03-frontend-error-handling.mdc)
- [x] Integrar `NotificationSystem.jsx` en `TranscriptionList.jsx` para mostrar errores de la API `POST /DriveRoot`.

#### 3.3. `FileOrFolder.jsx` - Renderizado de Ítem

- [x] Asegurar que `FileOrFolder.jsx` acepte `id`, `name`, `mimeType` como props. (Ref: L2-06-react-ui-components.mdc)
- [x] Implementar la lógica para mostrar un icono diferente según el `mimeType` (carpeta o archivo). (Ref: L3-02-iconography-and-visual-feedback.mdc)

### 4. Pruebas Unitarias

- [x] Escribir pruebas unitarias para `TranscriptionList.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [x] Que la llamada a `POST /DriveRoot` se realiza al montar.
    - [x] Manejo correcto de los estados `isLoading` y `error`.
    - [x] Renderizado condicional del spinner/mensaje de carga.
    - [x] Renderizado de `FileOrFolder.jsx` con los datos correctos.
- [x] Escribir pruebas unitarias para `FileOrFolder.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [x] Renderizado correcto del nombre y el icono según `mimeType`.
- [x] Escribir pruebas unitarias para `NotificationSystem.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [x] Mostrar mensajes de éxito y error.

### 5. Integración de Componentes

- [x] Verificar que `TranscriptionList.jsx` integre y utilice correctamente `FileOrFolder.jsx` para cada ítem de Drive.
- [x] Asegurar que `TranscriptionList.jsx` dispare notificaciones a través de `NotificationSystem.jsx` en caso de éxito o error de la API.

### 6. Pruebas de Aceptación

- [x] Verificar AC: Dado que el usuario accede a la sección "Drive", cuando la aplicación se carga, entonces se debe realizar una llamada `POST /DriveRoot` a la API de backend con mi `userId`. (Estrategia guiada por L3-05 Testing Estratégico)
- [x] Verificar AC: Dado que la API responde con éxito, entonces el sistema debe mostrar una lista de archivos y carpetas en la interfaz de usuario. (Estrategia guiada por L3-05 Testing Estratégico)
- [x] Verificar AC: Dado que la API responde con un error, entonces el sistema debe mostrar un mensaje de error amigable y un indicador visual de fallo (ej. `NotificationSystem.jsx`). (Estrategia guiada por L3-05 Testing Estratégico)
- [x] Verificar AC: El listado debe mostrar el `name`, `id` y `mimeType` de cada ítem. (Estrategia guiada por L3-05 Testing Estratégico)
- [x] Verificar AC: Debe haber un indicador visual de carga mientras se espera la respuesta de la API. (Estrategia guiada por L3-05 Testing Estratégico)

### 7. Documentación

- [x] Añadir comentarios y `docstrings` relevantes al código de los componentes modificados/creados. (Ref: L3-04-code-documentation.mdc)
- [x] Actualizar el `README.md` del proyecto con cualquier nueva sección de configuración o uso si aplica.

### 8. Refinamiento y Revisión Final

- [x] Realizar una revisión de código por pares.
- [x] Limpiar código, eliminar código comentado y asegurar la adherencia a los estándares de codificación.
- [x] Verificar el cumplimiento de todos los Requisitos No Funcionales (NFRs) relevantes (Rendimiento, Usabilidad, Resiliencia) para esta HU, como se detalla en `project_requirements.md` y `tech_design.md`.
- [x] Confirmar que no se han introducido regresiones en la funcionalidad existente.
