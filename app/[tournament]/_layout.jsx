import React, { useState } from "react";
import { useRouter, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Octicons } from "@expo/vector-icons";
import CustomModal from "../../components/CustomModal";

export default function _layout() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  // const title = router?.route?.params?.title || "Default Title";
  console.log(router);

  const updateModalVisible = (val) => {
    setModalVisible(val);
  };

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#7F00FF",
        },
        headerTintColor: "white",
        header: ({ route }) => {
          setTitle(decodeURIComponent(route?.params?.tournament));
          return (
            <View className="w-full bg-[#7F00FF] flex justify-end">
              <View className="flex flex-row justify-between items-center">
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
                <TouchableOpacity
                  className="w-10 h-10 mr-4 rounded-md flex justify-end items-center"
                  onPress={() => setModalVisible(true)}
                >
                  <Octicons name="list-ordered" size={24} color="white" />
                </TouchableOpacity>
              </View>
              {modalVisible && (
                <CustomModal
                  title={title}
                  modalVisible={modalVisible}
                  updateModalVisible={updateModalVisible}
                />
              )}
            </View>
          );
        },
      }}
    ></Stack>
  );
}
