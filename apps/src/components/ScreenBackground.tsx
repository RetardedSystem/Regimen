import React, { ReactNode } from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";
import { background } from "@/constants/Images";

type Props = {
  title: "home" | "goals" | "domains";
  children: ReactNode;
};

const imageMap: Record<string, ImageSourcePropType> = {
  home: background.homeBg,
  goals: background.goalsBg,
  domains: background.domainsBg,
};

const ScreenBackground = ({ title, children }: Props) => {
  const image = imageMap[title];
  return (
    <ImageBackground
      source={image}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlay: {
    flex: 1,
  },
});

export default ScreenBackground;
