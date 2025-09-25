# Contratos de Datos de la API Frontend

Este documento detalla los endpoints de backend consumidos por la aplicación frontend y sus contratos de datos (solicitud y respuesta).

## Endpoints Consumidos

### 1. `/usuario`

*   **Descripción:** Obtiene la información del usuario (correo) a partir de su ID.
*   **Ubicación en el Código:** `FrontPipeDrive/src/Sidebar.jsx`
*   **Método HTTP:** `POST`

#### Request

```json
{
  "userId": "string" // ID del usuario, obtenido de los parámetros de la URL.
}
```

#### Response

```json
{
  "usuario": {
    "correo": "string" // Correo electrónico del usuario.
  }
}
```

---

### 2. `/DriveFolderArch`

*   **Descripción:** Obtiene la lista de archivos y subcarpetas dentro de una carpeta específica de Google Drive.
*   **Ubicación en el Código:** `FrontPipeDrive/src/TranscriptionList.jsx` (función `archivosFolders`)
*   **Método HTTP:** `POST`

#### Request

```json
{
  "userId": "string",   // ID del usuario, obtenido de los parámetros de la URL.
  "folderId": "string"  // ID de la carpeta de Google Drive.
}
```

#### Response

```json
{
  "GoogleDrive": {
    "files": [
      {
        "id": "string",       // ID del archivo/carpeta en Google Drive.
        "mimeType": "string", // Tipo MIME (ej. "application/vnd.google-apps.folder" para carpetas, "text/plain" para archivos).
        "name": "string"      // Nombre del archivo/carpeta.
      }
      // ... otros archivos/carpetas
    ]
  }
}
```

---

### 3. `/DriveInfoArch`

*   **Descripción:** Obtiene el contenido de un archivo específico de Google Drive.
*   **Ubicación en el Código:** `FrontPipeDrive/src/TranscriptionList.jsx` (función `contenidoArch`)
*   **Método HTTP:** `POST`

#### Request

```json
{
  "userId": "string",   // ID del usuario, obtenido de los parámetros de la URL.
  "fieldId": "string"   // ID del archivo de Google Drive.
}
```

#### Response

```json
{
  "GoogleDrive": "string" // Contenido del archivo (ej. texto de una transcripción).
}
```

---

### 4. `/DriveRoot`

*   **Descripción:** Obtiene la lista de archivos y carpetas en la raíz del Google Drive del usuario.
*   **Ubicación en el Código:** `FrontPipeDrive/src/TranscriptionList.jsx` (función `fetchFolders`)
*   **Método HTTP:** `POST`

#### Request

```json
{
  "userId": "string" // ID del usuario, obtenido de los parámetros de la URL.
}
```

#### Response

```json
{
  "GoogleDrive": {
    "files": [
      {
        "id": "string",       // ID del archivo/carpeta en Google Drive.
        "mimeType": "string", // Tipo MIME (ej. "application/vnd.google-apps.folder" para carpetas, "text/plain" para archivos).
        "name": "string"      // Nombre del archivo/carpeta.
      }
      // ... otros archivos/carpetas
    ]
  }
}
```
