export const colors = {
  cream: "#FFF8EC",
  marigold: "#F5B942",
  marigoldDark: "#E2A430",
  coral: "#EA6A4E",
  teal: "#3FA087",
  skyBlue: "#A9CDEC",
  blush: "#F5A0AE",
  navy: "#26224A",
  ink: "#1A1A1A",
  white: "#FFFFFF",
  cardShadow: "rgba(38, 34, 74, 0.12)",
  shadowFill: "#D9D3E8",
  shadowStroke: "#B6ACD1",
  outline: "#2B2547",
  highlight: "rgba(255, 255, 255, 0.55)",
  groundShadow: "rgba(38, 34, 74, 0.16)",
  tan: "#D8A46B",
  purple: "#8B5FBF",
  peaGreen: "#7FCDB3",
  brown: "#9C6644",
} as const;

/** Two-stop gradient pairs (light -> dark) for painting shapes with depth. */
export const shadeMap: Record<string, [string, string]> = {
  "#EA6A4E": ["#F58968", "#D5502F"], // coral
  "#F5B942": ["#FBD27A", "#E2A430"], // marigold
  "#3FA087": ["#5FC1A6", "#2C7D68"], // teal
  "#A9CDEC": ["#CBE3F7", "#8AB2D9"], // skyBlue
  "#F5A0AE": ["#FAC2CC", "#DE7E8F"], // blush
  "#26224A": ["#3D3768", "#1A1733"], // navy
  "#D8A46B": ["#E8C295", "#B98247"], // tan (potato)
  "#8B5FBF": ["#AB85D9", "#6B3F96"], // purple (eggplant)
  "#9C6644": ["#C08F63", "#7A4E2E"], // brown (bear)
};

export const gradientPastels = [
  colors.coral,
  colors.marigold,
  colors.teal,
  colors.skyBlue,
  colors.blush,
];

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 12,
  md: 20,
  lg: 28,
  pill: 999,
} as const;

export const typography = {
  display: {
    fontSize: 34,
    fontFamily: "Fredoka_700Bold",
    color: colors.navy,
  },
  title: {
    fontSize: 24,
    fontFamily: "Fredoka_600SemiBold",
    color: colors.navy,
  },
  body: {
    fontSize: 17,
    fontFamily: "Fredoka_500Medium",
    color: colors.navy,
  },
  caption: {
    fontSize: 14,
    fontFamily: "Fredoka_400Regular",
    color: colors.navy,
  },
};
