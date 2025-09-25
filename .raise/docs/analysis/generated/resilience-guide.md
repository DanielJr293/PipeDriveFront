# Guía de Resiliencia y Manejo de Errores del Frontend

Este documento describe cómo la aplicación frontend gestiona los fallos, los errores y la resiliencia en sus interacciones con el backend y la lógica interna.

## Patrones de Resiliencia y Manejo de Errores Implementados

### 1. Manejo Básico de Errores en Llamadas a la API (`.catch()`)

*   **Descripción:** Las llamadas `fetch` a los endpoints del backend (`/usuario`, `/DriveFolderArch`, `/DriveInfoArch`, `/DriveRoot`) incluyen bloques `.catch()` para interceptar errores de red o de la respuesta de la API. Estos errores son registrados en la consola del navegador (`console.error`).
*   **Ubicación en el Código:**
    *   `FrontPipeDrive/src/Sidebar.jsx` (líneas 36-36)
    *   `FrontPipeDrive/src/TranscriptionList.jsx` (dentro de `archivosFolders`, `contenidoArch` y `fetchFolders`, aunque el `.catch` explícito no siempre se muestra en el snippet, se infiere del uso de `await` y el posterior manejo del `resp.json()`)
*   **Impacto:** Permite que la aplicación no se bloquee completamente ante fallos de red o errores del servidor, pero la retroalimentación al usuario es limitada.

### 2. Control de Carga de Datos y Renderizado Condicional (`useState`, `useRef`, `useEffect`)

*   **Descripción:** Se utilizan hooks de React como `useState`, `useRef` (para `ejecutado`) y `useEffect` para controlar el ciclo de vida de las llamadas a la API y el renderizado de la interfaz de usuario.
    *   `ejecutado` (usando `useRef`) asegura que las peticiones a la API (ej. `/usuario`, `/DriveRoot`) se realicen una única vez al montar el componente, evitando peticiones duplicadas innecesarias.
    *   `useState` (ej. `selectedFile`, `items`) se utiliza para almacenar el estado de los datos recuperados y controlar qué parte de la UI se muestra. Por ejemplo, `TranscriptionList` renderiza una lista de archivos/carpetas o el contenido de un archivo seleccionado basándose en el valor de `selectedFile`.
*   **Impacto:** Mejora la eficiencia y la UX al gestionar cuándo se solicitan los datos y cómo se presenta la información al usuario a medida que los datos llegan o cambian.

## Anti-Patrones o Áreas de Mejora Identificadas

### 1. Falta de Retroalimentación al Usuario en Caso de Error

*   **Descripción:** Aunque los errores son capturados y registrados en la consola, la aplicación carece de mecanismos visibles para informar al usuario sobre fallos en la carga de datos o en la comunicación con el backend. Esto puede llevar a una experiencia de usuario deficiente, donde la aplicación parece no funcionar sin una explicación clara.
*   **Recomendación:** Implementar componentes de UI para mostrar mensajes de error amigables, estados de carga (spinners), o componentes de fallback cuando los datos no puedan ser recuperados. Esto puede integrarse en los bloques `.catch()` existentes.

### 2. Ausencia de Políticas de Reintento o Circuit Breaker

*   **Descripción:** No se observan implementaciones de reintentos automáticos para llamadas a la API fallidas ni patrones de Circuit Breaker. Ante fallos transitorios del backend o de la red, la aplicación no intenta recuperarse automáticamente.
*   **Impacto:** La aplicación podría ser menos robusta frente a interrupciones temporales, requiriendo intervención manual (ej. recargar la página) por parte del usuario.
*   **Recomendación:** Considerar la implementación de reintentos con backoff exponencial para llamadas a la API críticas, y evaluar la necesidad de patrones de Circuit Breaker en escenarios de mayor complejidad o criticidad.
