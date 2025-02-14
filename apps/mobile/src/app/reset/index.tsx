import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import * as Updates from "expo-updates";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function Index() {
  const [confirmWipe, setConfirmWipe] = useState(false);
  const [wipeInProgress, setWipeInProgress] = useState(false);

  async function RestartAndWipe() {
    if (!confirmWipe) {
      setConfirmWipe(true);
      return;
    }
    setWipeInProgress(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));

    await SecureStore.setItemAsync("WIPE_IN_PROGRESS", "true");
    await Updates.reloadAsync();
  }

  return (
    <SafeAreaView className="bg-sand-3 flex h-full w-full flex-col items-center justify-center gap-8 p-8">
      <View className="flex h-full w-full items-center justify-center gap-8">
        <View className="flex flex-col items-center gap-2">
          <Text className="text-center font-mono text-5xl font-bold">
            Augmented
          </Text>
        </View>

        <Text className="text-center text-2xl font-bold">
          Reset your full account?
        </Text>
        <Text className="my-4 text-center">
          This will wipe the database, all data and reset your security key(s).
        </Text>
        <Button
          className=""
          variant={confirmWipe ? "destructive" : "default"}
          onPress={() => RestartAndWipe()}
          title={confirmWipe ? "Are you sure?" : "Remove my Augments"}
          disabled={wipeInProgress}
          loading={wipeInProgress}
        />
        {wipeInProgress && (
          <>
            <Text className="text-red-9 text-center text-2xl font-bold">
              Wiping your account...
            </Text>
            <Text className="text-sand-11 text-center">
              The app will need to restart to complete the wipe, please dont
              close or uninstall the app before it has finished.
            </Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
