import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import "../css/RunCode.css";

const RunCode = ({ code, language }) => {
  const { executeCode } = useContext(AuthContext);
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setResponseText("");

    const languageMap = {
      "cpp": 52,
      "python": 71,
      "c": 50,
      "java": 62,
      "javascript": 63,
    };

    const selectedLanguageId = languageMap[language.toLowerCase()] || null;

    if (!selectedLanguageId) {
      setResponseText("Unsupported language.");
      setLoading(false);
      return;
    }

    setTimeout(async () => {
      try {
        const response = await executeCode(selectedLanguageId, code);
        const fullText = response.stderr || response.compileError || response.stdout || JSON.stringify(response);
        setResponseText(fullText);
      } catch (error) {
        console.error("Error calling LLM:", error);
        setResponseText("An error occurred while running the code.");
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  return (
    <div className="card run-code-container">
      <div className="response-container">
        {loading ? (
          <div className="spinner">
            <div className="spinnerin"></div>
          </div>
        ) : responseText ? (
          <div className="styled-response">
            {responseText.split("\n").map((line, index) => (
              <p key={index} className={line.startsWith("**") ? "bold-text" : ""}>
                {line}
              </p>
            ))}
          </div>
        ) : (
          "Your Output will be displayed here"
        )}
      </div>
      <button className="use-geass-button" onClick={handleClick} disabled={loading}>
        {loading ? "Loading..." : "Run Code"}
      </button>
    </div>
  );
};

export default RunCode;
