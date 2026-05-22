import ScreenBackground from "@/components/ScreenBackground";
import { Text, View } from "react-native";

export default function Goal() {
  return (
    <ScreenBackground
      image={require('../../../assets/Goals_bg.png')}
    >
      <View>
        <Text>Goals</Text>
      </View>
    </ScreenBackground>
  );
}
