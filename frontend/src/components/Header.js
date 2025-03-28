import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../css/Header.css";
import geass from "../assets/image.png";

const Header = ({ language, setLanguage }) => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="left-container">
        <img src={geass} alt = "logo" className="logo" />
        
        <select className="dropdown" onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
        </select>
      </div>

      <div className="right-container">
        {user ? (
          <>
            <span className="username">{user.username}</span>
            <button className="button logout-btn" onClick={logoutUser}>
              Logout
            </button>
          </>
        ) : (
          <button className="button login-btn" onClick={() => navigate("/login")}>
            Login / Sign Up
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
