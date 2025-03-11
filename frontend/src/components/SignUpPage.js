import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css"; 

const SignUpPage = () => {

    return (
        <div className="login-container">
      <form className="form">
        <div className="title" style={{  textAlign: "center" }} >
          Sign Up<br />
        </div>
        <input
          className="input"
          name="email"
          placeholder="Email"
          type="email"
          //value={email}
          
          required
        />
        <input
          className="input"
          name="password"
          placeholder="Password"
          type="password"
          //value={password}
          
          required
        />
        <input
          className="input"
          name="password"
          placeholder="Confirm Password"
          type="password"
          //value={password}
          
          required
        />
        <div className="button-container">
            <button className="button-confirm" type="submit">CONFIRM</button>
        </div>
        
      </form>
    </div>
    )
}

export default SignUpPage;