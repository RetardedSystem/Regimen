import { View, Text, StyleSheet } from "react-native";
import { formatDate } from "@/constants/utils";
import Icons from "@/constants/Icons";
import Colors from "@/constants/Colors";
import TaskWindow from "../kanban/TaskWindow";
import { useState } from "react";

export default function TaskItem({ task, level = 0, color, reloadBoard }: any) {
  const marginLeft = 15 + level * 20;
  const datetime = formatDate(task.deadline);
  const [showWindow, setShowWindow] = useState(false);
  return (
    <View
      style={[
        styles.taskItemContainer,
        { marginLeft, width: `${100 - marginLeft / 3}%` },
      ]}
    >
      <View style={[styles.line, { backgroundColor: color.main }]} />
      <Icons.goalNoChild
        color={color.dark}
        fill={color.light}
        style={styles.icons}
      />

      <Text
        style={[styles.title, { color: color.dark }]}
        numberOfLines={1}
        onPress={() => setShowWindow(true)}
      >
        Task : {task.title}
      </Text>

      {showWindow && (
        <TaskWindow
          task={task}
          onClose={() => setShowWindow(false)}
          reloadBoard={reloadBoard}
        />
      )}
      <View style={styles.deadLineContainer}>
        {task.completed_at === null ? (
          <Icons.deadline width={10} height={10} color={color.main} />
        ) : (
          <Icons.bigTick width={10} height={10} color={color.main} />
        )}
        <Text style={styles.deadline}>{datetime}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    width: "100%",
    minHeight: 40,
    justifyContent: "flex-start",
  },
  line: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 4,
    height: 40,
  },
  icons: {
    position: "absolute",
    top: 14,
    zIndex: 1,
    left: -5,
  },

  title: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Nunito_400Regular",
    marginLeft: 20,
  },
  deadLineContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  deadline: {
    color: Colors.grey,
    fontSize: 10,
    fontFamily: "Nunito_400Regular",
    marginLeft: 5,
  },
});
