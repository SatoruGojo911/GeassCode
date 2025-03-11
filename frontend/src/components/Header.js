import React from "react";

const Header = ({ setLanguage }) => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Code:Geass</h1>
      <select
        onChange={(e) => setLanguage(e.target.value)}
        style={styles.dropdown}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="c">C</option>
        <option value="cpp">C++</option>
      </select>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#1e1e1e",
    color: "white",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
  },
  dropdown: {
    padding: "8px",
    borderRadius: "5px",
    border: "none",
    fontSize: "16px",
    background: "#333",
    color: "white",
    cursor: "pointer",
  },
};

export default Header;
