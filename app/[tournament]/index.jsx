import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import Carousel from "react-native-reanimated-carousel";
import * as SQLite from "expo-sqlite";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused } from "@react-navigation/native";

const Index = () => {
  const db = SQLite.openDatabaseSync("smashscore.db");
  const navigation = useNavigation();
  const router = useRouter();
  const isFocussed = useIsFocused();
  const [isDisabled, setIsDisabled] = useState(false);
  const [result, setResult] = useState([]);
  const [data, setData] = useState({
    id: 0,
    title: "",
    mode: "",
    teams: [],
    matches: [],
    result: [],
  });

  const name = useLocalSearchParams();

  const fetchData = async () => {
    try {
      const response = await db.getFirstAsync(`SELECT * FROM tournaments WHERE title = ?`, [
        name["tournament"],
      ]);

      const matches = JSON.parse(response.matches);
      const result = JSON.parse(response.result);
      setIsDisabled(response.finished === 0 ? false : true);

      setData({ ...response, matches: matches, result: result });
      setResult(result);
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    router.setParams({ title: name["tournament"], id: data.id });
  }, [navigation]);

  useEffect(() => {
    if (isFocussed) fetchData();
  }, [isFocussed]);

  const handleWin = async (index, idx, team) => {
    try {
      if (result[index][idx] === team) {
        const updatedResult = result.map((item, i) =>
          i === index ? item.map((innerItem, j) => (j === idx ? "" : innerItem)) : item
        );

        setResult(updatedResult);
        await db.runAsync(`UPDATE tournaments SET result = ? WHERE title = ?`, [
          JSON.stringify(updatedResult),
          data.title,
        ]);
      } else {
        const updatedResult = result.map((item, i) =>
          i === index ? item.map((innerItem, j) => (j === idx ? team : innerItem)) : item
        );

        setResult(updatedResult);

        await db.runAsync(`UPDATE tournaments SET result = ? WHERE title = ?`, [
          JSON.stringify(updatedResult),
          data.title,
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEnd = async () => {
    try {
      const response = await db.runAsync("UPDATE tournaments SET finished = true WHERE id = ?", [
        data.id,
      ]);
      console.log(response);
      router.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1 }} className="justify-center my-6 items-center">
      <Carousel
        loop={false}
        width={wp(90)}
        height={hp(80)}
        // autoPlay={true}
        data={data && data.matches}
        scr
        scrollAnimationDuration={1000}
        // onSnapToItem={(index) => console.log("current index:", index)}
        className="p-2"
        renderItem={({ index }) => (
          <View className="flex flex-1 flex-col bg-teal-50 rounded-xl mx-2 shadow-lg " key={index}>
            <View className="w-full bg-purple-600 p-4 flex items-center rounded-lg">
              <Text className="w-fit text-xl text-white font-bold ">Round {index + 1}</Text>
            </View>
            <View className="flex-1 my-6">
              {data &&
                data.matches[index].map((val, idx) => (
                  <View className="flex w-full h-auto" key={idx}>
                    <Text className="text-center text-lg font-bold text-[#00C9FF]">
                      Match {idx + 1}
                    </Text>
                    <View className="flex rounded-full flex-row w-full p-4 gap-1 shadow-xl">
                      <TouchableOpacity
                        activeOpacity={0.5}
                        disabled={isDisabled}
                        className={`w-1/2 h-14 justify-center py-2 flex items-center bg-white rounded-l-3xl ${
                          result[index]?.[idx]
                            ? result[index][idx] === val["team1"]
                              ? "bg-green-600"
                              : "bg-red-600"
                            : "bg-white"
                        }`}
                        onPress={() => {
                          handleWin(index, idx, val["team1"]);
                        }}
                      >
                        <Text
                          className={`${
                            result[index]?.[idx] ? "text-white" : "text-[#9B00FF]"
                          } font-bold text-[15px]"`}
                        >
                          {val["team1"]}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        disabled={isDisabled}
                        className={`w-1/2 h-14 justify-center py-2 flex items-center bg-white rounded-r-3xl ${
                          result[index]?.[idx]
                            ? result[index][idx] === val["team2"]
                              ? "bg-green-600"
                              : "bg-red-600"
                            : "bg-white"
                        }`}
                        onPress={() => {
                          handleWin(index, idx, val["team2"]);
                        }}
                      >
                        <Text
                          className={`${
                            result[index]?.[idx] ? "text-white" : "text-[#9B00FF]"
                          } font-bold text-[15px]"`}
                        >
                          {val["team2"]}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
            </View>
          </View>
        )}
      />
      {!isDisabled && (
        <TouchableOpacity
          style={{ width: wp(86), height: hp(7) }}
          className=" bg-green-600 rounded-xl flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => handleEnd()}
        >
          <Text className="text-xl font-bold text-[#e3d8fe]">End Tournament</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Index;
