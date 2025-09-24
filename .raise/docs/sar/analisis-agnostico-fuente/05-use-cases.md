# Business Use Cases

This document maps the technical endpoints (MCP Tools) of the server to their corresponding business capabilities within the RaiSE methodology.

### 1. Document Generation

-   **Use Case:** Generate a formal RaiSE document from a template and context.
-   **Description:** A user needs to create a standard RaiSE document, such as a PRD, a Solution Vision, or a Technical Design. They provide the necessary context files, and the system generates a prompt for the AI to write the document based on a predefined template.
-   **MCP Tools:**
    -   `raise:generar-prd`
    -   `raise:generar-vision-solucion`
    -   `raise:generar-tech-design`
    -   `raise:generar-tech-design-feature`

### 2. Feature and Work Prioritization

-   **Use Case:** Analyze project documents to prioritize features and plan work.
-   **Description:** A user wants to evaluate the features described in a Technical Design to determine their priority. The system takes the design and other documents as context and uses a template to guide the AI in creating a prioritization matrix.
-   **MCP Tool:**
    -   `raise:priorizar-features`

### 3. User Story Management

-   **Use Case:** Decompose features into User Stories and plan their implementation.
-   **Description:** This involves two steps. First, a user provides a feature description, and the system suggests a list of User Stories. Second, the user can take the list of suggestions and command the system to create formal, individual `.md` files for each User Story, ready for backlog management.
-   **MCP Tools:**
    -   `raise:sugerir-hus`
    -   `raise:crear-hus-por-feature`

### 4. Implementation Planning

-   **Use Case:** Create a detailed, step-by-step implementation plan for a User Story.
-   **Description:** A user provides a User Story document, and the system, guided by the `L1-04` Kata, generates a detailed checklist of tasks required to implement that story.
-   **MCP Tool:**
    -   `raise:generar-plan-implementacion`

### 5. Metaprogramming and Rule Generation

-   **Use Case:** Create new Cursor Rules (.mdc) for the AI.
-   **Description:** A user needs to codify a new best practice or instruction for the AI to follow. They provide analysis and justification, and the system uses RaiSE Katas and existing examples to generate a new, formal `.mdc` rule file.
-   **MCP Tool:**
    -   `raise:generar-reglas`

### 6. System Help and Guidance

-   **Use Case:** Get help on how to use the RaiSE tools.
-   **Description:** A user is unsure about the RaiSE process or which tool to use. The system provides a helpful guide explaining the workflow and the purpose of each available tool.
-   **MCP Tool:**
    -   `raise:help`
