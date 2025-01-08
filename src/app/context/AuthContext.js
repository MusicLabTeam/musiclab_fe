"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setIsAuthenticated(true);
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  const login = (user) => {
    setIsAuthenticated(true);
    setProfile(user);
    localStorage.setItem("profile", JSON.stringify(user));
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
