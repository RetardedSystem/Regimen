import Icons from "@/constants/Icons";
import { StyleSheet, Text, View } from "react-native";

export default function DateRange() {
  return (
    <View style={styles.container}>
      <Icons.calendar width={16} height={16} />

      <Text style={styles.text}>01 - 07 April 2026</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 8,
  },

  text: {
    color: "#313337",
    fontFamily: "nunito",
    fontSize: 13,
    fontWeight: 400,
    wordWrap: "break-word",
  },
});
