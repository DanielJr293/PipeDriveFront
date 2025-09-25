# IMPLEMENTATION_PLAN_IA-2.2.md

## Plan de Implementación Detallado para HU IA-2.2: Apertura del Chat de IA al Seleccionar Acción de .doc

### 1. Preparación y Configuración

- [ ] Crear nueva rama de desarrollo para la HU (ej. `feature/IA-2.2-ai-chat-activation`).
- [ ] Identificar la ubicación en `TranscriptionList.jsx` donde se almacena el contenido del archivo `.doc` seleccionado (`selectedFileContent`).

### 2. Diseño Detallado

- [ ] Diseñar el componente `AIChat.jsx` como una interfaz de chat. (Ref: L2-06-react-ui-components.mdc)
- [ ] Definir un estado en `TranscriptionList.jsx` (ej. `isAIChatActive`) para controlar la visibilidad de `AIChat.jsx`. (Ref: L2-02-react-state-management.mdc)
- [ ] Diseñar cómo se pasará el `selectedFileContent` a `AIChat.jsx`.

### 3. Desarrollo de Componentes

#### 3.1. `AIChat.jsx` - Nuevo Componente

- [ ] Crear el componente `AIChat.jsx`. (Ref: L2-03-react-component-composition.mdc)
- [ ] Implementar una estructura básica de chat que pueda recibir el contenido del documento y, en el futuro, mostrar preguntas y respuestas. (Ref: L2-06-react-ui-components.mdc)
- [ ] `AIChat.jsx` debe aceptar una prop para el `documentContent` (el `selectedFileContent` del documento `.doc`). (Ref: L2-03-react-component-composition.mdc)

#### 3.2. `DocActions.jsx` - Activación del Chat

- [ ] Modificar `DocActions.jsx` para aceptar una prop `onActionClick(actionType)`. (Ref: L2-03-react-component-composition.mdc)
- [ ] Cada botón de acción en `DocActions.jsx` (ej. "Resumen de la Llamada", "Propuesta") debe invocar `onActionClick` con un tipo de acción específico.

#### 3.3. `TranscriptionList.jsx` - Lógica de Control

- [ ] Modificar `TranscriptionList.jsx` para incluir un estado `isAIChatActive`. (Ref: L2-02-react-state-management.mdc)
- [ ] Implementar una función `handleDocActionClick(actionType)` en `TranscriptionList.jsx` que: (Ref: L2-05-react-conditional-rendering.mdc)
    - [ ] Establezca `isAIChatActive` a `true`.
    - [ ] Podría, en el futuro, usar `actionType` para pre-poblar el chat o hacer una primera llamada a la IA.
- [ ] Pasar `handleDocActionClick` como prop `onActionClick` a `DocActions.jsx`.
- [ ] Renderizar condicionalmente el componente `AIChat.jsx` en `TranscriptionList.jsx` solo cuando `isAIChatActive` sea `true`. (Ref: L2-05-react-conditional-rendering.mdc)
- [ ] Pasar el `selectedFileContent` actual a `AIChat.jsx` como prop.

### 4. Pruebas Unitarias

- [ ] Escribir pruebas unitarias para `AIChat.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [ ] Que el componente se renderiza correctamente.
    - [ ] Que acepta y muestra (o usa internamente) el `documentContent` pasado como prop.
- [ ] Escribir pruebas unitarias para `DocActions.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [ ] Que al hacer clic en un botón de acción, se invoca el callback `onActionClick` con el `actionType` correcto.
- [ ] Escribir pruebas unitarias para `TranscriptionList.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [ ] Que `isAIChatActive` se actualiza a `true` cuando `handleDocActionClick` es invocado.
    - [ ] Que `AIChat.jsx` se renderiza cuando `isAIChatActive` es `true` y no se renderiza cuando es `false`.
    - [ ] Que `selectedFileContent` se pasa correctamente a `AIChat.jsx`.

### 5. Integración de Componentes

- [ ] Verificar que al seleccionar un archivo `.doc` y luego hacer clic en un botón de acción en `DocActions.jsx`, el componente `AIChat.jsx` se activa y se muestra, recibiendo el contenido del documento.

### 6. Pruebas de Aceptación

- [ ] Verificar AC: Dado que el componente `DocActions.jsx` está visible, cuando hago clic en cualquiera de sus botones de acción, entonces el componente `AIChat.jsx` debe activarse y volverse visible. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: El contenido del archivo `.doc` previamente seleccionado debe ser accesible para el componente `AIChat.jsx`. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: Se debe establecer un estado (`isAIChatActive`) para controlar la visibilidad del chat. (Estrategia guiada por L3-05 Testing Estratégico)

### 7. Documentación

- [ ] Añadir comentarios y `docstrings` en `AIChat.jsx` y actualizar en `DocActions.jsx` y `TranscriptionList.jsx` para reflejar la nueva lógica de activación del chat y el flujo de datos. (Ref: L3-04-code-documentation.mdc)

### 8. Refinamiento y Revisión Final

- [ ] Realizar una revisión de código por pares.
- [ ] Limpiar código y asegurar la adherencia a los estándares de codificación.
- [ ] Verificar el cumplimiento de todos los Requisitos No Funcionales (NFRs) relevantes para esta HU.
- [ ] Confirmar que no se han introducido regresiones en la funcionalidad existente (ej. visibilidad de `DocActions.jsx`, navegación).
