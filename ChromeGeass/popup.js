function getLeetCodeCode() {
    const editor = document.querySelector(".view-lines");
    if (!editor) return "No code found!";

    let code = "";
    editor.querySelectorAll(".mtk1").forEach((line) => {
        code += line.innerText + "\n";
    });

    return code.trim();
}

const llmCall = async (prompt, code) => {
    try {
        const response = await fetch("https://utsav911911.pythonanywhere.com/api/generate/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt, code }),
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        return (await response.json()).response;
    } catch (error) {
        console.error("Error in llmCall:", error);
        return "Failed to get a response.";
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    const button = document.getElementById("clickButton");
    const messageContainer = document.getElementById("message-container");
    const message = document.getElementById("message");

    // Make response container scrollable and centered
    messageContainer.style.maxHeight = "300px";
    messageContainer.style.overflowY = "auto";
    messageContainer.style.padding = "10px";
    messageContainer.style.border = "1px solid #404c5d";
    messageContainer.style.borderRadius = "5px";
    messageContainer.style.background = "#1e1e1e";
    messageContainer.style.color = "white";
    messageContainer.style.textAlign = "left";
    messageContainer.style.width = "80%";
    messageContainer.style.margin = "10px auto";

    const chatContainer = document.createElement("div");
    chatContainer.id = "chat-container";
    chatContainer.style.display = "none";
    chatContainer.style.width = "100%";
    chatContainer.style.marginTop = "15px";
    chatContainer.style.textAlign = "center";

    const chatInputContainer = document.createElement("div");
    chatInputContainer.style.display = "flex";
    chatInputContainer.style.flexDirection = "column";
    chatInputContainer.style.alignItems = "center";
    chatInputContainer.style.width = "100%";

    const chatInput = document.createElement("input");
    chatInput.id = "chat-input";
    chatInput.type = "text";
    chatInput.placeholder = "Ask something...";
    chatInput.classList.add("chat-input");
    chatInput.style.width = "80%";
    chatInput.style.padding = "8px";
    chatInput.style.borderRadius = "5px";
    chatInput.style.border = "1px solid #404c5d";
    chatInput.style.background = "#1e1e1e";
    chatInput.style.color = "white";
    chatInput.style.textAlign = "center";
    chatInput.style.marginTop = "10px";

    const sendButton = document.createElement("button");
    sendButton.id = "sendButton";
    sendButton.innerText = "Send";
    sendButton.classList.add("use-geass-button");
    sendButton.style.width = "120px";
    sendButton.style.marginTop = "10px";

    chatInputContainer.appendChild(chatInput);
    chatInputContainer.appendChild(sendButton);
    chatContainer.appendChild(chatInputContainer);
    document.body.appendChild(chatContainer);

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
        { target: { tabId: tab.id }, function: getLeetCodeCode },
        (results) => {
            if (results && results[0].result) {
                const extractedCode = results[0].result;

                button.addEventListener("click", async () => {
                    button.style.display = "none";
                    chatContainer.style.display = "flex";
                    chatContainer.style.justifyContent = "center";

                    message.innerHTML = "";

                    const spinner = document.createElement("div");
                    spinner.classList.add("spinner");
                    const spinnerInner = document.createElement("div");
                    spinnerInner.classList.add("spinnerin");
                    spinner.appendChild(spinnerInner);
                    message.appendChild(spinner);

                    try {
                        const response = await llmCall(
                            "Analyze the following code, give me steps to improve it. Do not give me any code to directly replace, do not make any item bold, keep it under 100 words.",
                            extractedCode
                        );

                        message.innerHTML = response.replace(/\n/g, "<br>");
                    } catch (error) {
                        message.innerHTML = "<p style='color:red'>Failed to analyze code.</p>";
                    }
                });

                sendButton.addEventListener("click", async () => {
                    let userMessage = chatInput.value.trim();
                    if (!userMessage) return;

                    userMessage += " give code if required keep the text under 100 words";
                    chatInput.value = "";

                    messageContainer.innerHTML = ""; // Clear previous AI response

                    try {
                        const chatResponse = await llmCall(userMessage, extractedCode);

                        const botMsgElem = document.createElement("p");
                        botMsgElem.innerHTML = `<strong>AI:</strong> ${chatResponse.replace(/\n/g, "<br>")}`;
                        botMsgElem.style.marginTop = "5px";
                        messageContainer.appendChild(botMsgElem);

                        // Auto-scroll to the latest message
                        messageContainer.scrollTop = messageContainer.scrollHeight;
                    } catch (error) {
                        messageContainer.innerHTML = `<p style='color:red'><strong>AI:</strong> Failed to respond.</p>`;
                    }
                });
            } else {
                message.innerHTML = "<p style='color:red'>No code found on this page.</p>";
            }
        }
    );
});
