import React,{ useState} from "react";
import Editor from "@monaco-editor/react";
import "../App.css";

const CodeEditor = ({ language, code, setCode }) => {
  return (
    <div className="editor-wrapper">
      <Editor
        height="100%"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={(newValue) => setCode(newValue)}
        options={{
          fontSize: 15,
          minimap: { enabled: false },
          fontFamily: "Consolas, 'Courier New', monospace",
        }}
      />
    </div>
  );
};

export default CodeEditor;
