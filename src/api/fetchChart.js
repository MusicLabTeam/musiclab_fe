import axios from "axios";

const regionMap = {
  KOR: "kr",
  JPN: "jp",
  USA: "us",
};

const chartTypeMap = {
  "YouTube Music": "youtube",
  "Apple Music": "apple_music",
  Spotify: "spotify",
};

export async function fetchChartByType(chartType, region, date) {
  try {
    const mappedRegion = regionMap[region] || region;
    const mappedChartKey = chartTypeMap[chartType];

    if (!mappedChartKey) {
      throw new Error("Invalid chart type");
    }

    const baseUrl = `http://localhost:8000/api/music-charts/${mappedRegion}/${date}`;
    const response = await axios.get(baseUrl);
    // console.log(response.data);

    return response.data[mappedChartKey] || [];
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return [];
  }
}
