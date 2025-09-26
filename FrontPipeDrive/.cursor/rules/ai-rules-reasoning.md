# Documentación de Razonamiento de Reglas de IA para el Proyecto PipeDriveFront

## Introducción
Este documento detalla el razonamiento detrás de la creación y evolución de las Reglas Cursor para el proyecto PipeDriveFront. Su propósito es proporcionar contexto y justificación para las decisiones tomadas en la configuración del asistente de IA, asegurando que las reglas generadas sean coherentes, efectivas y alineadas con los objetivos del proyecto.

## Estado Inicial del Repositorio y Observaciones Preliminares

### Tecnologías Principales Identificadas
*   **Frontend**:
    *   **Lenguaje**: JavaScript/JSX
    *   **Framework**: React (v19.1.1)
    *   **Herramienta de Construcción**: Vite (v7.1.2)
    *   **Estilo**: CSS (basado en la presencia de `App.css`, sin librerías de styling explícitas)
    *   **Componentes UI**: `lucide-react` para iconos.
*   **Backend**:
    *   **Lenguaje**: Python
    *   **Framework**: Flask
    *   **Base de Datos**: MySQL (utilizando `mysql.connector`)
    *   **Gestión de Entorno**: `python-dotenv` para variables de entorno.
    *   **API**: Implementa un endpoint POST (`/usuario`) para interactuar con la base de datos.

### Estructura General del Proyecto
*   `/PipeDriveFront/FrontPipeDrive`: Contiene la aplicación frontend React.
*   `/PipeDriveFront/server.py`: Contiene la lógica del servidor backend Flask.

### Patrones Arquitectónicos Preliminares Observados
*   **Frontend**: Aplicación de una sola página (SPA) con React. Estructura de componentes basada en funciones y posiblemente hooks.
*   **Backend**: API RESTful simple con Flask, interacción directa con la base de datos.

### Observaciones Adicionales Relevantes
*   Uso de `flask_cors` para permitir solicitudes de origen cruzado en el backend.
*   Manejo de variables de entorno para la configuración de la base de datos.

### Áreas Potenciales para Reglas Cursor
*   **Frontend (React)**:
    *   Convenciones para componentes funcionales y hooks.
    *   Organización de archivos y directorios dentro de `src/`.
    *   Uso consistente de props y estado.
    *   Estándares de estilos CSS.
*   **Backend (Flask)**:
    *   Estructura de endpoints y manejo de solicitudes/respuestas.
    *   Manejo de errores y respuestas HTTP.
    *   Interacción con la base de datos (manejo de conexiones y cursores).
    *   Uso de variables de entorno para configuración sensible.
*   **General**:
    *   Estándares generales de codificación para JavaScript y Python.
    *   Gestión de dependencias.
    *   Convenciones de nombres para archivos, funciones y variables.

## Catálogo de Reglas Generadas y su Razonamiento
### 001-general-coding-standards.mdc: Estándares Generales de Codificación
*   **Razonamiento**: Esta regla codifica las directrices básicas de codificación para el equipo/proyecto PipeDriveFront para asegurar consistencia y calidad desde el nivel más fundamental. Incluye convenciones de nomenclatura, formato, comentarios, estructura de archivos, manejo de errores, importaciones y consideraciones iniciales de rendimiento para JavaScript/React y Python/Flask.
*   **Impacto**: Establece la línea base para toda la generación y modificación de código, promoviendo la legibilidad, mantenibilidad y la uniformidad en el desarrollo del proyecto.
### 010-raise-methodology-overview.mdc: Visión General de la Metodología RaiSE
*   **Razonamiento**: Esta regla formaliza la metodología de trabajo con la IA (RaiSE) para asegurar que el asistente colabore de manera efectiva y alineada con los principios del proyecto PipeDriveFront. Guía el comportamiento general del asistente de IA en todas sus interacciones, incluyendo su rol, objetivos, proceso de trabajo, mejores prácticas en la autoría de reglas y estilo de comunicación.
*   **Impacto**: Mejora la predictibilidad y la calidad de las interacciones del asistente de IA, asegurando que las tareas se realicen de manera estructurada y conforme a los estándares del proyecto.
### 901-ia-rule-management.mdc: Gestión de Reglas de IA por el Asistente (Meta-Regla)
*   **Razonamiento**: Esta meta-regla define el rol, las responsabilidades y el proceso que el asistente de IA debe seguir para gestionar y mantener las Reglas Cursor en el proyecto PipeDriveFront, asegurando la consistencia y calidad de la guía proporcionada por el asistente.
*   **Impacto**: Garantiza que el sistema de reglas sea mantenido y evolucionado de manera estructurada y conforme a los principios de RAISE.
### 902-rule-precedence.mdc: Precedencia y Orden de Carga de Reglas (Meta-Regla)
*   **Razonamiento**: Esta meta-regla establece cómo se deben cargar y aplicar las Reglas Cursor, definiendo un sistema de precedencia para resolver posibles conflictos y asegurar una guía consistente para el asistente de IA en el proyecto PipeDriveFront.
*   **Impacto**: Proporciona un marco claro para la aplicación de reglas, minimizando ambigüedades y asegurando que las directrices más relevantes sean priorizadas.
### 201-react-component-structure.mdc: Estructura y Nomenclatura de Componentes React
*   **Razonamiento**: Formaliza las convenciones para la creación y organización de componentes funcionales de React, incluyendo nomenclatura, estructura, manejo de props y funciones auxiliares. Esto fue identificado mediante el análisis de `TranscriptionList.jsx`.
*   **Impacto**: Asegura la consistencia y mantenibilidad del código React, facilitando la colaboración y el desarrollo asistido por IA.
### 501-react-state-and-effects.mdc: Gestión de Estado y Efectos en React
*   **Razonamiento**: Define las mejores prácticas para el uso de `useState`, `useEffect` y la gestión de lógica asíncrona en componentes funcionales de React. Observado en el uso de hooks en `TranscriptionList.jsx`.
*   **Impacto**: Promueve un manejo de estado y efectos predecible, optimizando el rendimiento y evitando errores comunes en el frontend.
### 502-react-component-styling.mdc: Estilo de Componentes y Uso de CSS en React
*   **Razonamiento**: Establece directrices para la aplicación de estilos CSS en componentes React, incluyendo organización de archivos, convenciones de nomenclatura de clases, especificidad y rendimiento. Basado en la presencia de `App.css` y la ausencia de librerías de estilo dedicadas.
*   **Impacto**: Asegura una apariencia coherente y una gestión de estilos eficiente y mantenible en la aplicación frontend.
### 503-react-prop-types-validation.mdc: Validación de Propiedades (Props) en Componentes React
*   **Razonamiento**: Define las convenciones para la validación de propiedades (props) en componentes React utilizando `prop-types` o TypeScript. Es una buena práctica para asegurar contratos de datos claros y robustez. Observado como una necesidad general para la fiabilidad del frontend.
*   **Impacto**: Mejora la robustez de los componentes, previene errores en tiempo de ejecución y documenta las expectativas de datos.
### 401-flask-api-routing-request.mdc: Gestión de Rutas y Solicitudes en API Flask
*   **Razonamiento**: Establece directrices para la definición de rutas, el manejo de solicitudes HTTP y la validación de datos en la API Flask. Extraído del análisis de `server.py`, que define un endpoint POST.
*   **Impacto**: Promueve una API consistente, segura y fácil de mantener, con validación de entrada y respuestas de error claras.
### 402-flask-db-error-handling.mdc: Interacciones con Base de Datos y Manejo de Errores en Flask
*   **Razonamiento**: Define las mejores prácticas para la interacción con la base de datos MySQL y el manejo de errores asociados en Flask, incluyendo gestión de conexiones, consultas parametrizadas y bloques `try-except-finally`. Observado en las operaciones de base de datos de `server.py`.
*   **Impacto**: Asegura operaciones de base de datos seguras, eficientes y robustas, previniendo inyecciones SQL y mejorando la resiliencia de la aplicación.
<!-- Esta sección se poblará a medida que se creen las reglas. -->
