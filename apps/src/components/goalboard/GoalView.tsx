import { View, Text, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import Icons from "@/constants/Icons";
import { useState } from "react";
import GoalItem from "./GoalItem";
import GoalWindow from "./GoalWindow";

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
  { main: Colors.yellow, light: Colors.light_yellow, dark: Colors.dark_yellow },
  { main: Colors.red, light: Colors.light_red, dark: Colors.dark_red },
  { main: Colors.blue, light: Colors.light_blue, dark: Colors.dark_blue },
];

export default function GoalView({
  goal,
  reloadBoard,
}: {
  goal: goal;
  reloadBoard: () => void;
}) {
  const Category_Icon = Icons[goal.domain];
  const color = colorList[goal.id % colorList.length];
  const [collapsed, setCollapsed] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
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
        <Icons.pencil onPress={() => setShowWindow(true)} />
      </View>
      {showWindow && (
        <GoalWindow
          goal={goal}
          onClose={() => setShowWindow(false)}
          reloadBoard={reloadBoard}
        />
      )}
      {/* Subgoals */}
      {!collapsed && goal.children.length > 0 && (
        <View style={styles.subGoalContainer}>
          <View style={[styles.line, { backgroundColor: color.main }]}></View>
          {goal.children.map((child) => (
            <GoalItem
              key={child.id}
              goal={child}
              color={color}
              reloadBoard={reloadBoard}
            />
          ))}
        </View>
      )}

      {/*Progress Bar*/}
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
  subGoalContainer: {
    width: "90%",
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 30,
    gap: 0,
  },
  line: {
    position: "absolute",
    left: 15,
    bottom: 0,
    width: 4,
    height: "100%",
    top: -20,
    borderRadius: 2,
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
