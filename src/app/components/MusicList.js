import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import RegionSelector from "./RegionSelector";
import SearchBar from "./HeaderComponents/SearchBar";
import { FaPlay, FaSearch } from "react-icons/fa";
import { useMusic } from "../context/MusicContext";

import {
  fetchAppleMusicChart,
  fetchYoutubeChart,
  fetchSpotifyChart,
} from "@/api/fetchChart";

export default function MusicList() {
  const { selectedChart, selectedRegion, setNowPlaying } = useMusic();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = [];
        if (selectedChart === "YouTube Music") {
          data = await fetchYoutubeChart();
        } else if (selectedChart === "Apple Music") {
          data = await fetchAppleMusicChart();
        } else if (selectedChart === "Spotify") {
          data = await fetchSpotifyChart();
        }

        let regionData = [];
        if (selectedRegion === "JPN") {
          regionData = data[0];
        } else if (selectedRegion === "KOR") {
          regionData = data[1];
        } else if (selectedRegion === "USA") {
          regionData = data[2];
        }
        setChartData(regionData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [selectedChart, selectedRegion]);

  const handleSongClick = (song) => {
    setNowPlaying(song);
  };

  return (
    <div>
      <div className="flex mb-4 fixed z-50 h-[5rem] justify-between -translate-x-[1rem] w-full pt-[1rem] bg-gradient-to-b from-lightBackground dark:from-darkBackground via-lightBackground/50 dark:via-darkBackground/50 to-transparent">
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
        <div className="flex items-center justify-around button h-[1.8rem] w-[6rem] rounded-full cursor-pointer shadow-sm ">
          <FaSearch className="text-[.75rem]" />
          <input
            className="bg-transparent border-none outline-none text-[.75rem]  ml-2"
            placeholder="Search"
          />
        </div>
      </div>
      <ChartTable data={chartData} onSongClick={handleSongClick} />
    </div>
  );
}

function ChartTable({ data, onSongClick }) {
  return (
    <div className="mb-8 ml-2 overflow-x-auto pt-[2.8rem]">
      <table className="w-full text-left border-collapse table-auto">
        <thead className="sticky top-0 z-10 ">
          <tr className="border-b-[.1rem] border-lightText/50 dark:border-darkText font-bold">
            <th className="w-[5%] px-4 py-3 text-center">#</th>
            <th className="w-[10%] px-4 py-3 text-center"></th>
            <th className="w-[40%] px-4 py-3 text-left">Title</th>
            <th className="w-[25%] px-4 py-3 text-left pl-1">Artist</th>
            <th className="w-[15%] px-4 py-3 text-right">Streams</th>
            <th className="w-[5%] px-4 py-3 text-center"></th>
          </tr>
        </thead>
        <tbody className="font-normal text-lightText/80 dark:text-darkText/80">
          {data.map((item, index) => (
            <tr
              key={index}
              className="transition-colors border-b cursor-pointer border-lightButton/50 dark:border-darkButton/50 hover:bg-lightButton/50 dark:hover:bg-darkButton/50"
            >
              <td className="px-4 py-3 text-center">{index + 1}</td>
              <td className="px-4 py-3 text-center">
                <img
                  src={item.thumbnail_link}
                  alt="Cover"
                  className="object-cover w-10 h-10 rounded"
                />
              </td>
              <td className="px-4 py-3 font-medium text-left">
                <Link
                  href={item.link || item.song_link}
                  className="hover:text-primary"
                >
                  {item.title}
                </Link>
              </td>
              <td className="px-4 py-3 pl-1 text-left">
                <Link href={item.artist_link} className="hover:text-primary">
                  {item.artist}
                </Link>
              </td>
              <td className="px-4 py-3 text-right">
                {item.streams || item.views || "."}
              </td>
              <td className="px-4 py-3 text-center">
                <button
                  className="hover:text-primary pl-1 text-[.75rem]"
                  onClick={() => onSongClick(item)}
                >
                  <FaPlay />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
