import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Tabs, useRouter } from "expo-router";

import { LoadingView } from "~/components/LoadingView";
import { AddNewTrackerModal } from "~/components/modals/addNewTracker";
import { Header } from "~/components/nav/header";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function Index() {
  const [showNewTrackerModal, setShowNewTrackerModal] = useState(false);
  // const db = useDB();
  const router = useRouter();

  return (
    <SafeAreaView className="bg-sand-3 flex h-full w-full flex-col items-center justify-center gap-8">
      <AddNewTrackerModal
        modalVisible={showNewTrackerModal}
        setModalVisible={setShowNewTrackerModal}
      />
      <Tabs.Screen options={{ header: () => <Header /> }} />
      <View className="h-full w-full p-4">
        <LoadingView />
        <Text className="text-center">Generating your dashboard...</Text>
        {/* <Text className="pb-2 text-center text-5xl font-bold">Augmented</Text>
        <Button
          onPress={() => setShowNewTrackerModal(true)}
          title="Add New Tracker"
        /> */}
      </View>
      <Button onPress={() => router.push("/reset")} title="RESET" />
    </SafeAreaView>
  );
}
