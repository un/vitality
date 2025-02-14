import { Suspense } from "react";
import { ActivityIndicator, StatusBar } from "react-native";
import { router, Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { SQLiteProvider } from "expo-sqlite";
import { DB_NAME } from "@/utils/constants/db";
import { SECURE_STORE_KEY } from "@/utils/constants/security";

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
        <Stack>
          <Stack.Screen name="index" />
        </Stack>
        <StatusBar />
      </SQLiteProvider>
    </Suspense>
  );
}
