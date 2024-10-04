import React from "react";
import { Stack, useRouter } from "expo-router";

export default function _layout() {

  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    ></Stack>
  );
}
