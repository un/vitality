import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";

import baseConfig from "@augmented/tailwind-config/native";

import { radixColors } from "./src/utils/radix-colors";

const { hairlineWidth } = require("nativewind/theme");

export default {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig, nativewind],
  safelist: [
    {
      pattern:
        /^(bg|text|border)-(bronze|gold|brown|orange|tomato|red|ruby|crimson|pink|plum|purple|violet|iris|indigo|blue|cyan|teal|jade|green|grass|gray|mauve|slate|sage|olive|sand|sky|mint|lime|yellow|amber)-(1|2|3|4|5|6|7|8|9|10|11|12)$/,
    },
  ],
  theme: {
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "var(--sand-9)",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
      ...radixColors,
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
