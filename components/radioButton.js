import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { MaterialIcons } from "@expo/vector-icons";

const radioButton = ({ title, list, checked, handleMode }) => {
  return (
    <View>
      <Text className="text-purple-700 font-bold text-lg mt-4">{title}:</Text>
      {list.map((val, index) => (
        <TouchableOpacity
          key={index}
          className="w-full my-1 mx-2 flex h-fit p-1 content-center flex-row"
          onPress={() => handleMode(index)}
        >
          <MaterialIcons
            name={checked === index ? "radio-button-checked" : "radio-button-unchecked"}
            size={26}
            color={checked === index ? "#9B00FF" : "#000000"}
          />
          <Text className="ml-2 text-[16px]">{val}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default radioButton;
