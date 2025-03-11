import React, { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import Header from "./components/Header";
import "./App.css"
function App() {
  const [language, setLanguage] = useState("javascript"); 

  return (
    <div className="App">
      <Header setLanguage={setLanguage} />
      <CodeEditor language={language} />
    </div>
  );
}

export default App;

