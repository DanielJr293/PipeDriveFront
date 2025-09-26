# Modelo de Dominio del Frontend

Este documento describe los conceptos de dominio y las estructuras de datos clave manejadas por la aplicación frontend.

## Conceptos Clave del Dominio

### 1. Usuario

Representa al usuario autenticado en la aplicación.

*   **Atributos:**
    *   `userId`: `string` - Identificador único del usuario (obtenido de los parámetros de la URL).
    *   `correo`: `string` - Dirección de correo electrónico del usuario (obtenido del backend).

### 2. Item de Google Drive (Archivo o Carpeta)

Representa un archivo o una carpeta dentro de Google Drive, tal como es presentado en la interfaz de usuario.

*   **Atributos:**
    *   `id`: `string` - Identificador único en Google Drive.
    *   `name`: `string` - Nombre visible del archivo o carpeta.
    *   `mimeType`: `string` - Tipo MIME del ítem. Permite distinguir entre archivos (`text/plain`, `application/pdf`, etc.) y carpetas (`application/vnd.google-apps.folder`).

### 3. Contenido de Archivo

Representa el contenido textual de un archivo específico de Google Drive, que es recuperado para su visualización o procesamiento en el frontend.

*   **Atributos:**
    *   `Contenido`: `string` - El texto recuperado del archivo. Se anexa dinámicamente al objeto `Item de Google Drive` cuando se selecciona un archivo.

## Invariantes y Reglas de Negocio (a nivel Frontend)

Aunque el frontend no implementa reglas de negocio complejas en el sentido transaccional, mantiene ciertas invariantes en su estado y presentación:

*   **Consistencia de Datos:** La información del usuario (`correo`) se carga una única vez al inicio de la aplicación y se mantiene consistente en la barra lateral.
*   **Navegación en Drive:** La navegación entre carpetas de Google Drive actualiza dinámicamente la lista de `Items de Google Drive` mostrados, asegurando que solo se vean los contenidos de la carpeta actual.
*   **Visualización de Contenido:** El contenido de un archivo (`Contenido`) solo se carga y muestra cuando un `Item de Google Drive` específico de tipo archivo es seleccionado por el usuario.
