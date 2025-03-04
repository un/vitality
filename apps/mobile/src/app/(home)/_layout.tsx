import { Suspense } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { router, Tabs } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { SQLiteProvider } from "expo-sqlite";
import { DB_NAME } from "@/utils/constants/db";
import { SECURE_STORE_KEY } from "@/utils/constants/security";
import { ChartScatter, Speedometer } from "phosphor-react-native";

import { Text } from "~/components/ui/text";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const encryptionPassword = SecureStore.getItem(SECURE_STORE_KEY);
  // if no password, redirect to security flow
  if (!encryptionPassword) {
    //redirect to home
    router.replace("/");
  }
  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DB_NAME}
        options={{
          enableChangeListener: true,
        }}
        onInit={async (db) => {
          // Set encryption and important SQLite settings
          await db.execAsync(`PRAGMA key = "${encryptionPassword}"`);
          await db.execAsync("PRAGMA journal_mode = WAL");
          await db.execAsync("PRAGMA foreign_keys = ON");
        }}
        useSuspense
      >
        <Tabs>
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: () => (
                <Speedometer size={24} weight="bold" color="white" />
              ),
            }}
          />
          <Tabs.Screen
            name="tasks"
            options={{
              title: "Data",
              tabBarIcon: () => (
                <ChartScatter size={24} weight="bold" color="white" />
              ),
            }}
          />
        </Tabs>
        <StatusBar />
      </SQLiteProvider>
    </Suspense>
  );
}
