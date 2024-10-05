import { View, TouchableOpacity, Modal, FlatList, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";

const CustomModal = ({ id, title, modalVisible, updateModalVisible }) => {
  const db = SQLite.openDatabaseSync("smashscore.db");
  const [result, setResult] = useState([]);

  const updatePoints = (teams, result) => {
    result.forEach((round) => {
      round.forEach((winner) => {
        const team = teams.find((team) => team.name.trim() === winner.trim());
        if (team) {
          team.points += 1;
        }
      });
    });
    return teams;
  };

  const fetchData = async () => {
    let response;
    console.log(title);
    if (id) {
      response = await db.getAllAsync("SELECT teams, result FROM tournaments WHERE id = ?", [id]);
    } else {
      response = await db.getAllAsync("SELECT teams, result FROM tournaments WHERE title = ?", [
        title,
      ]);
    }
    console.log(response);

    const points = JSON.parse(response[0].result);
    const teams = JSON.parse(response[0].teams).map((val) => ({ name: val, points: 0 }));

    const results = updatePoints(teams, points);

    setResult(results);
  };

  useEffect(() => {
    if (modalVisible) fetchData();
  }, [modalVisible]);

  const renderTableHeader = () => (
    <View className="flex flex-row justify-between py-4 bg-[#9B00FF]">
      <Text className="font-bold text-white flex-1 text-center">S.No</Text>
      <Text className="font-bold text-white flex-1 text-center">Teams</Text>
      <Text className="font-bold text-white flex-1 text-center">Points</Text>
    </View>
  );

  const renderTableRow = ({ item, index }) => (
    <View className="flex flex-row py-4 border-b border-[#ccc]">
      <Text className="flex-1 text-center">{index + 1}</Text>
      <Text className="flex-1 text-center">{item.name}</Text>
      <Text className="flex-1 text-center">{item.points}</Text>
    </View>
  );

  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      transparent={true}
      elevation={5}
      onRequestClose={() => {
        updateModalVisible(!modalVisible);
      }}
    >
      <View
        className="w-full h-full bg-black flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      >
        <View style={{ width: wp(80) }} className="h-fit p-4 rounded-lg  bg-white gap-2">
          <View className="w-full mt-2 flex items-end px-2">
            <TouchableOpacity onPress={() => updateModalVisible(false)}>
              <AntDesign name="close" size={24} color="red" />
            </TouchableOpacity>
          </View>
          <FlatList
            ListHeaderComponent={renderTableHeader}
            data={result}
            renderItem={renderTableRow}
            keyExtractor={(item, index) => index.toString()}
            className="my-4"
            ListEmptyComponent={
              <Text className=" border-b border-l border-r py-4 text-center">
                No data available
              </Text>
            }
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
