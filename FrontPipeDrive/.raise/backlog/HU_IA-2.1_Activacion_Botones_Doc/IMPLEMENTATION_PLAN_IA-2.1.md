# IMPLEMENTATION_PLAN_IA-2.1.md

## Plan de Implementación Detallado para HU IA-2.1: Activación de Botones de Acción para Archivos .doc

### 1. Preparación y Configuración

- [x] Crear nueva rama de desarrollo para la HU (ej. `feature/IA-2.1-doc-actions-activation`).
- [x] Identificar la ubicación en `TranscriptionList.jsx` donde se gestiona el archivo actualmente seleccionado y su `mimeType`.
- [x] Definir los `mimeType`s específicos que corresponden a archivos `.doc` (ej. `application/vnd.google-apps.document`, `application/msword`).

### 2. Diseño Detallado

- [x] Diseñar el componente `DocActions.jsx` con los botones de acción (`Resumen de la Llamada`, `Propuesta`, `Preguntas`, `Acciones`). (Ref: L2-06-react-ui-components.mdc)
- [x] Definir un estado en `TranscriptionList.jsx` (ej. `isDocSelected`) para controlar la visibilidad de `DocActions.jsx`. (Ref: L2-02-react-state-management.mdc)

### 3. Desarrollo de Componentes

#### 3.1. `DocActions.jsx` - Nuevo Componente

- [x] Crear el componente `DocActions.jsx`. (Ref: L2-03-react-component-composition.mdc)
- [x] Implementar la interfaz de usuario con al menos los botones: "Resumen de la Llamada", "Propuesta", "Preguntas" y "Acciones". (Ref: L2-06-react-ui-components.mdc)
- [x] Los botones pueden recibir un `onClick` handler como prop para futuras interacciones. (Ref: L2-03-react-component-composition.mdc)

#### 3.2. `TranscriptionList.jsx` - Lógica de Activación

- [x] Modificar `TranscriptionList.jsx` para incluir un estado `isDocSelected`. (Ref: L2-02-react-state-management.mdc)
- [x] En la función `handleFileClick` (o donde se procesa la selección de archivo), agregar lógica para: (Ref: L2-05-react-conditional-rendering.mdc)
    - [x] Determinar si el `mimeType` del archivo seleccionado corresponde a un documento `.doc` (usando los `mimeType`s definidos en la Preparación).
    - [x] Actualizar el estado `isDocSelected` a `true` si es un `.doc`, o `false` en caso contrario.
- [x] Renderizar condicionalmente el componente `DocActions.jsx` en `TranscriptionList.jsx` solo cuando `isDocSelected` sea `true`. (Ref: L2-05-react-conditional-rendering.mdc)

### 4. Pruebas Unitarias

- [x] Escribir pruebas unitarias para `DocActions.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [x] Que los botones se renderizan correctamente.
    - [x] Que los clics en los botones disparan los callbacks (si se implementan props de callback).
- [x] Escribir pruebas unitarias para `TranscriptionList.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [x] Que `isDocSelected` se actualiza correctamente basado en el `mimeType` del archivo seleccionado.
    - [x] Que `DocActions.jsx` se renderiza cuando `isDocSelected` es `true` y no se renderiza cuando es `false`.

### 5. Integración de Componentes

- [x] Verificar que al seleccionar un archivo `.doc` en la lista, el componente `DocActions.jsx` aparece visible con sus botones.
- [x] Verificar que al seleccionar un archivo que no es `.doc`, el componente `DocActions.jsx` permanece oculto.

### 6. Pruebas de Aceptación

- [x] Verificar AC: Dado que he seleccionado un archivo con `mimeType` correspondiente a un `.doc`, entonces el componente `DocActions.jsx` debe volverse visible. (Estrategia guiada por L3-05 Testing Estratégico)
- [x] Verificar AC: Dado que he seleccionado un archivo que NO es `.doc`, entonces el componente `DocActions.jsx` debe estar oculto. (Estrategia guiada por L3-05 Testing Estratégico)
- [x] Verificar AC: El sistema debe identificar los `mimeType` correctos para documentos `.doc` (ej., `application/vnd.google-apps.document`, `application/msword`). (Estrategia guiada por L3-05 Testing Estratégico)
- [x] Verificar AC: Los botones de acción deben incluir al menos "Resumen de la Llamada", "Propuesta", "Preguntas" y "Acciones". (Estrategia guiada por L3-05 Testing Estratégico)

### 7. Documentación

- [x] Añadir comentarios y `docstrings` en `DocActions.jsx` y actualizar en `TranscriptionList.jsx` para reflejar la nueva lógica de visibilidad. (Ref: L3-04-code-documentation.mdc)

### 8. Refinamiento y Revisión Final

- [x] Realizar una revisión de código por pares.
- [x] Limpiar código y asegurar la adherencia a los estándares de codificación.
- [x] Verificar el cumplimiento de todos los Requisitos No Funcionales (NFRs) relevantes para esta HU.
- [x] Confirmar que no se han introducido regresiones en la funcionalidad existente (ej. visualización de archivos, navegación).
