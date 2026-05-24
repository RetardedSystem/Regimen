// import { View, Text, Easing } from "react-native";
// import Index from "../app/(tabs)/index";
import { createStaticNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@expo-router/js-tabs";

const RootTabs = createBottomTabNavigator({
  screenOptions: {
    animation: "fade",
  },
  screens: {
    Home: Index,
  },
});

export default function TabBar() {
  return <></>;
}
