"use client";
import Chart from "./HeaderComponents/MusicSelector";
import LanguageSelector from "./HeaderComponents/LanguageSelector";
import LoginModal from "./Login";
import { useContext, useEffect, useState } from "react";
import { MdAccountCircle, MdDarkMode, MdWbSunny } from "react-icons/md";
import { ThemeContext } from "../layout";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const handleReload = () => {
    window.location.reload();
  };

  useEffect(() => {
    const storedProfileImage = localStorage.getItem("profile_image");
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[90] flex shadow-sm shadow-lightButton dark:shadow-darkButton justify-between items-center px-[1rem] bg-lightBackground dark:bg-darkBackground h-[6rem]">
        <div className="absolute inset-x-0 bottom-0 h-[2rem] bg-gradient-to-b from-transparent to-lightBackground dark:to-darkBackground"></div>

        {/* 로고 */}
        {theme === "dark" ? (
          <img
            onClick={handleReload}
            className="ml-[1rem] h-[2rem] cursor-pointer"
            src="dark_logo.png"
            alt="MusicLab"
          />
        ) : (
          <img
            onClick={handleReload}
            className="ml-[1rem] h-[2rem] cursor-pointer"
            src="light_logo.png"
            alt="MusicLab"
          />
        )}

        <div className="flex space-x-[.5rem] items-start">
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
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="h-[2.3rem] w-[2.3rem] rounded-full shadow-sm object-cover cursor-pointer"
            />
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

      {/* 로그인 */}
      {isLoginModalOpen && (
        <LoginModal
          onClose={closeLoginModal}
          onLoginSuccess={setProfileImage}
        />
      )}
    </>
  );
}
