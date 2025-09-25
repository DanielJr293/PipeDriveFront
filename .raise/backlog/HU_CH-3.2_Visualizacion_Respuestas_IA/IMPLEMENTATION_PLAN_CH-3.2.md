# IMPLEMENTATION_PLAN_CH-3.2.md

## Plan de Implementación Detallado para HU CH-3.2: Visualización de Respuestas de la IA

### 1. Preparación y Configuración

- [ ] Crear nueva rama de desarrollo para la HU (ej. `feature/CH-3.2-display-ai-response`).
- [ ] Asegurar que el componente `AIChat.jsx` tiene acceso a las respuestas de la API `POST /ai-chat` de la HU anterior (CH-3.1).
- [ ] Definir la estructura esperada de la respuesta de la IA (ej. un array de objetos `[{ query: "string", response: "string" }]` para el historial del chat).

### 2. Diseño Detallado

- [ ] Diseñar cómo se mostrarán las preguntas del usuario y las respuestas de la IA en el `AIChat.jsx` para una conversación legible. (Ref: L2-06-react-ui-components.mdc)
- [ ] Definir el estado en `AIChat.jsx` para `chatHistory` (historial de mensajes) y `aiResponseError`. (Ref: L2-02-react-state-management.mdc)
- [ ] Diseñar los mensajes de error amigables o de "espera" para casos de latencia o fallo de la API. (Ref: L3-03-frontend-error-handling.mdc)

### 3. Desarrollo de Componentes

#### 3.1. `AIChat.jsx` - Visualización de Respuestas

- [ ] Modificar `AIChat.jsx` para incluir un estado `chatHistory` (ej. un array de objetos que contenga tanto la `query` del usuario como la `response` de la IA). (Ref: L2-02-react-state-management.mdc)
- [ ] En la función `handleSendQuery()` (de la HU CH-3.1), después de una respuesta exitosa de `POST /ai-chat`:
    - [ ] Añadir la pregunta del usuario (`currentQuery`) y la respuesta de la IA (`response` de la API) al `chatHistory`.
    - [ ] Limpiar `currentQuery`.
- [ ] Implementar la lógica de renderizado para iterar sobre `chatHistory` y mostrar cada mensaje (pregunta del usuario y respuesta de la IA) de forma clara y diferenciada. (Ref: L2-05-react-conditional-rendering.mdc)
- [ ] Mostrar un mensaje de error amigable o un mensaje de "espera" si la API de IA responde con un error o tiene una latencia alta (`aiResponseError`). (Ref: L3-03-frontend-error-handling.mdc)
- [ ] Asegurar que el indicador de carga (spinner) de la HU anterior se muestre mientras se espera la respuesta de la IA y se oculte cuando llega la respuesta o un error.

#### 3.2. `NotificationSystem.jsx` - Manejo de Notificaciones

- [ ] Reutilizar la implementación existente del `NotificationSystem.jsx` para mostrar notificaciones de error si la API de IA falla o tiene alta latencia.

### 4. Pruebas Unitarias

- [ ] Escribir pruebas unitarias para `AIChat.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [ ] Que `chatHistory` se actualiza correctamente con las preguntas del usuario y las respuestas de la IA.
    - [ ] Que los mensajes del chat se renderizan de forma legible y diferenciada.
    - [ ] Que los mensajes de error amigables o de "espera" se muestran en caso de fallos de la API o latencia alta.
    - [ ] Que el indicador de carga se muestra/oculta correctamente.

### 5. Integración de Componentes

- [ ] Verificar que después de enviar una pregunta en `AIChat.jsx`, la respuesta de la IA aparece en el flujo de conversación.
- [ ] Asegurar que los mensajes de error del `NotificationSystem.jsx` se activan correctamente ante fallos de la API de IA.

### 6. Pruebas de Aceptación

- [ ] Verificar AC: Dado que la API de `POST /ai-chat` responde con éxito, entonces la respuesta de la IA (`response`) debe mostrarse en la interfaz del chat. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: Las respuestas de la IA deben ser legibles y presentadas de forma clara en el flujo de conversación. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: Dado que la API de IA responde con un error o tiene una latencia alta, entonces el sistema debe mostrar un mensaje de error amigable o un mensaje de "espera" y un indicador visual de fallo. (Estrategia guiada por L3-05 Testing Estratégico)

### 7. Documentación

- [ ] Actualizar los comentarios y `docstrings` en `AIChat.jsx` para reflejar la lógica de visualización de respuestas y el manejo del historial del chat. (Ref: L3-04-code-documentation.mdc)

### 8. Refinamiento y Revisión Final

- [ ] Realizar una revisión de código por pares.
- [ ] Limpiar código y asegurar la adherencia a los estándares de codificación.
- [ ] Verificar el cumplimiento de todos los Requisitos No Funcionales (NFRs) relevantes para esta HU.
- [ ] Confirmar que no se han introducido regresiones en la funcionalidad existente (ej. envío de preguntas, activación del chat).
