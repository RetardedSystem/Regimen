import { View, Text, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import Icons from "@/constants/Icons";
import { useState } from "react";
import GoalItem from "./GoalItem";

type goal = {
  children: goal[];
  completed_at: string;
  deadline: string;
  domain: string;
  id: number;
  parent_goal_id: number | null;
  start_time: string;
  status: string;
  title: string;
};

const colorList = [
  { main: Colors.yellow, light: Colors.light_yellow },
  { main: Colors.blue, light: Colors.light_blue },
  { main: Colors.red, light: Colors.light_red },
];

export default function GoalView({ goal }: { goal: goal }) {
  const Category_Icon = Icons[goal.domain];
  const color = colorList[goal.id % colorList.length];
  const [collapsed, setCollapsed] = useState(true);

  return (
    <LinearGradient
      colors={[color.light, Colors.white]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <Category_Icon
          width={35}
          height={35}
          color={color.main}
          onPress={() => setCollapsed(!collapsed)}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.text}>{goal.title}</Text>
          <View style={styles.deadlineContainer}>
            <Icons.deadline width={12} height={12} color={color.main} />
            <Text style={{ color: color.main, fontSize: 12 }}>Deadline</Text>
          </View>
        </View>
        <Icons.pencil />
      </View>
      {/* Subgoals */}
      {!collapsed && (
        <View style={styles.test}>
          <GoalItem key={goal.id} goal={goal} />
        </View>
      )}
      <LinearGradient
        colors={[color.main, Colors.white]}
        style={styles.progressContainer}
        start={{ x: 0, y: 0 }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    backgroundColor: Colors.white,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 20,
    minHeight: 90,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 9,
    alignItems: "center",
  },
  deadlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  headerContainer: {
    marginTop: 5,
    width: "90%",
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleContainer: {
    flex: 1,
    marginLeft: 10,
  },
  text: {
    fontSize: 20,
    fontFamily: "Gabarito",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  test: {
    width: "90%",
    height: 300,
    backgroundColor: Colors.blue,
    borderRadius: 15,
    marginTop: 10,
  },
  progressContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 20,
    borderRadius: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginTop: 10,
  },
});
