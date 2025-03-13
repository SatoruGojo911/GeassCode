import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import "../css/CodeAnalyzer.css";

const CodeAnalyzer = ({ code }) => {
  const { llmCall } = useContext(AuthContext);
  const [responseText, setResponseText] = useState("");

  const handleClick = async () => {
    if (!code.trim()) {
      setResponseText("Please enter some code to analyze.");
      return;
    }

    try {
      const response = await llmCall(
        `Analyze the following code snippet and provide a structured, step-by-step approach to improving it. Identify any security vulnerabilities, performance inefficiencies, or coding best practices that should be followed. Instead of providing direct code solutions, outline the necessary changes and explain why they are needed. Your response should be organized into sections: Security Concerns, Performance Improvements, Best Practices, and Refactoring Suggestions. Each section should contain clear, actionable steps that a developer can follow to enhance the code while maintaining readability and maintainability.\n\nCode:\n${code}`,
        ""
      );
      setResponseText(response.response || JSON.stringify(response));
    } catch (error) {
      console.error("Error calling LLM:", error);
      setResponseText("An error occurred while analyzing the code.");
    }
  };
  
  return (
    <div className="card">
      <button className="use-geass-button" onClick={handleClick}>Use Geass</button>
      <div className="card-info" style={{ textAlign: "left" }}>
        <p>{responseText || "Response should appear here"}</p>
      </div>
    </div>
  );
};

export default CodeAnalyzer;
