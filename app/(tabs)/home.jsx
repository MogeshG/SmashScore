import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as SQLite from "expo-sqlite";
import Octicons from "@expo/vector-icons/Octicons";
import { MaterialIcons } from "@expo/vector-icons";

const home = () => {
  const router = useRouter();
  const db = SQLite.openDatabaseSync("smashscore.db");
  const [tournamentsList, setTournamentsList] = useState([]);
  const isFocussed = useIsFocused();

  const fetchTournaments = async () => {
    try {
      const response = await db.getAllAsync("SELECT * FROM tournaments");
      setTournamentsList(response);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isFocussed) fetchTournaments();
  }, [isFocussed]);

  const handleDelete = async (id) => {
    try {
      const response = await db.execAsync(`DELETE FROM tournaments WHERE id = ${id}`, null);
      console.log(response);
      fetchTournaments();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="flex w-full h-full items-center justify-around bg-teal-100">
      <ScrollView style={{ width: wp(90) }} className="p-4">
        {tournamentsList &&
          tournamentsList.map((data) => (
            <View
              className={`w-full h-fit flex flex-row p-2 bg-white justify-between border-2 rounded-md ${
                data.finished ? "border-green-500" : "border-red-600"
              }`}
              key={data.id}
            >
              <View className="flex justify-between w-5/6 ">
                <Text className="text-[20px] font-bold text-purple-600">{data.title}</Text>
                <View className="flex flex-row gap-2 w-full items-center">
                  <Text className="text-[17px]">Status:</Text>
                  <Text
                    className={`text-[17px] font-bold ${
                      data.finished ? "text-green-500" : "text-red-600"
                    }`}
                  >
                    {data.finished ? "Finished" : "In Progress"}
                  </Text>
                </View>
              </View>
              <View>
                <TouchableOpacity className="w-10 h-10  rounded-md flex justify-center items-center">
                  <Octicons name="list-ordered" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-10 h-10  rounded-md flex justify-center items-center"
                  onPress={() => handleDelete(data.id)}
                >
                  <MaterialIcons name="delete" size={25} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </ScrollView>
      <View>
        <TouchableOpacity
          className="bg-purple-500 rounded-full w-20 h-20 flex justify-center items-center"
          onPress={() => router.push("/create")}
        >
          <AntDesign name="plus" color="#FFFFFF" size={32} />
        </TouchableOpacity>
        {/* <Text className="text-xl font-bold text-darkNavyBlue">Start New</Text> */}
      </View>
    </View>
  );
};

export default home;
