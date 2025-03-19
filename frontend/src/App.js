import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import CodeEditor from "./components/CodeEditor";
import LoginPage from "./components/LoginPage";
import "./App.css";
import SignUpPage from "./components/SignUpPage";
import CodeAnalyzer from "./components/CodeAnalyzer";
import Header from "./components/Header";
import RunCode from "./components/RunCode";

function App() {
  const [language, setLanguage] = useState("javascript");
  const location = useLocation();
  const [code, setCode] = useState("");
  const [showEditor, setShowEditor] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {location.pathname === "/" && <Header language={language} setLanguage={setLanguage} />}
      <Routes>
        <Route
          path="/"
          element={
            <div className="main-container">
              {isMobile && (
                <button className="toggle-btn" onClick={() => setShowEditor(!showEditor)}>
                  {showEditor ? "Show Analyzer" : "Show Editor"}
                </button>
              )}

              {/* Desktop Layout (Both sections visible) */}
              {!isMobile ? (
                <>
                  <div className="editor-container">
                    <CodeEditor language={language} code={code} setCode={setCode} />
                  </div>
                  <div className="analyzer-container">
                    <CodeAnalyzer code={code} />
                    <RunCode code={code} language={language} />
                  </div>
                </>
              ) : (
                /* Mobile Layout (Toggle between editor & analyzer) */
                showEditor ? (
                  <div className="editor-container">
                    <CodeEditor language={language} code={code} setCode={setCode} />
                  </div>
                ) : (
                  <div className="analyzer-container">
                    <CodeAnalyzer code={code} />
                    <RunCode code={code} language={language} />
                  </div>
                )
              )}
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
