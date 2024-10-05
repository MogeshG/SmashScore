import React from "react";
import { useRouter, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function _layout() {
  const router = useRouter();
  console.log(router.title);
  const title = router?.route?.params?.title || "Default Title";

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#7F00FF",
        },
        headerTintColor: "white",
        header: ({ route }) => (
          <View className="w-full bg-[#7F00FF] flex justify-end">
            <View>
              <View className="flex flex-row gap-4 my-2 mx-1 items-center">
                <TouchableOpacity
                  className="rounded-full"
                  onPress={() => router.back()}
                  activeOpacity={0.7}
                >
                  <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-[20px]">
                  {decodeURIComponent(route?.params?.tournament) || "Tournament"}
                </Text>
              </View>
            </View>
          </View>
        ),
      }}
    ></Stack>
  );
}
