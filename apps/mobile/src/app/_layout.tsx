import "@bacons/text-decoder/install";

import type { Theme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { openDatabaseAsync } from "expo-sqlite";
import { useColorScheme } from "@/lib/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";

import { schema } from "~/db";
import { NAV_THEME } from "~/lib/constants";
import { DB_NAME } from "~/utils/constants/db";
import { SECURE_STORE_KEY } from "~/utils/constants/security";
import migrations from "../../db-migrations/migrations";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

const InitialLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function initializeApp() {
      try {
        // Step 1: Check security key
        const securityKey = await SecureStore.getItemAsync(SECURE_STORE_KEY);
        if (!securityKey) {
          console.error("security key not found");
          setIsLoading(false);
          router.replace("/(setup)/security-setup");
          return;
        }

        // Step 2: Initialize database and run migrations
        console.log("running migrations");

        const db = await openDatabaseAsync(DB_NAME);
        await db.execAsync(`PRAGMA key = "${securityKey}"`);
        await db.execAsync("PRAGMA journal_mode = WAL");
        await db.execAsync("PRAGMA foreign_keys = ON");

        const drizzleDb = drizzle(db, { schema });
        await migrate(drizzleDb, migrations);

        // Step 3: Check onboarding status
        const userProfile = await drizzleDb.query.userProfile.findFirst();

        console.log("checking onbarding", userProfile);
        const hasOnboarded = userProfile?.name;

        if (!hasOnboarded) {
          router.replace("/(setup)/onboarding");
        } else {
          router.replace("/(home)");
        }
      } catch (error) {
        console.error("Initialization error:", error);
        // Handle error appropriately
      } finally {
        setIsLoading(false);
      }
    }

    initializeApp();
  }, [router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DARK_THEME : LIGHT_THEME}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="(setup)/security-setup"
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="(setup)/onboarding"
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="(home)" options={{ gestureEnabled: false }} />
        </Stack>
        <InitialLayout />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
