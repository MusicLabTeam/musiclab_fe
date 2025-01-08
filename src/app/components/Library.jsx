"use client";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Library() {
  const router = useRouter();
  const { language } = useLanguage();

  const translations = {
    En: "Playlist",
    Ko: "플레이 리스트",
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
      className="h-[2.3rem] px-[1rem] w-[13rem] ml-[.5rem] flex items-center rounded-[0.5rem] button"
    >
      <div className="flex items-center text-[1rem] space-x-[.7rem] ">
        <MdOutlinePlaylistPlay className="text-[1rem]" />
        <p className="text-[.8rem]">{buttonText}</p>
      </div>
    </div>
  );
}
