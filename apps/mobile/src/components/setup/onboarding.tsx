import { View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { openDatabaseAsync } from "expo-sqlite";
import { zodResolver } from "@hookform/resolvers/zod";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { schema } from "~/db";
import { userProfile } from "~/db/schema";
import { DB_NAME } from "~/utils/constants/db";
import { SECURE_STORE_KEY } from "~/utils/constants/security";

const newProfileSchema = z.object({
  name: z.string().min(1),
});

type NewProfileSchema = z.infer<typeof newProfileSchema>;

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    resolver: zodResolver(newProfileSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (data: NewProfileSchema) => {
    const securityKey = await SecureStore.getItemAsync(SECURE_STORE_KEY);
    const db = await openDatabaseAsync(DB_NAME);
    await db.execAsync(`PRAGMA key = "${securityKey}"`);

    const drizzleDb = drizzle(db, { schema });

    await drizzleDb.insert(userProfile).values({
      name: data.name,
    });

    onComplete();
  };

  return (
    <View className="flex w-full flex-col items-center justify-center gap-4">
      <View className="">
        <Text className="font-semibold italic text-primary">
          What should we call you
        </Text>
      </View>

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

      <Button onPress={handleSubmit(onSubmit)} className="w-full">
        <Text>Set your Password</Text>
      </Button>
    </View>
  );
}
