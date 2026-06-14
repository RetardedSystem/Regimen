import Icons from "@/constants/Icons";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PeriodSelector from "./PeriodSelector";

type CalendarProps = {
  currentDate: {
    today: Date;
    startOfWeek: Date;
    endOfWeek: Date;
  };
};

export default function Journey({ currentDate }: CalendarProps) {
  const [period, setPeriod] = useState<"monthly" | "weekly" | "yearly">(
    "weekly",
  );
  return (
    <View style={styles.container}>
      <View style={styles.Timeline}>
        <Icons.calendar width={28} height={15}></Icons.calendar>
        <Text style={styles.Date}>
          {currentDate.startOfWeek.getDate()} -{currentDate.endOfWeek.getDate()}{" "}
          {""}
          {currentDate.endOfWeek.toLocaleString("en-GB", {
            month: "short",
            year: "numeric",
          })}
        </Text>
      </View>
      <View style={styles.Calendar}>
        {" "}
        <PeriodSelector period={period} setPeriod={setPeriod} />
      </View>
      <View style={styles.Insight}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "22%",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  Date: {
    width: 110,
    height: 20,
    fontSize: 13,
    paddingBottom:"1.5%",
    fontFamily: "Nunito-Regular",

  },

  Timeline: {
    flexDirection: "row",
  },

  frameIcon: {
    height: "72.22%",
    width: "10.24%",
  },
  Calendar: {
    height: "20%",
    width: "50%",
  },
  Insight: {
    backgroundColor: "yellow",
    height: "60%",
    width: "100%",
  },
});
