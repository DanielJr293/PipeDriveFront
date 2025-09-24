# Service Overview: Raise-Gemini MCP Server

## 1. Purpose and Bounded Context

The **Raise-Gemini MCP Server** is a backend service that acts as a specialized assistant for the **RaiSE (Reliable AI Software Engineering)** methodology. Its primary responsibility is to dynamically generate precise, context-rich prompts for the Gemini CLI. It does not execute logic itself, but rather prepares the instructions for the AI to execute, ensuring that the AI's work adheres to the RaiSE framework.

The server operates within the bounded context of **AI-assisted software engineering documentation and planning**.

## 2. Core Responsibilities

-   **Prompt Construction:** Dynamically build complex prompts by combining user-provided context, RaiSE templates, Katas, and rules.
-   **Exposing RaiSE Workflow:** Expose the RaiSE workflow as a series of MCP (Model-Context-Protocol) tools that the user can invoke from the Gemini CLI.
-   **Encapsulating Methodology:** Embed the knowledge of the RaiSE methodology directly into the tools, ensuring that generated documents and plans are consistent and follow best practices.

## 3. Key Features (Use Cases)

-   **Formal Document Generation:** Create standard RaiSE documents like PRDs, Solution Visions, and Technical Designs.
-   **Work Planning & Prioritization:** Assist in prioritizing features and generating detailed implementation plans for User Stories.
-   **User Story Management:** Decompose features into suggested User Stories and create their formal backlog items.
-   **AI Rule Generation:** Facilitate the creation of new `.mdc` rules to govern the AI's behavior.

## 4. Dependencies

-   **Infrastructure:**
    -   **Python 3.7+**
    -   **FastAPI, Uvicorn, FastMCP:** For the web server and MCP tool implementation.
    -   **Local File System:** Heavily relies on reading templates, Katas, and rules from the `.raise/`, `.gemini/`, and `src/prompts` directories.
-   **Egress:**
    -   None. The server's only output is a prompt string returned to the Gemini CLI. All external communication is initiated by the CLI.

## 5. Domain Model Highlights

The domain is centered around the concept of a **Prompt**. The server's logic is dedicated to assembling this object from various pieces of information: `Context Files`, `Prompt Templates`, and `Dynamic Paths` that point to RaiSE-specific knowledge. The entire process is exposed through a set of `MCP Tools`.
