import axios from "axios";

export async function fetchList() {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.get("http://localhost:8000/api/mylist", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(response.data);
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

    // console.log("Favorite song added:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding favorite song:", error);
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
    // console.log("Favorite song deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting favorite song:", error);
    throw error;
  }
}
