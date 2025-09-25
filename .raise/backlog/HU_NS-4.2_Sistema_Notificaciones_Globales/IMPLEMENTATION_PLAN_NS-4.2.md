# IMPLEMENTATION_PLAN_NS-4.2.md

## Plan de Implementación Detallado para HU NS-4.2: Sistema Global de Notificaciones (Toast/Snackbar)

### 1. Preparación y Configuración

- [ ] Crear nueva rama de desarrollo para la HU (ej. `feature/NS-4.2-global-notifications`).
- [ ] Investigar librerías de componentes "toast" o "snackbar" existentes en React (ej. `react-toastify`, `sonner`) para una implementación eficiente y con buenas prácticas. (Ref: L2-01-frontend-dependency-management.mdc)

### 2. Diseño Detallado

- [ ] Definir la estructura de la API del `NotificationSystem.jsx` (ej. `showSuccess(message)`, `showError(message)`, `showWarning(message)`). (Ref: L2-03-react-component-composition.mdc)
- [ ] Diseñar el aspecto visual de las notificaciones (éxito, error, advertencia) y su posicionamiento en la UI. (Ref: L2-06-react-ui-components.mdc)
- [ ] Definir el tiempo de desaparición automática configurable para las notificaciones.

### 3. Desarrollo de Componentes

#### 3.1. `NotificationSystem.jsx` - Implementación Central

- [ ] Implementar o integrar una librería de notificaciones en `NotificationSystem.jsx`. (Ref: L2-06-react-ui-components.mdc)
- [ ] Desarrollar las funciones `showSuccess(message)`, `showError(message)`, `showWarning(message)` que disparen el tipo de notificación correspondiente. (Ref: L2-03-react-component-composition.mdc)
- [ ] Configurar las notificaciones para que desaparezcan automáticamente después de un tiempo configurable (ej. 3-5 segundos).
- [ ] Asegurar que el `NotificationSystem.jsx` pueda ser accesible globalmente o a través de un contexto para que otros componentes puedan invocarlo fácilmente. (Ref: L2-03-react-component-composition.mdc)

#### 3.2. Integración a lo largo de la Aplicación

- [ ] **`TranscriptionList.jsx`**: Integrar `NotificationSystem.jsx` en todos los puntos de llamada a la API (`POST /DriveRoot`, `POST /DriveFolderArch`, `POST /DriveInfoArch`) para reportar errores y, opcionalmente, éxitos.
- [ ] **`AIChat.jsx`**: Integrar `NotificationSystem.jsx` en la lógica de envío de preguntas (`POST /ai-chat`) para reportar errores de la IA o de red.
- [ ] **`Sidebar.jsx`**: Integrar `NotificationSystem.jsx` en la llamada a la API `POST /usuario` para reportar errores en la carga de información del usuario.
- [ ] Asegurar que se muestren indicadores de carga visibles para todas las operaciones asíncronas, complementando las notificaciones. (Ref: L3-02-iconography-and-visual-feedback.mdc)

### 4. Pruebas Unitarias

- [ ] Escribir pruebas unitarias para `NotificationSystem.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [ ] Que `showSuccess`, `showError`, `showWarning` invocan el sistema de notificación subyacente correctamente.
    - [ ] Que las notificaciones se muestran con el mensaje y tipo correctos.
    - [ ] Que las notificaciones desaparecen después del tiempo configurado (si la librería lo permite testear).
- [ ] Escribir pruebas de integración para componentes clave (`TranscriptionList.jsx`, `AIChat.jsx`, `Sidebar.jsx`) para verificar que invocan `NotificationSystem.jsx` en escenarios de error de API.

### 5. Integración de Componentes

- [ ] Realizar pruebas de integración end-to-end para asegurar que todas las interacciones con la API disparan el `NotificationSystem.jsx` de manera adecuada (éxito/error) y que los indicadores de carga son visibles.

### 6. Pruebas de Aceptación

- [ ] Verificar AC: El componente `NotificationSystem.jsx` debe ser capaz de mostrar mensajes de éxito, error y advertencia. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: Las notificaciones deben ser no intrusivas (ej. "toast" o "snackbar") y desaparecer automáticamente después de un tiempo configurable. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: Todas las llamadas a la API (navegación de Drive, carga de archivos, interacción con IA) deben integrar el `NotificationSystem.jsx` para reportar errores. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: Se deben mostrar indicadores de carga visibles para todas las operaciones asíncronas. (Estrategia guiada por L3-05 Testing Estratégico)

### 7. Documentación

- [ ] Documentar el uso del `NotificationSystem.jsx` en la guía de desarrollo del proyecto. (Ref: L3-04-code-documentation.mdc)
- [ ] Actualizar `docstrings` en los componentes que integran el sistema de notificaciones.

### 8. Refinamiento y Revisión Final

- [ ] Realizar una revisión de código por pares.
- [ ] Limpiar código y asegurar la adherencia a los estándares de codificación.
- [ ] Verificar el cumplimiento de todos los Requisitos No Funcionales (NFRs) relevantes para esta HU (ej. Usabilidad, Resiliencia).
- [ ] Confirmar que no se han introducido regresiones en la funcionalidad existente.
