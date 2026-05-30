import { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { BottomTabBar } from "expo-router/js-tabs";
import Colors from "@/constants/Colors";

// This is the Type of the Prop that the TabBar component will receive, which is the same as the BottomTabBar component from expo-router
type TabBarProps = ComponentProps<typeof BottomTabBar>;

export default function TabBar(props: TabBarProps) {
  return (
    <>
      <View style={styles.container}>
        <BlurView
          intensity={50}
          tint="systemThickMaterialDark"
          blurMethod="none"
          style={styles.blur}
        >
          <BottomTabBar {...props} />
        </BlurView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  blur: {
    width: "80%",
    height: 60,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: Colors.grey,
    opacity: 0.9,
  },
});
