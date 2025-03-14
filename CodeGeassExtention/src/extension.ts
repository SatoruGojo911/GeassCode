import * as vscode from "vscode";
import axios from "axios";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("extension.callAPI", async () => {
    try {
      const staticPrompt = "Optimize this code and explain the changes.";

      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor found.");
        return;
      }

      const selectedText = editor.document.getText(editor.selection) || editor.document.getText();
      if (!selectedText) {
        vscode.window.showErrorMessage("No code selected or found in the document.");
        return;
      }

      const requestData = {
        code: selectedText,
        prompt: staticPrompt,
      };

      // Create a WebView panel in VS Code with new name "CodeGeass"
      const panel = vscode.window.createWebviewPanel(
        "codeGeassPanel",
        "CodeGeass",
        vscode.ViewColumn.Beside,
        { enableScripts: true }
      );

      // Show loading animation while waiting for response
      panel.webview.html = getLoadingHTML();

      // Send API request
      const response = await axios.post("http://127.0.0.1:8000/api/generate/", requestData);
      const apiResponse = response.data.response;

      // Update WebView with formatted response
      panel.webview.html = getWebviewContent(apiResponse);
    } catch (error: any) {
      vscode.window.showErrorMessage(`Failed to fetch API data: ${error.message}`);
    }
  });

  context.subscriptions.push(disposable);
}

function getLoadingHTML(): string {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 20px; color: #ffffff; background-color: #1e1e1e; }
          .loader {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid #007acc;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
          }
          @keyframes spin { 
            0% { transform: rotate(0deg); } 
            100% { transform: rotate(360deg); } 
          }
          h2 { color: #007acc; }
        </style>
      </head>
      <body>
        <h2>Code Geass...</h2>
        <div class="loader"></div>
      </body>
    </html>
  `;
}

function getWebviewContent(response: string): string {
  const formattedResponse = response
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Bold
    .replace(/\*(.*?)\*/g, '<i>$1</i>') // Italics
    .replace(/`([^`]+)`/g, '<code>$1</code>') // Inline code
    .replace(/\n/g, '<br>'); // Preserve new lines

  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 15px; background-color: #1e1e1e; color: #ffffff; }
          pre { background-color: #252526; color: #d4d4d4; padding: 12px; border-radius: 5px; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; }
          h2 { color: #007acc; }
          b { color: #ffaa00; } /* Highlight bold text */
          i { color: #ff79c6; } /* Highlight italic text */
          code { background-color: #444; padding: 2px 4px; border-radius: 3px; color: #50fa7b; font-family: monospace; }
          button { background: #007acc; color: white; padding: 8px 12px; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px; }
          button:hover { background: #005f99; }
        </style>
      </head>
      <body>
        <h2>CodeGeass Response</h2>
        <pre id="response-content">${formattedResponse}</pre>
        <button onclick="copyToClipboard()">📋 Copy</button>
        <script>
          function copyToClipboard() {
            const text = document.getElementById("response-content").innerText;
            navigator.clipboard.writeText(text);
            alert("Copied to clipboard!");
          }
        </script>
      </body>
    </html>
  `;
}


export function deactivate() {}
