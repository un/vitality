import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { SECURE_STORE_KEY } from "@/utils/constants/security";

export default function Index() {
  const encryptionPassword = SecureStore.getItem(SECURE_STORE_KEY);
  // if no password, redirect to security flow
  if (!encryptionPassword) {
    //redirect to security flow
    console.log("no password");
  }

  return (
    <SafeAreaView className="bg-sand-2">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "App Index", header: () => null }} />
      <View className="h-full w-full flex-col items-center justify-center p-4">
        <Text className="text-plum-9 pb-2 text-center font-mono text-5xl font-light">
          Augmented
        </Text>
        <Text className="text-crimson-9 pb-2 text-center text-5xl font-bold">
          Augmented
        </Text>

        {!encryptionPassword && (
          <View className="py-2">
            <Text className="font-semibold italic text-primary">
              No Password
            </Text>
          </View>
        )}
        <Button
          onPress={() => {
            router.replace("/(setup)/create-password");
          }}
        >
          <Text>Create Password</Text>
        </Button>
        {encryptionPassword && (
          <View className="py-2">
            <Text className="font-semibold italic text-primary">
              Has Password {encryptionPassword}
            </Text>
          </View>
        )}

        <View className="py-2">
          <Text>Create task</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
