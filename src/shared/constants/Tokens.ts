// Tokens.ts

export const SPACING = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  s: 12,
  m: 16,
  l: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,
};

export const RADIUS = {
  xs: 2,
  s: 4,
  m: 6,
  l: 8,
  xl: 12,
  xxl: 16,
  xxxl: 24,
  round: 9999,
};

export const FONT_SIZE = {
  xs: 12,
  s: 14,
  m: 16,
  l: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const FONT_WEIGHT = {
  light: "300" as const,
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
};

export const LINE_HEIGHT = {
  xs: 16,
  s: 20,
  m: 24,
  l: 28,
  xl: 32,
};

export const SHADOWS = {
  s: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  m: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  l: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 100,
  overlay: 1000,
  modal: 1100,
  toast: 1200,
};

export const OPACITY = {
  disabled: 0.5,
  muted: 0.7,
  full: 1,
};

export const ICON_SIZE = {
  xs: 16,
  s: 20,
  m: 24,
  l: 32,
  xl: 40,
};
