import ScreenBackground from "@/components/ScreenBackground";
import {background} from "@/constants/Images";
import { Text, View } from "react-native";

export default function Domain() {
  return (
    <ScreenBackground
      image={background.domainsBg}
    >
      <View>
        <Text>Domains</Text>
      </View>
    </ScreenBackground>
  );
}
