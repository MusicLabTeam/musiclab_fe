import NowPlaying from "../components/SideBarComponents/NowPlaying";
import React, { createContext, useContext, useState } from "react";

export const MusicContext = createContext();

export function MusicProvider({ children }) {
  const [selectedChart, setSelectedChart] = useState("YouTube Music");
  const [selectedRegion, setSelectedRegion] = useState("KOR");
  const [nowPlaying, setNowPlaying] = useState(null);
  return (
    <MusicContext.Provider
      value={{
        selectedChart,
        setSelectedChart,
        selectedRegion,
        setSelectedRegion,
        nowPlaying,
        setNowPlaying,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  return useContext(MusicContext);
}
