export async function fetchList(query, region) {
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
