import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";

import baseConfig from "@augmented/tailwind-config/native";

import { radixColors } from "./src/utils/radix-colors";

const { hairlineWidth } = require("nativewind/theme");

export default {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  presets: [nativewind],
  safelist: [
    {
      pattern:
        /^(bg|text|border)-(bronze|gold|brown|orange|tomato|red|ruby|crimson|pink|plum|purple|violet|iris|indigo|blue|cyan|teal|jade|green|grass|gray|mauve|slate|sage|olive|sand|sky|mint|lime|yellow|amber)-(1|2|3|4|5|6|7|8|9|10|11|12)$/,
    },
  ],
  theme: {
    // Override the base theme completely instead of extending it
    colors: {
      ...radixColors,
      border: "var(--sand-6)",
      input: "var(--sand-6)",
      ring: "var(--sand-6)",
      background: "var(--sand-2)",
      foreground: "var(--sand-12)",
      primary: {
        DEFAULT: "var(--sand-12)",
        foreground: "var(--sand-1)",
      },
      secondary: {
        DEFAULT: "var(--sand-9)",
        foreground: "var(--sand-1)",
      },
      destructive: {
        DEFAULT: "var(--red-9)",
        foreground: "var(--red-1)",
      },
      muted: {
        DEFAULT: "var(--sand-10)",
        foreground: "var(--sand-1)",
      },
      accent: {
        DEFAULT: "var(--orange-9)",
        foreground: "var(--orange-1)",
      },
      popover: {
        DEFAULT: "var(--popover)",
        foreground: "var(--popover-foreground)",
      },
      card: {
        DEFAULT: "var(--card)",
        foreground: "var(--card-foreground)",
      },
    },
    extend: {
      fontFamily: {
        "mono-black": ["GeistMono-Black", "sans-serif"],
        "mono-bold": ["GeistMono-Bold", "sans-serif"],
        "mono-light": ["GeistMono-Light", "sans-serif"],
        "mono-medium": ["GeistMono-Medium", "sans-serif"],
        "mono-regular": ["GeistMono-Regular", "sans-serif"],
        "mono-semibold": ["GeistMono-SemiBold", "sans-serif"],
        "mono-thin": ["GeistMono-Thin", "sans-serif"],
        "mono-ultrablack": ["GeistMono-UltraBlack", "sans-serif"],
        "mono-ultralight": ["GeistMono-UltraLight", "sans-serif"],
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    plugins: [require("tailwindcss-animate")],
  },
} satisfies Config;
