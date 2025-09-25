---
document_id: "TEC-PDF-001"
title: "Diseño Técnico: Navegación Google Drive e Interacción IA"
project_name: "PipeDriveFront"
feature_us_ref: "PRD-PDF-001 - Sección 4.1 - Capacidades"
client: "Humansys.ai"
version: "0.1"
date: "2025-09-25"
author: "ArquiFlow"
related_docs:
  - "PRD-PDF-001"
  - "SER-PDF-001"
  - "CON-PDF-001"
  - "DEP-PDF-001"
  - "DOM-PDF-001"
  - "RES-PDF-001"
  - "USE-PDF-001"
status: "Draft"
---

# Diseño Técnico: Navegación Google Drive e Interacción IA

**Funcionalidad/Historia de Usuario Relacionada:** Gestión y Visualización de Contenido de Google Drive con Interacción de IA para Documentos Contextuales (Ref: PRD-PDF-001 - Sección 4.1)
**Documentos Relacionados:** PRD-PDF-001, SER-PDF-001, CON-PDF-001, DEP-PDF-001, DOM-PDF-001, RES-PDF-001, USE-PDF-001

## 1. Visión General y Objetivo

El objetivo técnico principal es construir la interfaz de usuario de `PipeDriveFront` que permita a los usuarios navegar por sus archivos y carpetas de Google Drive de manera intuitiva, visualizar el contenido de documentos específicos (particularmente `.doc`), y habilitar la interacción con un chat de inteligencia artificial contextual para el análisis de dichos documentos. Esto resuelve la necesidad de una gestión unificada y herramientas inteligentes para extraer valor de la información en Drive, como se detalla en `service-overview.md` y `project_requirements.md`.

## 2. Solución Propuesta

Se propone una arquitectura frontend basada en React, donde los componentes principales gestionarán el estado de la navegación de Google Drive y la interacción con la IA. La aplicación consumirá una API propia de backend para acceder a Google Drive y a los servicios de IA. Se dará prioridad a una experiencia de usuario fluida, con indicadores de carga y manejo robusto de errores, como se destaca en `resilience-guide.md`.

La solución se basará en los siguientes flujos de usuario (`use-cases.md`):
*   **Autenticación de Usuario y Visualización de Correo:** Carga inicial del usuario.
*   **Navegación en Google Drive:** Exploración de carpetas y archivos.
*   **Visualización de Contenido de Archivo:** Carga y muestra del contenido de un archivo seleccionado.
*   **Interacción Contextual con IA:** Activación de un chat de IA al seleccionar un documento `doc`.

## 3. Arquitectura y Desglose de Componentes

La arquitectura de `PipeDriveFront` se compone de módulos React que gestionan la UI y la lógica de negocio del frontend.

*   **Componentes Nuevos:**
    *   `AIChat.jsx`: Componente responsable de la interfaz de chat con la IA. Manejará el envío de preguntas y la visualización de respuestas. Se activará al seleccionar un archivo `.doc` y una acción específica.
    *   `DocActions.jsx`: Componente que mostrará los botones de acción contextuales (ej. "Resumen de la Llamada", "Propuesta") cuando un archivo `.doc` sea seleccionado.
    *   `NotificationSystem.jsx` (o similar): Un componente global para mostrar mensajes de éxito/error tipo "toast" o "snackbar", abordando la mejora identificada en `resilience-guide.md`.
*   **Componentes Modificados:**
    *   `Sidebar.jsx`: Mostrará la información del usuario obtenida del endpoint `/usuario`. Se mantendrá su rol de navegación y se integrará la lógica para disparar notificaciones en caso de error.
    *   `TranscriptionList.jsx`: Será el componente central para la navegación de Drive. Manejará el estado de la carpeta actual, la lista de archivos/carpetas y el archivo seleccionado. Se modificará para integrar `DocActions.jsx` y para mostrar `AIChat.jsx` condicionalmente.
    *   `FileOrFolder.jsx`: Componente reutilizable para representar un ítem de Drive (archivo o carpeta). Su lógica de click se adaptará para diferenciar entre navegar a una carpeta o seleccionar un archivo para ver su contenido o activar acciones de IA.
*   **Servicios Externos:**
    *   `Backend API (via VITE_URL_NGROK)`: Proporciona la interfaz principal para interactuar con Google Drive y la IA. Los endpoints consumidos incluyen `/usuario`, `/DriveRoot`, `/DriveFolderArch`, `/DriveInfoArch`, y se espera un endpoint para la interacción con la IA (no detallado explícitamente en `contracts.md` pero inferido del `project_requirements.md`).

*(Ejemplo de Diagrama Mermaid Opcional)*
```mermaid
graph TD;
    A[Usuario (Navegador)] --> B(PipeDriveFront Frontend);
    B --> C(Sidebar.jsx);
    B --> D(TranscriptionList.jsx);
    C --> E{POST /usuario};
    D --> F{POST /DriveRoot};
    D --> G{POST /DriveFolderArch};
    D --> H{POST /DriveInfoArch};
    D --> I(DocActions.jsx);
    I --> J(AIChat.jsx);
    J --> K{POST /ai-chat (inferido)};
    E & F & G & H & K --> L[Backend API];
    L --> M[Google Drive API];
    L --> N[AI API];
    B --> O(NotificationSystem.jsx);
    L -- Fallos --> O;
```

## 4. Flujo de Datos

1.  **Carga Inicial:** Al cargar la aplicación, `Sidebar.jsx` realiza una `POST` a `/usuario` para obtener el correo del usuario (`userId` de la URL) y `TranscriptionList.jsx` realiza una `POST` a `/DriveRoot` para obtener el contenido inicial del Google Drive del usuario.
2.  **Navegación de Carpetas:** Cuando el usuario hace clic en una carpeta, `TranscriptionList.jsx` utiliza el `folderId` para llamar a `/DriveFolderArch`, actualizando la lista de ítems mostrados.
3.  **Selección de Archivo:** Al seleccionar un archivo, `TranscriptionList.jsx` invoca `/DriveInfoArch` con el `fieldId` para obtener el contenido del archivo. Este contenido se almacena en el estado y se renderiza.
4.  **Interacción con IA:** Si el archivo seleccionado es un `.doc`, `DocActions.jsx` se vuelve visible. Al hacer clic en una acción, se activa `AIChat.jsx`. El chat enviará las preguntas del usuario (y el contexto del documento) a un endpoint de la API de backend (ej., `/ai-chat`) y mostrará las respuestas de la IA.

## 5. Contrato(s) de API

Se consumirán los siguientes endpoints de la API de backend, como se detalla en `contracts.md`:

*   **Endpoint:** `POST /usuario`
    *   **Descripción:** Obtiene la información del usuario (correo).
    *   **Cuerpo/Parámetros de la Solicitud:** `{ "userId": "string" }`
    *   **Cuerpo de la Respuesta:** `{ "usuario": { "correo": "string" } }`
*   **Endpoint:** `POST /DriveFolderArch`
    *   **Descripción:** Obtiene la lista de archivos y subcarpetas dentro de una carpeta específica.
    *   **Cuerpo/Parámetros de la Solicitud:** `{ "userId": "string", "folderId": "string" }`
    *   **Cuerpo de la Respuesta:** `{ "GoogleDrive": { "files": [ { "id": "string", "mimeType": "string", "name": "string" } ] } }`
*   **Endpoint:** `POST /DriveInfoArch`
    *   **Descripción:** Obtiene el contenido de un archivo específico.
    *   **Cuerpo/Parámetros de la Solicitud:** `{ "userId": "string", "fieldId": "string" }`
    *   **Cuerpo de la Respuesta:** `{ "GoogleDrive": "string" }`
*   **Endpoint:** `POST /DriveRoot`
    *   **Descripción:** Obtiene la lista de archivos y carpetas en la raíz del Google Drive.
    *   **Cuerpo/Parámetros de la Solicitud:** `{ "userId": "string" }`
    *   **Cuerpo de la Respuesta:** `{ "GoogleDrive": { "files": [ { "id": "string", "mimeType": "string", "name": "string" } ] } }`
*   **Nuevo Endpoint (Inferido):** `POST /ai-chat` (o similar)
    *   **Descripción:** Envía preguntas del usuario y el contenido del documento a la IA para obtener respuestas.
    *   **Cuerpo/Parámetros de la Solicitud:** Se esperaría algo como `{ "userId": "string", "documentId": "string", "query": "string" }`
    *   **Cuerpo de la Respuesta:** Se esperaría `{ "response": "string" }`

## 6. Cambios en el Modelo de Datos

El frontend manejará los siguientes conceptos clave del dominio, según `domain-model.md`:

*   **Usuario:** Se almacenará `userId` y `correo` en un estado global o local de la `Sidebar`.
*   **Item de Google Drive (Archivo o Carpeta):** Representado por una estructura `{ id: string, name: string, mimeType: string }`. `TranscriptionList.jsx` gestionará una lista de estos ítems.
*   **Contenido de Archivo:** Cuando un archivo se selecciona, su contenido (`Contenido: string`) se almacenará temporalmente en el estado del componente `TranscriptionList.jsx` o un contexto similar, para ser pasado a `AIChat.jsx`.

No se prevén cambios en esquemas de base de datos a nivel de frontend, ya que este solo consume datos de la API. Las estructuras de datos internas serán objetos JavaScript que mapeen a los contratos de la API.

## 7. Algoritmos / Lógica Clave

*   **Lógica de Navegación de Drive:** `TranscriptionList.jsx` mantendrá un estado para la `currentFolderId`. Al hacer clic en una carpeta, `currentFolderId` se actualiza y se dispara una nueva llamada a `/DriveFolderArch`. Un mecanismo de "Volver" (back) deberá gestionar una pila de `folderId`s visitados.
*   **Diferenciación de Archivos `.doc`:** Los ítems de Google Drive se diferenciarán por `mimeType`. Para `.doc` (ej., `application/vnd.google-apps.document` o `application/msword`), se habilitarán los botones de acción contextuales a través del componente `DocActions.jsx`.
*   **Activación del Chat IA:** Al seleccionar una acción en `DocActions.jsx`, se establecerá un estado `isAIChatActive` y se pasará el `Contenido` del archivo a `AIChat.jsx`.
*   **Gestión de Estado de Carga y Errores:** Se utilizarán `useState` hooks para gestionar los estados de carga (`isLoading`) y error (`hasError`), mostrando indicadores visuales y notificaciones al usuario, como se recomienda en `resilience-guide.md`.

## 8. Consideraciones de Seguridad

*   **Autenticación y Autorización:** Se asumirá que la autenticación del `userId` y la autorización para acceder a los recursos de Google Drive son manejadas por el backend. El frontend se limitará a pasar el `userId` en las solicitudes a la API.
*   **Comunicación Segura:** Todas las comunicaciones entre el frontend y la API de backend se realizarán a través de HTTPS, según lo establecido en `project_requirements.md`.
*   **Protección contra Vulnerabilidades Comunes:** Se seguirán las mejores prácticas de React para prevenir XSS y otras vulnerabilidades de inyección, asegurando que los datos de la API se rendericen de forma segura.

## 9. Estrategia de Manejo de Errores

Implementaremos una estrategia mejorada de manejo de errores basándonos en las recomendaciones de `resilience-guide.md`:

*   **Retroalimentación Visible al Usuario:**
    *   Se utilizará un `NotificationSystem.jsx` global (ej. toast/snackbar) para mostrar mensajes de error amigables en la UI cuando falle una llamada a la API (ej., errores de red, respuestas con status HTTP 4xx/5xx).
    *   Se mostrarán estados de carga visuales (spinners) mientras se esperan las respuestas de la API.
    *   Se implementarán componentes de fallback (ej., un mensaje "No se pudo cargar la información") en lugar de dejar secciones vacías o rotas.
*   **Registro de Errores:** Se mantendrá el registro de errores detallado en la consola (`console.error`) para fines de depuración.
*   **Manejo de Respuestas de API:** Se verificará el `status` de la respuesta HTTP y el cuerpo de la respuesta para manejar errores específicos de la lógica de negocio devueltos por la API de backend.
*   **Consideraciones Futuras (Reintentos/Circuit Breaker):** Aunque no se implementarán inicialmente para esta fase, se reconoce la recomendación de `resilience-guide.md` de evaluar reintentos con backoff exponencial para llamadas críticas, así como patrones de Circuit Breaker para mejorar la robustez general.

## 10. Alternativas Consideradas

*   **Gestión de Estado:**
    *   **Alternativa 1 (Redux/Zustand):** Consideramos usar una librería de gestión de estado más robusta como Redux o Zustand.
    *   **Razón de Rechazo:** Para la complejidad actual del proyecto, el Context API de React y el estado local (`useState`) son suficientes y más ligeros, reduciendo la curva de aprendizaje y la sobrecarga de código. Podría reevaluarse para futuras funcionalidades más complejas.
*   **Componentes de Notificación:**
    *   **Alternativa 1 (Implementación Custom):** Construir un sistema de notificaciones desde cero.
    *   **Razón de Rechazo:** Para acelerar el desarrollo y aprovechar soluciones probadas, se prefiere utilizar una librería de componentes "toast" (ej., `react-toastify`, `sonner`) que ya maneje animaciones, accesibilidad y posicionamiento.

## 11. Preguntas Abiertas y Riesgos

*   **Pregunta:** ¿Cuál es la lista exhaustiva de `mimeType` que la API puede devolver para documentos `.doc` (ej., `.doc`, `.docx`, Google Docs)? Esto es crucial para la activación precisa de `DocActions.jsx`.
*   **Pregunta:** ¿Cuáles son los mensajes de error específicos que la API propia puede devolver para los fallos de Google Drive o IA, para mejorar la resiliencia y retroalimentación al usuario (`resilience-guide.md`, `project_requirements.md` - Sección 10)?
*   **Riesgo:** **Latencia de la API de IA:** La latencia percibida por el usuario podría ser alta si la API de IA o el backend intermediario son lentos.
    *   **Mitigación:** Implementar indicadores de carga claros en el chat y mensajes de "espera", y explorar estrategias de optimización de la API de backend a futuro.
*   **Riesgo:** **Manejo de grandes volúmenes de archivos/carpetas:** Si una carpeta contiene miles de ítems, el rendimiento del frontend podría degradarse.
    *   **Mitigación:** La API de backend ya debería paginar la información. El frontend implementaría la carga incremental o virtualización de listas si fuera necesario.

## 13. Consideraciones para Estimación

*   **Factores de Complejidad Clave:**
    *   La lógica de navegación "Volver" y el mantenimiento del historial de carpetas.
    *   Integración fluida de `DocActions.jsx` y `AIChat.jsx` con `TranscriptionList.jsx`.
    *   Implementación del `NotificationSystem.jsx` global y su integración en los flujos de manejo de errores de la API.
*   **Incertidumbres Conocidas:**
    *   Rendimiento real de los endpoints de la API propia y de la IA.
    *   Detalle exacto del contrato de la API para la interacción con la IA.
    *   Diseño final de los botones de acción contextuales en `DocActions.jsx`.
*   **Posibles Optimizaciones/Simplificaciones:**
    *   Posponer la funcionalidad de "Volver" a una fase posterior si el tiempo es crítico (aunque es de alta prioridad para UX).
    *   Utilizar una librería existente para el sistema de notificaciones en lugar de implementarlo desde cero.
*   **Dependencias Críticas (que afectan esfuerzo):**
    *   Disponibilidad y estabilidad de la API propia.
    *   Definición clara de los mensajes de error de la API.
*   **Oportunidades de Reutilización:**
    *   El componente `FileOrFolder.jsx` ya existente se reutilizará y adaptará.
    *   Los patrones de llamada a la API (`fetch` con `.catch`) pueden ser encapsulados en un custom hook o utilidad.

## 14. Estrategia de Pruebas

El enfoque de pruebas para esta implementación incluirá:

*   **Pruebas Unitarias:** Para componentes React puros (`FileOrFolder`, `DocActions`, `AIChat` en sus estados básicos) y funciones de utilidad (ej. formateo de datos, lógica de `mimeType`). Se utilizarán librerías como Jest y React Testing Library.
*   **Pruebas de Integración:**
    *   Verificar la interacción entre `TranscriptionList.jsx` y `DocActions.jsx` / `AIChat.jsx`.
    *   Probar la integración de `Sidebar.jsx` con la carga de datos del usuario.
    *   Asegurar que el `NotificationSystem.jsx` se dispara correctamente ante fallos de la API.
    *   Mockear las llamadas a la API para simular diferentes escenarios de éxito y error.
*   **Pruebas End-to-End (E2E):** Utilizando herramientas como Cypress o Playwright, se cubrirán los flujos de usuario clave:
    *   Navegación completa por carpetas y archivos en Google Drive.
    *   Selección de un archivo `.doc` y visualización de los botones de acción.
    *   Activación del chat de IA y envío/recepción de una pregunta/respuesta simple.
    *   Validación de la retroalimentación visual de carga y errores al usuario en escenarios controlados de fallo de API.
*   **Áreas Clave a Cubrir:**
    *   Correcta visualización de la estructura de Drive (carpetas, archivos).
    *   Funcionalidad de navegación "Volver".
    *   Activación condicional de `DocActions.jsx` para archivos `.doc`.
    *   Funcionalidad básica del chat de IA (envío/recepción).
    *   Manejo de estados de carga y errores en todas las interacciones con la API.
    *   Respuesta de la interfaz ante datos vacíos o inconsistentes de la API.
