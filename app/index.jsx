import { Text, SafeAreaView, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  return (
    <View className="flex-1 flex justify-end">
      <StatusBar style="dark" />
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
          >
            <Text className="text-white w-full text-center text-xl">Let's Start</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
    // <SafeAreaView className="space-y-2 bg-black mt-20" edges={['top']}>
    //   {/* <Text className="bg-lightCyan text-blue-200">Hello</Text>
    // </SafeAreaView>
  );
};

export default index;
