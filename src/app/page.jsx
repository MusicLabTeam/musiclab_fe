import MusicList from "./components/MusicList";

export const metadata = {
  title: "MusicLab",
  description: "Explore various music charts and enjoy your favorite music.",
  icons: {
    icon: "/dark_logo.png",
  },
};

export default function Home() {
  return <MusicList />;
}
