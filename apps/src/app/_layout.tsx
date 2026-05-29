import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { initDB } from "@/databases/initDB";
import { useEffect } from "react";

export default function RootLayout() {
  const [loaded] = useFonts({
    Manjari_Regular: require("../constants/Fonts/Manjari-Regular.ttf"),
    Manjari_Bold: require("../constants/Fonts/Manjari-Bold.ttf"),
    Manjari_Thin: require("../constants/Fonts//Manjari-Thin.ttf"),
  });
  useEffect(() => {
    initDB();
  }, []);
  return <Stack screenOptions={{ headerShown: false }} />;
}
