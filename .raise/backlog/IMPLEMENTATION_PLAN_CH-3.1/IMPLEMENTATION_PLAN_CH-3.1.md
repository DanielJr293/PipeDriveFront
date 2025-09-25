# IMPLEMENTATION_PLAN_CH-3.1.md

## Plan de Implementación Detallado para HU CH-3.1: Envío de Preguntas al Chat de IA

### 1. Preparación y Configuración

- [ ] Crear nueva rama de desarrollo para la HU (ej. `feature/CH-3.1-send-ai-query`).
- [ ] Asegurar que el `userId` y el `documentId` del archivo seleccionado estén disponibles en `AIChat.jsx`.
- [ ] Confirmar el contrato exacto de la API para `POST /ai-chat` (parametros: `userId`, `documentId`, `query`; respuesta: `response`).

### 2. Diseño Detallado

- [ ] Diseñar la interfaz de usuario en `AIChat.jsx` para el campo de entrada de texto y el botón de envío. (Ref: L2-06-react-ui-components.mdc)
- [ ] Definir el estado en `AIChat.jsx` para `currentQuery`, `isSendingQuery`, y `queryError`. (Ref: L2-02-react-state-management.mdc)
- [ ] Diseñar cómo se mostrará el indicador de carga mientras se espera la respuesta de la IA. (Ref: L3-02-iconography-and-visual-feedback.mdc)

### 3. Desarrollo de Componentes

#### 3.1. `AIChat.jsx` - Lógica de Envío de Preguntas

- [ ] Modificar `AIChat.jsx` para incluir un `input` o `textarea` para la `query` del usuario y un botón para "Enviar". (Ref: L2-06-react-ui-components.mdc)
- [ ] Implementar un estado local para `currentQuery` y una función `handleChange` para actualizarlo. (Ref: L2-02-react-state-management.mdc)
- [ ] Implementar la función `handleSendQuery()` que: (Ref: L2-04-react-api-integration.mdc)
    - [ ] Establezca `isSendingQuery` a `true`.
    - [ ] Realice una llamada `POST /ai-chat` con `userId`, `documentId` (obtenido de props), y `currentQuery`.
    - [ ] Maneje la respuesta de la API: si es exitosa, se limpiará `currentQuery` y se preparará para mostrar la respuesta (futura HU). Si hay un error, establecerá `queryError`.
    - [ ] Utilice `NotificationSystem.jsx` para mostrar mensajes de éxito/error.
    - [ ] Restablezca `isSendingQuery` a `false` al finalizar.
- [ ] Renderizar un indicador visual de carga (ej. spinner en el botón de envío) mientras `isSendingQuery` es `true`. (Ref: L2-05-react-conditional-rendering.mdc)

#### 3.2. `NotificationSystem.jsx` - Manejo de Notificaciones

- [ ] Reutilizar la implementación existente del `NotificationSystem.jsx` para mostrar notificaciones de éxito y error para la llamada a `POST /ai-chat`.

### 4. Pruebas Unitarias

- [ ] Escribir pruebas unitarias para `AIChat.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [ ] Que el campo de entrada de texto y el botón de envío se renderizan.
    - [ ] Que `handleChange` actualiza `currentQuery` correctamente.
    - [ ] Que `handleSendQuery` dispara la llamada a `POST /ai-chat` con los parámetros correctos (`userId`, `documentId`, `query`).
    - [ ] Manejo de estados de carga y error durante el envío de la consulta.
    - [ ] Renderizado condicional del indicador de carga.
    - [ ] Que `currentQuery` se limpia después de un envío exitoso.

### 5. Integración de Componentes

- [ ] Verificar que `AIChat.jsx` se integra correctamente con la API de IA, permitiendo el envío de preguntas y mostrando estados de carga y error.
- [ ] Asegurar que `NotificationSystem.jsx` se activa correctamente para las operaciones de envío de preguntas.

### 6. Pruebas de Aceptación

- [ ] Verificar AC: Dado que el `AIChat.jsx` está visible, cuando escribo una pregunta y la envío, entonces se debe realizar una llamada `POST /ai-chat` a la API de backend con mi `userId`, el `documentId` y mi `query`. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: El campo de entrada para la pregunta debe ser claro y fácil de usar. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: Debe haber un indicador visual de carga mientras se espera la respuesta de la IA. (Estrategia guiada por L3-05 Testing Estratégico)

### 7. Documentación

- [ ] Actualizar los comentarios y `docstrings` en `AIChat.jsx` para reflejar la lógica de envío de preguntas. (Ref: L3-04-code-documentation.mdc)

### 8. Refinamiento y Revisión Final

- [ ] Realizar una revisión de código por pares.
- [ ] Limpiar código y asegurar la adherencia a los estándares de codificación.
- [ ] Verificar el cumplimiento de todos los Requisitos No Funcionales (NFRs) relevantes para esta HU.
- [ ] Confirmar que no se han introducido regresiones en la funcionalidad existente.
