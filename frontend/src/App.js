import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import CodeEditor from "./components/CodeEditor";
import LoginPage from "./components/LoginPage";
import "./App.css";
import SignUpPage from "./components/SignUpPage";
import CodeAnalyzer from "./components/CodeAnalyzer";
import Header from "./components/Header";

function App() {
  const [language, setLanguage] = useState("javascript");
  const location = useLocation();
  const [code, setCode] = useState("");


  return (
    <>
      {location.pathname === "/" && <Header setLanguage={setLanguage} />}
      <Routes>
        <Route
          path="/"
          element={
            <div className="main-container">
              <div className="editor-container">
                <CodeEditor language={language} code={code} setCode={setCode}/>
              </div>
              <div className="analyzer-container">
                <CodeAnalyzer code={code} />
              </div>
              
            </div>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
