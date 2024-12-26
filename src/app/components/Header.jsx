"use client";
import Chart from "./HeaderComponents/MusicSelector";
import LanguageSelector from "./HeaderComponents/LanguageSelector";
import LoginModal from "./Login";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { MdAccountCircle, MdDarkMode, MdWbSunny } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../layout";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, profile, login, logout } = useAuth();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[90] flex shadow-sm shadow-lightButton dark:shadow-darkButton justify-between items-center px-[1rem] bg-lightBackground dark:bg-darkBackground h-[6rem]">
        <div className="absolute inset-x-0 bottom-0 h-[2rem] bg-gradient-to-b from-transparent to-lightBackground dark:to-darkBackground"></div>

        {/* 로고 */}
        {theme === "dark" ? (
          <img
            onClick={() => {
              window.location.href = "/";
            }}
            className="ml-[1rem] h-[2rem] cursor-pointer"
            src="dark_logo.png"
            alt="MusicLab"
          />
        ) : (
          <img
            onClick={() => {
              window.location.href = "/";
            }}
            className="ml-[1rem] h-[2rem] cursor-pointer"
            src="light_logo.png"
            alt="MusicLab"
          />
        )}

        <div className="flex space-x-[.5rem] items-start relative">
          <Chart />
          <LanguageSelector />

          {/* 테마 토글 */}
          <button
            onClick={toggleTheme}
            className="flex shadow-sm items-center justify-center h-[2.3rem] w-[2.3rem] button rounded-full cursor-pointer"
          >
            {theme === "light" ? (
              <MdWbSunny className="text-[1.3rem]" />
            ) : (
              <MdDarkMode className="text-[1.3rem]" />
            )}
          </button>

          {/* 프로필 */}
          {isAuthenticated && profile ? (
            <div className="relative">
              <img
                src={profile.profileImage}
                alt="Profile"
                className="h-[2.3rem] w-[2.3rem] rounded-full shadow-sm object-cover cursor-pointer"
                onClick={() => setDropdownOpen((prev) => !prev)}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 top-[2.8rem] space-y-[.4rem] bg-transparent rounded-md">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      router.push("/profile");
                    }}
                    className="flex shadow-sm items-center gap-2 text-center justify-center w-[5.5rem] font-medium text-[.75rem] h-[2.3rem] px-4 py-2 rounded-full button cursor-pointer"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      router.push("/");
                    }}
                    className="flex shadow-sm items-center gap-2 text-center justify-center w-[5.5rem] font-medium text-[.75rem] h-[2.3rem] px-4 py-2 rounded-full button !text-red-500 cursor-pointer"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="flex shadow-sm items-center justify-center h-[2.3rem] w-[2.3rem] button rounded-full cursor-pointer"
            >
              <MdAccountCircle className="text-[1.8rem]" />
            </button>
          )}
        </div>
      </header>

      {isLoginModalOpen && (
        <LoginModal
          onClose={closeLoginModal}
          onLoginSuccess={(user) => {
            login(user);
            setLoginModalOpen(false);
          }}
        />
      )}
    </>
  );
}
