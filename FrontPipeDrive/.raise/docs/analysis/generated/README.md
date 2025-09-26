# Documentación de Análisis de Código Fuente del Frontend (PipeDriveFront)

Este directorio contiene la documentación arquitectónica generada automáticamente a partir del análisis del código fuente de la aplicación frontend `PipeDriveFront`, siguiendo los principios de la Kata L2-02: Análisis de Código Fuente para Documentación Esencial Agnóstico a la Pila Tecnológica.

El objetivo de esta documentación es proporcionar una base de conocimiento "viva" y accionable que facilite el onboarding de nuevos miembros al equipo, la comprensión de la arquitectura para futuras refactorizaciones o el desarrollo de nuevas funcionalidades.

## Contenido de la Documentación

A continuación se listan los documentos generados y su propósito:

1.  **[service-overview.md](./service-overview.md)**
    *   Proporciona una visión general de alto nivel del servicio, incluyendo su propósito, contexto delimitado, dependencias críticas y modelo de dominio esencial. Diseñado para una comprensión rápida en menos de 5 minutos.

2.  **[contracts.md](./contracts.md)**
    *   Detalla los endpoints de backend que la aplicación frontend consume, especificando los métodos HTTP, y los contratos de datos (estructura de las solicitudes y respuestas).

3.  **[dependencies.yaml](./dependencies.yaml)**
    *   Mapea todas las dependencias externas (librerías) e internas (APIs de backend) de la aplicación, describiendo su tipo, propósito y criticidad.

4.  **[domain-model.md](./domain-model.md)**
    *   Describe los conceptos clave del dominio y las estructuras de datos que la aplicación frontend maneja localmente para representar la información de negocio.

5.  **[resilience-guide.md](./resilience-guide.md)**
    *   Documenta los patrones de resiliencia y manejo de errores implementados en el frontend, así como las áreas identificadas para mejorar la robustez y la experiencia del usuario.

6.  **[use-cases.md](./use-cases.md)**
    *   Describe los principales casos de uso de negocio de la aplicación desde la perspectiva del usuario, mapeando los flujos a los componentes de la UI y las interacciones con el backend.

## Generación y Actualización

Esta documentación puede ser regenerada ejecutando la Kata L2-02 sobre el código fuente de `PipeDriveFront` para reflejar los cambios en la implementación. Esto asegura que la documentación se mantenga siempre actualizada y alineada con el código real.
