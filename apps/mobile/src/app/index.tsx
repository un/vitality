import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Text } from "@/components/ui/text";

export default function Index() {
  return (
    <SafeAreaView className="bg-sand-2">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "App Index", header: () => null }} />
      <View className="h-full w-full flex-col items-center justify-center p-4">
        <Text className="text-slate-12 pb-2 text-center text-5xl font-light">
          Augmented
        </Text>
        <View className="py-2">
          <Text>Get Started</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
