import Colors from "@/constants/Colors";
import { MoodStatus } from "@/constants/Images";
import { StyleSheet, Text, View } from "react-native";

const data = [
  { day: 1, label: "MON", xp: 35 },
  { day: 2, label: "TUE", xp: 15 },
  { day: 3, label: "WED", xp: 5 },
  { day: 4, label: "THU", xp: 12 },
  { day: 5, label: "FRI", xp: 40 },
  { day: 6, label: "SAT", xp: 8, active: true },
  { day: 7, label: "SUN", xp: 30 },
];

function getStatusColor(xp: number) {
  if (xp < 10) return Colors.red; // Red
  if (xp < 20) return Colors.yellow; // Yellow
  return Colors.blue; // Blue
}

function getMoodStatus(xp: number) {
  if (xp < 10) return <MoodStatus.Angry width={24} height={24} />;
  if (xp < 20) return <MoodStatus.Neutral width={24} height={24} />;
  return <MoodStatus.Happy width={24} height={24} />;
}

export default function WeekStatusTracker() {
  return (
    <View style={styles.row}>
      {data.map((item) => (
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
    justifyContent: "space-between",
  },

  column: {
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
    width: 40,
    height: 55,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  activeDay: {
    backgroundColor: "#5FA1CA",
    width: "100%",

    color: "white",
    borderRadius: 7,
  },
});
