import Colors from "@/constants/Colors";
import { MoodStatus } from "@/constants/Images";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  currentDate: Date;
};

function getStatusColor(xp: number) {
  if (xp < 10) return Colors.red; // Red
  if (xp < 20) return Colors.yellow; // Yellow
  return Colors.blue; // Blue
}

function getMoodStatus(xp: number) {
  if (xp < 10) return <MoodStatus.Angry width={20} height={20} />;
  if (xp < 20) return <MoodStatus.Neutral width={20} height={20} />;
  return <MoodStatus.Happy width={20} height={20} />;
}

export default function WeekStatusTracker({ currentDate }: Props) {
  const startOfWeek = new Date(currentDate);
  const day = currentDate.getDay() === 0 ? 7 : currentDate.getDay();

  startOfWeek.setDate(currentDate.getDate() - day + 1);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return {
      day: date.getDate(),
      label: date
        .toLocaleString("en-US", {
          weekday: "short",
        })
        .toUpperCase(),
      xp: Math.floor(Math.random() * 40), // temporary
      active: date.toDateString() === new Date().toDateString(),
    };
  });
  return (
    <View style={styles.row}>
      {weekDays.map((item) => (
        <View key={item.day} style={styles.column}>
          <Text style={styles.number}>{item.day}</Text>
          <View
            style={[
              styles.statusBox,
              { backgroundColor: getStatusColor(item.xp) },
            ]}
          >
            {getMoodStatus(item.xp)}
          </View>

          <Text style={[styles.day, item.active && styles.activeDay]}>
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: "100%",
  },

  column: {
    flex: 1,
    alignItems: "center",
  },

  number: {
    color: "#9A9A9A",
    marginBottom: 8,
  },

  avatar: {
    fontSize: 32,
  },

  day: {
    marginTop: 8,
    color: "#9A9A9A",
  },
  statusBox: {
    width: 42,
    height: 42,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  activeDay: {
    backgroundColor: "#5FA1CA",
    color: "white",
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: "hidden",
  },
});
