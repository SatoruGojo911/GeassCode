import React, { useState } from "react";
import { Routes, Route , useLocation} from "react-router-dom";
import CodeEditor from "./components/CodeEditor";
import LoginPage from "./components/LoginPage";
import "./App.css"
import SignUpPage from "./components/SignUpPage";
import Header from "./components/Header";
function App() {
  const [language, setLanguage] = useState("javascript");
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" && <Header setLanguage={setLanguage} />}
        <Routes>
          <Route path="/" element={<CodeEditor language={language} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path = "/signup" element = {<SignUpPage/>}/>
        </Routes>
    </>
  );
}

export default App;
