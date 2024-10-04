import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";

const Index = () => {
  const navigation = useNavigation();

  const name = useLocalSearchParams();
  console.log(name["newtournament"]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: name["newtournament"] || "New Tournament" });
  }, [navigation]);

  return <View>{/* <Text>{matches}</Text> */}</View>;
};

export default Index;
