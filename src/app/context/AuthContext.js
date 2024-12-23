"use client";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);

  const login = (user) => {
    setIsAuthenticated(true);
    setProfile(user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setProfile(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, profile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
