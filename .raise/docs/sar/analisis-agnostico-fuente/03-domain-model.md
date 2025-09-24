# Domain Model

This document describes the key domain concepts and entities handled by the Raise-Gemini MCP Server.

## Core Concepts

The central purpose of this server is to act as an intelligent assistant for the RaiSE (Reliable AI Software Engineering) methodology. It achieves this by dynamically constructing prompts for the Gemini CLI based on user intent and the state of the project.

The key concepts are:

-   **RaiSE Document:** A formal document defined by the RaiSE methodology, such as a Project Requirements Document (PRD), a Solution Vision, or a Technical Design.
-   **RaiSE Kata:** A structured exercise or process for performing a specific engineering task, like generating a User Story or creating a new rule.
-   **Cursor Rule (.mdc):** A file containing instructions and context for the AI to follow, specific to the Cursor IDE.
-   **Prompt:** A set of instructions and context fed to the Gemini Large Language Model to perform a task.
-   **MCP Tool:** A function exposed by the server that corresponds to a specific RaiSE action (e.g., `raise:generar-prd`).

## Key Entities and Value Objects

The code does not define formal classes for these concepts, but they are implicitly present in the logic and data flow.

-   **PromptTemplate:**
    -   **Description:** A text file containing a parameterized template for a prompt.
    -   **Representation:** Stored as `.txt` files in `src/prompts/`.
-   **ContextFile:**
    -   **Description:** A file from the user's project that provides context for a task.
    -   **Representation:** A string representing a file path.
-   **DynamicPath:**
    -   **Description:** A placeholder in a prompt template that gets replaced by the content of one or more files.
    -   **Representation:** A dictionary where keys are placeholders and values are lists of file paths.
-   **MCPTool:**
    -   **Description:** A function decorated with `@mcp.tool` that represents a specific action the user can take. It encapsulates the logic for gathering the necessary context and constructing the final prompt.
    -   **Representation:** An `async` function in `src/mcp_server.py`.

## Core Process

The fundamental process orchestrated by the server is as follows:

1.  The user invokes an MCP Tool via the Gemini CLI.
2.  The corresponding function in `mcp_server.py` is executed.
3.  The function gathers the necessary components for the prompt:
    -   The user-provided context files (`rutas_contexto`).
    -   The path to the appropriate prompt template.
    -   Any required RaiSE methodology documents (Katas, rules, etc.) as dynamic paths.
4.  It calls `crear_prompt_documento` from `prompt_utils.py`.
5.  `crear_prompt_documento` reads the content of the prompt template and all dynamic path files.
6.  It formats the template, injecting the content of the dynamic path files and any other provided arguments.
7.  It prepends the user's context file paths (`@/path/to/file`) to the formatted prompt.
8.  The final, complete prompt string is returned to the Gemini CLI for execution.
