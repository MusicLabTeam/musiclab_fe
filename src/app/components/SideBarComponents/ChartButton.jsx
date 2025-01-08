"use client";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaChartLine } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Chart() {
  const router = useRouter();
  const { language } = useLanguage();

  const translations = {
    En: "Music Charts",
    Ko: "음원 차트",
    Ja: "音楽チャート",
  };

  const buttonText = translations[language] || translations.En;

  const handlePlaylistClick = () => {
    router.push("/");
  };

  return (
    <div
      onClick={handlePlaylistClick}
      className="h-[2.3rem] px-[1rem] w-[13rem] flex items-center rounded-[0.5rem] hover:bg-darkButton"
    >
      <div className="flex items-center space-x-[.7rem] ">
        <FaChartLine className="text-[1.2rem]" />
        <p className="text-[.9rem]">{buttonText}</p>
      </div>
    </div>
  );
}
