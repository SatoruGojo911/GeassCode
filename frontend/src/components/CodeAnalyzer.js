import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import "../css/CodeAnalyzer.css";

const CodeAnalyzer = ({ code }) => {
  const { llmCall } = useContext(AuthContext);
  const [responseText, setResponseText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setResponseText("");
    setDisplayText("");

    setTimeout(async () => {
      try {
        const response = await llmCall("Analyze the following code, give me steps to improve it do not give me any code to directly replace, do not make any item bold", code);
        const fullText = response.response || JSON.stringify(response);
        setResponseText(fullText);
      } catch (error) {
        console.error("Error calling LLM:", error);
        setResponseText("An error occurred while analyzing the code.");
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  useEffect(() => {
    if (responseText) {
      setDisplayText(""); 
      let index = 0;
      const interval = setInterval(() => {
        setDisplayText((prev) => prev + responseText[index]);
        index++;
        if (index === responseText.length) clearInterval(interval);
      }, 10); 
      return () => clearInterval(interval);
    }
  }, [responseText]);

  return (
    <div className="card">
      <div className="response-container">
        {loading ? (
          <div className="spinner">
            <div className="spinnerin"></div>
          </div>
        ) : displayText ? (
          <div className="styled-response">
            {displayText.split("\n").map((line, index) => (
              <p key={index} className={line.startsWith("**") ? "bold-text" : ""}>
                {line}
              </p>
            ))}
          </div>
        ) : (
          "Response should appear here"
        )}
      </div>
      <button className="use-geass-button" onClick={handleClick} disabled={loading}>
        {loading ? "Loading..." : "Use Geass"}
      </button>
    </div>
  );
};

export default CodeAnalyzer;
