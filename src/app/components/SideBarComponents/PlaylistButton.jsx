"use client";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { PiPlaylistBold } from "react-icons/pi";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Playlist() {
  const router = useRouter();
  const { language } = useLanguage();

  const translations = {
    En: "Playlist",
    Ko: "내 플레이리스트",
    Ja: "プレイリスト",
  };

  const buttonText = translations[language] || translations.En;

  const handleLibraryClick = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error(
        language === "Ko"
          ? "로그인 후 이용해 주세요."
          : language === "Ja"
          ? "ログインしてからご利用ください。"
          : "Please log in to access."
      );

      return;
    }
    router.push("/list");
  };

  return (
    <div
      onClick={handleLibraryClick}
      className="h-[2.3rem] mt-3 px-[1rem] w-[13rem] flex items-center rounded-[0.5rem] hover:bg-darkButton"
    >
      <div className="flex items-center text-[1rem] space-x-[.7rem] ">
        <PiPlaylistBold className="text-[1.2rem]" />
        <p className="text-[.9rem]">{buttonText}</p>
      </div>
    </div>
  );
}
