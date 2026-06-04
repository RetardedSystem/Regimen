import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { initDB } from "@/databases/initDB";
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

  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function setup() {
      await initDB();
      setReady(true);
    }

    setup();
  }, []);

  if (!ready) {
    return null;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
