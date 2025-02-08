import { SafeAreaView, Text, View } from "react-native";
import { router, Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { SECURE_STORE_KEY } from "~/utils/constants/security";

const newPasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

type NewPasswordSchema = z.infer<typeof newPasswordSchema>;

export default function Index() {
  const encryptionPassword = SecureStore.getItem(SECURE_STORE_KEY);
  // if no password, redirect to security flow
  //   if (encryptionPassword) {
  //     //redirect to home
  //     router.replace("/");
  //   }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: NewPasswordSchema) => {
    await SecureStore.setItemAsync(SECURE_STORE_KEY, data.password);

    console.log(data);
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
          <Text className="font-sm text-primary">
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
          {errors.password && <Text>This is required.</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Label>
                  <Text>Confirm Password</Text>
                </Label>
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true}
                />
              </>
            )}
            name="confirmPassword"
          />
          {errors.confirmPassword && <Text>This is required.</Text>}

          <Button onPress={handleSubmit(onSubmit)}>
            <Text>Set your Password</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
