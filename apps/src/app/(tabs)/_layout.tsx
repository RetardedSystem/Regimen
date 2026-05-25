import { Tabs } from "expo-router";
import TabBar from "../../components/TabBar";
import Colors from "../../constants/Colors";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.icon_active,
        tabBarInactiveTintColor: Colors.white,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "transparent",
          height: "100%",
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="goals" options={{ title: "Goals" }} />
      <Tabs.Screen name="domains" options={{ title: "Domains" }} />
    </Tabs>
  );
}
