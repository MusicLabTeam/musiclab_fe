"use client";
import Chart from "./SideBarComponents/ChartButton";
import NowPlaying from "./SideBarComponents/NowPlaying";
import Playlist from "./SideBarComponents/PlaylistButton";

export default function Sidebar() {
  return (
    <aside className="fixed top-[6rem] z-40 left-0 w-[16rem] h-[calc(100vh-6rem)] bg-lightBackground dark:bg-darkBackground shadow-md shadow-lightButton dark:shadow-darkButton p-4 hidden md:block">
      <div className="flex justify-center flex-col h-full">
        <div>
          <Chart className="flex-grow" />
        </div>
        <div className="flex-grow">
          <Playlist className="flex-grow" />
        </div>
        <div className="flex justify-center">
          <NowPlaying />
        </div>
      </div>
    </aside>
  );
}
