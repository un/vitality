import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { SECURE_STORE_KEY } from "~/utils/constants/security";

const newPasswordSchema = z.object({
  password: z.string().min(8),
});

type NewPasswordSchema = z.infer<typeof newPasswordSchema>;

export default function SecuritySetup() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const onSubmit = async (data: NewPasswordSchema) => {
    await SecureStore.setItemAsync(SECURE_STORE_KEY, data.password);
    router.replace("/"); // This will trigger the initialization flow again
  };

  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen options={{ title: "Create Password" }} />
      <View className="h-full w-full bg-background p-4">
        <Text className="pb-2 text-center text-5xl font-bold text-foreground">
          Augmented
        </Text>

        <View className="py-2">
          <Text className="font-semibold italic text-primary">
            Set a password to encrypt your data
          </Text>
          <Text className="text-primary">
            Store it securely, if you forget the password, your account CAN NOT
            be recovered and will need to be created again
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
            name="password"
          />
          {errors.password && <Text>{errors.password.message}</Text>}

          <Button onPress={handleSubmit(onSubmit)}>
            <Text>Set your Password</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
