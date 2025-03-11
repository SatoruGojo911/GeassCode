import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <form className="form" onSubmit={handleLogin}>
        <div className="title" style={{  textAlign: "center" }} >
          Login<br />
        </div>
        <input
          className="input"
          name="email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="button-container">
  <button className="button-confirm" type="submit">CONFIRM</button>
  <button className="button-confirm" type="button" onClick={() => navigate("/signup")}>SIGN UP</button>
</div>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
