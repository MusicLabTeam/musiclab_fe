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
    return { youtube: [], spotify: [], apple_music: [] };
  }
}

export async function addFavoriteSong(songType, songId) {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.post(
      "http://localhost:8000/api/favorites",
      {
        song_type: songType,
        song_id: songId,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    console.log("Favorite song added:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding favorite song:", error);
    throw error;
  }
}
