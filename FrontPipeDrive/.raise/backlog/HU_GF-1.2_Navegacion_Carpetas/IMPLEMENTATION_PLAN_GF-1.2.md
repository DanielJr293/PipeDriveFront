# IMPLEMENTATION_PLAN_GF-1.2.md

## Plan de Implementación Detallado para HU GF-1.2: Navegación entre Carpetas de Google Drive

### 1. Preparación y Configuración

- [x] Crear nueva rama de desarrollo para la HU (ej. `feature/GF-1.2-folder-navigation`).
- [x] Asegurar que el `userId` esté disponible para las llamadas a la API (ej. desde el contexto de la aplicación o la URL).

### 2. Diseño Detallado (si es necesario para componentes complejos)

- [x] Definir la estructura del estado en `TranscriptionList.jsx` para `currentFolderId` además de `driveItems`, `isLoading`, `error`. (Ref: L2-02-react-state-management.mdc)
- [x] Diseñar el handler de clic en `FileOrFolder.jsx` para diferenciar entre archivos y carpetas y disparar la acción correcta. (Ref: L2-03-react-component-composition.mdc)
- [x] Diseñar la integración del `NotificationSystem.jsx` para que reciba y muestre los mensajes de error/éxito de las llamadas a la API.

### 3. Desarrollo de Componentes

#### 3.1. `TranscriptionList.jsx` - Componente Principal

- [x] Modificar `TranscriptionList.jsx` para gestionar el estado de `currentFolderId`.
- [x] Implementar una función `handleFolderClick(folderId)` que actualice `currentFolderId` y realice la llamada `POST /DriveFolderArch` con el `userId` y el nuevo `folderId`. (Ref: L2-04-react-api-integration.mdc)
- [x] Asegurar que la función `handleFolderClick` maneje los estados de carga (`isLoading`) y error (`error`) y use `NotificationSystem.jsx` adecuadamente. (Ref: L3-03-frontend-error-handling.mdc)
- [x] Actualizar la lógica de renderizado para que `TranscriptionList.jsx` muestre el contenido de la carpeta actual.
- [x] Pasar la función `handleFolderClick` como prop a `FileOrFolder.jsx`. (Ref: L2-03-react-component-composition.mdc)

#### 3.2. `FileOrFolder.jsx` - Renderizado de Ítem

- [x] Modificar `FileOrFolder.jsx` para aceptar una prop `onItemClick` (o similar) que sea una función de callback. (Ref: L2-06-react-ui-components.mdc)
- [x] Dentro de `FileOrFolder.jsx`, implementar la lógica de clic: si `mimeType` es una carpeta, invocar `onItemClick` con el `id` del ítem. (Ref: L2-05-react-conditional-rendering.mdc)
- [x] Continuar mostrando un icono o representación visual diferente para archivos y carpetas, como en la HU anterior. (Ref: L3-02-iconography-and-visual-feedback.mdc)

#### 3.3. `NotificationSystem.jsx` - Manejo de Notificaciones

- [x] Reutilizar la implementación existente del `NotificationSystem.jsx` para mostrar notificaciones de éxito y error para las llamadas a `POST /DriveFolderArch`.

### 4. Pruebas Unitarias

- [x] Escribir pruebas unitarias para `TranscriptionList.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [x] Que `handleFolderClick` actualiza `currentFolderId` correctamente.
    - [x] Que `handleFolderClick` dispara la llamada a `POST /DriveFolderArch` con los parámetros correctos.
    - [x] Manejo de estados de carga y error durante la navegación de carpetas.
    - [x] Renderizado del contenido de la nueva carpeta después de una navegación exitosa.
- [x] Escribir pruebas unitarias para `FileOrFolder.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [x] Que al hacer clic en un ítem de tipo carpeta, se invoca el callback `onItemClick` con el `id` correcto.

### 5. Integración de Componentes

- [x] Verificar que `TranscriptionList.jsx` y `FileOrFolder.jsx` interactúan correctamente para permitir la navegación por carpetas.
- [x] Asegurar que el `NotificationSystem.jsx` se activa correctamente para las operaciones de navegación de carpetas.

### 6. Pruebas de Aceptación

- [x] Verificar AC: Dado que estoy viendo el contenido de una carpeta, cuando hago clic en un ítem de tipo "carpeta", entonces se debe realizar una llamada `POST /DriveFolderArch` a la API de backend con mi `userId` y el `folderId` de la carpeta seleccionada. (Estrategia guiada por L3-05 Testing Estratégico)
- [x] Verificar AC: Dado que la API responde con éxito, entonces el sistema debe actualizar la vista para mostrar el contenido de la nueva carpeta. (Estrategia guiada por L3-05 Testing Estratégico)
- [x] Verificar AC: Dado que la API responde con un error, entonces el sistema debe mostrar un mensaje de error amigable y un indicador visual de fallo. (Estrategia guiada por L3-05 Testing Estratégico)
- [x] Verificar AC: Debe haber un indicador visual de carga mientras se espera la respuesta de la API. (Estrategia guiada por L3-05 Testing Estratégico)
- [x] Verificar AC: El componente `FileOrFolder.jsx` debe ser adaptable para manejar el clic y diferenciar entre archivos y carpetas. (Estrategia guiada por L3-05 Testing Estratégico)

### 7. Documentación

- [x] Actualizar los comentarios y `docstrings` en `TranscriptionList.jsx` y `FileOrFolder.jsx` para reflejar los nuevos estados y lógica de navegación.

### 8. Refinamiento y Revisión Final

- [x] Realizar una revisión de código por pares.
- [x] Limpiar código y asegurar la adherencia a los estándares de codificación.
- [x] Verificar el cumplimiento de todos los Requisitos No Funcionales (NFRs) relevantes para esta HU.
- [x] Confirmar que no se han introducido regresiones en la funcionalidad existente (ej. la visualización de la raíz de Drive sigue funcionando).
- [ ] **Mejoras de Diseño y Responsividad:**
    - [ ] Analizar `prototipo.html` para identificar patrones de diseño para la visualización de archivos y carpetas.
    - [x] Refactorizar el CSS en `App.css` para los elementos `.btnArchivo`, `.divBtnArch`, y `.divBtnArchText` para mejorar la estética y la responsividad.
    - [x] Implementar media queries en `App.css` para asegurar que el contenedor de archivos y carpetas (`TranscriptionList`) y sus elementos hijos se adapten correctamente a diferentes tamaños de pantalla, evitando desbordamientos.
    - [x] Mejorar la interfaz de usuario para el estado de carga de archivos de Google Drive (evitando texto plano).
    - [x] Realizar pruebas visuales exhaustivas en varios dispositivos y resoluciones para confirmar la correcta adaptación del diseño.

Por favor, avísame una vez que hayas actualizado el archivo `IMPLEMENTATION_PLAN_GF-1.2.md` con este contenido. Después, puedo comenzar a guiarte con las modificaciones en `App.css` para implementar estas mejoras de diseño y responsividad.