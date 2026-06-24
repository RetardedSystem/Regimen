import { View } from "react-native";
import PagerView from "react-native-pager-view";
import WeekStatusTracker from "./WeeklyStatus";

type Props = {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
};

export default function WeeklyPager({ currentDate, setCurrentDate }: Props) {
  return (
    <PagerView
      style={{ height: 150 }}
      initialPage={3}
      onPageSelected={(e) => {
        const newPage = e.nativeEvent.position;

        const offset = newPage - 3;

        const date = new Date(currentDate);

        date.setDate(date.getDate() + offset * 7);

        setCurrentDate(date);
      }}
    >
      {Array.from({ length: 7 }).map((_, index) => {
        const offset = index - 3;

        const weekDate = new Date();

        weekDate.setDate(weekDate.getDate() + offset * 7);

        return (
          <View
            key={index}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <WeekStatusTracker currentDate={weekDate} />
          </View>
        );
      })}
    </PagerView>
  );
}
