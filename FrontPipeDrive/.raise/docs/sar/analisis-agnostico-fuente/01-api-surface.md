# API Surface and Data Contracts

This document outlines the API surface of the Raise-Gemini MCP Server, detailing each available tool, its purpose, and its data contracts.

## Tools

### 1. `raise:generar-prd`

- **Purpose:** Generates a Project Requirements Document (PRD) based on the RaiSE methodology. It uses a template and a set of rules to synthesize the content provided in the context files.
- **Request (Input):**
  - `rutas_contexto`: `list[str]` - A list of file paths to include as context.
- **Response (Output):**
  - `str` - A prompt for the Gemini CLI to execute.

### 2. `raise:generar-reglas`

- **Purpose:** Generates one or more Cursor Rules (.mdc) using the RaiSE methodology and Katas. It synthesizes knowledge from methodological documents (Katas), examples of existing rules, and the context provided by the user.
- **Request (Input):**
  - `rutas_contexto`: `list[str]` - Paths to files with analysis or justifications for the new rules.
- **Response (Output):**
  - `str` - A prompt for the Gemini CLI to execute.

### 3. `raise:generar-vision-solucion`

- **Purpose:** Generates a Solution Vision Document based on the RaiSE methodology. It uses a template and a set of rules to synthesize the content provided in the context files, mainly the PRD.
- **Request (Input):**
  - `rutas_contexto`: `list[str]` - A list of file paths to include as context (PRD, etc.).
- **Response (Output):**
  - `str` - A prompt for the Gemini CLI to execute.

### 4. `raise:generar-tech-design`

- **Purpose:** Generates a Technical Design Document based on the RaiSE methodology. It uses a template and a set of rules to synthesize the content provided in the context files, such as the PRD and the Solution Vision.
- **Request (Input):**
  - `rutas_contexto`: `list[str]` - A list of file paths to include as context (PRD, Vision, etc.).
- **Response (Output):**
  - `str` - A prompt for the Gemini CLI to execute.

### 5. `raise:priorizar-features`

- **Purpose:** Generates a Feature Prioritization Document based on the RaiSE methodology. It uses a template to evaluate and prioritize functionalities extracted from the Technical Design, PRD, and Solution Vision.
- **Request (Input):**
  - `rutas_contexto`: `list[str]` - A list of file paths to include as context (Technical Design, etc.).
- **Response (Output):**
  - `str` - A prompt for the Gemini CLI to execute.

### 6. `raise:sugerir-hus`

- **Purpose:** Generates a list of suggestions for User Stories (HUs) for a specific feature.
- **Request (Input):**
  - `rutas_contexto`: `list[str]` - Paths to documents such as the Technical Design or Feature Prioritization.
  - `nombre_feature`: `str` - The name or ID of the feature for which the HUs will be generated.
- **Response (Output):**
  - `str` - A prompt for the Gemini CLI to execute.

### 7. `raise:crear-hus-por-feature`

- **Purpose:** Generates formal HU files for all suggestions of a specific feature. It reads a suggestions document, extracts the HUs of a feature, and creates an individual .md file for each one using the corresponding template.
- **Request (Input):**
  - `nombre_feature`: `str` - The name of the feature to process.
  - `ruta_sugerencias`: `str` - The path to the file containing the list of suggested HUs.
- **Response (Output):**
  - `str` - A prompt for the Gemini CLI to execute.

### 8. `raise:generar-plan-implementacion`

- **Purpose:** Generates a detailed implementation plan for a User Story (HU). It uses Kata L1-04 as a methodological guide and the HU document as the main requirement to break down.
- **Request (Input):**
  - `rutas_contexto`: `list[str]` - The path to the .md file of the User Story.
- **Response (Output):**
  - `str` - A prompt for the Gemini CLI to execute.

### 9. `raise:generar-tech-design-feature`

- **Purpose:** Generates a detailed Technical Design Document for a specific feature.
- **Request (Input):**
  - `rutas_contexto`: `list[str]` - Paths to the General Technical Design and the Feature Prioritization doc.
  - `nombre_feature`: `str` - The name of the feature to be detailed.
- **Response (Output):**
  - `str` - A prompt for the Gemini CLI to execute.

### 10. `raise:help`

- **Purpose:** Provides a guide on the RaiSE process and the available MCP tools. This tool requires no input. It reads a predefined prompt that describes the RaiSE workflow and associates each MCP tool with its corresponding step, indicating the necessary context files.
- **Request (Input):**
  - None
- **Response (Output):**
  - `str` - A prompt for the Gemini CLI to execute.
