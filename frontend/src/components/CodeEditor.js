import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ language }) => {
    const [code, setCode] = useState("")
  return (
    <div>
    
      <div
        style={{
          width: "60%",
          height: "92vh",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          background: "#1e1e1e",
          margin: "10px",
          borderRadius: "10px",
          
        }}
      >
        <Editor
          height="100%"
          theme="vs-dark"
          language={language}
          defaultValue="/* Enter your code here */"
          value={code}
          onChange={(newValue) => setCode(newValue)}
          options={{
            fontSize: 15,
            minimap: { enabled: false },
            fontFamily: "Consolas, 'Courier New', monospace",
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
