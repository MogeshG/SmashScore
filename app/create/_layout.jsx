import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        title: "Create New Tournament",
        headerShown: true,
        headerStyle: {
          backgroundColor: "#9B00FF",
        },
        headerTintColor: "white",

      }}
    ></Stack>
  );
}
