import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useMusic } from "../context/MusicContext";

import {
  fetchAppleMusicChart,
  fetchYoutubeChart,
  fetchSpotifyChart,
} from "@/api/fetchChart";

export default function MusicList() {
  const { selectedChart, selectedRegion, setNowPlaying } = useMusic();
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
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Music Chart</h2>
        <input
          type="date"
          className="border border-gray-300 rounded px-2 py-1"
          // value={selectedDate}
          // onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <ChartTable data={chartData} onSongClick={handleSongClick} />
    </div>
  );
}

function ChartTable({ data, onSongClick }) {
  return (
    <div className="mb-8 ml-2 overflow-x-auto">
      <table className="w-full text-left border-collapse table-auto">
        <thead className="sticky top-0 z-10 bg-lightBackground dark:bg-darkBackground">
          <tr className="border-b-[1px] border-lightText dark:border-darkText font-bold">
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
