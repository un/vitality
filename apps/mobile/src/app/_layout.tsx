import "@bacons/text-decoder/install";

import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";

import "../styles.css";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f472b6",
        },
        contentStyle: {
          backgroundColor: colorScheme == "dark" ? "#09090B" : "#FFFFFF",
        },
      }}
    />
  );
}
