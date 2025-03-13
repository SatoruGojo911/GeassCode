import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Ensure correct path

const root = ReactDOM.createRoot(document.getElementById("root"));
const observerErrorHandler = (error) => {
  if (error.message && error.message.includes("ResizeObserver loop")) {
    console.warn("ResizeObserver loop error suppressed.");
    return;
  }
  throw error; 
};


window.addEventListener("error", (event) => observerErrorHandler(event.error));
window.addEventListener("unhandledrejection", (event) => observerErrorHandler(event.reason));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
