import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import { Button } from "~/components/ui/button";
import { useDB } from "~/db";
import { tasks } from "~/db/schema";

export default function Index() {
  const db = useDB();

  const { data } = useLiveQuery(db.query.tasks.findMany());

  async function createTask() {
    await db.insert(tasks).values({
      description: "description",
      id: "1",
      status: "todo",
      title: "title",
    });
  }

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
        </View>
      </View>
    </SafeAreaView>
  );
}
