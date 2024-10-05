import React from "react";
import { Stack } from "expo-router";
import { View, Text } from "react-native";

export default function _layout() {
  return (
    <>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#9B00FF" /> */}
      <Stack
        screenOptions={{
          headerShown: true,
          header: () => (
            <View className="bg-[#7F00FF] h-12 flex items-end justify-end">
              <Text className="bg-[#7F00FF] text-white mr-4">v1.0</Text>
            </View>
          ),
        }}
      ></Stack>
    </>
  );
}
