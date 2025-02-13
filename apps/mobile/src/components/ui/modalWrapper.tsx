import { View } from "react-native";

import { Text } from "./text";

export function ModalWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="flex flex-col items-center">
      <View className="bg-sand-3 border-sand-5 flex w-full flex-col items-center justify-center gap-2 border-b pb-4 pt-1">
        <View className="bg-sand-8 mb-1 mt-1 min-h-1.5 w-12 rounded-full" />
        <Text className="font-mono-bold text-xl">{title}</Text>
      </View>
      <View className="h-full w-full p-8">{children}</View>
    </View>
  );
}
