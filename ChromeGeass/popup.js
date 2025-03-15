function getLeetCodeCode() {
    const editor = document.querySelector(".view-lines"); // Monaco Editor container
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

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in llmCall:", error);
        return null;
    }
};
document.addEventListener("DOMContentLoaded", async () => {
    const button = document.getElementById("clickButton");
    const message = document.getElementById("message");

    if (!button || !message) {
        console.error("Button or message element not found.");
        return;
    }

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: getLeetCodeCode,
        },
        (results) => {
            if (results && results[0].result) {
                const extractedCode = results[0].result;

                button.addEventListener("click", async () => {
                    button.disabled = true;
                    button.classList.add("use-geass-button-disabled");

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

                        message.innerHTML = "";

                        const responseCard = document.createElement("div");
                        responseCard.classList.add("card");
                        responseCard.innerHTML = response.response.replace(/\n/g, "<br>");
                        message.appendChild(responseCard);
                    } catch (error) {
                        console.error("Error calling API:", error);
                        message.innerHTML = "<p style='color:red'>Failed to analyze code.</p>";
                    } finally {
                        button.disabled = false;
                        button.classList.remove("use-geass-button-disabled");
                    }
                });
            } else {
                message.innerHTML = "<p style='color:red'>No code found on this page.</p>";
            }
        }
    );
});


