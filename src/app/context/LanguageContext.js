"use client";
import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

// LanguageProvider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("En");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
