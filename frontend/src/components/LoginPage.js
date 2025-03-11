import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css"; 
import AuthContext from '../context/AuthContext'

const LoginPage = () => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {loginUser} = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    email.length > 0 && loginUser(email, password)
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
