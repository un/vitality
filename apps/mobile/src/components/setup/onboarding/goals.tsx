import { useState } from "react";
import { View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { zodResolver } from "@hookform/resolvers/zod";
import { eq } from "drizzle-orm";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { useDB } from "~/db";
import { userProfile } from "~/db/schema";

const goalsSchema = z.object({
  goals: z.string(),
});

type GoalsSchema = z.infer<typeof goalsSchema>;

interface OnboardingProps {
  onComplete: () => void;
}

export default function OnboardingGoals({ onComplete }: OnboardingProps) {
  const [isLoading, setIsLoading] = useState(false);
  const db = useDB();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(goalsSchema),
    defaultValues: {
      goals: "",
    },
  });

  const onSubmit = async (data: GoalsSchema) => {
    setIsLoading(true);
    await db
      .update(userProfile)
      .set({
        goals: data.goals,
      })
      .where(eq(userProfile.id, 1));
    setIsLoading(false);
    onComplete();
  };

  return (
    <View className="flex w-full flex-col items-center justify-center gap-4">
      <Animated.View
        entering={FadeIn.duration(300).delay(500)}
        className="w-full"
      >
        <Text className="text-center font-semibold italic text-primary">
          What do you want to achieve?
        </Text>
      </Animated.View>
      <Animated.View
        entering={FadeIn.duration(300).delay(900)}
        className="w-full"
      >
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="w-full"
              placeholder="I want to live to 100 years old"
            />
          )}
          name="goals"
        />
        {errors.goals && <Text>{errors.goals.message}</Text>}
      </Animated.View>
      <Animated.View
        entering={FadeIn.duration(300).delay(1300)}
        className="w-full"
      >
        <Button
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
          className="w-full"
        >
          <Text>Set your Goals</Text>
        </Button>
      </Animated.View>
    </View>
  );
}
