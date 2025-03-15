import * as vscode from "vscode";
import axios from "axios";

export function activate(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage("✨ CodeGeass: Select a snippet of code to analyze! ✨");
  
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

      const panel = vscode.window.createWebviewPanel(
        "codeGeassPanel",
        "CodeGeass",
        vscode.ViewColumn.Beside,
        { enableScripts: true }
      );

      panel.webview.html = getLoadingHTML();

      const response = await axios.post("http://127.0.0.1:8000/api/generate/", requestData);
      const apiResponse = response.data.response;

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
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            color: #ffffff;
            background: linear-gradient(to bottom, black, #1e1e1e);
          }
          .loader-container {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .configure-border-1 {
            width: 50px;
            height: 50px;
            padding: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fb5b53;
            animation: configure-clockwise 3s ease-in-out infinite alternate;
          }
          .configure-border-2 {
            width: 50px;
            height: 50px;
            padding: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgb(63,249,220);
            transform: rotate(45deg);
            animation: configure-xclockwise 3s ease-in-out infinite alternate;
          }
          .configure-core {
            width: 100%;
            height: 100%;
            background-color: #1d2630;
          }
          @keyframes configure-clockwise {
            0% { transform: rotate(0); }
            25% { transform: rotate(90deg); }
            50% { transform: rotate(180deg); }
            75% { transform: rotate(270deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes configure-xclockwise {
            0% { transform: rotate(45deg); }
            25% { transform: rotate(-45deg); }
            50% { transform: rotate(-135deg); }
            75% { transform: rotate(-225deg); }
            100% { transform: rotate(-315deg); }
          }
        </style>
      </head>
      <body>
        <div class="loader-container">
          <h2 style="font-family: Montserrat; color: white;">Code Geass...</h2>
          <div class="configure-border-1">
            <div class="configure-border-2">
              <div class="configure-core"></div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}


function getWebviewContent(response: string): string {
  const formattedResponse = response
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.*?)\*/g, '<i>$1</i>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');

  return `
    <html>
      <head>
        <style>
          body {
            font-family: Montserrat, sans-serif;
            padding: 15px;
            background: linear-gradient(to bottom, black, #1e1e1e);
            color: #ffffff;
          }
          pre {
            background-color: #252526;
            color: #d4d4d4;
            padding: 12px;
            border-radius: 5px;
            overflow-x: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          h2 { color: white; }
          button {
            padding: 10px 20px;
            text-transform: uppercase;
            border-radius: 8px;
            font-size: 17px;
            font-weight: 500;
            color: #ffffff80;
            background: transparent;
            cursor: pointer;
            border: 1px solid #ffffff80;
            transition: 0.5s ease;
            user-select: none;
          }
          button:hover, :focus {
            color: #ffffff;
            background: #008cff;
            border: 1px solid #008cff;
            text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #ffffff;
            box-shadow: 0 0 5px #008cff, 0 0 20px #008cff, 0 0 50px #008cff, 0 0 100px #008cff;
          }
        </style>
      </head>
      <body>
        <h2>CodeGeass Response</h2>
        <pre id="response-content">${formattedResponse}</pre>
        <button onclick="copyToClipboard()">📋 Use Geass</button>
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