"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPlay, FaTrash } from "react-icons/fa";
import { FaApple, FaSpotify } from "react-icons/fa";
import { SiYoutubemusic } from "react-icons/si";
import { fetchList } from "@/api/fetchList";
import { deleteFavoriteSong } from "@/api/fetchList";

export default function ListPage() {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchList();
        setListData(data);
      } catch (error) {
        console.error("Error fetching list data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (favoriteId) => {
    try {
      await deleteFavoriteSong(favoriteId);
      setListData((prevData) =>
        prevData.filter((item) => item.favorite_id !== favoriteId)
      );
    } catch (error) {
      alert("Failed to delete the song from favorites.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mt-6 ml-[.5rem] flex items-center">
        Liked Music
      </h2>
      <div>
        <ChartTable data={listData} onDelete={handleDelete} />
      </div>
    </div>
  );
}

function ChartTable({ data, onDelete }) {
  // const handleSongClick = (song) => {
  //   console.log("Now playing:", song);
  // };

  if (!data || data.length === 0) {
    return (
      <p className="text-gray-500 text-[1.1rem] w-full justify-center flex">
        No songs
      </p>
    );
  }
  const renderLogo = (songType) => {
    switch (songType) {
      case "youtube":
        console.log("youtube");
        return (
          <SiYoutubemusic className="text-red-600 text-[1rem] rounded-full" />
        );
      case "spotify":
        return <FaSpotify className="text-green-500 text-[1rem] " />;
      case "apple":
        return (
          <FaApple className="text-[1rem] text-lightText dark:text-darkText" />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-8 ml-2 overflow-x-auto">
      <table className="w-full text-left border-collapse table-auto">
        <thead>
          <tr className="border-b-[.1rem] border-lightText/50 dark:border-darkText font-bold">
            <th className="w-[8%] px-4 py-3 text-center"></th>
            <th className="w-[40%] px-4 py-3 text-left">Title</th>
            <th className="w-[25%] px-4 py-3 text-left">Artist</th>
            <th className="w-[15%] px-4 py-3 text-right">Views</th>
            <th className="w-[5%] px-4 py-3 text-center"></th>
          </tr>
        </thead>
        <tbody className="font-normal text-lightText/80 dark:text-darkText/80">
          {data.map((item, index) => (
            <tr
              key={item.favorite_id}
              className="transition-colors border-b cursor-pointer border-lightButton/50 dark:border-darkButton/50 hover:bg-lightButton/50 dark:hover:bg-darkButton/50"
            >
              <td className="px-4 py-3 text-center">
                <img
                  src={item.thumbnail_link}
                  alt={item.title}
                  className="object-cover w-10 h-10 rounded"
                />
              </td>
              <td className="px-4 py-3 text-left  ">
                <Link
                  href={item.link || item.song_link}
                  className="hover:text-primary"
                >
                  <div className="flex items-center space-x-[.5rem]">
                    <span className="flex items-center">
                      {renderLogo(item.song_type)}
                    </span>
                    <span className="text-base">{item.title}</span>
                  </div>
                </Link>
              </td>
              {/* 아티스트링크없음 */}
              {/* <td className="px-4 py-3 pl-1 text-left">
                <Link href={item.artist_link} className="hover:text-primary">
                  {item.artist}
                </Link>
              </td> */}
              <td className="px-4 py-3 text-left">{item.artist}</td>
              <td className="px-4 py-3 text-right">
                {item.streams || item.views || "."}
              </td>
              {/* <td className="px-4 py-3 text-center">
                <button
                  className="hover:text-primary pl-1 text-[.75rem]"
                  onClick={() => handleSongClick(item)}
                >
                  <FaPlay />
                </button>
              </td> */}
              <td className="px-4 py-3 text-center">
                <button
                  className="hover:text-red-500 pl-1 text-[.75rem]"
                  onClick={() => onDelete(item.favorite_id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
