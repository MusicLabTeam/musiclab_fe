import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useLanguage } from "@/app/context/LanguageContext";

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage(); // Get language and setLanguage from context

  const languages = [
    { code: "En", label: "English" },
    { code: "Ko", label: "한국어" },
    { code: "Ja", label: "日本語" },
  ];

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleLanguageChange = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <div className="relative w-max">
      <div
        onClick={toggleDropdown}
        className="flex items-center justify-end button w-[5.5rem] h-[2.3rem] px-4 py-2 rounded-full cursor-pointer shadow-sm transition-all"
      >
        <span className="font-medium text-[.75rem] ml-auto">
          {currentLanguage?.label}
        </span>
        <RiArrowDropDownLine
          className={`text-[1.5rem] translate-x-[.3rem] transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-[2.8rem] left-0 rounded-lg w-40 ">
          <ul className="flex flex-col space-y-[.4rem] justify-center">
            {languages
              .filter((lang) => lang.code !== language)
              .map((lang) => (
                <li
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className="flex shadow-sm items-center gap-2 text-center justify-center w-[5.5rem] font-medium text-[.75rem] h-[2.3rem] px-4 py-2 rounded-full button cursor-pointer  transition-all"
                >
                  {lang.label}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
