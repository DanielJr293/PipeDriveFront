

# **Guía de Implementación Práctica: Configuración de Gemini CLI con un Servidor MCP Local en Python**

## **Sección 1: Configuración Fundamental del Entorno de Gemini CLI**

Esta sección inaugural establece la base para todo el trabajo posterior. Detalla meticulosamente los prerrequisitos de software necesarios, las vías de instalación y las estrategias de autenticación de importancia crítica. El objetivo principal es garantizar una instancia de Gemini CLI correctamente configurada y autenticada, al tiempo que se abordan de forma proactiva los errores y conceptos erróneos comunes de la configuración inicial.

### **1.1 Prerrequisitos del Sistema y Dependencias del Entorno**

Antes de iniciar cualquier instalación, es imperativo asegurarse de que el sistema de desarrollo cumpla con las dependencias de software fundamentales tanto para la herramienta del lado del cliente (Gemini CLI) como para el componente del lado del servidor (el servidor MCP de Python).

* **Requisito de Node.js:** La Interfaz de Línea de Comandos (CLI) oficial de Google Gemini es una aplicación de Node.js y, como tal, requiere que la versión 18 o superior de Node.js esté instalada en el sistema local.1 Esta es una dependencia estricta para el funcionamiento de la herramienta.  
* **Requisito de Python:** El desarrollo del servidor local de Model Context Protocol (MCP), según el enfoque de esta guía, se realizará en Python. Se requiere una versión moderna de Python (por ejemplo, 3.8+ como sugieren herramientas relacionadas 4, o 3.10+ como se recomienda para el framework FastMCP 5) como prerrequisito para el componente del lado del servidor.

Se deben ejecutar los siguientes comandos en el terminal para verificar que las versiones instaladas cumplen con los requisitos y evitar errores de incompatibilidad en etapas posteriores 1:

Bash

node \-v  
npm \-v  
python \--version

### **1.2 Procedimientos de Instalación y Desambiguación**

Un punto crucial de clarificación es la existencia de dos proyectos distintos denominados "Gemini CLI". La herramienta oficial de Google es @google/gemini-cli, basada en Node.js.1 Existe un proyecto de código abierto no relacionado,

reugn/gemini-cli, basado en Go, con un conjunto de comandos y una estructura de configuración completamente diferentes.6 Esta guía se centra exclusivamente en la herramienta oficial de Google, y es fundamental asegurarse de que se instale el paquete correcto para que las instrucciones posteriores sean aplicables.

Existen dos métodos principales para instalar y ejecutar Gemini CLI:

* **Uso de npx:** Este método ejecuta la CLI sin una instalación global permanente mediante el comando npx https://github.com/google-gemini/gemini-cli. Es ideal para un uso ocasional o para pruebas en entornos aislados, ya que siempre utiliza la última versión disponible.1  
* **Instalación Global:** Para un uso regular y repetido, el enfoque recomendado es la instalación global con npm install \-g @google/gemini-cli. Esto hace que el comando gemini esté directamente disponible en el PATH del sistema, simplificando la invocación.2

Tras la instalación, la ejecución del comando gemini en el terminal iniciará el prompt interactivo, lo que confirma una configuración exitosa.1

### **1.3 Estrategias Críticas de Autenticación: Un Análisis Comparativo**

La elección del método de autenticación no es una mera preferencia técnica; tiene implicaciones directas y significativas en el coste y el acceso a las funciones. Una elección incorrecta puede llevar a cargos inesperados en la facturación. Los desarrolladores deben comprender las dos vías principales antes de proceder.

* **Método 1: Inicio de Sesión con Cuenta de Google (OAuth 2.0)**  
  * **Proceso:** En la primera ejecución, la CLI solicita al usuario que seleccione un método de autenticación. Al elegir "Login with Google", se inicia un flujo de autenticación OAuth 2.0 basado en el navegador.1  
  * **Beneficios y Nivel Gratuito:** Este método es el que otorga acceso a la licencia gratuita de Gemini Code Assist. Dicha licencia incluye el uso del modelo Gemini 2.5 Pro, una ventana de contexto masiva de 1 millón de tokens y límites de uso generosos (60 solicitudes por minuto y 1.000 por día) sin coste alguno.2 Esta es la vía recomendada para desarrolladores individuales, para evaluación y para evitar costes.  
* **Método 2: Clave de API (API Key)**  
  * **Proceso:** Este método implica generar una clave de API desde Google AI Studio 11 o un proyecto de Google Cloud (para acceso a través de Vertex AI 1) y configurarla como una variable de entorno, típicamente  
    GEMINI\_API\_KEY.1  
  * **Implicación de Coste:** Es de vital importancia entender que el uso de una clave de API, incluso una generada desde una cuenta personal de AI Studio, omite el nivel gratuito asociado con el método de inicio de sesión de Google. Todas las solicitudes realizadas con una clave de API son facturables y se miden contra la cuota del proyecto de Google Cloud asociado.15 Anécdotas de usuarios confirman que este es un error común que puede resultar en facturas inesperadas.15  
  * **Configuración:** La clave debe establecerse como una variable de entorno. Para macOS y Linux, se añade export GEMINI\_API\_KEY="SU\_CLAVE\_AQUI" al archivo de perfil del shell (p. ej., .bashrc o .zshrc). Para Windows, se configura a través de las propiedades del sistema.11 Como buena práctica para la gestión por proyecto, también se puede crear un archivo  
    .env en el directorio de trabajo.1

La siguiente tabla resume los puntos clave de decisión entre los métodos de autenticación.

**Tabla 1: Métodos de Autenticación de Gemini CLI: Un Análisis Comparativo**

| Característica | Inicio de Sesión con Google (OAuth 2.0) | Clave de API (API Key) |
| :---- | :---- | :---- |
| **Mecanismo de Configuración** | Flujo de autenticación interactivo basado en navegador en la primera ejecución. | Generación manual de clave y configuración como variable de entorno (GEMINI\_API\_KEY) o en un archivo .env. |
| **Modelo de Coste** | Gratuito, bajo la licencia de Gemini Code Assist.2 | Facturable por solicitud, según las tarifas de la API de Gemini o Vertex AI.15 |
| **Límites de Uso** | 60 solicitudes/minuto, 1.000 solicitudes/día.7 | Depende de la cuota del proyecto de Google Cloud; puede ser superior si se solicita y se paga. |
| **Caso de Uso Principal** | Desarrollo individual, evaluación, aprendizaje y uso general sin coste. | Aplicaciones empresariales, flujos de trabajo automatizados que requieren límites más altos y facturables, integración con Vertex AI. |
| **Advertencia Crítica** | Ninguna. Este es el método recomendado para uso gratuito. | **No utiliza el nivel gratuito.** Todas las solicitudes incurren en costes. Usar con precaución y solo cuando se necesiten límites facturables. |

### **1.4 Interacción y Configuración Inicial**

Al ejecutar gemini por primera vez, la CLI guía al usuario a través de una configuración interactiva inicial. Esto incluye la selección de un tema de color para la interfaz del terminal y la elección del método de autenticación crucial discutido anteriormente.3 Una vez completado este proceso, el usuario se encuentra en el bucle de lectura-evaluación-impresión (REPL), listo para interactuar con el agente de IA.14

## **Sección 2: Dominando la Gemini CLI: Comandos Centrales y Gestión del Contexto**

Esta sección pasa de la configuración al uso activo. Proporciona una referencia completa de los comandos interactivos de la CLI y, lo que es más importante, profundiza en los mecanismos para proporcionar contexto al modelo de IA, una piedra angular de su utilidad para tareas relacionadas con el código.

### **2.1 Referencia de Comandos Interactivos (comandos /)**

La CLI ofrece un conjunto de comandos internos, todos prefijados con una barra inclinada (/), para gestionar la sesión y el entorno. Se puede acceder a una lista completa de estos comandos escribiendo / o /help directamente en el prompt interactivo.3 A continuación se detallan los comandos más relevantes:

* /auth, /theme: Permiten cambiar las elecciones de configuración inicial (autenticación y tema) sin necesidad de reinstalar.8  
* /stats: Muestra estadísticas de la sesión actual, como el número total de tokens utilizados, la duración de la sesión y un desglose de los tokens de entrada y salida.8  
* /tools: Enumera las herramientas integradas que el agente de IA tiene disponibles por defecto, como ReadFile, WriteFile y Shell.8  
* /mcp: Enumera los servidores MCP configurados, su estado de conexión (listo o desconectado) y las herramientas que exponen. Este es un comando de diagnóstico fundamental para el objetivo principal de esta guía.16  
* /memory: Gestiona el contexto de instrucción cargado desde los archivos GEMINI.md. El subcomando show es particularmente útil para depurar, ya que muestra el contexto final concatenado que el agente está utilizando.16  
* /quit: Finaliza la sesión interactiva de la CLI.8  
* /copy, /compress, /clear: Comandos de utilidad para copiar la última respuesta, resumir el contexto de la conversación para ahorrar tokens y limpiar la pantalla, respectivamente.14

### **2.2 Provisión de Contexto: La Sintaxis @**

El mecanismo principal para incluir archivos y directorios locales en el contexto de un prompt es el símbolo de arroba (@).3 Esta funcionalidad es esencial para analizar código, ya que permite al modelo "ver" el contenido de los archivos locales.

* La CLI admite el autocompletado de rutas de archivos y carpetas al escribir @, lo que facilita la selección.9  
* Se pueden referenciar archivos individuales (@src/main.py), múltiples archivos en un solo prompt (@package.json @src/index.js), e incluso directorios enteros (@src/).20  
* Es importante destacar que las rutas proporcionadas son relativas al directorio desde el cual se ejecutó el comando gemini.20

### **2.3 Contexto Persistente: El Archivo GEMINI.md**

Para instrucciones específicas del proyecto, guías de estilo de codificación o reglas que deben aplicarse a todos los prompts dentro de una sesión, se puede crear un archivo GEMINI.md.2 Este archivo proporciona un contexto persistente que guía el comportamiento del agente.

El sistema de contexto es jerárquico, lo que permite un control granular. Los archivos GEMINI.md se cargan en un orden de precedencia específico, donde las configuraciones más específicas anulan o complementan a las más generales 19:

1. **Contexto de componente:** Un archivo GEMINI.md en un subdirectorio.  
2. **Contexto de proyecto:** Un archivo GEMINI.md en el directorio raíz del proyecto (identificado por una carpeta .git).  
3. **Contexto global de usuario:** Un archivo en \~/.gemini/GEMINI.md.

Además, la sintaxis @ se puede utilizar *dentro* de un archivo GEMINI.md para importar otras guías de estilo o archivos de contexto, fomentando la modularidad y la reutilización.14

### **2.4 Anulación Avanzada del Contexto: La Variable de Entorno GEMINI\_SYSTEM\_MD**

Para un control máximo, la variable de entorno GEMINI\_SYSTEM\_MD permite *reemplazar por completo* el prompt del sistema principal y codificado de la CLI con uno personalizado desde un archivo markdown especificado.22

Este es un mecanismo avanzado que debe usarse con precaución. Reemplazar el prompt del sistema sin incluir las instrucciones esenciales para el uso de herramientas puede romper la funcionalidad del agente. Se recomienda a los usuarios que deseen utilizar esta función que primero extraigan y estudien el prompt del sistema original, ubicado en el código fuente de la CLI en packages/core/src/core/prompts.ts, para asegurarse de que no se omita ninguna lógica crítica.22 Un indicador visual (

|⌐■\_■|) en el pie de página de la CLI confirma cuando un prompt del sistema personalizado está activo.22

### **2.5 Pasarela de Shell y Modo Sandbox**

* **Pasarela de Shell (\!):** El prefijo de exclamación (\!) permite a los usuarios ejecutar comandos de shell directamente desde el prompt de Gemini, alternando a un "modo de shell".2 Esto es útil para ejecutar comandos del sistema como  
  pwd o ls sin salir de la CLI.  
* **Modo Sandbox (--sandbox):** Por razones de seguridad, especialmente al pedirle al agente que ejecute código que ha generado, se puede usar el indicador \--sandbox. Este modo requiere que Docker o Podman estén instalados y ejecuta las herramientas en un contenedor seguro y aislado.14

## **Sección 3: El Protocolo de Contexto del Modelo (MCP): Una Visión Arquitectónica**

Esta sección proporciona los fundamentos teóricos necesarios para comprender *por qué* y *cómo* se puede extender la Gemini CLI. Explica el Protocolo de Contexto del Modelo (MCP) no como una característica específica de Gemini, sino como un estándar abierto emergente para el uso de herramientas por parte de agentes de IA.

### **3.1 Principios del Estándar MCP**

El MCP se define como un estándar abierto, a menudo descrito como un "USB-C para integraciones de IA", que establece una forma universal para que los modelos de IA (clientes) descubran y se comuniquen con herramientas y fuentes de datos externas (servidores).2 Su propósito es resolver el problema de las integraciones de herramientas de IA ad-hoc. Sin un estándar, cada agente de IA necesitaría un complemento codificado a medida para cada herramienta que quisiera usar. MCP proporciona un "enchufe" genérico (el servidor) y una "toma" genérica (el cliente), permitiendo que cualquier herramienta envuelta en un servidor MCP se conecte a cualquier agente compatible.

La arquitectura central se basa en un modelo cliente-servidor. La aplicación de IA, como Gemini CLI, actúa como el cliente, y los proveedores de herramientas ejecutan servidores que exponen su funcionalidad.24 La habilidad de construir un servidor MCP para Gemini CLI es, por lo tanto, una habilidad transferible que puede ser utilizada con otros clientes compatibles con MCP, como Claude o Cursor 25, lo que eleva la importancia de la tarea más allá de una simple personalización de una herramienta.

### **3.2 El Papel del MCP en la Ampliación de las Capacidades de Gemini CLI**

Gemini CLI viene con un conjunto de herramientas integradas, como grep, E/S de archivos y ejecución de shell.2 El MCP es el mecanismo para añadir

*nuevas* habilidades personalizadas más allá de este conjunto predefinido.2 Al configurar un servidor MCP, las herramientas que este expone se vuelven disponibles para el agente de Gemini como si fueran herramientas nativas.16

Este mecanismo permite la integración con prácticamente cualquier sistema externo: bases de datos, sistemas de control de versiones (Git), CRMs, servicios web o lógica de negocio personalizada.17 La función clave del MCP es transformar una API o función estándar en una herramienta amigable para el modelo, con autodescubrimiento, un esquema predecible y una interacción estructurada, lo que habilita el bucle de Razonamiento y Acción (ReAct) que impulsa a los agentes modernos.16

### **3.3 Comprensión de los Mecanismos de Transporte de MCP**

El protocolo MCP admite diferentes "transportes" o métodos de comunicación entre el cliente y el servidor.

* **Transporte Local por Stdio:** Para herramientas que se ejecutan localmente, el transporte más común es stdio (entrada/salida estándar). En este modo, el cliente (Gemini CLI) inicia el servidor como un subproceso y se comunica con él a través de sus tuberías de stdin y stdout.14 Este es el enfoque principal para el objetivo de esta guía de conectar un servidor Python local.  
* **Transporte Remoto por HTTP/SSE:** El MCP también admite la comunicación a través de la red mediante HTTP streaming (httpUrl) o Server-Sent Events (url con SSE).14 Esto permite que la CLI se conecte a servidores MCP que se ejecutan en máquinas diferentes o en la nube. Un ejemplo práctico es el servidor MCP de GitHub Copilot, que se conecta a través de  
  httpUrl.17

## **Sección 4: Desarrollo de un Servidor MCP Local en Python con el Framework FastMCP**

Esta es la sección central de desarrollo del manual. Proporciona una guía completa para construir el servidor MCP de Python requerido, centrándose exclusivamente en la biblioteca FastMCP como el framework de alto nivel recomendado.

### **4.1 Introducción al Framework de Alto Nivel FastMCP**

FastMCP es una biblioteca de Python diseñada para abstraer las complejidades del protocolo MCP, permitiendo a los desarrolladores centrarse en escribir la lógica de la herramienta en lugar de gestionar la configuración del servidor y los detalles del protocolo.5 Es el sucesor de la biblioteca original que se incorporó al SDK oficial de Python para MCP.27

El framework se basa en el principio de "convención sobre configuración". Infiere el esquema MCP necesario a partir de las convenciones del código Python: el nombre de la función se convierte en el nombre de la herramienta, el docstring en su descripción y los type hints en el esquema de entrada. Esta relación causal entre el código Pythonic y el esquema compatible con MCP es la propuesta de valor central de la biblioteca, reduciendo drásticamente la carga cognitiva y el código repetitivo. Por lo tanto, escribir funciones de Python claras, bien documentadas y fuertemente tipadas no es solo una buena práctica, sino un requisito funcional para construir herramientas efectivas con FastMCP.

Los componentes principales del framework se exponen como decoradores de Python:

* @mcp.tool: Expone una función de Python como una herramienta ejecutable para el LLM.28  
* @mcp.resource: Proporciona acceso de solo lectura a los datos a través de una URI.28  
* @mcp.prompt: Define plantillas de mensajes reutilizables y parametrizadas para guiar al LLM.28

### **4.2 Configuración del Entorno del Proyecto y Gestión de Dependencias**

* **Entorno Virtual:** Se recomienda encarecidamente el uso de un entorno virtual para aislar las dependencias del proyecto. La guía proporcionará los pasos utilizando la moderna herramienta uv, que también es recomendada por FastMCP.5  
* **Instalación:** La dependencia principal es fastmcp. El comando de instalación es uv pip install fastmcp o, alternativamente, pip install fastmcp.5  
* **Estructura del Proyecto:** Se propondrá una estructura de proyecto limpia para mantener la organización, separando el punto de entrada del servidor, las definiciones de las herramientas y cualquier código de utilidad.31

### **4.3 Construyendo el Servidor: Una Guía Paso a Paso**

El proceso para crear un servidor funcional es notablemente sencillo con FastMCP.

1. **Instanciar el Servidor:** El proceso comienza creando una instancia de la clase FastMCP: mcp \= FastMCP(name="MyPythonServer").29  
2. **Definir una Herramienta:** Se define una función de Python estándar y se decora con @mcp.tool. FastMCP utiliza automáticamente el nombre de la función, el docstring y los type hints para generar el nombre, la descripción y el esquema de entrada de la herramienta para el LLM.29  
3. **Ejecutar el Servidor:** El servidor se hace ejecutable añadiendo un bloque if \_\_name\_\_ \== "\_\_main\_\_": que llama a mcp.run(). Por defecto, esto utiliza el transporte stdio requerido por Gemini CLI para herramientas locales.32

### **4.4 Ejemplos de Código Anotados para la Implementación Práctica de Herramientas**

A continuación se presentan varios scripts de Python completos y listos para copiar y pegar que ilustran la implementación de herramientas.

**Ejemplo 1: Servidor MCP Completo con una Herramienta de Suma**

Este script sirve como una plantilla completa para un servidor MCP local. Define una única herramienta llamada add que suma dos números enteros.

Python

\# my\_mcp\_server.py  
from fastmcp import FastMCP

\# 1\. Crear una instancia del servidor FastMCP.  
\# El nombre "MyPythonServer" se utilizará para la identificación.  
mcp \= FastMCP(name="MyPythonServer")

\# 2\. Definir una herramienta usando el decorador @mcp.tool.  
\# FastMCP inferirá el nombre, la descripción y el esquema de la función.  
@mcp.tool  
def add(a: int, b: int) \-\> int:  
    """  
    Suma dos números enteros y devuelve el resultado.  
    El docstring se utiliza como la descripción de la herramienta para el LLM.  
    Los type hints (a: int, b: int) definen el esquema de entrada.  
    """  
    return a \+ b

\# 3\. Añadir un bloque para ejecutar el servidor cuando el script se llama directamente.  
\# mcp.run() inicia el servidor utilizando el transporte stdio por defecto,  
\# que es el requerido para la comunicación local con Gemini CLI.  
if \_\_name\_\_ \== "\_\_main\_\_":  
    mcp.run()

29

**Ejemplo 2: Herramienta de Sistema de Archivos para Leer un Archivo**

Este ejemplo muestra un caso de uso más práctico, donde la herramienta interactúa con el sistema de archivos local para leer el contenido de un archivo de texto.

Python

\# file\_reader\_server.py  
import os  
from fastmcp import FastMCP

mcp \= FastMCP(name="FileReaderServer")

@mcp.tool  
def read\_file\_content(path: str) \-\> str:  
    """  
    Lee el contenido de un archivo de texto en la ruta especificada y lo devuelve como una cadena.  
    Args:  
        path (str): La ruta relativa o absoluta al archivo a leer.  
    """  
    try:  
        \# Expandir la ruta del usuario (p. ej., \~/) si está presente  
        expanded\_path \= os.path.expanduser(path)  
        with open(expanded\_path, 'r', encoding='utf-8') as f:  
            return f.read()  
    except FileNotFoundError:  
        return f"Error: El archivo no se encontró en la ruta '{path}'."  
    except Exception as e:  
        return f"Error al leer el archivo: {str(e)}"

if \_\_name\_\_ \== "\_\_main\_\_":  
    mcp.run()

35

## **Sección 5: Integración del Servidor MCP de Python con la Gemini CLI**

Esta sección une los dos componentes principales: la Gemini CLI configurada y el servidor MCP de Python recién desarrollado. Se centra en el archivo settings.json, la pieza crítica de "pegamento" que los conecta.

### **5.1 El Archivo de Configuración settings.json: Alcance y Ubicación**

La Gemini CLI se puede personalizar a través de un archivo settings.json.14 Este archivo se carga con un claro orden de precedencia, lo que permite configuraciones por capas y anulación de ajustes 14:

1. **Nivel de Proyecto:** ./.gemini/settings.json (máxima precedencia, anula a los demás).  
2. **Nivel de Usuario:** \~/.gemini/settings.json (anula la configuración del sistema).  
3. **Nivel de Sistema:** /etc/gemini-cli/settings.json (mínima precedencia, se aplica a todos los usuarios).

Para la tarea en cuestión, se recomienda utilizar el archivo a nivel de proyecto para asegurar que la configuración esté autocontenida y sea controlable por versiones junto con el código del proyecto.

### **5.2 Esquema Detallado para la Configuración de mcpServers Locales**

La clave para añadir servidores MCP es el objeto mcpServers dentro del archivo settings.json.2 Cada clave dentro de este objeto es un nombre definido por el usuario para el servidor (p. ej.,

"myPythonServer").14 Para un servidor Python local que se ejecuta a través de

stdio, el objeto de configuración utiliza las propiedades command, args y la opcional cwd.14

La siguiente tabla detalla los parámetros de configuración disponibles para un transporte local stdio.

**Tabla 2: Parámetros de Configuración de mcpServers para Transporte Local Stdio**

| Parámetro | Tipo | ¿Requerido? | Descripción | Valor de Ejemplo |
| :---- | :---- | :---- | :---- | :---- |
| command | string | Sí | El comando ejecutable para iniciar el servidor MCP. | "python" o "./.venv/bin/python" |
| args | array | Sí | Un array de strings que representan los argumentos a pasar al comando. | \["-u", "src/my\_mcp\_server.py"\] |
| cwd | string | No | El directorio de trabajo actual desde el cual se ejecutará el comando. Esencial para resolver rutas relativas. | "/path/to/python-project/" |
| env | object | No | Un mapa de clave-valor para variables de entorno que se establecerán para el proceso del servidor. | { "DB\_URL": "$DB\_URL\_FROM\_ENV" } |
| timeout | number | No | Tiempo de espera en milisegundos para las solicitudes a este servidor. Por defecto, 10 minutos. | 15000 |
| trust | boolean | No | Si se establece en true, omite todas las confirmaciones de llamada a herramientas para este servidor. | true |
| includeTools | array | No | Una lista blanca de nombres de herramientas a incluir para este servidor. | \["safe\_tool\_1", "safe\_tool\_2"\] |
| excludeTools | array | No | Una lista negra de nombres de herramientas a excluir. Tiene precedencia sobre includeTools. | \["dangerous\_tool"\] |

### **5.3 Guía Práctica para Configurar la Conexión del Servidor Python**

A continuación se muestra un fragmento completo y anotado de settings.json para conectar el servidor Python desarrollado en la sección anterior. Este archivo debe crearse en .gemini/settings.json dentro del directorio raíz del proyecto desde el cual se ejecutará gemini.

JSON

{  
  "mcpServers": {  
    "myPythonServer": {  
      "command": "python",  
      "args": \[  
        "-u",   
        "my\_mcp\_server.py"  
      \],  
      "cwd": "/path/to/your/python\_mcp\_project",  
      "trust": true,  
      "env": {  
        "PYTHONUNBUFFERED": "1"  
      }  
    }  
  }  
}

14

**Anotaciones:**

* **"command": "python":** Asume que python en el PATH del sistema apunta al intérprete correcto. Para mayor robustez, se podría usar la ruta absoluta al ejecutable del entorno virtual (p. ej., "/path/to/project/.venv/bin/python").  
* **"args": \["-u", "my\_mcp\_server.py"\]:** El indicador \-u es una buena práctica para la comunicación entre procesos, ya que fuerza a que los flujos de salida de Python no tengan búfer. my\_mcp\_server.py es la ruta al script del servidor, relativa a cwd.  
* **"cwd": "/path/to/your/python\_mcp\_project":** Esta es la ruta **absoluta** al directorio raíz del proyecto del servidor Python. Es fundamental para que command y args se resuelvan correctamente.  
* **"trust": true:** Se establece por conveniencia durante el desarrollo para evitar la confirmación manual en cada llamada a la herramienta. Debe establecerse en false en producción para herramientas sensibles.

### **Conexión del Gemini CLI a un Servidor MCP Local con SSE**

Para conectar el Gemini CLI a tu servidor MCP local usando SSE, necesitas modificar el archivo settings.json. En lugar de utilizar las propiedades command y args, que inician un proceso local, especificarás una **URL**.

Esta configuración le indica al Gemini CLI que se conecte a un servidor MCP que ya está en funcionamiento y que expone un endpoint SSE.

#### **Configuración en settings.json para SSE**

Abre tu archivo settings.json, que generalmente se encuentra en \~/.gemini/, y añade la configuración de tu servidor dentro de la sección mcpServers.

La estructura para una conexión SSE es la siguiente:

JSON

```

{
  "mcpServers": {
    "mi_servidor_local_sse": {
      "url": "http://localhost:8080/sse",
      "headers": {
        "Authorization": "Bearer <tu_token_de_autenticacion_si_es_necesario>"
      }
    }
  }
}

```

**Desglose de la configuración:**

* **mi\_servidor\_local\_sse**: Este es un nombre que tú eliges para identificar tu servidor MCP dentro del Gemini CLI.  
* **url**: Esta es la propiedad **clave** para la conexión SSE. Debes apuntar a la URL completa donde tu servidor FastMCP está sirviendo los eventos SSE. Comúnmente, esta ruta es /sse. Asegúrate de que el puerto (en este ejemplo, 8080) coincida con el puerto en el que se está ejecutando tu servidor FastMCP.  
* **headers** (Opcional): Si tu servidor MCP requiere alguna cabecera de autenticación (como un Bearer Token), puedes proporcionarla aquí. Esto es útil para securizar tu endpoint.

Una vez que guardes el archivo settings.json con esta configuración y reinicies el Gemini CLI, intentará conectarse a la URL especificada para descubrir y utilizar las herramientas que tu servidor MCP local proporciona.

### **5.4 Verificación, Invocación y Depuración**

1. **Verificación:** Después de configurar settings.json, inicie la Gemini CLI desde el directorio que contiene la carpeta .gemini. Ejecute el comando /mcp. Una conexión exitosa mostrará el servidor como Ready (o Listo) y enumerará las herramientas que expone (p. ej., add).17  
2. **Invocación:** Una vez conectado, el agente de IA puede utilizar la herramienta personalizada. Simplemente pídalo en lenguaje natural. Por ejemplo: \> usa myPythonServer para sumar 123 y 456\. El agente de Gemini razonará que necesita usar la herramienta add del servidor configurado y, si trust es false, solicitará permiso antes de ejecutarla.8  
3. **Depuración:** Si el servidor aparece como Disconnected (o Desconectado), el problema radica en la configuración de settings.json o en un error en el propio script del servidor Python. Consulte la sección de solución de problemas para obtener una guía de diagnóstico detallada.

## **Sección 6: Temas Avanzados y Solución Proactiva de Problemas**

Esta sección final aborda los desafíos no obvios y los casos límite que pueden hacer descarrilar un proyecto. Va más allá del "cómo hacerlo" para entrar en el "qué hacer cuando falla", proporcionando una guía de diagnóstico de nivel experto.

### **6.1 Análisis en Profundidad: La Restricción del Sandbox Seatbelt en macOS**

Este es el problema más significativo y específico de la plataforma identificado. En macOS, si la Gemini CLI se inicia desde un directorio diferente al cwd del servidor MCP, la conexión fallará silenciosamente debido al sandbox Seatbelt, incluso con una configuración correcta.36

* **Análisis de la Causa Raíz:** El perfil de sandbox por defecto de la Gemini CLI en macOS (permissive-open) es demasiado restrictivo. Impide que el proceso de Node.js (que es la CLI) realice las operaciones necesarias (como acceso al sistema de archivos o ejecución de procesos) cuando su directorio de trabajo se cambia externamente a través de la configuración de cwd en settings.json.  
* **Solución Validada:** La solución definitiva y confirmada es desactivar el sandbox antes de iniciar la CLI ejecutando export SEATBELT\_PROFILE=none en la sesión del terminal.36 Este paso debe considerarse como obligatorio para los usuarios de macOS que se encuentren con este escenario específico de directorios de trabajo dispares.

### **6.2 Diagnóstico y Resolución de Fallos Comunes de Configuración**

A continuación, se presenta una guía estructurada para diagnosticar los problemas de conexión más comunes.

**Tabla 3: Escenarios Comunes de Solución de Problemas y Soluciones**

| Síntoma (Error o Comportamiento) | Causa(s) Probable(s) | Pasos de Diagnóstico | Solución(es) |
| :---- | :---- | :---- | :---- |
| **La CLI informa "No MCP servers configured"** | 1\. settings.json no se encuentra o está en la ubicación incorrecta. 2\. Sintaxis JSON inválida. 3\. Anulación por un archivo de configuración de mayor precedencia (p. ej., a nivel de usuario). | 1\. Verifique que .gemini/settings.json existe en el directorio desde el que se ejecuta gemini. 2\. Use un linter de JSON para validar el archivo. 3\. Compruebe si existe \~/.gemini/settings.json y renómbrelo temporalmente para descartar interferencias. | 1\. Cree o mueva el archivo a la ubicación correcta. 2\. Corrija los errores de sintaxis en el JSON. 3\. Unifique las configuraciones o elimine el archivo que anula. |
| **El Servidor MCP aparece como "Disconnected"** | 1\. El script del servidor Python tiene un error y no puede iniciarse. 2\. La ruta en command o args es incorrecta. 3\. La ruta en cwd es incorrecta. | 1\. Intente ejecutar el servidor directamente desde la línea de comandos: python src/my\_mcp\_server.py. Busque errores. 2\. Verifique que las rutas al ejecutable de Python y al script son correctas en settings.json. 3\. Asegúrese de que cwd sea una ruta absoluta y válida. | 1\. Depure y corrija el script de Python. 2\. Corrija las rutas en settings.json. 3\. Use una ruta absoluta y correcta para cwd. |
| **La conexión falla solo en macOS al ejecutar gemini desde un directorio diferente** | Restricciones del sandbox Seatbelt de macOS. | 1\. Ejecute gemini desde el mismo directorio que el cwd del servidor. Si funciona, el problema es el sandbox. 2\. Verifique el error exacto en los logs de la CLI. | Ejecute export SEATBELT\_PROFILE=none en el terminal antes de lanzar gemini. |

36

### **6.3 Mejores Prácticas de Seguridad**

* **Seguridad de la Clave de API:** Se reitera la importancia crítica de no confirmar claves de API en el control de versiones. Utilice variables de entorno o sistemas seguros de gestión de secretos.12  
* **Confianza en el Servidor MCP:** La configuración trust: true 17 omite el paso de confirmación del usuario antes de que se ejecute una herramienta. Aunque es conveniente para el desarrollo, representa un riesgo de seguridad. Se aconseja establecerla en  
  false para cualquier herramienta que realice operaciones sensibles o destructivas.  
* **Uso del Sandbox:** Para cualquier herramienta que ejecute código o comandos de shell, la mejor práctica es ejecutar la Gemini CLI con el indicador \--sandbox para contener la ejecución en un entorno aislado.14

## **Conclusiones y Recomendaciones**

Esta documentación ha recopilado y estructurado la información necesaria para una futura implementación práctica de la Gemini CLI con un servidor MCP local en Python. El análisis revela una ruta de implementación clara, aunque con varios puntos críticos que requieren una atención cuidadosa para evitar errores comunes y costes inesperados.

Las recomendaciones clave para el equipo de implementación son:

1. **Priorizar la Autenticación por OAuth:** Para todo el desarrollo y la evaluación inicial, se debe utilizar exclusivamente el método de "Login with Google". Esto garantiza el acceso al generoso nivel gratuito y evita cargos accidentales. El uso de claves de API debe reservarse para casos de uso empresariales bien definidos y con presupuesto asignado.  
2. **Adoptar FastMCP como Framework Estándar:** Para el desarrollo del servidor MCP en Python, la adopción de la biblioteca FastMCP acelerará significativamente el proceso. Su enfoque de "convención sobre configuración" reduce la complejidad y permite al equipo centrarse en la lógica de las herramientas.  
3. **Utilizar Configuración a Nivel de Proyecto:** La configuración de la conexión a través de un archivo ./.gemini/settings.json debe ser la práctica estándar. Esto mantiene la configuración del servidor MCP junto con el código del proyecto, facilitando el control de versiones y la reproducibilidad del entorno.  
4. **Estar Preparado para la Solución de Problemas Específicos de la Plataforma:** El equipo debe ser consciente del problema del sandbox Seatbelt en macOS. La solución de export SEATBELT\_PROFILE=none debe documentarse internamente como un paso de configuración obligatorio para los desarrolladores de macOS que trabajen con servidores MCP locales.

Siguiendo estas directrices y utilizando los ejemplos de código y las tablas de referencia proporcionadas, el equipo de desarrollo estará bien equipado para configurar y utilizar con éxito la Gemini CLI, extendiendo sus capacidades con herramientas personalizadas de Python para satisfacer sus necesidades específicas de flujo de trabajo.

## **Apéndice: Guías de Referencia Rápida**

### **Apéndice A: Tabla de Métodos de Autenticación de Gemini CLI**

| Característica | Inicio de Sesión con Google (OAuth 2.0) | Clave de API (API Key) |
| :---- | :---- | :---- |
| **Mecanismo de Configuración** | Flujo de autenticación interactivo basado en navegador en la primera ejecución. | Generación manual de clave y configuración como variable de entorno (GEMINI\_API\_KEY) o en un archivo .env. |
| **Modelo de Coste** | Gratuito, bajo la licencia de Gemini Code Assist.2 | Facturable por solicitud, según las tarifas de la API de Gemini o Vertex AI.15 |
| **Límites de Uso** | 60 solicitudes/minuto, 1.000 solicitudes/día.7 | Depende de la cuota del proyecto de Google Cloud; puede ser superior si se solicita y se paga. |
| **Caso de Uso Principal** | Desarrollo individual, evaluación, aprendizaje y uso general sin coste. | Aplicaciones empresariales, flujos de trabajo automatizados que requieren límites más altos y facturables, integración con Vertex AI. |
| **Advertencia Crítica** | Ninguna. Este es el método recomendado para uso gratuito. | **No utiliza el nivel gratuito.** Todas las solicitudes incurren en costes. Usar con precaución y solo cuando se necesiten límites facturables. |

### **Apéndice B: Tabla de Parámetros de Configuración de mcpServers**

| Parámetro | Tipo | ¿Requerido? | Descripción | Valor de Ejemplo |
| :---- | :---- | :---- | :---- | :---- |
| command | string | Sí | El comando ejecutable para iniciar el servidor MCP. | "python" o "./.venv/bin/python" |
| args | array | Sí | Un array de strings que representan los argumentos a pasar al comando. | \["-u", "src/my\_mcp\_server.py"\] |
| cwd | string | No | El directorio de trabajo actual desde el cual se ejecutará el comando. Esencial para resolver rutas relativas. | "/path/to/python-project/" |
| env | object | No | Un mapa de clave-valor para variables de entorno que se establecerán para el proceso del servidor. | { "DB\_URL": "$DB\_URL\_FROM\_ENV" } |
| timeout | number | No | Tiempo de espera en milisegundos para las solicitudes a este servidor. Por defecto, 10 minutos. | 15000 |
| trust | boolean | No | Si se establece en true, omite todas las confirmaciones de llamada a herramientas para este servidor. | true |
| includeTools | array | No | Una lista blanca de nombres de herramientas a incluir para este servidor. | \["safe\_tool\_1", "safe\_tool\_2"\] |
| excludeTools | array | No | Una lista negra de nombres de herramientas a excluir. Tiene precedencia sobre includeTools. | \["dangerous\_tool"\] |

### **Apéndice C: Tabla de Solución de Problemas Comunes**

| Síntoma (Error o Comportamiento) | Causa(s) Probable(s) | Pasos de Diagnóstico | Solución(es) |
| :---- | :---- | :---- | :---- |
| **La CLI informa "No MCP servers configured"** | 1\. settings.json no se encuentra o está en la ubicación incorrecta. 2\. Sintaxis JSON inválida. 3\. Anulación por un archivo de configuración de mayor precedencia (p. ej., a nivel de usuario). | 1\. Verifique que .gemini/settings.json existe en el directorio desde el que se ejecuta gemini. 2\. Use un linter de JSON para validar el archivo. 3\. Compruebe si existe \~/.gemini/settings.json y renómbrelo temporalmente para descartar interferencias. | 1\. Cree o mueva el archivo a la ubicación correcta. 2\. Corrija los errores de sintaxis en el JSON. 3\. Unifique las configuraciones o elimine el archivo que anula. |
| **El Servidor MCP aparece como "Disconnected"** | 1\. El script del servidor Python tiene un error y no puede iniciarse. 2\. La ruta en command o args es incorrecta. 3\. La ruta en cwd es incorrecta. | 1\. Intente ejecutar el servidor directamente desde la línea de comandos: python src/my\_mcp\_server.py. Busque errores. 2\. Verifique que las rutas al ejecutable de Python y al script son correctas en settings.json. 3\. Asegúrese de que cwd sea una ruta absoluta y válida. | 1\. Depure y corrija el script de Python. 2\. Corrija las rutas en settings.json. 3\. Use una ruta absoluta y correcta para cwd. |
| **La conexión falla solo en macOS al ejecutar gemini desde un directorio diferente** | Restricciones del sandbox Seatbelt de macOS. | 1\. Ejecute gemini desde el mismo directorio que el cwd del servidor. Si funciona, el problema es el sandbox. 2\. Verifique el error exacto en los logs de la CLI. | Ejecute export SEATBELT\_PROFILE=none en el terminal antes de lanzar gemini. |

#### **Works cited**

1. Gemini CLI: A Guide With Practical Examples | DataCamp, accessed July 29, 2025, [https://www.datacamp.com/tutorial/gemini-cli](https://www.datacamp.com/tutorial/gemini-cli)  
2. Gemini CLI Full Tutorial \- DEV Community, accessed July 29, 2025, [https://dev.to/proflead/gemini-cli-full-tutorial-2ab5](https://dev.to/proflead/gemini-cli-full-tutorial-2ab5)  
3. Google Gemini CLI Tutorial: How to Install and Use It (With Images) \- DEV Community, accessed July 29, 2025, [https://dev.to/auden/google-gemini-cli-tutorial-how-to-install-and-use-it-with-images-4phb](https://dev.to/auden/google-gemini-cli-tutorial-how-to-install-and-use-it-with-images-4phb)  
4. Essential Prerequisites for Using MCP with Python & Gemini LLM \- YouTube, accessed July 29, 2025, [https://www.youtube.com/watch?v=eMpGe76PUwA](https://www.youtube.com/watch?v=eMpGe76PUwA)  
5. fastmcp · PyPI, accessed July 29, 2025, [https://pypi.org/project/fastmcp/1.0/](https://pypi.org/project/fastmcp/1.0/)  
6. reugn/gemini-cli: A command-line interface (CLI) for Google Gemini \- GitHub, accessed July 29, 2025, [https://github.com/reugn/gemini-cli](https://github.com/reugn/gemini-cli)  
7. Gemini CLI: A comprehensive guide to understanding, installing, and leveraging this new Local AI Agent : r/GeminiAI \- Reddit, accessed July 29, 2025, [https://www.reddit.com/r/GeminiAI/comments/1lkojt8/gemini\_cli\_a\_comprehensive\_guide\_to\_understanding/](https://www.reddit.com/r/GeminiAI/comments/1lkojt8/gemini_cli_a_comprehensive_guide_to_understanding/)  
8. Gemini CLI Tutorial Series \- Medium, accessed July 29, 2025, [https://medium.com/google-cloud/gemini-cli-tutorial-series-77da7d494718](https://medium.com/google-cloud/gemini-cli-tutorial-series-77da7d494718)  
9. Getting started with Gemini Command Line Interface (CLI) \- MarkTechPost, accessed July 29, 2025, [https://www.marktechpost.com/2025/06/28/getting-started-with-gemini-command-line-interface-cli/](https://www.marktechpost.com/2025/06/28/getting-started-with-gemini-command-line-interface-cli/)  
10. Google announces Gemini CLI: your open-source AI agent, accessed July 29, 2025, [https://blog.google/technology/developers/introducing-gemini-cli-open-source-ai-agent/](https://blog.google/technology/developers/introducing-gemini-cli-open-source-ai-agent/)  
11. Gemini CLI Installation and User Guide (written by Gemini CLI) | by David Morgan \- Medium, accessed July 29, 2025, [https://binreminded.medium.com/gemini-cli-installation-and-user-guide-d04c547767e7](https://binreminded.medium.com/gemini-cli-installation-and-user-guide-d04c547767e7)  
12. Using Gemini API keys | Google AI for Developers, accessed July 29, 2025, [https://ai.google.dev/gemini-api/docs/api-key](https://ai.google.dev/gemini-api/docs/api-key)  
13. Get a Google Cloud API key | Generative AI on Vertex AI, accessed July 29, 2025, [https://cloud.google.com/vertex-ai/generative-ai/docs/start/api-keys](https://cloud.google.com/vertex-ai/generative-ai/docs/start/api-keys)  
14. Google Gemini CLI Cheatsheet \- Philschmid, accessed July 29, 2025, [https://www.philschmid.de/gemini-cli-cheatsheet](https://www.philschmid.de/gemini-cli-cheatsheet)  
15. I made a $150 mistake with the Gemini CLI. Don't use your API key, sign in with Google instead. : r/GoogleGeminiAI \- Reddit, accessed July 29, 2025, [https://www.reddit.com/r/GoogleGeminiAI/comments/1m7wmup/i\_made\_a\_150\_mistake\_with\_the\_gemini\_cli\_dont\_use/](https://www.reddit.com/r/GoogleGeminiAI/comments/1m7wmup/i_made_a_150_mistake_with_the_gemini_cli_dont_use/)  
16. Gemini CLI | Gemini for Google Cloud, accessed July 29, 2025, [https://cloud.google.com/gemini/docs/codeassist/gemini-cli](https://cloud.google.com/gemini/docs/codeassist/gemini-cli)  
17. Gemini CLI Tutorial Series — Part 5 : Github MCP Server | by Romin Irani | Google Cloud, accessed July 29, 2025, [https://medium.com/google-cloud/gemini-cli-tutorial-series-part-5-github-mcp-server-b557ae449e6e](https://medium.com/google-cloud/gemini-cli-tutorial-series-part-5-github-mcp-server-b557ae449e6e)  
18. Gemini CLI \- Learn Netdata, accessed July 29, 2025, [https://learn.netdata.cloud/docs/ai-&-ml/devops-copilots/gemini-cli](https://learn.netdata.cloud/docs/ai-&-ml/devops-copilots/gemini-cli)  
19. Use agentic chat as a pair programmer | Gemini Code Assist \- Google for Developers, accessed July 29, 2025, [https://developers.google.com/gemini-code-assist/docs/use-agentic-chat-pair-programmer](https://developers.google.com/gemini-code-assist/docs/use-agentic-chat-pair-programmer)  
20. Gemini CLI is awesome\! But only when you make Claude Code use it as its bitch. \- Reddit, accessed July 29, 2025, [https://www.reddit.com/r/ChatGPTCoding/comments/1lm3fxq/gemini\_cli\_is\_awesome\_but\_only\_when\_you\_make/](https://www.reddit.com/r/ChatGPTCoding/comments/1lm3fxq/gemini_cli_is_awesome_but_only_when_you_make/)  
21. Use agentic chat as a pair programmer | Gemini for Google Cloud, accessed July 29, 2025, [https://cloud.google.com/gemini/docs/codeassist/use-agentic-chat-pair-programmer](https://cloud.google.com/gemini/docs/codeassist/use-agentic-chat-pair-programmer)  
22. Practical Gemini CLI: Bring your own system instruction | by Prashanth Subrahmanyam, accessed July 29, 2025, [https://ksprashu.medium.com/practical-gemini-cli-bring-your-own-system-instruction-19ea7f07faa2](https://ksprashu.medium.com/practical-gemini-cli-bring-your-own-system-instruction-19ea7f07faa2)  
23. jamubc/gemini-mcp-tool: MCP server that enables AI assistants to interact with Google Gemini CLI, leveraging Gemini's massive token window for large file analysis and codebase understanding \- GitHub, accessed July 29, 2025, [https://github.com/jamubc/gemini-mcp-tool](https://github.com/jamubc/gemini-mcp-tool)  
24. Model Context Protocol(MCP) with Google Gemini 2.5 Pro — A Deep Dive (Full Code), accessed July 29, 2025, [https://medium.com/google-cloud/model-context-protocol-mcp-with-google-gemini-llm-a-deep-dive-full-code-ea16e3fac9a3](https://medium.com/google-cloud/model-context-protocol-mcp-with-google-gemini-llm-a-deep-dive-full-code-ea16e3fac9a3)  
25. Example Clients \- Model Context Protocol, accessed July 29, 2025, [https://modelcontextprotocol.io/clients](https://modelcontextprotocol.io/clients)  
26. FastMCP: The fastway to build MCP servers. | by CellCS \- Medium, accessed July 29, 2025, [https://medium.com/@shmilysyg/fastmcp-the-fastway-to-build-mcp-servers-aa14f88536d2](https://medium.com/@shmilysyg/fastmcp-the-fastway-to-build-mcp-servers-aa14f88536d2)  
27. jlowin/fastmcp: The fast, Pythonic way to build MCP servers and clients \- GitHub, accessed July 29, 2025, [https://github.com/jlowin/fastmcp](https://github.com/jlowin/fastmcp)  
28. Building an MCP Server and Client with FastMCP 2.0 \- DataCamp, accessed July 29, 2025, [https://www.datacamp.com/tutorial/building-mcp-server-client-fastmcp](https://www.datacamp.com/tutorial/building-mcp-server-client-fastmcp)  
29. How to Create an MCP Server in Python \- FastMCP, accessed July 29, 2025, [https://gofastmcp.com/tutorials/create-mcp-server](https://gofastmcp.com/tutorials/create-mcp-server)  
30. A Beginner's Guide to Use FastMCP \- Apidog, accessed July 29, 2025, [https://apidog.com/blog/fastmcp/](https://apidog.com/blog/fastmcp/)  
31. Building a Basic MCP Server with Python | by Alex Merced | Data, Analytics & AI with Dremio, accessed July 29, 2025, [https://medium.com/data-engineering-with-dremio/building-a-basic-mcp-server-with-python-4c34c41031ed](https://medium.com/data-engineering-with-dremio/building-a-basic-mcp-server-with-python-4c34c41031ed)  
32. Quickstart \- FastMCP, accessed July 29, 2025, [https://gofastmcp.com/getting-started/quickstart](https://gofastmcp.com/getting-started/quickstart)  
33. How to Write Your MCP Server in Python \- RidgeRun.ai, accessed July 29, 2025, [https://www.ridgerun.ai/post/how-to-write-your-mcp-server-in-python](https://www.ridgerun.ai/post/how-to-write-your-mcp-server-in-python)  
34. Creating an MCP Server Using FastMCP: A Comprehensive Guide \- Pondhouse Data, accessed July 29, 2025, [https://www.pondhouse-data.com/blog/create-mcp-server-with-fastmcp](https://www.pondhouse-data.com/blog/create-mcp-server-with-fastmcp)  
35. FastMCP Tutorial: Building MCP Servers in Python From Scratch \- Firecrawl, accessed July 29, 2025, [https://www.firecrawl.dev/blog/fastmcp-tutorial-building-mcp-servers-python](https://www.firecrawl.dev/blog/fastmcp-tutorial-building-mcp-servers-python)  
36. macOS Sandbox Prevents Local MCP Server Startup from External ..., accessed July 29, 2025, [https://github.com/google-gemini/gemini-cli/issues/3261](https://github.com/google-gemini/gemini-cli/issues/3261)  
37. MCP servers not detected despite valid configuration on macOS \#3406 \- GitHub, accessed July 29, 2025, [https://github.com/google-gemini/gemini-cli/issues/3406](https://github.com/google-gemini/gemini-cli/issues/3406)  
38. MCP server fails to load on macOS despite correct configuration \#4273 \- GitHub, accessed July 29, 2025, [https://github.com/google-gemini/gemini-cli/issues/4273](https://github.com/google-gemini/gemini-cli/issues/4273)