import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { deleteDatabaseAsync } from "expo-sqlite";

import { DB_NAME } from "~/utils/constants/db";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

export function MigrationError() {
  const router = useRouter();
  const [wipeInProgress, setWipeInProgress] = useState(false);

  async function WipeDb() {
    setWipeInProgress(true);
    await deleteDatabaseAsync(DB_NAME);
    setWipeInProgress(false);
    router.replace("/");
  }

  return (
    <SafeAreaView className="bg-sand-3 flex h-full w-full flex-col items-center justify-center gap-8">
      <View className="flex h-full w-full items-center justify-center">
        <Text className="text-center text-2xl font-bold">
          Database Migration error
        </Text>
        <Text className="my-4 text-center text-lg">
          There was an error during the migration process. Please try again
          later.
        </Text>
        {wipeInProgress && (
          <Text className="text-red-9">DB WIPE IN PROGRESS</Text>
        )}
        <Button className="w-1/2" onPress={() => WipeDb()}>
          <Text>Wipe the Database</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
