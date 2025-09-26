# IMPLEMENTATION_PLAN_GF-1.4.md

## Plan de Implementación Detallado para HU GF-1.4: Visualización del Contenido de Archivos Seleccionados

### 1. Preparación y Configuración

- [ ] Crear nueva rama de desarrollo para la HU (ej. `feature/GF-1.4-file-content-view`).
- [ ] Asegurar que el `userId` esté disponible para las llamadas a la API.

### 2. Diseño Detallado

- [ ] Definir la estructura del estado en `TranscriptionList.jsx` para `selectedFileContent`, `selectedFileId`, `isContentLoaded` y `fileContentError`. (Ref: L2-02-react-state-management.mdc)
- [ ] Diseñar cómo se mostrará el contenido del archivo en la interfaz de usuario (ej. un área de texto, un modal). (Ref: L2-06-react-ui-components.mdc)
- [ ] Diseñar la integración del `NotificationSystem.jsx` para mostrar mensajes de éxito/error de la llamada a la API `POST /DriveInfoArch`.

### 3. Desarrollo de Componentes

#### 3.1. `TranscriptionList.jsx` - Componente Principal

- [ ] Modificar `TranscriptionList.jsx` para incluir un estado para `selectedFileContent`, `selectedFileId`, `isContentLoaded`, `fileContentError`. (Ref: L2-02-react-state-management.mdc)
- [ ] Adaptar la función `onItemClick` (pasada a `FileOrFolder.jsx`) para que, si el `mimeType` corresponde a un archivo, dispare una nueva función `handleFileClick(fileId)`.
- [ ] Implementar la función `handleFileClick(fileId)` que: (Ref: L2-04-react-api-integration.mdc)
    - [ ] Almacene `fileId` en `selectedFileId`.
    - [ ] Realice una llamada `POST /DriveInfoArch` con el `userId` y el `fileId` seleccionado.
    - [ ] Almacene la respuesta (`GoogleDrive` que es el contenido del archivo) en `selectedFileContent`.
    - [ ] Establezca `isContentLoaded` a `true` al obtener el contenido y `false` en caso de error o carga.
    - [ ] Maneje los estados de carga y error con `NotificationSystem.jsx`.
- [ ] Implementar la lógica para renderizar el `selectedFileContent` en una sección dedicada de la UI cuando `isContentLoaded` es `true`. (Ref: L2-05-react-conditional-rendering.mdc)
- [ ] Renderizar un indicador de carga mientras se espera el contenido del archivo.
- [ ] Asegurar que el contenido del archivo se almacene temporalmente para su posterior uso (ej., por el chat de IA, como se menciona en los ACs).

#### 3.2. `FileOrFolder.jsx` - Renderizado de Ítem

- [ ] Reutilizar la prop `onItemClick` existente. La lógica para diferenciar entre archivos y carpetas ya está implementada en `FileOrFolder.jsx`, y ahora `TranscriptionList.jsx` manejará la acción específica para archivos.

#### 3.3. `NotificationSystem.jsx` - Manejo de Notificaciones

- [ ] Reutilizar la implementación existente del `NotificationSystem.jsx` para mostrar notificaciones de éxito y error para la carga del contenido del archivo.

### 4. Pruebas Unitarias

- [ ] Escribir pruebas unitarias para `TranscriptionList.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [ ] Que `handleFileClick` dispara la llamada a `POST /DriveInfoArch` con los parámetros correctos.
    - [ ] Que `selectedFileContent`, `selectedFileId`, `isContentLoaded` y `fileContentError` se actualizan correctamente.
    - [ ] Renderizado condicional del contenido del archivo o indicador de carga.
    - [ ] Manejo de estados de carga y error durante la carga del contenido del archivo.

### 5. Integración de Componentes

- [ ] Verificar que al hacer clic en un archivo en la lista de `TranscriptionList.jsx`, se carga y se muestra su contenido correctamente.
- [ ] Asegurar que el `NotificationSystem.jsx` se activa correctamente para la carga del contenido del archivo.

### 6. Pruebas de Aceptación

- [ ] Verificar AC: Dado que estoy viendo el contenido de una carpeta, cuando hago clic en un ítem de tipo "archivo", entonces se debe realizar una llamada `POST /DriveInfoArch` a la API de backend con mi `userId` y el `fieldId` del archivo seleccionado. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: Dado que la API responde con éxito, entonces el sistema debe mostrar el contenido del archivo en una vista adecuada. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: Dado que la API responde con un error, entonces el sistema debe mostrar un mensaje de error amigable y un indicador visual de fallo. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: Debe haber un indicador visual de carga mientras se espera la respuesta de la API. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: El contenido del archivo debe almacenarse temporalmente para su posterior uso (ej., por el chat de IA). (Estrategia guiada por L3-05 Testing Estratégico)

### 7. Documentación

- [ ] Actualizar los comentarios y `docstrings` en `TranscriptionList.jsx` para reflejar la nueva lógica de selección y visualización de archivos. (Ref: L3-04-code-documentation.mdc)

### 8. Refinamiento y Revisión Final

- [ ] Realizar una revisión de código por pares.
- [ ] Limpiar código y asegurar la adherencia a los estándares de codificación.
- [ ] Verificar el cumplimiento de todos los Requisitos No Funcionales (NFRs) relevantes para esta HU.
- [ ] Confirmar que no se han introducido regresiones en la funcionalidad existente (ej. navegación de carpetas, visualización de la raíz y navegación hacia atrás).
