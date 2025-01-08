"use client";
import DatePicker from "react-datepicker";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import RegionSelector from "./RegionSelector";
import SearchBar from "./SearchBar";
import toast from "react-hot-toast";
import { FaApple, FaPlay, FaSpotify } from "react-icons/fa";
import { SiYoutubemusic } from "react-icons/si";
import { TbPlaylistAdd } from "react-icons/tb";
import { useLanguage } from "../context/LanguageContext";
import { useMusic } from "../context/MusicContext";
import { fetchChartByType, fetchSearchChart } from "@/api/fetchChart";
import { addFavoriteSong } from "@/api/fetchList";

export default function MusicList() {
  const { language } = useLanguage();
  const { selectedChart, selectedRegion, setNowPlaying } = useMusic();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chartData, setChartData] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      try {
        const data = await fetchChartByType(
          selectedChart,
          selectedRegion,
          formattedDate
        );
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [selectedChart, selectedRegion, selectedDate]);

  const handleSongClick = (song) => {
    setNowPlaying(song);
  };

  const handleFavoriteClick = async (song) => {
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

    try {
      await addFavoriteSong(selectedChart, song.id, language);
    } catch (error) {
      console.error("Error adding song to favorites:", error);
    }
  };

  const handleSearch = useCallback(
    async (query) => {
      if (!query) {
        setSearchResults([]);
        return;
      }

      try {
        const data = await fetchSearchChart(query, selectedRegion);
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    },
    [selectedRegion]
  );

  return (
    <div>
      <div className="flex mb-4 fixed z-50 h-[5rem] w-[calc(100vw-21rem)] pt-[1.3rem] bg-gradient-to-b from-lightBackground dark:from-darkBackground to-transparent">
        <div className="flex w-full justify-between">
          <div className="flex">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="button h-[1.8rem] font-medium text-[.75rem] w-[6rem] mr-[.5rem] rounded-full focus:outline-none text-center"
              dateFormat="yyyy-MM-dd"
              maxDate={new Date()}
            />
            <RegionSelector />
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* 검색 */}
      {Object.keys(searchResults).length > 0 ? (
        <div className="pt-[3.3rem]">
          <h2 className="text-lg font-bold mt-6 ml-[.5rem] flex items-center">
            <SiYoutubemusic className="text-red-600 text-[1rem] rounded-full mr-[.5rem]" />
            YouTube Music - {selectedRegion}
          </h2>
          <ChartTable
            data={searchResults.youtube}
            onSongClick={handleSongClick}
          />
          <h2 className="text-lg font-bold mt-6 ml-[.5rem] flex items-center">
            <FaApple className="text-[1rem] -translate-y-[.05rem] dark:text-darkText mr-[.5rem] text-lightText" />
            Apple Music - {selectedRegion}
          </h2>
          <ChartTable
            data={searchResults.apple_music}
            onSongClick={handleSongClick}
          />
          <h2 className="text-lg font-bold mt-6 ml-[.5rem] flex items-center">
            <FaSpotify className="text-green-500 text-[1rem] mr-[.5rem]" />
            Spotify - {selectedRegion}
          </h2>
          <ChartTable
            data={searchResults.spotify}
            onSongClick={handleSongClick}
          />
        </div>
      ) : (
        // 차트
        <div className="pt-[3.3rem]">
          <h2 className="text-lg font-bold mt-6 ml-[1rem] mb-[.5rem]">
            {selectedChart} - {selectedRegion}
          </h2>
          <ChartTable
            data={chartData}
            onSongClick={handleSongClick}
            onFavoriteClick={handleFavoriteClick}
          />
        </div>
      )}
    </div>
  );
}

function ChartTable({ data, onSongClick, onFavoriteClick }) {
  const { language } = useLanguage();
  const translations = {
    En: {
      title: "Title",
      artist: "Artist",
      streams: "Streams",
    },
    Ko: {
      title: "제목",
      artist: "아티스트",
      streams: "재생 수",
    },
    Ja: {
      title: "タイトル",
      artist: "アーティスト",
      streams: "再生数",
    },
  };

  const currentTexts = translations[language] || translations.En;

  return (
    <div className="mb-8 ml-2 overflow-x-auto">
      <table className="w-full text-left border-collapse table-auto">
        <thead className="sticky top-0 z-10 ">
          <tr className="border-b-[.1rem] border-lightText/50 dark:border-darkText font-bold">
            <th className="w-[5%] px-4 py-3 text-center">#</th>
            <th className="w-[5%] px-4 py-3 text-center"></th>
            <th className="w-[35%] px-4 py-3 text-left">
              {currentTexts.title}
            </th>
            <th className="w-[25%] px-4 py-3 text-left ">
              {currentTexts.artist}
            </th>
            <th className="w-[15%] px-4 py-3 text-right">
              {currentTexts.streams}
            </th>
            <th className="w-[5%] px-4 py-3 text-right"></th>
            <th className="w-[5%] px-4 py-3 text-center"></th>
          </tr>
        </thead>

        <tbody className="font-normal text-lightText/80 dark:text-darkText/80">
          {data.map((item, index) => (
            <tr
              key={index}
              className="transition-colors border-b cursor-pointer border-lightButton/50 dark:border-darkButton/50 hover:bg-lightButton/50 dark:hover:bg-darkButton/50"
            >
              <td className="px-4 py-3 text-center">
                {item.current_position || item.rank}
              </td>
              <td className="px-4 py-3 text-center">
                <img
                  src={item.thumbnail_link}
                  alt="Cover"
                  className="object-cover w-10 h-10 rounded max-w-none"
                />
              </td>
              <td className="px-4 py-3 font-medium text-left overflow-hidden text-ellipsis whitespace-nowrap max-w-[12rem]">
                <Link
                  href={item.link || item.song_link}
                  className="hover:text-primary"
                >
                  {item.title}
                </Link>
              </td>
              <td className="px-4 py-3 text-left overflow-hidden text-ellipsis whitespace-nowrap max-w-[8rem]">
                <Link href={item.artist_link} className="hover:text-primary">
                  {item.artist}
                </Link>
              </td>

              <td className="px-4 py-3 text-right">
                {item.streams || item.views || "."}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  className="hover:text-primary pl-1 text-[.75rem]"
                  onClick={() => onSongClick(item)}
                >
                  <FaPlay />
                </button>
              </td>
              <td className="px-3 py-3 text-center">
                <button
                  className="hover:text-primary pl-1 text-[1.4rem]"
                  onClick={() => onFavoriteClick(item)}
                >
                  <TbPlaylistAdd />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
