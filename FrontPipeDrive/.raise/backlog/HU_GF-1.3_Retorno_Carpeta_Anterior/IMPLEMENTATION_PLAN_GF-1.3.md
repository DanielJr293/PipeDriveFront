# IMPLEMENTATION_PLAN_GF-1.3.md

## Plan de Implementación Detallado para HU GF-1.3: Retorno a la Carpeta Anterior (Navegación "Volver")

### 1. Preparación y Configuración

- [ ] Crear nueva rama de desarrollo para la HU (ej. `feature/GF-1.3-back-navigation`).
- [ ] Identificar el lugar adecuado en `TranscriptionList.jsx` para almacenar el historial de carpetas visitadas (ej. un `useState` que contenga un array de `folderId`s).

### 2. Diseño Detallado

- [ ] Definir la estructura del historial de navegación (ej. un stack o array). (Ref: L2-02-react-state-management.mdc)
- [ ] Diseñar la lógica para añadir un `folderId` al historial cuando se navega a una nueva carpeta y para removerlo/usarlo al "volver".
- [ ] Diseñar la ubicación y el estado visual del botón "Volver" (visible/oculto). (Ref: L2-05-react-conditional-rendering.mdc)

### 3. Desarrollo de Componentes

#### 3.1. `TranscriptionList.jsx` - Componente Principal

- [ ] Modificar `TranscriptionList.jsx` para incluir un estado para `folderHistory` (ej. `[rootId, folder1Id, folder2Id]`). (Ref: L2-02-react-state-management.mdc)
- [ ] Adaptar la función `handleFolderClick(newFolderId)` para que, antes de actualizar `currentFolderId`, añada el `currentFolderId` actual al `folderHistory`. (Ref: L2-04-react-api-integration.mdc)
- [ ] Implementar una función `handleBackClick()` que: (Ref: L2-04-react-api-integration.mdc)
    - [ ] Remueva el último `folderId` del `folderHistory`.
    - [ ] Obtenga el `folderId` anterior del historial.
    - [ ] Actualice `currentFolderId` con el `folderId` anterior.
    - [ ] Realice una llamada `POST /DriveFolderArch` con el `userId` y el `folderId` anterior.
    - [ ] Maneje los estados de carga y error con `NotificationSystem.jsx`.
- [ ] Implementar lógica para renderizar condicionalmente un botón "Volver" que solo sea visible si `folderHistory` tiene más de un elemento. (Ref: L2-05-react-conditional-rendering.mdc)
- [ ] Adjuntar el `handleBackClick` al botón "Volver".

#### 3.2. `NotificationSystem.jsx` - Manejo de Notificaciones

- [ ] Reutilizar la implementación existente del `NotificationSystem.jsx` para mostrar notificaciones de éxito y error para la operación de "volver".

### 4. Pruebas Unitarias

- [ ] Escribir pruebas unitarias para `TranscriptionList.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [ ] Que `folderHistory` se actualiza correctamente al navegar a nuevas carpetas.
    - [ ] Que `handleBackClick` actualiza `currentFolderId` al elemento correcto del historial.
    - [ ] Que `handleBackClick` dispara la llamada `POST /DriveFolderArch` con el `folderId` anterior.
    - [ ] Que el botón "Volver" es visible/oculto condicionalmente.
    - [ ] Manejo de estados de carga y error durante la operación de "volver".

### 5. Integración de Componentes

- [ ] Verificar que la navegación hacia adelante y hacia atrás funciona de manera consistente y que `TranscriptionList.jsx` muestra el contenido correcto.
- [ ] Asegurar que el `NotificationSystem.jsx` se activa correctamente para la funcionalidad de "volver".

### 6. Pruebas de Aceptación

- [ ] Verificar AC: Dado que he navegado a una subcarpeta, cuando hago clic en un botón "Volver", entonces el sistema debe mostrar el contenido de la carpeta anterior. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: El sistema debe mantener un historial de `folderId`s visitados para la funcionalidad "Volver". (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: El botón "Volver" solo debe estar visible si hay una carpeta anterior en el historial. (Estrategia guiada por L3-05 Testing Estratégico)

### 7. Documentación

- [ ] Actualizar los comentarios y `docstrings` en `TranscriptionList.jsx` para reflejar la nueva lógica de historial y navegación "volver". (Ref: L3-04-code-documentation.mdc)

### 8. Refinamiento y Revisión Final

- [ ] Realizar una revisión de código por pares.
- [ ] Limpiar código y asegurar la adherencia a los estándares de codificación.
- [ ] Verificar el cumplimiento de todos los Requisitos No Funcionales (NFRs) relevantes para esta HU.
- [ ] Confirmar que no se han introducido regresiones en la funcionalidad existente (ej. navegación de carpetas, visualización de la raíz).
