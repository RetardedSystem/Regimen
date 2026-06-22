import ScreenBackground from "@/components/ScreenBackground";
import { Text, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import GoalBoard from "@/components/goalboard/GoalBoard";

export default function Goals() {
  return (
    <ScreenBackground title="goals">
      <Text style={styles.title}>MY GOALS</Text>
      <GoalBoard />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Nunito_700Bold",
    fontSize: 30,
    marginTop: 30,
    marginLeft: 30,
    color: Colors.black,
  },
});
