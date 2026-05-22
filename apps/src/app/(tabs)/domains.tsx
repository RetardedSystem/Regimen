import ScreenBackground from "@/components/ScreenBackground";
import { Text, View } from "react-native";

export default function Domain() {
  return (
    <ScreenBackground
      image={require('../../../assets/Domains_bg.png')}
    >
      <View>
        <Text>Domains</Text>
      </View>
    </ScreenBackground>
  );
}
