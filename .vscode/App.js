import { Text, SafeAreaView, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";
import * as SQLite from "expo-sqlite";

const index = () => {
  const router = useRouter();
  const db = SQLite.openDatabaseSync("smashscore.db");
  useEffect(() => {
    try {
      db.execAsync(
        `CREATE TABLE IF NOT EXISTS teams (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
          );
          CREATE TABLE IF NOT EXISTS tournaments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            mode INT,
            teams TEXT,
            matches TEXT,
            result TEXT,
            finished BOOLEAN DEFAULT false
          )`,
        [],
        () => {
          console.log("Table created successfully");
        },
        (error) => {
          console.log("Error creating table: ", error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Clear Database

  // const clearDatabase = async () => {
  //   await db.execAsync("DROP TABLE IF EXISTS tournaments;", []);
  // };

  // clearDatabase();

  return (
    <View className="flex-1 flex justify-end">
      {/* <StatusBar style="dark" /> */}
      <LinearGradient
        colors={["#7F00FF", "#E9EFFF"]}
        style={{ width: wp(100), height: hp(100) }}
        className="flex justify-end flex-col"
      >
        <Animated.View className="flex-1 flex justify-end items-center">
          <Text className="text-white font-extrabold text-3xl">Have a nice game!</Text>
        </Animated.View>
        <Animated.View className="flex-1 flex justify-end items-center pb-10">
          <TouchableOpacity
            style={{ width: wp(80), height: hp(8) }}
            className="bg-black rounded-xl flex justify-center"
            onPress={() => router.push("/home")}
            // onPress={() => router.push(`${"new"}`)}
          >
            <Text className="text-white w-full text-center text-xl">Let's Start</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

export default index;
