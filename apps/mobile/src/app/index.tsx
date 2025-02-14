import { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { deleteDatabaseAsync, openDatabaseAsync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";

import { MigrationError } from "~/components/setup/migrationError";
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
  const [migrationError, setMigrationError] = useState(false);
  const [wipeInProgress, setWipeInProgress] = useState(false);
  const [wipeComplete, setWipeComplete] = useState(false);

  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment
    JetBrainsMono: require("../../assets/fonts/JetBrainsMono-Regular.otf"),
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment
    "JetBrainsMono-Medium": require("../../assets/fonts/JetBrainsMono-Medium.otf"),
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment
    "JetBrainsMono-Bold": require("../../assets/fonts/JetBrainsMono-Bold.otf"),
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment
    "JetBrainsMono-Light": require("../../assets/fonts/JetBrainsMono-Light.otf"),
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment
    "JetBrainsMono-SemiBold": require("../../assets/fonts/JetBrainsMono-SemiBold.otf"),
  });

  useEffect(() => {
    async function initializeApp() {
      try {
        // Step 0: Check if wipe is in progress
        const wipeInProgress =
          await SecureStore.getItemAsync("WIPE_IN_PROGRESS");
        setWipeInProgress(!!wipeInProgress);
        if (wipeInProgress) {
          setWipeInProgress(true);
          try {
            await new Promise((resolve) => setTimeout(resolve, 100));
            await deleteDatabaseAsync(DB_NAME);
            await SecureStore.deleteItemAsync(SECURE_STORE_KEY);
            await SecureStore.deleteItemAsync("WIPE_IN_PROGRESS");
            await new Promise((resolve) => setTimeout(resolve, 12000));
            setWipeInProgress(false);
            setWipeComplete(true);
            await new Promise((resolve) => setTimeout(resolve, 14000));
            setWipeComplete(false);
          } catch (error) {
            console.error("Error during database wipe:", error);
            setWipeInProgress(false);
          }
        }

        // Step 1: Check security key
        const securityKey = await SecureStore.getItemAsync(SECURE_STORE_KEY);
        setHasSecurityKey(!!securityKey);

        if (!securityKey) {
          setIsLoading(false);
          return;
        }

        // Step 2: Initialize database and run migrations
        console.log("💾 running migrations");
        const db = await openDatabaseAsync(DB_NAME);
        await db.execAsync(`PRAGMA key = "${securityKey}"`);
        await db.execAsync("PRAGMA journal_mode = WAL");
        await db.execAsync("PRAGMA foreign_keys = ON");

        const drizzleDb = drizzle(db, { schema });
        try {
          await migrate(drizzleDb, migrations);
        } catch (error) {
          await db.closeAsync();
          setMigrationError(true);
          console.error("Migration error:", error);
          return <MigrationError />;
        }
        console.log("💾 Migrations complete");

        // Step 3: Check onboarding status
        const userProfile = await drizzleDb.query.userProfile.findFirst();

        if (userProfile?.onboardingCompleted) {
          router.replace("/(home)");
        } else {
          router.replace("/onboarding");
        }
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    void initializeApp();
  }, [router, hasSecurityKey]);

  if (!fontsLoaded) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView className="bg-sand-3 flex h-full w-full flex-col items-center justify-center gap-8">
      <Stack.Screen options={{ title: "Welcome", header: () => null }} />

      <View className="flex flex-col items-center gap-2">
        <Animated.View entering={FadeIn.duration(700).delay(500)}>
          <Text className="font-mono-bold text-center text-5xl font-bold">
            Augmented
          </Text>
        </Animated.View>
        {!wipeInProgress && !wipeComplete && (
          <Animated.View entering={FadeIn.duration(700).delay(1500)}>
            <Text className="font-mono font-light">Let's get you set up</Text>
          </Animated.View>
        )}
      </View>
      <View className="w-full px-8">
        {migrationError ? <MigrationError /> : null}
        {isLoading ? (
          <LoadingView />
        ) : !hasSecurityKey ? (
          <SecuritySetup onComplete={() => setHasSecurityKey(true)} />
        ) : null}
      </View>
      {wipeInProgress && (
        <View className="flex flex-col items-center gap-2">
          <Animated.Text
            className="text-orange-9 font-mono-bold"
            entering={FadeIn.duration(700).delay(0)}
          >
            AUGMENTS BEING REMOVED
          </Animated.Text>
          <Animated.Text
            className="text-orange-9 font-mono-bold"
            entering={FadeIn.duration(700).delay(2000)}
          >
            Some pain is normal
          </Animated.Text>
          <Animated.Text
            className="text-orange-9 font-mono-bold"
            entering={FadeIn.duration(700).delay(4000)}
          >
            If you feel a tingle, that's good
          </Animated.Text>
          <Animated.Text
            className="text-orange-9 font-mono-bold"
            entering={FadeIn.duration(700).delay(6000)}
          >
            If you feel pain, that's great
          </Animated.Text>
          <Animated.Text
            className="text-orange-9 font-mono-bold"
            entering={FadeIn.duration(700).delay(8000)}
          >
            If you feel nothing, get help
          </Animated.Text>
        </View>
      )}
      {wipeComplete && (
        <View className="flex flex-col items-center gap-2">
          <Animated.Text
            className="text-red-9 font-mono-bold"
            entering={FadeIn.duration(700).delay(0)}
          >
            ALL AUGMENTS REMOVED
          </Animated.Text>
          <Animated.Text
            className="text-red-9 font-mono-bold"
            entering={FadeIn.duration(700).delay(2000)}
          >
            You are no longer Augmented
          </Animated.Text>
          <Animated.Text
            className="text-red-9 font-mono-bold"
            entering={FadeIn.duration(700).delay(4000)}
          >
            You have left the Matrix
          </Animated.Text>
          <Animated.Text
            className="text-red-9 font-mono-bold"
            entering={FadeIn.duration(700).delay(6000)}
          >
            You are free to go
          </Animated.Text>
          <Animated.Text
            className="text-red-9 font-mono-bold"
            entering={FadeIn.duration(700).delay(8000)}
          >
            Free to be average
          </Animated.Text>
          <Animated.Text
            className="text-red-9 font-mono-bold"
            entering={FadeIn.duration(700).delay(10000)}
          >
            Good luck
          </Animated.Text>
        </View>
      )}
    </SafeAreaView>
  );
}
