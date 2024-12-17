"use client";
import { useState } from "react";
import { FaApple, FaSpotify } from "react-icons/fa";
import { SiYoutubemusic } from "react-icons/si";
import { useMusic } from "@/app/context/MusicContext";

export default function ChartSelector() {
  const { selectedChart, setSelectedChart } = useMusic();
  return (
    <nav className="flex items-center mb-[.2rem] shadow-sm gap-[.2rem] px-[.5rem] h-[2.3rem] justify-center bg-lightButton dark:bg-darkButton rounded-full">
      <button
        onClick={() => setSelectedChart("YouTube Music")}
        className={`flex items-center gap-[.5rem] px-[.6rem] py-[.35rem]  rounded-full cursor-pointer text-[.75rem] transition-all duration-300 ease-in-out transform ${
          selectedChart === "YouTube Music"
            ? "bg-lightBackground/0 text-lightText dark:bg-darkBackground/60 dark:text-darkText "
            : "bg-transparent text-lightText dark:text-darkText "
        }`}
      >
        <SiYoutubemusic className="text-red-600 text-[1rem] rounded-full" />
        YouTube Music
      </button>
      <button
        onClick={() => setSelectedChart("Apple Music")}
        className={`flex items-center gap-[.5rem] px-[.6rem] py-[.35rem]  rounded-full cursor-pointer text-[.75rem] transition-all duration-300 ease-in-out transform ${
          selectedChart === "Apple Music"
            ? "bg-lightBackground/60 text-lightText dark:bg-darkBackground/60 dark:text-darkText "
            : "bg-transparent text-lightText dark:text-darkText "
        }`}
      >
        <FaApple className="text-[.9rem] -translate-y-[.05rem] dark:text-darkText text-lightText" />
        Apple Music
      </button>
      <button
        onClick={() => setSelectedChart("Spotify")}
        className={`flex items-center gap-[.5rem] px-[.6rem] py-[.35rem]  rounded-full cursor-pointer text-[.75rem] transition-all duration-300 ease-in-out transform ${
          selectedChart === "Spotify"
            ? "bg-lightBackground/60 text-lightText dark:bg-darkBackground/60 dark:text-darkText "
            : "bg-transparent text-lightText dark:text-darkText "
        }`}
      >
        <FaSpotify className="text-green-500 text-[1rem]" />
        Spotify
      </button>
    </nav>
  );
}
