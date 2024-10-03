import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import RadioButton from "../../components/radioButton";
import Teams from "../../components/Teams";

const create = () => {
  const [selectedMode, setSelectedMode] = useState(0);
  const [name, setName] = useState("");

  const list = ["Knockout Mode", "Round Robin", "Swiss System"];

  const handleModeChange = (val) => {
    setSelectedMode(val);
  };

  return (
    <View className="bg-gray-200 h-full w-full flex flex-col items-center justify-between pb-10 ">
      <View style={{ width: wp(85) }} className="flex flex-col h-fit">
        <TextInput
          value={name}
          onChangeText={(name) => setName(name)}
          style={{ height: hp(6) }}
          className="border rounded-lg border-primary p-2 pl-4 mt-6 w-full"
          placeholder="Tournament Name"
        />
        <View>
          <RadioButton
            list={list}
            title="Select Mode"
            checked={selectedMode}
            handleMode={handleModeChange}
          />
        </View>
        <Teams />
      </View>
      <TouchableOpacity style={{width: wp(80), height: hp(6)}} className="flex justify-center items-center bg-green-500 rounded-lg">
        <Text className="text-white">Start Tournament</Text>
      </TouchableOpacity>
    </View>
  );
};

export default create;
