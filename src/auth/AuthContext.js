import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // on mount, restore session from storage
  useEffect(() => {
    const token = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
    const email = sessionStorage.getItem("authEmail") || localStorage.getItem("authEmail");
    if (token && email) {
      setUser({ email, token });
    }
  }, []);

  const login = ({ email, token, remember }) => {
    setUser({ email, token });
    if (remember) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("authEmail", email);
    } else {
      sessionStorage.setItem("authToken", token);
      sessionStorage.setItem("authEmail", email);
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("authEmail");
    localStorage.removeItem("authToken");
    localStorage.removeItem("authEmail");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);