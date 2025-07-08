export const Colors = {
  // Primary Brand Colors
  primary: "#E91E63", // Pink - Beauty industry standard
  primaryLight: "#F48FB1",
  primaryDark: "#AD1457",
  primaryGradient: "linear-gradient(135deg, #E91E63 0%, #AD1457 100%)",

  // Secondary Colors
  secondary: "#673AB7", // Purple - Luxury feel
  secondaryLight: "#9C27B0",
  secondaryDark: "#4A148C",

  // Accent Colors
  accent: "#FF4081", // Bright pink for highlights
  accentLight: "#FF80AB",
  accentDark: "#C2185B",

  // Neutral Colors
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#EEEEEE",
    300: "#E0E0E0",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },

  // Background Colors
  background: {
    primary: "#FFFFFF",
    secondary: "#FAFAFA",
    dark: "#F5F5F5",
    overlay: "rgba(0, 0, 0, 0.5)",
  },

  // Text Colors
  text: {
    primary: "#212121",
    secondary: "#757575",
    disabled: "#BDBDBD",
    inverse: "#FFFFFF",
    link: "#E91E63",
    linkHover: "#AD1457",
  },

  // Status Colors
  success: "#4CAF50",
  successLight: "#81C784",
  successDark: "#2E7D32",

  warning: "#FF9800",
  warningLight: "#FFB74D",
  warningDark: "#F57C00",

  error: "#F44336",
  errorLight: "#EF5350",
  errorDark: "#D32F2F",

  info: "#2196F3",
  infoLight: "#64B5F6",
  infoDark: "#1976D2",

  // Beauty-specific Colors
  beauty: {
    rose: "#FFE4E1",
    gold: "#FFD700",
    coral: "#FF7F50",
    lavender: "#E6E6FA",
    peach: "#FFCBA4",
    mint: "#98FB98",
    blush: "#FFC0CB",
    nude: "#F5DEB3",
  },

  // Button Colors
  button: {
    primary: "#E91E63",
    primaryHover: "#AD1457",
    secondary: "#673AB7",
    secondaryHover: "#4A148C",
    outline: "transparent",
    outlineHover: "#E91E63",
    disabled: "#BDBDBD",
  },

  // Border Colors
  border: {
    light: "#E0E0E0",
    medium: "#BDBDBD",
    dark: "#757575",
    primary: "#E91E63",
    secondary: "#673AB7",
  },

  // Product Category Colors
  categories: {
    makeup: "#E91E63",
    skincare: "#4CAF50",
    haircare: "#FF9800",
    fragrance: "#9C27B0",
    accessories: "#607D8B",
  },

  // Gradient Combinations
  gradients: {
    primary: "linear-gradient(135deg, #E91E63 0%, #AD1457 100%)",
    secondary: "linear-gradient(135deg, #673AB7 0%, #4A148C 100%)",
    warm: "linear-gradient(135deg, #FF4081 0%, #E91E63 100%)",
    cool: "linear-gradient(135deg, #9C27B0 0%, #673AB7 100%)",
    sunset: "linear-gradient(135deg, #FF9800 0%, #E91E63 100%)",
    ocean: "linear-gradient(135deg, #2196F3 0%, #673AB7 100%)",
  },

  // Shadow Colors
  shadow: {
    light: "rgba(0, 0, 0, 0.1)",
    medium: "rgba(0, 0, 0, 0.2)",
    dark: "rgba(0, 0, 0, 0.3)",
    primary: "rgba(233, 30, 99, 0.3)",
    secondary: "rgba(103, 58, 183, 0.3)",
  },
};

// Color utility functions
export const colorUtils = {
  // Convert hex to rgba
  hexToRgba: (hex, alpha = 1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },

  // Get category color
  getCategoryColor: (category) => {
    const categoryMap = {
      "make-up": Colors.categories.makeup,
      "skin-care": Colors.categories.skincare,
      "hair-care": Colors.categories.haircare,
      fragrance: Colors.categories.fragrance,
      accessories: Colors.categories.accessories,
    };
    return categoryMap[category] || Colors.primary;
  },

  // Generate color variations
  lighten: (color, amount = 0.1) => {
    // This is a simplified version - you might want to use a color manipulation library
    return color;
  },

  darken: (color, amount = 0.1) => {
    // This is a simplified version - you might want to use a color manipulation library
    return color;
  },
};

export default Colors;
