import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      // This line Romoves the Top Bar
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="goals" options={{ title: "Goals" }} />
      <Tabs.Screen name="domains" options={{ title: "Domains" }} />
    </Tabs>
  );
}
