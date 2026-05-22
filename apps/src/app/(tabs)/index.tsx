import ScreenBackground from "@/components/ScreenBackground";
import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

export default function Index() {
  return (
    <ScreenBackground
      image={require('../../../assets/Home_bg.png')}
    >
      <View>
        <Text>Home Screen</Text>
      </View>
    </ScreenBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 200,
    height: 200,
    backgroundColor: Colors.red,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 100,

    elevation: 7,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
