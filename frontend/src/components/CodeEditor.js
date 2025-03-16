import React,{ useState} from "react";
import Editor from "@monaco-editor/react";
import "../App.css";

const CodeEditor = ({ language, code, setCode }) => {
  const boilerplate = () => {
    const templates = {
      "cpp": `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}`,
      "java": `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
      "javascript": `// Enter your code here\nconsole.log("Hello, World!");`,
      "python": `# Enter your code here\nprint("Hello, World!")`,
      "c": `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
    };

    setCode(templates[language] || "// Unsupported language");
  };

  boilerplate();
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
