# IMPLEMENTATION_PLAN_GF-1.4.md

## Plan de Implementación Detallado para HU GF-1.4: Visualización del Contenido de Archivos Seleccionados

### 1. Preparación y Configuración

- [ ] Crear nueva rama de desarrollo para la HU (ej. `feature/GF-1.4-file-content-view`).
- [ ] Asegurar que el `userId` esté disponible para las llamadas a la API.

### 2. Diseño Detallado

- [x] Definir la estructura del estado en `TranscriptionList.jsx` para `selectedFileContent`, `selectedFileId`, `isContentLoaded` y `fileContentError`. (Ref: L2-02-react-state-management.mdc)
- [x] Diseñar cómo se mostrará el contenido del archivo en la interfaz de usuario (ej. un área de texto, un modal). Para esta HU, se mostrará el contenido en un área de texto dentro de `TranscriptionList.jsx`. (Ref: L2-06-react-ui-components.mdc)
- [x] Diseñar la integración del `NotificationSystem.jsx` para mostrar mensajes de éxito/error de la llamada a la API `POST /DriveInfoArch`.

### 3. Desarrollo de Componentes

#### 3.1. `TranscriptionList.jsx` - Componente Principal

- [x] Modificar `TranscriptionList.jsx` para incluir un estado para `selectedFileContent`, `selectedFileId`, `isContentLoaded`, `fileContentError`. (Ref: L2-02-react-state-management.mdc)
- [x] Adaptar la función `onItemClick` (pasada a `FileOrFolder.jsx`) para que, si el `mimeType` corresponde a un archivo, dispare una nueva función `handleFileClick(fileId)`.
- [x] Implementar la función `handleFileClick(fileId)` que: (Ref: L2-04-react-api-integration.mdc)
    - [x] Almacene `fileId` en `selectedFileId`.
    - [x] Realice una llamada `POST /DriveInfoArch` con el `userId` y el `fileId` seleccionado.
    - [x] Almacene la respuesta (`GoogleDrive` que es el contenido del archivo) en `selectedFileContent`.
    - [x] Establezca `isContentLoaded` a `true` al obtener el contenido y `false` en caso de error o carga.
    - [x] Maneje los estados de carga y error con `NotificationSystem.jsx`.
- [x] Implementar la lógica para renderizar el `selectedFileContent` en una sección dedicada de la UI cuando `isContentLoaded` es `true`. (Ref: L2-05-react-conditional-rendering.mdc)
- [x] Renderizar un indicador de carga mientras se espera el contenido del archivo.
- [x] Asegurar que el contenido del archivo se almacene temporalmente para su posterior uso (ej., por el chat de IA, como se menciona en los ACs).
- [x] Implementar la visualización de un mensaje "Esta carpeta no contiene archivos." cuando `driveItems` esté vacío.

#### 3.2. `FileOrFolder.jsx` - Renderizado de Ítem

- [x] Reutilizar la prop `onItemClick` existente. La lógica para diferenciar entre archivos y carpetas ya está implementada en `FileOrFolder.jsx`, y ahora `TranscriptionList.jsx` manejará la acción específica para archivos.

#### 3.3. `NotificationSystem.jsx` - Manejo de Notificaciones

- [x] Reutilizar la implementación existente del `NotificationSystem.jsx` para mostrar notificaciones de éxito y error para la carga del contenido del archivo.

### 4. Pruebas Unitarias

- [x] Escribir pruebas unitarias para `TranscriptionList.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [x] Que `handleFileClick` dispara la llamada a `POST /DriveInfoArch` con los parámetros correctos.
    - [x] Que `selectedFileContent`, `selectedFileId`, `isContentLoaded` y `fileContentError` se actualizan correctamente.
    - [x] Renderizado condicional del contenido del archivo o indicador de carga.
    - [x] Manejo de estados de carga y error durante la carga del contenido del archivo.

### 5. Integración de Componentes

- [x] Verificar que al hacer clic en un archivo en la lista de `TranscriptionList.jsx`, se carga y se muestra su contenido correctamente.
- [x] Asegurar que el `NotificationSystem.jsx` se activa correctamente para la carga del contenido del archivo.

### 6. Pruebas de Aceptación

- [x] Verificar AC: Dado que estoy viendo el contenido de una carpeta, cuando hago clic en un ítem de tipo "archivo", entonces se debe realizar una llamada `POST /DriveInfoArch` a la API de backend con mi `userId` y el `fieldId` del archivo seleccionado. (Estrategia guiada por L3-05 Testing Estratégico)
- [x] Verificar AC: Dado que la API responde con éxito, entonces el sistema debe mostrar el contenido del archivo en una vista adecuada. (Estrategia guiada por L3-05 Testing Estratégico)
- [x] Verificar AC: Dado que la API responde con un error, entonces el sistema debe mostrar un mensaje de error amigable y un indicador visual de fallo. (Estrategia guiada por L3-05 Testing Estratégico)
- [x] Verificar AC: Debe haber un indicador visual de carga mientras se espera la respuesta de la API. (Estrategia guiada por L3-05 Testing Estratégico)
- [x] Verificar AC: El contenido del archivo debe almacenarse temporalmente para su posterior uso (ej., por el chat de IA). (Estrategia guiada por L3-05 Testing Estratégico)

### 7. Documentación

- [x] Actualizar los comentarios y `docstrings` en `TranscriptionList.jsx` para reflejar la nueva lógica de selección y visualización de archivos. (Ref: L3-04-code-documentation.mdc)

### 8. Refinamiento y Revisión Final

- [x] Realizar una revisión de código por pares.
- [x] Limpiar código y asegurar la adherencia a los estándares de codificación.
- [x] Verificar el cumplimiento de todos los Requisitos No Funcionales (NFRs) relevantes para esta HU.
- [x] Confirmar que no se han introducido regresiones en la funcionalidad existente (ej. navegación de carpetas, visualización de la raíz y navegación hacia atrás).
