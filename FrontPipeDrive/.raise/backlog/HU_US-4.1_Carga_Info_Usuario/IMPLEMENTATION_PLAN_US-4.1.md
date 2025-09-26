# IMPLEMENTATION_PLAN_US-4.1.md

## Plan de Implementación Detallado para HU US-4.1: Carga y Visualización de Información del Usuario

### 1. Preparación y Configuración

- [ ] Crear nueva rama de desarrollo para la HU (ej. `feature/US-4.1-user-info-load`).
- [ ] Asegurar que el `userId` esté disponible al cargar la aplicación (ej. desde la URL o un contexto global).
- [ ] Confirmar el contrato exacto de la API para `POST /usuario` (parametros: `userId`; respuesta: `{ usuario: { correo: "string" } }`).

### 2. Diseño Detallado

- [ ] Definir la estructura del estado en `Sidebar.jsx` para `userEmail`, `isLoadingUser`, y `userError`. (Ref: L2-02-react-state-management.mdc)
- [ ] Diseñar cómo se mostrará el correo electrónico del usuario en la barra lateral. (Ref: L2-06-react-ui-components.mdc)
- [ ] Diseñar el indicador de carga en la `Sidebar` mientras se espera la respuesta de la API.

### 3. Desarrollo de Componentes

#### 3.1. `Sidebar.jsx` - Componente Principal

- [ ] Modificar `Sidebar.jsx` para incluir un estado para `userEmail`, `isLoadingUser`, y `userError`. (Ref: L2-02-react-state-management.mdc)
- [ ] Implementar un `useEffect` hook para realizar la llamada `POST /usuario` al montar el componente (y posiblemente cuando `userId` cambie). (Ref: L2-04-react-api-integration.mdc)
- [ ] En la llamada a la API:
    - [ ] Establecer `isLoadingUser` a `true` antes de la llamada.
    - [ ] Al recibir una respuesta exitosa, almacenar el `correo` en `userEmail`.
    - [ ] Si la API responde con un error, establecer `userError` con un mensaje amigable y utilizar `NotificationSystem.jsx` para mostrar el fallo. (Ref: L3-03-frontend-error-handling.mdc)
    - [ ] Restablecer `isLoadingUser` a `false` al finalizar (éxito o error).
- [ ] Renderizar condicionalmente el `userEmail` cuando esté disponible. (Ref: L2-05-react-conditional-rendering.mdc)
- [ ] Mostrar un indicador visual de carga (ej. spinner) en la `Sidebar` mientras `isLoadingUser` es `true`.

#### 3.2. `NotificationSystem.jsx` - Manejo de Notificaciones

- [ ] Integrar `NotificationSystem.jsx` en `Sidebar.jsx` para mostrar notificaciones de error si falla la carga de la información del usuario.

### 4. Pruebas Unitarias

- [ ] Escribir pruebas unitarias para `Sidebar.jsx` para verificar: (Ref: L3-05-testing-strategic.mdc)
    - [ ] Que la llamada a `POST /usuario` se realiza al montar el componente.
    - [ ] Que `userEmail`, `isLoadingUser`, y `userError` se actualizan correctamente.
    - [ ] Renderizado condicional del correo electrónico o el indicador de carga.
    - [ ] Manejo de estados de carga y error durante la carga de la información del usuario.
- [ ] Escribir pruebas de integración para `Sidebar.jsx` y `NotificationSystem.jsx` para asegurar que las notificaciones de error se disparan correctamente.

### 5. Integración de Componentes

- [ ] Verificar que al cargar la aplicación, la `Sidebar.jsx` muestra la información del usuario (correo) una vez obtenida de la API.
- [ ] Asegurar que el `NotificationSystem.jsx` se activa correctamente para los errores en la carga de la información del usuario.

### 6. Pruebas de Aceptación

- [ ] Verificar AC: Dado que la aplicación se carga, entonces el componente `Sidebar.jsx` debe realizar una `POST /usuario` a la API de backend con mi `userId`. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: Dado que la API responde con éxito, entonces el sistema debe mostrar mi correo electrónico en la barra lateral. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: Dado que la API responde con un error, entonces el sistema debe mostrar un mensaje de error amigable y un indicador visual de fallo en el `NotificationSystem.jsx`. (Estrategia guiada por L3-05 Testing Estratégico)
- [ ] Verificar AC: Debe haber un indicador visual de carga en la `Sidebar` mientras se espera la respuesta de la API. (Estrategia guiada por L3-05 Testing Estratégico)

### 7. Documentación

- [ ] Actualizar los comentarios y `docstrings` en `Sidebar.jsx` para reflejar la lógica de carga y visualización de la información del usuario. (Ref: L3-04-code-documentation.mdc)

### 8. Refinamiento y Revisión Final

- [ ] Realizar una revisión de código por pares.
- [ ] Limpiar código y asegurar la adherencia a los estándares de codificación.
- [ ] Verificar el cumplimiento de todos los Requisitos No Funcionales (NFRs) relevantes para esta HU (ej. Rendimiento, Usabilidad, Seguridad, Resiliencia).
- [ ] Confirmar que no se han introducido regresiones en la funcionalidad existente.
