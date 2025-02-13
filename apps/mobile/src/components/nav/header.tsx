import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Text } from "../ui/text";

export const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <SafeAreaView
      edges={["top"]}
      className="bg-sand-1 border-b-sand-5 border-b-2"
    >
      <View className="flex w-full flex-row items-center justify-between px-4 pb-4">
        <View className="flex flex-row items-center gap-1">
          <Text className="text-xl">🔥</Text>
          <View className="flex flex-col gap-0">
            <Text className="leading-[0]">690</Text>
            <Text className="text-sand-10 -mt-1.5 text-xs leading-[0]">
              days
            </Text>
          </View>
        </View>
        {children}
        <Avatar alt="Avatar">
          <AvatarFallback>
            <Text>MC</Text>
          </AvatarFallback>
        </Avatar>
      </View>
    </SafeAreaView>
  );
};
