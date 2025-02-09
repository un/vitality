import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
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

export default function Onboarding() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

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

    router.replace("/(home)");
  };

  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen options={{ title: "Setup Onboarding" }} />
      <View className="h-full w-full bg-background p-4">
        <Text className="pb-2 text-center text-5xl font-bold text-foreground">
          Augmented
        </Text>

        <View className="py-2">
          <Text className="font-semibold italic text-primary">
            What should we call you
          </Text>
        </View>

        <View className="py-2">
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
                secureTextEntry={true}
              />
            )}
            name="name"
          />
          {errors.name && <Text>{errors.name.message}</Text>}

          <Button onPress={handleSubmit(onSubmit)}>
            <Text>Set your Password</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
