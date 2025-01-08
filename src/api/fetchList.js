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

export async function addFavoriteSong(songType, songId, language) {
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

    // 다국어 토스트 메시지
    const messages = {
      En: "Track added to your list",
      Ko: "재생 목록에 추가되었습니다.",
      Ja: "リストに追加されました。",
    };
    toast.success(messages[language]);

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const errorMessages = {
        En: "This track is already in the playlist",
        Ko: "이미 플레이리스트에 있습니다.",
        Ja: "この曲はすでにプレイリストにあります。",
      };
      toast.error(errorMessages[language]);
    } else {
      // console.error("Error adding favorite song:", error);
      toast.error("An unexpected error occurred.");
    }
    throw error;
  }
}

export async function deleteFavoriteSong(favoriteId, language) {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.delete(
      `http://localhost:8000/api/favorites/${favoriteId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    // 다국어 토스트 메시지
    const messages = {
      En: "Track deleted from your list",
      Ko: "재생 목록에서 삭제되었습니다.",
      Ja: "リストから削除されました。",
    };
    toast.success(messages[language]);

    return response.data;
  } catch (error) {
    const errorMessages = {
      En: "Failed to delete the track",
      Ko: "삭제 실패했습니다.",
      Ja: "トラックの削除に失敗しました。",
    };

    toast.error(errorMessages[language] || "An unexpected error occurred.");
    throw error;
  }
}
