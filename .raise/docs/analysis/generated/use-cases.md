# Casos de Uso de Negocio del Frontend

Este documento describe los casos de uso de negocio principales que la aplicación frontend soporta, desde la perspectiva del usuario, y cómo se mapean a los componentes y la lógica de interacción con el backend.

## Casos de Uso Principales

### 1. Autenticación de Usuario y Visualización de Correo

*   **Descripción:** Un usuario accede a la aplicación con un `userId` ya provisto en la URL. La aplicación utiliza este ID para obtener y mostrar el correo electrónico del usuario en la barra lateral.
*   **Componentes Involucrados:** `Sidebar.jsx`
*   **Interacciones con el Backend:** `POST /usuario` (para obtener el correo del usuario).
*   **Flujo:**
    1.  El `Sidebar` se carga.
    2.  Se extrae el `userId` de la URL.
    3.  Se realiza una llamada `POST` a `/usuario` con el `userId`.
    4.  El correo electrónico recibido se guarda en el estado local (`correo`) y se muestra en la interfaz.

### 2. Navegación en Google Drive

*   **Descripción:** El usuario puede explorar el contenido de su Google Drive, visualizando archivos y carpetas, y navegando entre ellas.
*   **Componentes Involucrados:** `TranscriptionList.jsx` (incluyendo `FileOrFolder`)
*   **Interacciones con el Backend:**
    *   `POST /DriveRoot` (para obtener el contenido de la raíz de Google Drive).
    *   `POST /DriveFolderArch` (para obtener el contenido de una carpeta específica).
*   **Flujo:**
    1.  El `TranscriptionList` se carga.
    2.  Se realiza una llamada `POST` a `/DriveRoot` para obtener los archivos y carpetas de la raíz.
    3.  La lista de `items` se actualiza y se renderiza una serie de componentes `FileOrFolder`.
    4.  Cuando el usuario hace clic en una carpeta (`FileOrFolder` donde `isFolder` es `true`):
        *   Se realiza una llamada `POST` a `/DriveFolderArch` con el `userId` y el `folderId`.
        *   La lista de `items` se actualiza con el contenido de la nueva carpeta, permitiendo la navegación.

### 3. Visualización de Contenido de Archivo

*   **Descripción:** El usuario selecciona un archivo de Google Drive para ver su contenido detallado.
*   **Componentes Involucrados:** `TranscriptionList.jsx` (incluyendo `FileOrFolder`)
*   **Interacciones con el Backend:** `POST /DriveInfoArch` (para obtener el contenido del archivo).
*   **Flujo:**
    1.  El usuario navega por Google Drive (Caso de Uso 2).
    2.  Cuando el usuario hace clic en un archivo (`FileOrFolder` donde `isFolder` es `false`):
        *   Se realiza una llamada `POST` a `/DriveInfoArch` con el `userId` y el `fieldId` del archivo.
        *   El contenido del archivo se guarda en el estado `selectedFile`.
        *   El componente `TranscriptionList` cambia su renderizado para mostrar el nombre y el `Contenido` del archivo seleccionado, ocultando la lista de archivos/carpetas.

### 4. Acceso a Secciones de la Aplicación (Notificaciones, Informes) y Cierre de Sesión

*   **Descripción:** El usuario puede interactuar con la barra lateral para navegar a diferentes funcionalidades de la aplicación o para cerrar su sesión.
*   **Componentes Involucrados:** `Sidebar.jsx`, `Index.jsx` (posiblemente como orquestador de rutas).
*   **Interacciones con el Backend:** No hay interacciones directas con el backend para estos casos de uso desde la `Sidebar` en el código analizado, más allá de la carga inicial del usuario.
*   **Flujo:**
    1.  El usuario hace clic en los botones de la barra lateral (Notificaciones, Google Drive, Informes, Cerrar sesión).
    2.  La función `onSelectDates` (prop en `Sidebar`) es llamada con el identificador de la sección (`"notifications"`, `"drive"`, `"informs"`).
    3.  Se espera que un componente padre (`Index.jsx` en este caso) maneje el cambio de estado o la navegación basada en este evento.
