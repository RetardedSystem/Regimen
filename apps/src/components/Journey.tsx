import { useState } from "react";
import { StyleSheet, View } from "react-native";
import DateRange from "./DateRange";
import PeriodSelector from "./PeriodSelector";
import WeekStatusTracker from "./WeeklyStatus";

type CalendarProps = {
  currentDate: {
    today: Date;
    startOfWeek: Date;
    endOfWeek: Date;
  };
};

export default function Journey({ currentDate }: CalendarProps) {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  return (
    <View style={styles.container}>
      <View style={styles.Timeline}>
        <PeriodSelector period={period} setPeriod={setPeriod} />
        <DateRange />
      </View>
      <View>
        {period == "weekly" && <WeekStatusTracker />}
        {period == "monthly"}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  Timeline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  Date: {
    width: 110,
    height: 20,
    fontSize: 13,
    paddingBottom: "1.5%",
    fontFamily: "Nunito-Regular",
  },
});
