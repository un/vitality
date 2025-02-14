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

const followingSchema = z.object({
  following: z.string(),
});

type FollowingSchema = z.infer<typeof followingSchema>;

interface OnboardingProps {
  onComplete: () => void;
}

export default function OnboardingFollowing({ onComplete }: OnboardingProps) {
  const [isLoading, setIsLoading] = useState(false);
  const db = useDB();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(followingSchema),
    defaultValues: {
      following: "",
    },
  });

  const onSubmit = async (data: FollowingSchema) => {
    setIsLoading(true);
    await db
      .update(userProfile)
      .set({
        following: data.following,
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
        <Text className="text-balance text-center font-semibold italic text-primary">
          Do you follow any health influencers?
        </Text>
        <Text className="text-balance text-center font-semibold italic text-primary">
          What do you think of them?
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
              placeholder="I like Bryan Johnson and Jeff Nippard. Not such a big fan of Hubermann. I also like Peer Rich."
              numberOfLines={3}
            />
          )}
          name="following"
        />
        {errors.following && <Text>{errors.following.message}</Text>}
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
          <Text>Save your Influencers</Text>
        </Button>
      </Animated.View>
    </View>
  );
}
