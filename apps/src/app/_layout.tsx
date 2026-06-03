import { Stack } from "expo-router";
import { initDB } from "@/databases/initDB";
import { useEffect } from "react";
import {
  Nunito_200ExtraLight,
  Nunito_400Regular,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Nunito_200ExtraLight,
    Nunito_400Regular,
    Nunito_700Bold,
  });

  useEffect(() => {
    initDB();
  }, []);
  return <Stack screenOptions={{ headerShown: false }} />;
}
