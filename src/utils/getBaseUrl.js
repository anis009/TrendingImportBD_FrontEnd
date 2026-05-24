export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  if (process.env.NODE_ENV === "production") {
    return (
      process.env.NEXT_PUBLIC_API_BASE_URL_PRODUCTION ||
      "https://server-trendingimportbd.vercel.app"
    );
  }

  return (
    process.env.NEXT_PUBLIC_API_BASE_URL_DEVELOPMENT || "http://localhost:5050"
  );
};

export default getBaseUrl;
