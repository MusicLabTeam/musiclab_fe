import axios from "axios";
import { toast } from "react-hot-toast";

export async function fetchList() {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.get("http://localhost:8000/api/mylist", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching list data:", error);
    return [];
  }
}

export async function addFavoriteSong(songType, songId) {
  try {
    const accessToken = localStorage.getItem("access_token");

    let transformedSongType = songType;
    if (transformedSongType === "YouTube Music") {
      transformedSongType = "youtube";
    } else if (transformedSongType === "Spotify") {
      transformedSongType = "spotify";
    } else if (transformedSongType === "Apple Music") {
      transformedSongType = "apple";
    }

    const response = await axios.post(
      "http://localhost:8000/api/favorites",
      {
        song_type: transformedSongType,
        song_id: songId,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    toast.success("Track added to your list");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.error("This track is already in the playlist");
    } else {
      console.error("Error adding favorite song:", error);
      toast.error("An unexpected error occurred.");
    }
    throw error;
  }
}

export async function deleteFavoriteSong(favoriteId) {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.delete(
      `http://localhost:8000/api/favorites/${favoriteId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    toast.success("Track deleted from your list");
    // console.log("Favorite song deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting favorite song:", error);
    throw error;
  }
}
