import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { Button } from "~/components/ui/button";
import { useDB } from "~/db";
import { tasks, userProfile } from "~/db/schema";
import { SECURE_STORE_KEY } from "~/utils/constants/security";

export default function Index() {
  const db = useDB();
  const router = useRouter();

  const { data } = useLiveQuery(db.query.tasks.findMany());

  async function createTask() {
    await db.insert(tasks).values({
      description: "description",
      id: Math.floor(Math.random() * 1000000).toString(),
      status: "todo",
      title: "title",
    });
  }

  // async function resetAccount() {
  //   await SecureStore.deleteItemAsync(SECURE_STORE_KEY);
  //   await db.delete(userProfile);
  //   await db.delete(tasks);
  //   router.replace("/");
  // }

  return (
    <SafeAreaView className="bg-sand-1">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full bg-background p-4">
        <Text className="pb-2 text-center text-5xl font-bold text-foreground">
          Create <Text className="text-primary">T3</Text> Turbo
        </Text>

        <View className="py-2">
          <Text className="font-semibold italic text-primary">
            Press on a post
          </Text>
        </View>
        <View className="py-2">
          {data.map((task) => (
            <Text key={task.id} className="font-semibold italic text-primary">
              {task.title}
            </Text>
          ))}
          {!data.length && (
            <Text className="font-semibold italic text-primary">
              No tasks yet
            </Text>
          )}
        </View>
        <View className="py-2">
          <Button onPress={createTask}>
            <Text>Create task</Text>
          </Button>
          {/* <Button onPress={resetAccount}>
            <Text>Reset</Text>
          </Button> */}
        </View>
      </View>
    </SafeAreaView>
  );
}
