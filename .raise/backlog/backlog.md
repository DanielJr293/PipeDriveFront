---
document_id: "BAK-PDF-001"
title: "Backlog del Proyecto: PipeDriveFront"
project_name: "PipeDriveFront"
version: "0.1"
date: "2025-09-25"
author: "ArquiFlow"
related_docs:
  - "PRD-PDF-001"
  - "TEC-PDF-001"
status: "Draft"
---

# Backlog del Proyecto: PipeDriveFront

Este documento define el backlog inicial para el proyecto `PipeDriveFront`, detallando las Historias de Usuario (HUs) basadas en los requisitos funcionales y no funcionales especificados en `project_requirements.md` y `tech_design.md`.

## 1. Épica: Gestión y Visualización de Google Drive

**Descripción:** Esta épica cubre toda la funcionalidad relacionada con la navegación, visualización y gestión básica de archivos y carpetas de Google Drive dentro de la aplicación.

### HU 1.1: Visualización del Contenido de la Raíz de Google Drive

*   **ID:** GF-1.1
*   **Prioridad:** Alta
*   **Como:** Usuario
*   **Quiero:** Ver el contenido de mi carpeta raíz de Google Drive (archivos y carpetas)
*   **Para:** Tener un punto de partida para navegar mis documentos.
*   **Criterios de Aceptación:**
    *   Dado que el usuario accede a la sección "Drive", cuando la aplicación se carga, entonces se debe realizar una llamada `POST /DriveRoot` a la API de backend con mi `userId`.
    *   Dado que la API responde con éxito, entonces el sistema debe mostrar una lista de archivos y carpetas en la interfaz de usuario.
    *   Dado que la API responde con un error, entonces el sistema debe mostrar un mensaje de error amigable y un indicador visual de fallo (ej. `NotificationSystem.jsx`).
    *   El listado debe mostrar el `name`, `id` y `mimeType` de cada ítem.
    *   Debe haber un indicador visual de carga mientras se espera la respuesta de la API.

### HU 1.2: Navegación entre Carpetas de Google Drive

*   **ID:** GF-1.2
*   **Prioridad:** Alta
*   **Como:** Usuario
*   **Quiero:** Poder navegar por las subcarpetas de mi Google Drive
*   **Para:** Acceder a documentos específicos dentro de una estructura organizada.
*   **Criterios de Aceptación:**
    *   Dado que estoy viendo el contenido de una carpeta, cuando hago clic en un ítem de tipo "carpeta", entonces se debe realizar una llamada `POST /DriveFolderArch` a la API de backend con mi `userId` y el `folderId` de la carpeta seleccionada.
    *   Dado que la API responde con éxito, entonces el sistema debe actualizar la vista para mostrar el contenido de la nueva carpeta.
    *   Dado que la API responde con un error, entonces el sistema debe mostrar un mensaje de error amigable y un indicador visual de fallo.
    *   Debe haber un indicador visual de carga mientras se espera la respuesta de la API.
    *   El componente `FileOrFolder.jsx` debe ser adaptable para manejar el clic y diferenciar entre archivos y carpetas.

### HU 1.3: Retorno a la Carpeta Anterior (Navegación "Volver")

*   **ID:** GF-1.3
*   **Prioridad:** Media
*   **Como:** Usuario
*   **Quiero:** Poder regresar a la carpeta visitada anteriormente
*   **Para:** Navegar de forma eficiente por el historial de mi Google Drive.
*   **Criterios de Aceptación:**
    *   Dado que he navegado a una subcarpeta, cuando hago clic en un botón "Volver", entonces el sistema debe mostrar el contenido de la carpeta anterior.
    *   El sistema debe mantener un historial de `folderId`s visitados para la funcionalidad "Volver".
    *   El botón "Volver" solo debe estar visible si hay una carpeta anterior en el historial.

### HU 1.4: Visualización del Contenido de Archivos Seleccionados

*   **ID:** GF-1.4
*   **Prioridad:** Media
*   **Como:** Usuario
*   **Quiero:** Ver el contenido de un archivo seleccionado
*   **Para:** Poder revisar la información del documento.
*   **Criterios de Aceptación:**
    *   Dado que estoy viendo el contenido de una carpeta, cuando hago clic en un ítem de tipo "archivo", entonces se debe realizar una llamada `POST /DriveInfoArch` a la API de backend con mi `userId` y el `fieldId` del archivo seleccionado.
    *   Dado que la API responde con éxito, entonces el sistema debe mostrar el contenido del archivo en una vista adecuada.
    *   Dado que la API responde con un error, entonces el sistema debe mostrar un mensaje de error amigable y un indicador visual de fallo.
    *   Debe haber un indicador visual de carga mientras se espera la respuesta de la API.
    *   El contenido del archivo debe almacenarse temporalmente para su posterior uso (ej., por el chat de IA).

### HU 1.5: Adaptación del Componente FileOrFolder

*   **ID:** GF-1.5
*   **Prioridad:** Alta
*   **Como:** Desarrollador
*   **Quiero:** Reutilizar y adaptar el componente `FileOrFolder.jsx`
*   **Para:** Representar de manera consistente los ítems de Google Drive y manejar sus acciones.
*   **Criterios de Aceptación:**
    *   El componente `FileOrFolder.jsx` debe aceptar `id`, `name`, `mimeType` como props.
    *   La lógica de clic del componente debe invocar la función de navegación a carpeta o selección de archivo según el `mimeType`.
    *   El componente debe mostrar un icono o una representación visual diferente para archivos y carpetas.

## 2. Épica: Interacción Contextual con Documentos .doc

**Descripción:** Esta épica se centra en las funcionalidades específicas que se activan al seleccionar un archivo `.doc`, incluyendo la visualización de acciones y la interfaz del chat de IA.

### HU 2.1: Activación de Botones de Acción para Archivos .doc

*   **ID:** IA-2.1
*   **Prioridad:** Media
*   **Como:** Usuario
*   **Quiero:** Ver botones de acción específicos (ej., "Resumen de la Llamada", "Propuesta") cuando selecciono un archivo `.doc`
*   **Para:** Acceder rápidamente a funcionalidades inteligentes para ese tipo de documento.
*   **Criterios de Aceptación:**
    *   Dado que he seleccionado un archivo con `mimeType` correspondiente a un `.doc`, entonces el componente `DocActions.jsx` debe volverse visible.
    *   Dado que he seleccionado un archivo que NO es `.doc`, entonces el componente `DocActions.jsx` debe estar oculto.
    *   El sistema debe identificar los `mimeType` correctos para documentos `.doc` (ej., `application/vnd.google-apps.document`, `application/msword`).
    *   Los botones de acción deben incluir al menos "Resumen de la Llamada", "Propuesta", "Preguntas" y "Acciones".

### HU 2.2: Apertura del Chat de IA al Seleccionar Acción de .doc

*   **ID:** IA-2.2
*   **Prioridad:** Media
*   **Como:** Usuario
*   **Quiero:** Que se abra la interfaz de chat con IA al hacer clic en un botón de acción de un documento `.doc`
*   **Para:** Iniciar la interacción inteligente sobre el contenido del documento.
*   **Criterios de Aceptación:**
    *   Dado que el componente `DocActions.jsx` está visible, cuando hago clic en cualquiera de sus botones de acción, entonces el componente `AIChat.jsx` debe activarse y volverse visible.
    *   El contenido del archivo `.doc` previamente seleccionado debe ser accesible para el componente `AIChat.jsx`.
    *   Se debe establecer un estado (`isAIChatActive`) para controlar la visibilidad del chat.

## 3. Épica: Chat de Inteligencia Artificial

**Descripción:** Esta épica cubre la implementación y funcionalidad del chat de IA, incluyendo el envío de preguntas y la visualización de respuestas.

### HU 3.1: Envío de Preguntas al Chat de IA

*   **ID:** CH-3.1
*   **Prioridad:** Media
*   **Como:** Usuario
*   **Quiero:** Escribir y enviar preguntas a la IA en el chat contextual
*   **Para:** Obtener información o realizar análisis sobre el documento seleccionado.
*   **Criterios de Aceptación:**
    *   Dado que el `AIChat.jsx` está visible, cuando escribo una pregunta y la envío, entonces se debe realizar una llamada `POST /ai-chat` a la API de backend con mi `userId`, el `documentId` y mi `query`.
    *   El campo de entrada para la pregunta debe ser claro y fácil de usar.
    *   Debe haber un indicador visual de carga mientras se espera la respuesta de la IA.

### HU 3.2: Visualización de Respuestas de la IA

*   **ID:** CH-3.2
*   **Prioridad:** Media
*   **Como:** Usuario
*   **Quiero:** Ver las respuestas de la IA a mis preguntas en el chat
*   **Para:** Recibir el análisis o la información solicitada del documento.
*   **Criterios de Aceptación:**
    *   Dado que la API de `POST /ai-chat` responde con éxito, entonces la respuesta de la IA (`response`) debe mostrarse en la interfaz del chat.
    *   Las respuestas de la IA deben ser legibles y presentadas de forma clara en el flujo de conversación.
    *   Dado que la API de IA responde con un error o tiene una latencia alta, entonces el sistema debe mostrar un mensaje de error amigable o un mensaje de "espera" y un indicador visual de fallo.

## 4. Épica: Gestión de Usuario y Notificaciones Globales

**Descripción:** Esta épica se enfoca en la carga inicial de datos del usuario y en un sistema de notificación unificado para feedback al usuario.

### HU 4.1: Carga y Visualización de Información del Usuario

*   **ID:** US-4.1
*   **Prioridad:** Alta
*   **Como:** Usuario
*   **Quiero:** Ver mi información de usuario (correo) al iniciar la aplicación
*   **Para:** Confirmar que estoy autenticado correctamente.
*   **Criterios de Aceptación:**
    *   Dado que la aplicación se carga, entonces el componente `Sidebar.jsx` debe realizar una `POST /usuario` a la API de backend con mi `userId`.
    *   Dado que la API responde con éxito, entonces el sistema debe mostrar mi correo electrónico en la barra lateral.
    *   Dado que la API responde con un error, entonces el sistema debe mostrar un mensaje de error amigable y un indicador visual de fallo en el `NotificationSystem.jsx`.
    *   Debe haber un indicador visual de carga en la `Sidebar` mientras se espera la respuesta de la API.

### HU 4.2: Sistema Global de Notificaciones (Toast/Snackbar)

*   **ID:** NS-4.2
*   **Prioridad:** Media
*   **Como:** Usuario
*   **Quiero:** Recibir notificaciones claras sobre el éxito o fallo de las operaciones
*   **Para:** Entender el estado de la aplicación y las interacciones con la API.
*   **Criterios de Aceptación:**
    *   El componente `NotificationSystem.jsx` debe ser capaz de mostrar mensajes de éxito, error y advertencia.
    *   Las notificaciones deben ser no intrusivas (ej. "toast" o "snackbar") y desaparecer automáticamente después de un tiempo configurable.
    *   Todas las llamadas a la API (navegación de Drive, carga de archivos, interacción con IA) deben integrar el `NotificationSystem.jsx` para reportar errores.
    *   Se deben mostrar indicadores de carga visibles para todas las operaciones asíncronas.

## 5. Requisitos No Funcionales (NFRs) a Considerar en Todas las HUs

Los siguientes NFRs deben ser tenidos en cuenta durante la implementación de todas las Historias de Usuario:

*   **Rendimiento:**
    *   Tiempo de carga inicial (TTI) < 2 segundos.
    *   Tiempo de respuesta de la API propia para listados < 500ms.
    *   Tiempo de respuesta de la API de IA < 2 segundos por consulta.
*   **Usabilidad:** Interfaz de usuario intuitiva y consistente, con feedback claro de estados de carga y error.
*   **Mantenibilidad:** Código modular, legible, documentado y siguiendo las mejores prácticas de React.
*   **Seguridad:** Todas las comunicaciones vía HTTPS, protección contra XSS/CSRF, manejo seguro de `userId`.
*   **Resiliencia:** Implementación de manejo de errores robusto, con mensajes amigables al usuario y componentes de fallback (ej., "No se pudo cargar la información").
