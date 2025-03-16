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

      panel.webview.onDidReceiveMessage(async (message) => {
        if (message.command === "callAPI") {
          try {
            if (!selectedText) {
              vscode.window.showErrorMessage("No code selected or found in the document.");
              return;
            }
      
            const requestData = {
              code: selectedText,
              prompt: message.prompt, 
            };
      
            panel.webview.html = getLoadingHTML(); 
      
            const response = await axios.post("https://utsav911911.pythonanywhere.com/api/generate/", requestData);
            const apiResponse = response.data.response;
      
            panel.webview.html = getWebviewContent(apiResponse);
          } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to fetch API data: ${error.message}`);
          }
        }
      });
      

      const response = await axios.post("https://utsav911911.pythonanywhere.com/api/generate/", requestData);
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
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
          
          body {
            font-family: 'Montserrat', sans-serif;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            color: #ffffff;
            background: linear-gradient(to bottom, black, #1e1e1e);
          }
          .loader {
            position: relative;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(45deg, transparent, transparent 40%, #e5f403);
            animation: glow 2s linear infinite;
          }
          @keyframes glow {
            0% {
              transform: rotate(0deg);
              filter: hue-rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
              filter: hue-rotate(360deg);
            }
          }
          .loader::before {
            content: "";
            position: absolute;
            top: 3px;
            left: 3px;
            right: 3px;
            bottom: 3px;
            background: #212121;
            border-radius: 50%;
            z-index: 1000;
          }
          .loader::after {
            content: "";
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            background: linear-gradient(45deg, transparent, transparent 40%, #e5f403);
            border-radius: 50%;
            filter: blur(30px);
          }
        </style>
      </head>
      <body>
        <div class="loader"></div>
      </body>
    </html>
  `;
}


function getWebviewContent(response: string): string {
  const formattedResponse = response
  
    return `
        <html>
          <head>
            <style>
              body {
      font-family: Montserrat, sans-serif;
      padding: 15px;
      background: linear-gradient(to bottom, black, #1e1e1e);
      color: #ffffff;
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }

    pre {
      background: linear-gradient(to bottom, black, #1e1e1e);
      color: #d4d4d4;
      padding: 12px;
      border-radius: 5px;
      overflow-y: auto;
      overflow-x: auto;
      height: 80vh;
      width: 95%;
      white-space: pre;
      word-wrap: normal;
    }

    h2 {
      color: white;
    }

    /* Button styling */
    button {
      padding: 6px 12px; /* Smaller and slimmer */
      text-transform: uppercase;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      color: #ffffff80;
      background: transparent;
      cursor: pointer;
      border: 1px solid #ffffff80;
      background: linear-gradient(to bottom, black, #1e1e1e);
      transition: 0.5s ease;
      user-select: none;
      margin-bottom: 0; /* Removed extra spacing */\
      position: sticky; bottom: 0;
    }

    button:hover, button:focus {
      color: #ffffff;
      background: linear-gradient(to bottom, black, rgb(65, 0, 61));
      border: 1px solid rgb(16, 2, 85);
    }
    
    /* Input field styling */
    input {
     /* Makes input wider */
      flex:1;
      
      width:100%;
      padding: 10px;
      font-size: 16px;
      border-radius: 6px;
      border: 1px solid rgb(64, 63, 63);
      background: linear-gradient(to bottom, black, #1e1e1e);
      color: #ffffff;
      outline: none;
      transition: 0.3s ease;
      position: sticky; bottom: 0;
      
    }

    input::placeholder {
      color: rgba(198, 198, 198, 0.5);
    }

    input:focus {
      border-color: rgb(5, 2, 71);
      box-shadow: 0 0 5px rgb(43, 0, 41);
    }

    /* Align form and button horizontally */
    .input-container {
      display: flex;
      
      align-items: center;
      gap: 10px; 
    }

    .input-container form {
      flex: 1; 
      width: 80vw;
    }

        </style>
      </head>
      <body>
        
        <h2>CodeGeass Response</h2>
        <pre id="response-content">${formattedResponse}</pre>
        <div style="
    display: flex; 
    align-items: center; 
    gap: 10px; 
    position: fixed; 
    bottom: 0; 
    left: 50%; 
    transform: translateX(-50%);
    width: 95vw; 
    max-width: 1200px; /* Optional: Limits the max width on larger screens */
    padding: 10px;
    background: rgba(0, 0, 0, 1); 
    border-radius: 10px; /* Optional: Rounded corners */
    justify-content: center; /* Ensures content is centered inside */
">
          <button onclick="copyToClipboard()">📋 Copy</button>
          <form id="input-form" style="
    width: 80vw; 
    max-width: 500px; 
    margin: 0 auto; 
    display: flex;
">
    <input type="text" id="user-input" placeholder="Ask any question?" required style="
        flex: 1; 
        padding: 10px; 
        font-size: 16px; 
        border: 1px solid #ccc; 
        border-radius: 5px;
        width: 90%;
    ">
</form>

        </div>
        <script>
          const vscode = acquireVsCodeApi();

          function copyToClipboard() {
            const text = document.getElementById("response-content").innerText;
            navigator.clipboard.writeText(text);
            alert("Copied to clipboard!");
          }

          document.getElementById("input-form").addEventListener("submit", function(event) {
          event.preventDefault(); 

          const userInput = document.getElementById("user-input").value;
          const responseElement = document.getElementById("response-content");

          if (!responseElement) {
            alert("No content found to send!");
            return;
          }

          const responseContent = responseElement.innerText.trim();

          vscode.postMessage({ 
            command: "callAPI", 
            prompt: userInput, 
            text: responseContent 
          });
        });
        </script>
      </body>
    </html>
  `;

}



export function deactivate() {}