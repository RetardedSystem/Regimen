import {
  Text,
  View,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Colors from "@/constants/Colors";
import Icons from "@/constants/Icons";
import { useState } from "react";
import { completeTasks } from "@/databases/completeTask";
import TaskWindow from "./TaskWindow";
import { formatDateTime } from "@/constants/utils";

type Task = {
  id: number;
  task_id: number;
  title: string;
  description: string;
  status: string;
  date: string;
  start_date: string;
  deadline: string;
  completed_at: string;
  goal_id: number;
  domain: string;
  priority: number;
  is_recurring: number;
  recurrence_days: string;
  recurrence_type: string;
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
  const Category_Icon = Icons[task.domain];
  const backgroundColor = categoryColors[task.status] || Colors.white;
  const highlightColor = highlightColors[task.status] || Colors.grey;
  const [showWindow, setShowWindow] = useState(false);
  const datetime =
    task.status === "done"
      ? formatDateTime(task.completed_at)
      : formatDateTime(task.deadline);

  return (
    <Pressable
      style={[styles.container, { backgroundColor }]}
      onPress={() => setShowWindow(true)}
    >
      {showWindow && (
        <TaskWindow task={task} onClose={() => setShowWindow(false)} />
      )}
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
            {datetime}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.checkButton, isCompleted && styles.completedButton]}
        onPress={handleComplete}
      >
        {isCompleted && <Icons.smalltick color={Colors.blue} />}
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
