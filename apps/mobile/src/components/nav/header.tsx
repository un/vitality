import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { useDB } from "~/db";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Text } from "../ui/text";

export const Header = ({ children }: { children?: React.ReactNode }) => {
  const db = useDB();

  const { data } = useLiveQuery(db.query.userProfile.findFirst());

  const streakLength = data?.currentStreakDays ?? 0;

  const avatarName = data?.name ? data.name.slice(0, 2) : "you";

  return (
    <SafeAreaView
      edges={["top"]}
      className="bg-sand-1 border-b-sand-5 border-b-2"
    >
      <View className="flex w-full flex-row items-center justify-between px-4 pb-4">
        <View className="flex flex-row items-center gap-1">
          <View className="flex flex-col items-center gap-0">
            <Text className="font-mono-bold leading-[0]">{streakLength}</Text>
            <Text className="text-sand-10 -mt-1.5 text-xs leading-[0]">
              days
            </Text>
          </View>
          <Text className="text-xl">🔥</Text>
        </View>
        {children}
        <Avatar alt="Avatar">
          <AvatarFallback>
            <Text>{avatarName}</Text>
          </AvatarFallback>
        </Avatar>
      </View>
    </SafeAreaView>
  );
};
