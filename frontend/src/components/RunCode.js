import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import "../css/RunCode.css";

const RunCode = ({ code }) => {
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
        const response = await llmCall("what is the output of the code, do not write the code again", code);
        const fullText = response.response || JSON.stringify(response);
        setResponseText(fullText);
      } catch (error) {
        console.error("Error calling LLM:", error);
        setResponseText("An error occurred while running the code.");
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
    <div className="card run-code-container">
      <div className="response-container">
        {loading ? (
          <div className="spinner">
            <div className="spinnerin"></div>
          </div>
        ) : displayText ? (
          <div className="styled-response">
            {displayText.slice(0, -9).split("\n").map((line, index) => (
              <p key={index} className={line.startsWith("**") ? "bold-text" : ""}>
                {line}
              </p>
            ))}
          </div>
        ) : (
          "Your Output will be displayed here "
        )}
      </div>
      <button className="use-geass-button" onClick={handleClick} disabled={loading}>
        {loading ? "Loading..." : "Run Code"}
      </button>
    </div>
  );
};

export default RunCode;
