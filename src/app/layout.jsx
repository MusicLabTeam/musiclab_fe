"use client";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { MusicProvider } from "./context/MusicContext";

export const ThemeContext = createContext();
export default function RootLayout({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark" // 기본값 dark
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <LanguageProvider>
            <MusicProvider>
              <html lang="en" className={theme}>
                <body className="flex flex-col min-h-screen bg-lightBackground text-lightText dark:bg-darkBackground dark:text-darkText">
                  <Header />
                  <main className="flex flex-1 pt-[6rem] pl-[16rem] pb-[3rem]">
                    <Sidebar />
                    <div className="flex-1 px-[2.5rem] overflow-y-auto">
                      {children}
                    </div>
                  </main>
                  <footer className="fixed bottom-0 left-0 w-full h-[3rem] items-end bg-gradient-to-t from-white to-transparent pb-[0.3rem] dark:from-darkBackground dark:to-transparent shadow-md flex justify-center font-light text-[0.8rem] text-lightText dark:text-darkText gap-2 z-30">
                    <span>© 2024 MusicLab. All Rights Reserved.</span>
                    <a
                      href="https://github.com/cxaosdev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-[0.2rem] text-lightText dark:text-darkText hover:underline"
                    >
                      <FaGithub />
                      cxaosdev
                    </a>
                    <a
                      href="https://github.com/Cirque-Du-Trash"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-[0.2rem] text-lightText dark:text-darkText hover:underline"
                    >
                      <FaGithub />
                      Cirque-Du-Trash
                    </a>
                  </footer>
                  <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                    toastOptions={{
                      duration: 1000,
                      success: {
                        style: {
                          marginBottom: "1rem",
                          background:
                            "linear-gradient(to right, rgba(57, 148, 255, 0.8), rgba(119, 171, 253, 0.8))",
                          color: "white",
                          borderRadius: "1rem",
                          padding: ".5rem",
                          paddingLeft: "1rem",
                          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                        },
                        icon: "✔️",
                      },
                      error: {
                        style: {
                          marginBottom: "1rem",
                          background:
                            "linear-gradient(to right, rgba(229, 57, 53, 0.8), rgba(239, 83, 80, 0.8))",
                          color: "white",
                          borderRadius: "1rem",
                          padding: ".5rem",
                          paddingLeft: "1rem",
                          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                        },
                        icon: "❌",
                      },
                    }}
                  />
                </body>
              </html>
            </MusicProvider>
          </LanguageProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </ThemeContext.Provider>
  );
}
