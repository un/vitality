import { useState } from "react";
import { View } from "react-native";
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

interface SecuritySetupProps {
  onComplete: () => void;
}

export default function SecuritySetup({ onComplete }: SecuritySetupProps) {
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    await SecureStore.setItemAsync(SECURE_STORE_KEY, data.password);
    setIsLoading(false);
    onComplete();
  };

  return (
    <View className="flex flex-col items-center justify-center gap-4">
      <Text className="font-semibold italic text-primary">
        Set a password to encrypt your data
      </Text>

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
            className="w-full"
          />
        )}
        name="password"
      />
      {errors.password && <Text>{errors.password.message}</Text>}

      <Button
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        className="w-full"
      >
        <Text>Set your Password</Text>
      </Button>

      <Text className="pt-4 text-sm text-primary">
        Tip: Store it securely, if you forget the password, your account CAN NOT
        be recovered and will need to be created again!
      </Text>
    </View>
  );
}
