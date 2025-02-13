import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Tabs } from "expo-router";

import { AddNewTrackerModal } from "~/components/modals/addNewTracker";
import { Header } from "~/components/nav/header";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function Index() {
  const [showNewTrackerModal, setShowNewTrackerModal] = useState(false);
  // const db = useDB();
  // const router = useRouter();

  // const { data } = useLiveQuery(db.query.tasks.findMany());

  // async function createTask() {
  //   await db.insert(tasks).values({
  //     description: "description",
  //     id: Math.floor(Math.random() * 1000000).toString(),
  //     status: "todo",
  //     title: "title",
  //   });
  // }

  // async function resetTasks() {
  //   await db.delete(tasks);
  // }
  // async function resetAccount() {
  //   await SecureStore.deleteItemAsync(SECURE_STORE_KEY);
  //   await db.delete(userProfile);
  //   await db.delete(tasks);
  //   router.replace("/");
  // }

  return (
    <SafeAreaView className="bg-sand-3 flex h-full w-full flex-col items-center justify-center gap-8">
      <AddNewTrackerModal
        modalVisible={showNewTrackerModal}
        setModalVisible={setShowNewTrackerModal}
      />
      <Tabs.Screen options={{ header: () => <Header /> }} />
      <View className="h-full w-full p-4">
        <Text className="pb-2 text-center text-5xl font-bold">Augmented</Text>
        <Button
          onPress={() => setShowNewTrackerModal(true)}
          title="Add New Tracker"
        />
        {/* <Button onPress={resetTasks}>
          <Text>Reset tasks</Text>
        </Button>

        <View className="py-2">
          <Text className="font-semibold italic">Press on a post</Text>
        </View>
        <View className="py-2">
          {data.map((task) => (
            <Text key={task.id} className="font-semibold italic">
              {task.title}
            </Text>
          ))}
          {!data.length && (
            <Text className="font-semibold italic">No tasks yet</Text>
          )}
        </View>
        <View className="py-2">
          <Button onPress={createTask}>
            <Text>Create task</Text>
          </Button> */}
        {/* <Button onPress={resetAccount}>
            <Text>Reset</Text>
          </Button> */}
        {/* </View> */}
      </View>
    </SafeAreaView>
  );
}
