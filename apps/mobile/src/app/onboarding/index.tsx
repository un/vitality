import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SequencedTransition,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

import OnboardingActivities from "~/components/setup/onboarding/activities";
import OnboardingConditions from "~/components/setup/onboarding/conditions";
import OnboardingFollowing from "~/components/setup/onboarding/following";
import OnboardingGoals from "~/components/setup/onboarding/goals";
import OnboardingName from "~/components/setup/onboarding/name";
import OnboardingWho from "~/components/setup/onboarding/who";
import { Text } from "~/components/ui/text";
import { useDB } from "~/db";
import { userProfile } from "~/db/schema";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1500));

export default function Index() {
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [setupMessage, setSetupMessage] = useState(0);
  const db = useDB();
  const router = useRouter();

  const { data: userProfileData } = useLiveQuery(
    db.query.userProfile.findFirst(),
  );

  const handleStepChange = async () => {
    const previousStep = onboardingStep;
    setOnboardingStep(0);
    await wait();
    setOnboardingStep(previousStep + 1);
    console.log(" 🔥Step changed to", { onboardingStep, previousStep });
    if (onboardingStep + 1 === 7) {
      for (let i = 0; i < 7; i++) {
        setSetupMessage(i);
        await wait();
      }
      await db.update(userProfile).set({
        onboardingCompleted: true,
      });
      router.replace("/");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setOnboardingStep(1);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="bg-sand-3 flex h-full w-full flex-col items-center justify-center gap-8 p-8">
      <Stack.Screen options={{ title: "Welcome", header: () => null }} />
      {/* <Text>{userProfileData?.name}</Text> */}
      <Animated.View
        layout={SequencedTransition.duration(700)}
        className="flex w-full flex-col items-center justify-center gap-8"
      >
        <View className="flex flex-col items-center gap-2">
          <Animated.View entering={FadeIn.duration(700).delay(500)}>
            <Text className="font-mono-bold text-center text-5xl font-bold">
              Augmented
            </Text>
          </Animated.View>
          <Animated.View entering={FadeIn.duration(700).delay(1500)}>
            <Text className="font-mono font-light">Let's get you set up</Text>
          </Animated.View>
        </View>

        {onboardingStep === 0 && (
          <Animated.View
            entering={FadeIn.duration(300).delay(200)}
            exiting={FadeOut.duration(300).delay(200)}
            className="h-40 w-full"
          >
            <ActivityIndicator />
          </Animated.View>
        )}
        {onboardingStep === 1 && (
          <Animated.View
            exiting={FadeOut.duration(700)}
            className="h-40 w-full"
          >
            <OnboardingName onComplete={() => handleStepChange()} />
          </Animated.View>
        )}
        {onboardingStep === 2 && (
          <Animated.View
            exiting={FadeOut.duration(700)}
            className="h-40 w-full"
          >
            <OnboardingWho
              onComplete={() => handleStepChange()}
              name={userProfileData?.name ?? ""}
            />
          </Animated.View>
        )}
        {onboardingStep === 3 && (
          <Animated.View
            exiting={FadeOut.duration(700)}
            className="h-40 w-full"
          >
            <OnboardingGoals onComplete={() => handleStepChange()} />
          </Animated.View>
        )}
        {onboardingStep === 4 && (
          <Animated.View
            exiting={FadeOut.duration(700)}
            className="h-40 w-full"
          >
            <OnboardingFollowing onComplete={() => handleStepChange()} />
          </Animated.View>
        )}
        {onboardingStep === 5 && (
          <Animated.View
            exiting={FadeOut.duration(700)}
            className="h-40 w-full"
          >
            <OnboardingActivities onComplete={() => handleStepChange()} />
          </Animated.View>
        )}
        {onboardingStep === 6 && (
          <Animated.View
            exiting={FadeOut.duration(700)}
            className="h-40 w-full"
          >
            <OnboardingConditions onComplete={() => handleStepChange()} />
          </Animated.View>
        )}
        {onboardingStep === 7 && (
          <Animated.View
            exiting={FadeOut.duration(700)}
            className="flex h-40 w-full flex-col items-center gap-4"
          >
            <ActivityIndicator />
            {setupMessage === 0 && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                className="text-sand-11 text-center font-mono"
              >
                Saving your data...
              </Animated.Text>
            )}
            {setupMessage === 1 && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                className="text-sand-11 text-center font-mono"
              >
                Checking your goals...
              </Animated.Text>
            )}
            {setupMessage === 2 && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                className="text-sand-11 text-center font-mono"
              >
                Researching who you follow...
              </Animated.Text>
            )}
            {setupMessage === 3 && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                className="text-sand-11 text-center font-mono"
              >
                Asking Sara Ai what data to track...
              </Animated.Text>
            )}
            {setupMessage === 4 && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                className="text-sand-11 text-center font-mono"
              >
                Creating your dashboard...
              </Animated.Text>
            )}
            {setupMessage === 5 && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                className="text-sand-11 text-center font-mono"
              >
                Taking a coffee break...
              </Animated.Text>
            )}
            {setupMessage === 6 && (
              <Animated.Text
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(200)}
                className="text-sand-11 text-center font-mono"
              >
                All done!
              </Animated.Text>
            )}
          </Animated.View>
        )}
        {/* <View className="h-full w-full p-4">
        <Text className="pb-2 text-center text-5xl font-bold">Augmented</Text>
        <Button onPress={() => void 0} title="Add New Tracker" />
        </View> */}
      </Animated.View>
    </SafeAreaView>
  );
}
