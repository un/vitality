import { useState } from "react";
import { Modal, Pressable, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "phosphor-react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { uiColors } from "~/utils/uiColors";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ModalWrapper } from "../ui/modalWrapper";
import { Text } from "../ui/text";

const newTrackerSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  color: z.enum([...uiColors]),
});

type NewTrackerSchema = z.infer<typeof newTrackerSchema>;

export function AddNewTrackerModal({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newTrackerSchema),
    defaultValues: {
      name: "",
      description: "",
      color: uiColors[Math.floor(Math.random() * uiColors.length)],
    },
  });

  const onSubmit = async (data: NewTrackerSchema) => {
    setIsLoading(true);
    console.log(data);
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle="formSheet"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <ModalWrapper title="Add New Tracker">
        <View className="flex w-full flex-col gap-8">
          <View className="bg-orange-3 border-sand-5 flex w-full flex-col items-center gap-2 rounded-md border p-2">
            <Text className="text-sm">
              We currently only support custom trackers.
            </Text>
            <Text className="text-sm">Data integrations are coming soon.</Text>
          </View>
          <View className="flex flex-col items-center gap-4">
            <Text className="text-center">
              Describe what you want to track.
            </Text>
            <Input placeholder="I want to track..." className="w-full" />
            <Button
              loading={isLoading}
              onPress={() => handleSubmit(onSubmit)}
              title="Generate my tracker"
              className="w-full"
            />
            <Button
              loading={isLoading}
              onPress={() => handleSubmit(onSubmit)}
              title="Set it up manually"
              className="w-full"
              variant="outline"
            />
          </View>
          {/* <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="I want to track..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
          />
          {errors.name && <Text>This is required.</Text>}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="flex flex-row flex-wrap items-center justify-center gap-2">
                {uiColors.map((color) => (
                  <Pressable
                    key={color}
                    onPress={() => {
                      onChange(color);
                    }}
                    className={`bg-${color}-9 text-sand-9 flex h-10 w-10 items-center justify-center rounded-md`}
                  >
                    {value === color && <Check size={24} color="white" />}
                  </Pressable>
                ))}
              </View>
            )}
            name="color"
          />

          <Text>Hello World!</Text>
          <Button
            loading={isLoading}
            onPress={() => handleSubmit(onSubmit)}
            title="Add Tracker"
          /> */}
        </View>
      </ModalWrapper>
    </Modal>
  );
}
