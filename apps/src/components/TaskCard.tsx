import {
  Text,
  View,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Colors from "../constants/Colors";
import Icons from "../constants/Icons";
import { useState } from "react";
import { completeTasks } from "@/databases/completeTask";

type Task = {
  category: string;
  completed_at: string;
  deadline: string;
  description: string;
  group_id: number;
  id: number;
  is_recurring: number;
  recurrence_days: string;
  recurrence_type: string;
  start_date: string;
  status: string;
  title: string;
};

const categoryColors: Record<string, string> = {
  todo: Colors.light_red,
  in_progress: Colors.light_yellow,
  done: Colors.light_blue,
  missed: Colors.light_red,
};

const highlightColors: Record<string, string> = {
  done: Colors.blue,
  missed: Colors.red,
  in_progress: Colors.yellow,
  todo: Colors.red,
};

type Props = {
  task: Task;
  onStatusChange: () => void;
};

export default function TaskCard({ task, onStatusChange }: Props) {
  async function handleComplete() {
    await completeTasks(task.id);
    onStatusChange();
  }
  const isCompleted = task.status === "done";
  const Category_Icon = Icons[task.category];
  const backgroundColor = categoryColors[task.status] || Colors.white;
  const highlightColor = highlightColors[task.status] || Colors.grey;
  return (
    <Pressable
      style={[styles.container, { backgroundColor }]}
      onPress={() => console.log(task)}
    >
      <View style={styles.content}>
        {/* Header: Icon + Title*/}
        <View style={styles.header}>
          <Category_Icon width={15} height={15} />
          <Text style={styles.title}>{task.title}</Text>
        </View>
        {/* Footer : Icon + Deadline*/}
        <View style={styles.footer}>
          <Icons.deadline width={9} height={9} color={highlightColor} />
          <Text style={[styles.deadline, { color: highlightColor }]}>
            {task.deadline}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.checkButton, isCompleted && styles.completedButton]}
        onPress={handleComplete}
      >
        {isCompleted && <Icons.smalltick />}
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    minHeight: 40,
    width: "90%",
    borderRadius: 8,
    padding: 8,
    marginBottom: 7,
  },
  content: {
    flex: 1,
    marginRight: 5,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  title: {
    fontFamily: "Nunito_700Bold",
    fontSize: 12,
    marginLeft: 5,
    marginRight: 6,
  },
  deadline: {
    fontSize: 9,
    color: Colors.grey,
    marginLeft: 5,
  },

  checkButton: {
    width: 20,
    height: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.grey,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },

  completedButton: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.blue,
  },
});
