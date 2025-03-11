import React, { useState, useContext } from "react";
import "../css/SignUpPage.css";
import AuthContext from '../context/AuthContext' 
import Swal from 'sweetalert2';

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { registerUser } = useContext(AuthContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      Swal.fire({
        title: 'Error!',
        text: 'Passwords do not match',
        icon: 'error',
      });
    } else {
      registerUser(email, username, password, password2);
    }
  };

  return (
    <div className="login-container">
      <form className="form" onSubmit={handleSignIn}>
        <div className="title" style={{ textAlign: "center" }}>
          Sign Up<br />
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
          name="username"
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

        <input
          className="input"
          name="password2"
          placeholder="Confirm Password"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />

        <div className="button-container">
          <button className="button-confirm" type="submit">CONFIRM</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
