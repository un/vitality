import { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { zodResolver } from "@hookform/resolvers/zod";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { useDB } from "~/db";
import { userProfile } from "~/db/schema";

const newProfileSchema = z.object({
  name: z.string().min(1),
});

type NewProfileSchema = z.infer<typeof newProfileSchema>;

interface OnboardingProps {
  onComplete: () => void;
}

export default function OnboardingName({ onComplete }: OnboardingProps) {
  const [isLoading, setIsLoading] = useState(false);
  const db = useDB();

  const { data: userProfileData } = useLiveQuery(
    db.query.userProfile.findFirst(),
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(newProfileSchema),
    defaultValues: {
      name: userProfileData?.name ?? "",
    },
  });

  const onSubmit = async (data: NewProfileSchema) => {
    setIsLoading(true);
    if (!userProfileData) {
      await db.insert(userProfile).values({
        id: 1,
        name: data.name,
      });
    } else {
      await db
        .update(userProfile)
        .set({
          name: data.name,
        })
        .where(eq(userProfile.id, 1));
    }
    setIsLoading(false);
    onComplete();
  };

  useEffect(() => {
    if (userProfileData?.name) {
      setValue("name", userProfileData.name);
    }
  }, [userProfileData?.name, setValue]);

  return (
    <View className="flex w-full flex-col items-center justify-center gap-4">
      <Animated.View
        entering={FadeIn.duration(300).delay(500)}
        className="w-full"
      >
        <Text className="text-center font-semibold italic text-primary">
          What should we call you?
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
            />
          )}
          name="name"
        />
        {errors.name && <Text>{errors.name.message}</Text>}
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
          <Text>Set your Name</Text>
        </Button>
      </Animated.View>
    </View>
  );
}
