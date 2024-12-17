import axios from "axios";

const regionMap = {
  KOR: "kr",
  JP: "jp",
  US: "us",
};

const chartTypeMap = {
  "YouTube Music": "youtube",
  "Apple Music": "apple_music",
  Spotify: "spotify",
};

export async function fetchChartByType(chart, region, date) {
  try {
    const mappedRegion = regionMap[region] || region;
    const mappedChartKey = chartTypeMap[chart];

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

export async function fetchSearchChart(query, region) {
  try {
    const mappedRegion = regionMap[region] || region;
    const baseUrl = "http://localhost:8000/api/search";
    const response = await axios.get(baseUrl, {
      params: { q: query, country: mappedRegion },
    });
    return response.data || { youtube: [], spotify: [], apple_music: [] };
  } catch (error) {
    console.error("Error fetching search chart data:", error);
    return { youtube: [], spotify: [], apple_music: [] };
  }
}
