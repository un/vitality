import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { openDatabaseAsync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";

import Onboarding from "~/components/setup/onboarding";
import SecuritySetup from "~/components/setup/security-setup";
import { Text } from "~/components/ui/text";
import { schema } from "~/db";
import { DB_NAME } from "~/utils/constants/db";
import { SECURE_STORE_KEY } from "~/utils/constants/security";
import migrations from "../../db-migrations/migrations";
import { LoadingView } from "../components/LoadingView";

export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasSecurityKey, setHasSecurityKey] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    JetBrainsMono: require("../../assets/fonts/JetBrainsMono-Regular.otf"),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    "JetBrainsMono-Medium": require("../../assets/fonts/JetBrainsMono-Medium.otf"),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    "JetBrainsMono-Bold": require("../../assets/fonts/JetBrainsMono-Bold.otf"),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    "JetBrainsMono-Light": require("../../assets/fonts/JetBrainsMono-Light.otf"),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    "JetBrainsMono-SemiBold": require("../../assets/fonts/JetBrainsMono-SemiBold.otf"),
  });

  useEffect(() => {
    async function initializeApp() {
      try {
        // Step 1: Check security key
        const securityKey = await SecureStore.getItemAsync(SECURE_STORE_KEY);
        setHasSecurityKey(!!securityKey);

        if (!securityKey) {
          setIsLoading(false);
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

        if (userProfile?.name) {
          setHasOnboarded(true);
          router.replace("/(home)");
        } else {
          setHasOnboarded(false);
        }
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    void initializeApp();
  }, [router]);

  if (!fontsLoaded) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView className="bg-sand-3 flex h-full w-full flex-col items-center justify-center gap-8">
      <Stack.Screen options={{ title: "Welcome", header: () => null }} />

      <View className="flex flex-col items-center gap-2">
        <Text className="text-center font-mono text-5xl font-bold">
          Augmented
        </Text>
        <Text className="font-mono font-light">Let's get you set up</Text>
      </View>

      <View className="w-full px-8">
        {isLoading ? (
          <LoadingView />
        ) : !hasSecurityKey ? (
          <SecuritySetup onComplete={() => setHasSecurityKey(true)} />
        ) : !hasOnboarded ? (
          <Onboarding
            onComplete={() => {
              setHasOnboarded(true);
              router.replace("/(home)");
            }}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}
