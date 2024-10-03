import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const home = () => {
  const router = useRouter();
  return (
    <View className="flex justify-center w-full h-full items-center gap-2">
      <TouchableOpacity
        className="bg-purple-500 rounded-full w-20 h-20 flex justify-center items-center"
        onPress={() => router.push("/create")}
      >
        <AntDesign name="plus" color="#FFFFFF" size={32} />
      </TouchableOpacity>
      <Text className="text-xl font-bold text-darkNavyBlue">Start New</Text>
    </View>
  );
};

export default home;
