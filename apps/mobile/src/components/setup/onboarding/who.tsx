import { useState } from "react";
import { View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { zodResolver } from "@hookform/resolvers/zod";
import { eq } from "drizzle-orm";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Textarea } from "~/components/ui/textarea";
import { useDB } from "~/db";
import { userProfile } from "~/db/schema";

const whoSchema = z.object({
  who: z.string(),
});

type WhoSchema = z.infer<typeof whoSchema>;

interface OnboardingProps {
  onComplete: () => void;
  name: string;
}

export default function OnboardingWho({ onComplete, name }: OnboardingProps) {
  const [isLoading, setIsLoading] = useState(false);
  const db = useDB();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(whoSchema),
    defaultValues: {
      who: "",
    },
  });

  const onSubmit = async (data: WhoSchema) => {
    setIsLoading(true);
    await db
      .update(userProfile)
      .set({
        who: data.who,
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
          Tell me about your lifestyle {name}?
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
            <Textarea
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="w-full"
              placeholder="I'm a morning person and work in tech, I dont smoke and, I go to the gym 2 times a week"
              numberOfLines={3}
            />
          )}
          name="who"
        />
        {errors.who && <Text>{errors.who.message}</Text>}
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
          <Text>Save your Lifestyle</Text>
        </Button>
      </Animated.View>
    </View>
  );
}
