import { Tabs } from "expo-router";
// import TabBar from "../../components/TabBar";
import { ViewStyle } from "react-native";

const style: ViewStyle = {
  position: "absolute",
  backgroundColor: "#1E1E1E",
  borderTopWidth: 0,
  elevation: 0,
  bottom: 20,
  left: 20,
  right: 20,
  width: 300,
  borderRadius: 15,
  height: 60,
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: style,
      }}
    // tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="goals" options={{ title: "Goals" }} />
      <Tabs.Screen name="domains" options={{ title: "Domains" }} />
    </Tabs>
  );
}
