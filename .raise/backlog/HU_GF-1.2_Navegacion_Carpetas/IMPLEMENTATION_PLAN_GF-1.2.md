# IMPLEMENTATION_PLAN_GF-1.2.md

## Plan de Implementación Detallado para HU GF-1.2: Navegación entre Carpetas de Google Drive

### 1. Preparación y Configuración

- [ ] Crear nueva rama de desarrollo para la HU (ej. `feature/GF-1.2-folder-navigation`).
- [ ] Asegurar que el `userId` esté disponible para las llamadas a la API (ej. desde el contexto de la aplicación o la URL).

### 2. Diseño Detallado (si es necesario para componentes complejos)

- [ ] Definir la estructura del estado en `TranscriptionList.jsx` para `currentFolderId` además de `driveItems`, `isLoading`, `error`. (Ref: L2-02-react-state-management.mdc)
- [ ] Diseñar el handler de clic en `FileOrFolder.jsx` para diferenciar entre archivos y carpetas y disparar la acción correcta. (Ref: L2-03-react-component-composition.mdc)
- [ ] Diseñar la integración del `NotificationSystem.jsx` para que reciba y muestre los mensajes de error/éxito de las llamadas a la API.

### 3. Desarrollo de Componentes

#### 3.1. `TranscriptionList.jsx` - Componente Principal

- [ ] Modificar `TranscriptionList.jsx` para gestionar el estado de `currentFolderId`.
- [ ] Implementar una función `handleFolderClick(folderId)` que actualice `currentFolderId` y realice la llamada `POST /DriveFolderArch` con el `userId` y el nuevo `folderId`. (Ref: L2-04-react-api-integration.mdc)
- [ ] Asegurar que la función `handleFolderClick` maneje los estados de carga (`isLoading`) y error (`error`) y use `NotificationSystem.jsx` adecuadamente. (Ref: L3-03-frontend-error-handling.mdc)
- [ ] Actualizar la lógica de renderizado para que `TranscriptionList.jsx` muestre el contenido de la carpeta actual.
- [ ] Pasar la función `handleFolderClick` como prop a `FileOrFolder.jsx`. (Ref: L2-03-react-component-composition.mdc)

#### 3.2. `FileOrFolder.jsx` - Renderizado de Ítem

- [ ] Modificar `FileOrFolder.jsx` para aceptar una prop `onItemClick` (o similar) que sea una función de callback. (Ref: L2-06-react-ui-components.mdc)
- [ ] Dentro de `FileOrFolder.jsx`, implementar la lógica de clic: si `mimeType` es una carpeta, invocar `onItemClick` con el `id` del ítem. (Ref: L2-05-react-conditional-rendering.mdc)
- [ ] Continuar mostrando un icono o representación visual diferente para archivos y carpetas, como en la HU anterior. (Ref: L3-02-iconography-and-visual-feedback.mdc)

#### 3.3. `NotificationSystem.jsx` - Manejo de Notificaciones

- [ ] Reutilizar la implementación existente del `NotificationSystem.jsx` para mostrar notificaciones de éxito y error para las llamadas a `POST /DriveFolderArch`.

### 4. Pruebas Unitarias

- [ ] Escribir pruebas unitarias para `TranscriptionList.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [ ] Que `handleFolderClick` actualiza `currentFolderId` correctamente.
    - [ ] Que `handleFolderClick` dispara la llamada a `POST /DriveFolderArch` con los parámetros correctos.
    - [ ] Manejo de estados de carga y error durante la navegación de carpetas.
    - [ ] Renderizado del contenido de la nueva carpeta después de una navegación exitosa.
- [ ] Escribir pruebas unitarias para `FileOrFolder.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [ ] Que al hacer clic en un ítem de tipo carpeta, se invoca el callback `onItemClick` con el `id` correcto.

### 5. Integración de Componentes

- [ ] Verificar que `TranscriptionList.jsx` y `FileOrFolder.jsx` interactúan correctamente para permitir la navegación por carpetas.
- [ ] Asegurar que el `NotificationSystem.jsx` se activa correctamente para las operaciones de navegación de carpetas.

### 6. Pruebas de Aceptación

- [ ] Verificar AC: Dado que estoy viendo el contenido de una carpeta, cuando hago clic en un ítem de tipo "carpeta", entonces se debe realizar una llamada `POST /DriveFolderArch` a la API de backend con mi `userId` y el `folderId` de la carpeta seleccionada. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: Dado que la API responde con éxito, entonces el sistema debe actualizar la vista para mostrar el contenido de la nueva carpeta. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: Dado que la API responde con un error, entonces el sistema debe mostrar un mensaje de error amigable y un indicador visual de fallo. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: Debe haber un indicador visual de carga mientras se espera la respuesta de la API. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: El componente `FileOrFolder.jsx` debe ser adaptable para manejar el clic y diferenciar entre archivos y carpetas. (Estrategia guiada por L3-05 Testing Estratégico)

### 7. Documentación

- [ ] Actualizar los comentarios y `docstrings` en `TranscriptionList.jsx` y `FileOrFolder.jsx` para reflejar los nuevos estados y lógica de navegación.

### 8. Refinamiento y Revisión Final

- [ ] Realizar una revisión de código por pares.
- [ ] Limpiar código y asegurar la adherencia a los estándares de codificación.
- [ ] Verificar el cumplimiento de todos los Requisitos No Funcionales (NFRs) relevantes para esta HU.
- [ ] Confirmar que no se han introducido regresiones en la funcionalidad existente (ej. la visualización de la raíz de Drive sigue funcionando).
