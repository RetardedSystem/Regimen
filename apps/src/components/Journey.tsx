import Icons from "@/constants/Icons";
import { StyleSheet, Text, View } from "react-native";

type CalendarProps = {
  currentDate: {
    today: Date;
    startOfWeek: Date;
    endOfWeek: Date;
  };
};

export default function Journey({ currentDate }: CalendarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.Timeline}>
        <Icons.calendar style={styles.frameIcon}></Icons.calendar>
        <Text>
          {currentDate.startOfWeek.getDate()} -{" "}
          {currentDate.endOfWeek.getDate()}
          {currentDate.endOfWeek.toLocaleString("en-GB", {
            month: "short",
            year: "numeric",
          })}
        </Text>
      </View>
      <View style={styles.Calendar}></View>
      <View style={styles.Insight}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "20%",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },

  Timeline: {
    backgroundColor: "blue",
    flexDirection: "row",
  },

  frameIcon: {
    height: "72.22%",
    width: "10.24%",
  },
  Calendar: {
    backgroundColor: "pink",
    height: "20%",
    width: "50%",
  },
  Insight: {
    backgroundColor: "yellow",
    height: "60%",
    width: "100%",
  },
});
