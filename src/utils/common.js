export const getImageUrl = (url) => {
  if (!url) {
    return "/assets/img/product/product-placeholder.svg";
  }

  // If already a full URL, return as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // If it starts with /, it's a relative path from the domain root
  if (url.startsWith("/")) {
    return "https://media.trendingimportbd.com" + url;
  }

  // Otherwise, assume it's a relative path that needs /uploads/ prefix
  return "https://media.trendingimportbd.com/uploads/" + url;
};

export const getLimitText = (text, limit = 16) => {
  if (!text) {
    return "";
  }

  return text.length > limit ? text.slice(0, limit) + "..." : text;
};
