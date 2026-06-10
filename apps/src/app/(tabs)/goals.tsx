import ScreenBackground from "@/components/ScreenBackground";
import { background } from "@/constants/Images";
import { Text, View } from "react-native";

export default function Goal() {
  return (
    <ScreenBackground
      image={background.goalsBg}
    >
      <View>
        <Text>Goals</Text>
      </View>
    </ScreenBackground>
  );
}
