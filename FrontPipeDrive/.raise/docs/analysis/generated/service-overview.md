# Visión General del Servicio Frontend: PipeDriveFront

Este documento proporciona una visión general concisa de la aplicación frontend `PipeDriveFront`, diseñada para ser comprendida en menos de 5 minutos. Resume su propósito, las principales responsabilidades, las dependencias críticas y el modelo de dominio.

## Propósito del Servicio

`PipeDriveFront` es la interfaz de usuario de una aplicación que permite a los usuarios interactuar con sus archivos y carpetas de Google Drive. Facilita la navegación, la visualización de contenido de archivos y la gestión de ciertas funcionalidades de negocio (notificaciones, informes) a través de una integración con un backend.

## Contexto Delimitado (Bounded Context)

El frontend opera dentro del contexto delimitado de **"Gestión y Visualización de Contenido de Google Drive para Usuarios Finales"**. Su principal responsabilidad es presentar de manera intuitiva los datos de Google Drive y las funcionalidades relacionadas, orquestando las interacciones con el usuario y comunicándose con un servicio de backend que maneja la lógica de integración con Google Drive.

## Dependencias Críticas

El funcionamiento de `PipeDriveFront` depende fundamentalmente de:

*   **Backend API:** Un servicio de backend (cuya URL se obtiene a través de `VITE_URL_NGROK`) que expone los siguientes endpoints:
    *   `/usuario`: Para obtener información básica del usuario.
    *   `/DriveRoot`: Para listar el contenido de la raíz de Google Drive.
    *   `/DriveFolderArch`: Para listar el contenido de carpetas específicas de Google Drive.
    *   `/DriveInfoArch`: Para obtener el contenido de archivos individuales de Google Drive.

*   **Librerías Frontend:**
    *   **React:** Como framework principal para la construcción de la interfaz de usuario.
    *   **Lucide React:** Para la iconografía de la UI.

## Modelo de Dominio Esencial

Los conceptos clave manejados por el frontend son:

*   **Usuario:** Identificado por un `userId` y con un `correo` asociado.
*   **Item de Google Drive:** Puede ser un `Archivo` o una `Carpeta`, identificado por `id`, `name` y `mimeType`.
*   **Contenido de Archivo:** El texto recuperado de un archivo de Google Drive, que se asocia a un `Item de Google Drive` cuando es seleccionado.

## Resiliencia y Manejo de Errores (Síntesis)

La aplicación implementa un manejo básico de errores para las llamadas a la API, registrando los fallos en la consola. Utiliza el estado de React para controlar la carga de datos y el renderizado condicional de la UI. Sin embargo, se ha identificado la **falta de retroalimentación visible al usuario en caso de error** y la **ausencia de políticas de reintento o Circuit Breaker** como áreas de mejora clave para una mayor robustez y una mejor experiencia de usuario.

---

Para detalles más específicos, consulte los siguientes documentos generados:

*   [Contratos de Datos de la API Frontend](./contracts.md)
*   [Dependencias del Frontend](./dependencies.yaml)
*   [Modelo de Dominio del Frontend](./domain-model.md)
*   [Guía de Resiliencia y Manejo de Errores del Frontend](./resilience-guide.md)
*   [Casos de Uso de Negocio del Frontend](./use-cases.md)
