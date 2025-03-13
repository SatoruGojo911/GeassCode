import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../css/Notification.css";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );

    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens"))
            : null
    );

    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 4000);
    };

    const loginUser = async (email, password) => {
        const response = await fetch("http://localhost:8000/api/token/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            navigate("/");
            showNotification("Login Successful");
        } else {
            showNotification("Invalid Credentials");
        }
    };

    const registerUser = async (email, username, password, password2) => {
        try {
            const response = await fetch("http://localhost:8000/api/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, username, password, password2 }),
            });

            const data = await response.json();

            if (response.status === 201) {
                navigate("/login");
                showNotification("Registration Successful! Login Now");
            } else {
                let errorMessage = "Something went wrong. Please try again.";

                if (data.email) {
                    errorMessage = "User with this email already exists.";
                } else if (data.password) {
                    errorMessage = data.password.join(" ");
                }

                showNotification(errorMessage);
            }
        } catch {
            showNotification("Server error. Please try again later.");
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/");
        showNotification("You have been logged out.");
    };

    const llmCall = async (prompt, code) => {
        try {
            const response = await fetch("http://localhost:8000/api/generate/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt, code }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            return data;  // Return the response data
        } catch (error) {
            console.error("Error in llmCall:", error);
            return null;  // Handle errors gracefully
        }
    };
    

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={{ user, setUser, authTokens, setAuthTokens, registerUser, loginUser, logoutUser, llmCall }}>
            {loading ? null : children}
            {notification && (
                <div className="terminal-loader">
                    <div className="terminal-header">
                        <span className="terminal-title">Notification</span>
                        <div className="terminal-controls">
                            <span className="control close"></span>
                            <span className="control minimize"></span>
                            <span className="control maximize"></span>
                        </div>
                    </div>
                    <p className="text" style={{ width: `${notification.length}ch` }}>{notification}</p>
                </div>
            )}
        </AuthContext.Provider>
    );
};
