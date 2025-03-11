import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AnimatedButton = ({ text = "LOGIN / SIGN UP" }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const buttonStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    fontSize: "16px",
    background: "#333",
    color: "white",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    transition: "color 0.3s ease-in-out, border 0.3s ease-in-out",
  };

  const beforeStyle = {
    content: "''",
    position: "absolute",
    width: "12px",
    height: "12px",
    right: hover ? "12px" : "1px",
    bottom: hover ? "-8px" : "auto",
    top: "1px",
    background: "#8B5CF6",
    borderRadius: "50%",
    filter: "blur(8px)",
    transition: "0.5s ease-in-out",
  };

  const afterStyle = {
    content: "''",
    position: "absolute",
    width: "20px",
    height: "20px",
    right: hover ? "-8px" : "8px",
    top: "3px",
    background: "#F43F5E",
    borderRadius: "50%",
    filter: "blur(10px)",
    transition: "0.5s ease-in-out",
  };

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <span style={beforeStyle}></span>
      <span style={afterStyle}></span>
      {text}
    </button>
  );
};

export default AnimatedButton;