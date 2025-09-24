# Mini-RaiSE: Proceso Ultra-Simplificado con Agente de Proyecto

Este proceso está diseñado para abordar tareas de pequeña a mediana complejidad (ej. un script Python para Jira API) de manera eficiente, manteniendo la estructura y la trazabilidad esenciales de RaiSE sin la sobrecarga de un proceso completo.

**Objetivo:** Desarrollar soluciones funcionales, bien definidas y con un plan claro, minimizando los documentos intermedios y la orquestación de múltiples agentes.

---

## Paso 0: Definición Rápida de Requisitos y Alcance (Mini-PRD)

* **Propósito:** Establecer los requisitos esenciales, el objetivo y el alcance de la tarea de manera concisa. Este documento será la única fuente de verdad y contexto inicial para el Agente de Proyecto.
* **Actividades Clave:**
  * **Briefing/Reunión Concisa:** Un diálogo directo contigo mismo o con el stakeholder para definir la necesidad.
  * **Identificación de Dependencias/Tecnologías:** Confirmar las herramientas (Python), APIs (Jira API v3), librerías y cualquier dependencia clave (ej. manejo de credenciales con `.env`, formato de datos).
  * **Salidas Deseadas:** ¿Qué artefactos (scripts, módulos) se esperan y cuál es la funcionalidad principal de cada uno?
* **Producto:** Un **Mini-PRD** (preferiblemente un archivo Markdown conciso o una sección estructurada dentro de un `README.md` o documento de planificación general). Debe incluir:
  * **Título de la Tarea/Problema:** Una descripción clara de lo que se va a resolver.
  * **Objetivo y Valor de Negocio:** ¿Qué automatiza o facilita este script?
  * **Requisitos Funcionales Clave:** Un listado conciso y numerado de las funcionalidades principales (ej. "1. Conectarse a la API de Jira. 2. Buscar tareas con JQL específico. 3. Leer campo personalizado 'Roles'. 4. Actualizar campo 'Estimación' con valor calculado.").
  * **Alcance:** Qué incluye y qué excluye explícitamente la tarea.
  * **Consideraciones Técnicas Relevantes:**
    * APIs y versiones a utilizar.
    * Nombres exactos de campos de Jira (estándar y personalizados).
    * Formato de entrada/salida de datos.
    * Estrategia de manejo de credenciales (ej. "Las credenciales se cargarán desde variables de entorno usando la librería `python-dotenv`.").
    * Estructura general del proyecto/script si se espera modularidad (ej. "El script se dividirá en `jira_client.py` para interacción API y `main_logic.py` para el procesamiento principal.").
    * Directrices básicas de manejo de errores y logging.

## Paso 1: Creación del Agente de Proyecto (Agente Único)

* **Propósito:** Instanciar un único agente de IA que actuará como **Arquitecto, Tech Lead y Desarrollador** simultáneamente para esta tarea.
* **Actividades Clave:**
  * **Acción:** Utilizar el "agente de agentes" (o simplemente invocar al asistente de IA con un `system prompt` ajustado a este rol consolidado) para generar este "Agente de Proyecto".
  * **Input:** Proporcionar al Agente de Proyecto el **Mini-PRD** del Paso 0. Su prompt interno debe enfatizar su rol consolidado y la necesidad de eficiencia y concisión.

## Paso 2: Generación Consolidada de Historias de Tarea y Plan de Implementación (por el Agente de Proyecto)

* **Propósito:** El Agente de Proyecto, basándose en el Mini-PRD, inferirá el diseño técnico y propondrá "Historias de Tarea" (más grandes que las HUs tradicionales) junto con su plan de implementación detallado para cada una. Esto evita la fragmentación excesiva.
* **Actividades Clave (del Agente de Proyecto, guiado por el usuario):**
  * **Análisis y Diseño Implícito:** El agente analiza el Mini-PRD e infiere el diseño técnico necesario para cumplir los requisitos.
  * **Propuesta de Historias de Tarea:** El agente presentará una lista de tareas significativas que representan una porción de funcionalidad autocontenida.
    * **Criterio:** Cada "Historia de Tarea" debe ser una unidad de trabajo que el agente pueda razonablemente *completar en una iteración/sentada*, y que agrupe funcionalidades relacionadas para evitar micro-tareas.
    * **Ejemplos:**
      * "**Configuración e Inicialización:** Definir el uso de `.env`, cargar credenciales de Jira y configurar el cliente de la API." (Una sola HU para la configuración completa).
      * "**Módulo de Consulta Jira:** Implementar la lógica para construir JQL y ejecutar consultas a la API de Jira para obtener datos de tareas."
      * "**Módulo de Procesamiento y Actualización:** Desarrollar la lógica para procesar los resultados de Jira, calcular valores y actualizar los campos de las tareas."
      * "**Manejo de Errores y Logging:** Implementar mecanismos robustos para manejar excepciones y registrar eventos clave."
  * **Generación de Planes por Historia de Tarea:** Para cada "Historia de Tarea" propuesta, el agente generará un plan de implementación detallado, incluyendo pasos de codificación específicos, librerías, dependencias y pruebas unitarias/integración básicas. Este plan se convierte en la guía directa para la codificación.
* **Producto:** Un documento Markdown (o un conjunto de secciones dentro de un documento principal) conteniendo:
  * Una **Lista de "Historias de Tarea"** (más grandes y autocontenidas).
  * Para cada Historia de Tarea, su **Plan de Implementación Detallado**.

## Paso 3: Desarrollo e Implementación (Codificación Directa por el Agente de Proyecto)

* **Propósito:** El Agente de Proyecto ejecuta los planes de implementación y genera el código fuente.
* **Actividades Clave:**
  * **Codificación Iterativa:** El agente implementa el código paso a paso, refiriéndose a su propio Plan de Implementación del Paso 2.
  * **Adherencia a Directrices:** El agente aplica directrices de codificación (ej. Python PEP 8, uso eficiente de librerías) que pueden estar implícitas en su entrenamiento o provistas a través de reglas de Cursor generales (ej. `105-python-script-structure`).
  * **Manejo de Aclaraciones:** Si durante la codificación surgen ambigüedades, el agente puede buscar aclaración o hacer supuestos razonables que serán validados por el usuario.
* **Producto:** El código fuente funcional (archivos `.py`, `requirements.txt`, etc.).

## Paso 4: Verificación y Entrega

* **Propósito:** Asegurar que la solución es funcional, robusta para su alcance, y está documentada para su uso.
* **Actividades Clave:**
  * **Pruebas (Manuales/Automáticas Simples):** El usuario verifica la funcionalidad del script en un entorno de prueba.
  * **Documentación de Uso:** El agente puede ayudar a generar un `README.md` conciso con instrucciones de ejecución, configuración de `.env`, y cualquier particularidad.
  * **Entrega:** El script está listo para ser utilizado.
