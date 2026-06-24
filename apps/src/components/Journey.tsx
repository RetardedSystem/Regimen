import { useState } from "react";
import { StyleSheet, View } from "react-native";
import DateRange from "./DateRange";
import PeriodSelector from "./PeriodSelector";
import WeeklyPager from "./WeeklyPager";

type CalendarProps = {
  currentDate: {
    today: Date;
    startOfWeek: Date;
    endOfWeek: Date;
  };
};

export default function Journey() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");

  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <View style={styles.container}>
      <View style={styles.Timeline}>
        <PeriodSelector period={period} setPeriod={setPeriod} />
        <DateRange period={period} currentDate={currentDate} />
      </View>
      <View>
        {period == "weekly" && (
          <WeeklyPager
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        )}
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
  },

  Date: {
    width: 110,
    height: 20,
    fontSize: 13,
    paddingBottom: "1.5%",
    fontFamily: "Nunito-Regular",
  },
});
