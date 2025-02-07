import type { Config } from "tailwindcss";
import baseConfig from "@augmented/tailwind-config/native";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig, nativewind],
} satisfies Config;
