import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import RadioButton from "../../components/radioButton";
import Teams from "../../components/Teams";
import generateMatchPairing from "../../components/generateMatchPairing";
import { useRouter } from "expo-router";
import * as SQLite from "expo-sqlite";

const create = () => {
  const router = useRouter();
  const db = SQLite.openDatabaseSync("smashscore.db");
  const [selectedMode, setSelectedMode] = useState(0);
  const [name, setName] = useState("");
  const [teams, setTeams] = useState([]);

  const list = ["Knockout Mode", "Round Robin", "Swiss System"];

  const handleModeChange = (val) => {
    setSelectedMode(val);
  };

  const handleTeamChange = (val) => {
    setTeams(val);
  };

  const handleStart = async () => {
    if (!name) Alert.alert("Please Enter the Tournament name");
    else if (teams.length < 2) Alert.alert("Please Select Atleast 2 teams ");
    else {
      const newTeams = teams.map((val) => val.name);
      const matches = generateMatchPairing(newTeams, selectedMode);
      console.log(matches);
      await db.runAsync("INSERT INTO tournaments (title, mode, matches) VALUES (?, ?, ?)", [
        name,
        selectedMode,
        JSON.stringify(matches),
      ]);

      router.push(`${name}`);
    }
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
        <Teams setCurrentTeam={handleTeamChange} />
      </View>
      <TouchableOpacity
        style={{ width: wp(80), height: hp(6) }}
        className="flex justify-center items-center bg-green-500 rounded-lg"
        onPress={() => handleStart()}
      >
        <Text className="text-white">Start Tournament</Text>
      </TouchableOpacity>
    </View>
  );
};

export default create;
