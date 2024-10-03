import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

const Teams = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setnewName] = useState("");
  const [teams, setTeams] = useState([{ name: "mogesh" }, { name: "vignesh" }, { name: "ajay" }]);

  const handleDelete = (idx) => {
    setTeams(teams.filter((val, index) => index !== idx));
  };

  return (
    <View>
      <View className="flex flex-row justify-between w-full h-20 py-4">
        <Text className="text-lg text-purple-700 font-bold">Teams</Text>
        <View className="flex flex-row gap-2">
          <TouchableOpacity
            className="rounded-[15px] bg-purple-600 h-8 w-16 flex items-center justify-center"
            onPress={() => setModalVisible(true)}
          >
            <FontAwesome6 name="user-group" color="white" size={18} />
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-[15px] bg-purple-600 h-8 w-16 flex items-center justify-center"
            onPress={() => setModalVisible(true)}
          >
            <AntDesign name="addusergroup" color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ height: heightPercentageToDP(45) }} showsVerticalScrollIndicator={false}>
        {teams.map((val, index) => (
          <View
            className="border-2 border-purple-500 flex flex-row mb-2 px-2 py-4 rounded-md justify-between"
            key={index}
          >
            <View className="h-10 justify-center items-center ml-4">
              <Text className="text-[17px]">{val.name[0].toUpperCase() + val.name.slice(1)}</Text>
            </View>
            <TouchableOpacity
              className="w-10 h-10 bg-red-500 rounded-md flex justify-center items-center"
              onPress={() => handleDelete(index)}
            >
              <MaterialIcons name="delete" size={25} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          className="w-full h-full bg-black flex-1 justify-center items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <View
            style={{ width: widthPercentageToDP(80) }}
            className="h-fit p-4 rounded-lg  bg-white"
          >
            <View className="w-full mt-2 flex items-end px-2">
              <AntDesign
                name="close"
                size={24}
                color="red"
                onPress={() => setModalVisible(false)}
              />
            </View>
            <TextInput
              onChangeText={(name) => setnewName(name)}
              placeholder="Name"
              className="border rounded-lg border-primary text-black p-2 pl-4 mt-6 w-full h-12"
            />
            <View className="w-full mt-4 flex items-end">
              <TouchableOpacity
                className="bg-green-600 w-16 rounded-md p-3"
                onPress={() => {
                  setTeams([...teams, { name: newName }]);
                  setModalVisible(false);
                }}
              >
                <Text className="text-green-700 font-extrabold text-center">Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Teams;
