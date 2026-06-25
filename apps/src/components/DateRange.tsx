import Icons from "@/constants/Icons";
import { StyleSheet, Text, View } from "react-native";
type Props = {
  period: "monthly" | "weekly";
  currentDate: Date;
};

function getWeekRange(date: Date) {
  const start = new Date(date);

  start.setDate(date.getDate() - date.getDay() + 1);

  const end = new Date(start);

  end.setDate(start.getDate() + 6);

  return { start, end };
}

export default function DateRange({ period, currentDate }: Props) {
  let displayText = "";

  if (period === "weekly") {
    const { start, end } = getWeekRange(currentDate);

    displayText =
      `${start.getDate().toString().padStart(2, "0")} - ` +
      `${end.getDate().toString().padStart(2, "0")} ` +
      `${end.toLocaleString("en-GB", {
        month: "long",
        year: "numeric",
      })}`;
  } else {
    displayText = currentDate.toLocaleString("en-GB", {
      month: "long",
      year: "numeric",
    });
  }
  return (
    <View style={styles.container}>
      <Icons.calendar width={16} height={16} />

      <Text style={styles.text}>{displayText}</Text>
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
