export const getBaseUrl = () => {
  // If production, use production server
  if (process.env.NODE_ENV === "production") {
    return "https://server.trendingimportbd.com";
  }

  // If development, use local server
  return "http://localhost:5050";
};

export default getBaseUrl;
