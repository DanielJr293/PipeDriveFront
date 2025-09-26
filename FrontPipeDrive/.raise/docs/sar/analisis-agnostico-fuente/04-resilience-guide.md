# Resilience and Error Handling Guide

This document describes the resilience patterns and error handling mechanisms implemented in the Raise-Gemini MCP Server.

## Primary Resilience Pattern: Graceful File Handling

The server's core logic involves reading numerous files from the local file system to construct prompts. The primary resilience concern is handling cases where expected files are missing or unreadable.

This is addressed in the `crear_prompt_documento` function within `src/prompt_utils.py`.

### Mechanism

-   **Try/Except Blocks:** The code wraps file-reading operations in `try...except` blocks.
-   **Specific Exception Handling:** It specifically catches `FileNotFoundError`. If a file is not found, instead of crashing, it appends a clear message (`--- Archivo no encontrado: {path} ---`) to the context being built.
-   **Generic Exception Handling:** It also catches any other `Exception` that might occur during file reading. This prevents unexpected errors (e.g., permission issues) from halting the entire process. A generic error message (`--- Error leyendo {path}: {e} ---`) is appended to the context.

### Impact

This approach makes the server resilient to missing files. If a rule, template, or context file is not found, the server will still generate a prompt. This prompt will contain messages indicating which files were missing, which is crucial for debugging and for the user to understand why the AI's output might not be as expected. The server does not fail silently; it reports the error within the generated context itself.

## Other Considerations

-   **No Network Resilience:** The server itself does not make network calls, so it does not implement patterns like retries or circuit breakers. All network communication is handled by the Gemini CLI after it receives the prompt.
-   **No Transactional Logic:** The server's operations are read-only with respect to the user's project files (it only writes the final SAR documents). Therefore, there is no need for transactional logic or rollback mechanisms.
