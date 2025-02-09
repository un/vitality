import "@bacons/text-decoder/install";

import type { Theme } from "@react-navigation/native";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ActivityIndicator, Platform, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useColorScheme } from "@/lib/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { NAV_THEME } from "~/lib/constants";

// import { openDatabaseAsync, SQLiteProvider } from "expo-sqlite";
// import { DB_NAME } from "@/utils/constants/db";
// import { drizzle } from "drizzle-orm/expo-sqlite";
// import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

// import migrations from "../../db-migrations/migrations";

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

// async function RunStartup() {
//   // check securestore to see if password is set there

//   const encryptionPassword = await SecureStore.getItemAsync(SECURE_STORE_KEY);
//   // if no password, redirect to security flow
//   if (!encryptionPassword) {
//     //redirect
//   }

//   // if password is set continue app load flow
//   // ! security Flow
//   // Ask user for password
//   // set password in securestore
//   // continue app load flow with name as param
//   // ! App Load Flow (name as param)
//   // run db migrations
//   // read db to check if user onboarded
//   // if user onboarded, redirect to main app
//   // if user not onboarded, redirect to onboarding
//   // ! Onboarding Flow
//   // ask user for name
//   // redirect to main app
// }

function RootLayout() {
  // Handle DB Migrations
  // const expoDb = await openDatabaseAsync(DB_NAME);
  // await expoDb.execAsync("PRAGMA journal_mode = WAL");
  // await expoDb.execAsync("PRAGMA foreign_keys = ON");

  // const db = drizzle(expoDb);
  // const { success, error } = useMigrations(db, migrations);

  const hasMounted = useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
      {/* <SQLiteProvider
        databaseName={DB_NAME}
        options={{
          enableChangeListener: true,
        }}
        onInit={async (db) => {
          await db.execAsync("PRAGMA foreign_keys = ON");
          await db.execAsync("PRAGMA journal_mode = WAL");
        }}
        useSuspense
      > */}
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <SafeAreaProvider>
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
        </SafeAreaProvider>
      </ThemeProvider>
      {/* </SQLiteProvider> */}
    </Suspense>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? useEffect
    : useLayoutEffect;

export default RootLayout;
