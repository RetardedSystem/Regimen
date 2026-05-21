import { BlurView, BlurTargetView } from "expo-blur";
import Colors from "../constants/Colors";
import { useRef } from "react";
import { View, StyleSheet } from "react-native";

export default function Screen({ children }) {
  const targetRef = useRef<View | null>(null);

  return (
    <>
      <View style={styles.container}>
        <BlurTargetView ref={targetRef} style={styles.container}>
          <View style={[styles.circle, styles.red_circle]}></View>
        </BlurTargetView>

        <BlurView
          blurTarget={targetRef}
          blurMethod="dimezisBlurView"
          intensity={100}
          tint="light"
          style={styles.blur}
        />
      </View>
      {children}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  circle: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 350,
    height: 350,
    borderRadius: 200,
    opacity: 0.5,
  },

  red_circle: {
    backgroundColor: Colors.red,
  },

  blur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
