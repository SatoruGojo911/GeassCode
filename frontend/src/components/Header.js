import React from "react";
import AnimatedButton from "./AnimatedButton";

const Header = ({ setLanguage }) => {
  return (
    <header style={styles.header}>
      
      <div style={styles.leftContainer}>
        <h1 style={styles.title}>CodeGeass</h1>
        <select
          onChange={(e) => setLanguage(e.target.value)}
          style={styles.dropdown}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
        </select>
      </div>

      
      <div style={styles.rightContainer}>
        <AnimatedButton />
      </div>
    </header>
  );
};

// Styling
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between", 
    
    borderRadius: "10px",
    margin:"10px",
    background: "#1e1e1e",
    color: "white",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 1)",
    width: "99%",
  },
  leftContainer: {
    display: "flex",
    alignItems: "center",
    gap: "15px", 
  },
  title: {
    margin: "10px",
    fontSize: "20px",
    
  },
  dropdown: {
    padding: "6px 10px",
    borderRadius: "4px",
    border: "none",
    fontSize: "14px",
    background: "#333",
    color: "white",
    cursor: "pointer",
  },
  rightContainer: {
    display: "flex",
    alignItems: "center",
    margin:"20px",
  },
};

export default Header;
