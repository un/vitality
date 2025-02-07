import "@bacons/text-decoder/install";

import type { Theme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "@/lib/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { NAV_THEME } from "~/lib/constants";

import "../styles.css";

import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ActivityIndicator, Platform, StatusBar } from "react-native";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { DB_NAME } from "@/db";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

import migrations from "../../db-migrations/migrations";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const expoDb = openDatabaseSync(DB_NAME);
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);

  const hasMounted = useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }
  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DB_NAME}
        options={{
          enableChangeListener: true,
        }}
        useSuspense
      >
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
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
          <StatusBar />
        </ThemeProvider>
      </SQLiteProvider>
    </Suspense>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? useEffect
    : useLayoutEffect;
