import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Feather } from "@expo/vector-icons";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import * as SQLite from "expo-sqlite";
// import * as FileSystem from "expo-file-system";

// const databasePath = FileSystem.documentDirectory + "smashscore.db";

// console.log(databasePath);

const Teams = ({ setCurrentTeam }) => {
  const db = SQLite.openDatabaseSync("smashscore.db");

  const [modalVisible, setModalVisible] = useState(false);
  const [allTeamsModal, setAllTeamsModal] = useState(false);
  const [newName, setnewName] = useState("");
  const [save, setSave] = useState(false);
  const [teams, setTeams] = useState([]);
  const [existingTeams, setExistingTeams] = useState([]);
  //   const [teams, setTeams] = useState([{ name: "mogesh" }, { name: "vignesh" }, { name: "ajay" }]);

  const fetchExistingTeams = async () => {
    const response = await db.getAllAsync("SELECT * FROM teams");
    setExistingTeams(response);
  };
  useEffect(() => {
    fetchExistingTeams();
  }, []);

  useEffect(() => {
    setCurrentTeam(teams);
  }, [teams]);

  const handleAdd = async () => {
    setTeams([...teams, { name: newName }]);
    if (save) {
      await db.runAsync("INSERT INTO teams (name) VALUES (?);", [newName]);
      fetchExistingTeams();
    }
    setModalVisible(false);
  };

  const handleDelete = (idx) => {
    setTeams(teams.filter((val, index) => index !== idx));
  };

  const handleDeleteAll = async () => {
    try {
      await db.execAsync("DELETE FROM teams");
      fetchExistingTeams();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteExisting = async (id) => {
    try {
      await db.execAsync(`DELETE FROM teams WHERE id = ${id}`, null);
      fetchExistingTeams();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <View className="flex flex-row justify-between w-full h-20 py-4">
        <Text className="text-lg text-purple-700 font-bold">Teams</Text>
        <View className="flex flex-row gap-2">
          <TouchableOpacity
            className="rounded-[15px] bg-purple-600 h-8 w-16 flex items-center justify-center"
            onPress={() => setAllTeamsModal(true)}
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
            className="h-fit p-4 rounded-lg  bg-white gap-2"
          >
            <View className="w-full mt-2 flex items-end px-2">
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <AntDesign name="close" size={24} color="red" />
              </TouchableOpacity>
            </View>
            <TextInput
              onChangeText={(name) => setnewName(name)}
              placeholder="Name"
              className="border rounded-lg border-primary text-black p-2 pl-4 mt-6 w-full h-12"
            />
            <View className="mt-2 w-full">
              <TouchableOpacity
                className="flex flex-row rounded-md gap-2"
                onPress={() => {
                  setSave(!save);
                }}
              >
                {save ? (
                  <Feather name="check-circle" color="#9B00FF" size={24} />
                ) : (
                  <Entypo name="circle" color="black" size={24} />
                )}
                <Text className="">Save Team</Text>
              </TouchableOpacity>
            </View>
            <View className="w-full mt-4 flex items-end">
              <TouchableOpacity
                className="bg-green-600 w-16 rounded-md p-3"
                onPress={() => handleAdd()}
              >
                <Text className="text-green-700 font-extrabold text-center">Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        visible={allTeamsModal}
        transparent={true}
        onRequestClose={() => {
          setAllTeamsModal(!allTeamsModal);
        }}
      >
        <View
          className="w-full h-full bg-black flex-1 justify-center items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <View
            style={{ width: widthPercentageToDP(80) }}
            className="h-fit px-4 rounded-lg pb-4 bg-white gap-2"
          >
            <View className="flex flex-row items-center h-12 justify-between w-full mb-2">
              <TouchableOpacity
                className="w-fit px-2 h-8 bg-red-500 rounded-md flex flex-row justify-center items-center"
                onPress={() => handleDeleteAll()}
              >
                <Text className="text-white">delete all</Text>
                <MaterialIcons name="delete" size={25} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                className="flex items-center justify-center mr-2 h-full"
                onPress={() => setAllTeamsModal(false)}
              >
                <AntDesign name="closecircleo" size={24} color="red" />
              </TouchableOpacity>
            </View>
            <Text className="w-full text-[20px] text-green-500 font-extrabold text-center">
              Available Teams
            </Text>
            <ScrollView
              style={{ height: heightPercentageToDP(45) }}
              showsVerticalScrollIndicator={false}
            >
              {existingTeams.length > 0 ? (
                existingTeams.map((val) => (
                  <View
                    className="border-2 w-full border-purple-500 flex flex-row mb-2 px-2 py-2 rounded-md justify-between"
                    key={val.id}
                  >
                    <View className="h-8 justify-center items-center ml-4">
                      <Text className="text-[17px]">
                        {val.name[0].toUpperCase() + val.name.slice(1)}
                      </Text>
                    </View>
                    <View className="flex flex-row gap-2">
                      <TouchableOpacity
                        className="w-10 h-10 bg-green-500 rounded-md flex justify-center items-center"
                        // onPress={() => handleDelete(index)}
                        onPress={() =>
                          teams.find((data) => val.name === data.name) ??
                          setTeams([...teams, { name: val.name }])
                        }
                      >
                        {teams.find((data) => val.name === data.name) ? (
                          <Ionicons name="checkmark-done" size={24} color="white" />
                        ) : (
                          <AntDesign name="plus" size={25} color="white" />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="w-10 h-10 bg-red-500 rounded-md flex justify-center items-center"
                        onPress={() => handleDeleteExisting(val.id)}
                      >
                        <MaterialIcons name="delete" size={25} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              ) : (
                <View
                  style={{ height: heightPercentageToDP(30) }}
                  className="w-full mt-10 flex justify-center items-center"
                >
                  <Text className="font-bold text-center text-[15px] mb-3">
                    No Teams are available...
                  </Text>
                  <TouchableOpacity
                    className="w-14 h-14 bg-green-500 rounded-full flex justify-center items-center"
                    onPress={() => {
                      setAllTeamsModal(false);
                      setModalVisible(true);
                    }}
                  >
                    <AntDesign name="plus" size={25} color="white" />
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Teams;
