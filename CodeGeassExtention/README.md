# CodeGeass Extension

## Overview
**CodeGeass** is a powerful VS Code extension that enhances your coding experience by providing **AI-powered recommendations and analysis**. When you select a snippet of code, this extension calls an external API that utilizes a **large language model (LLM)** to analyze and suggest improvements based on best practices, efficiency, and readability.

## Features
- **AI-Powered Code Analysis**: Get insights and explanations for selected code snippets.
- **Code Recommendations**: Receive suggestions for improving code quality, efficiency, and readability.
- **Seamless Integration**: Works directly within VS Code with a simple selection.
- **Supports Multiple Languages**: Works with various programming languages like Python, JavaScript, C++, and more.

## Installation
1. Install the extension from the **VS Code Marketplace** (or manually via `.vsix` file).
2. Ensure **Node.js** is installed on your system.
3. Run the following command to install dependencies:
   ```sh
   npm install
   ```

## Usage
1. **Select a code snippet** in your VS Code editor.
2. **click** on top-right button named `Use Geass` .
3. The extension sends the snippet to the LLM API for analysis.
4. View the suggestions and improvements in the output panel.


## Permissions
This extension requires an internet connection to send code snippets to the AI model for analysis. No data is stored locally or shared beyond the configured API.

## Contribution
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`feature/new-feature`).
3. Commit changes and push to GitHub.
4. Open a pull request.

## Contact
For support or feature requests, reach out via [GitHub Issues](https://github.com/utsav1072/CodeGeass/issues).

