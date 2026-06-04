// The logics for Date should be done.
import { View, Text, ViewStyle, StyleSheet, ScrollView } from "react-native";
import Colors from "../constants/Colors";
import Filter from "@/components/Filter";
import TaskCard from "@/components/TaskCard";

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

type Prop = {
  title: "todo" | "in_progress" | "done" | "missed";
  tasks: Task[];
  reloadBoard: () => void;
};

export default function KanbanColumn(props: Prop) {
  const { title, container, header } = columnConfig[props.title];

  return (
    <View style={container}>
      <View style={header}>
        {/* Header */}
        <View style={styles.task_count}>
          <Text style={{ color: Colors.black, fontSize: 12 }}>
            {props.tasks.length}
          </Text>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <ScrollView
        style={styles.test}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {props.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={props.reloadBoard}
          />
        ))}
      </ScrollView>
    </View>
  );
}

// Corner Radius Cunt
const borderRadius = 10;

// Global Kanban Element Style, all Kanban Column inherits it.
const container: ViewStyle = {
  flex: 1,
  height: "30%",
  width: "100%",
  borderRadius: borderRadius,
  backgroundColor: Colors.white,
  alignItems: "center",
  shadowOffset: {
    width: 4,
    height: 4,
  },
  shadowOpacity: 0.2,
  shadowRadius: 10,
  elevation: 2,
  marginBottom: 10,
};

// Global Kanban Column Header Style, all Kanban Column Header inherits it.
const header: ViewStyle = {
  height: 35,
  width: "100%",
  borderTopLeftRadius: borderRadius,
  borderTopRightRadius: borderRadius,
  alignItems: "center",
  justifyContent: "center",
};

// Styles for each Kanban Column, they inherit the global styles and add specific properties
const styles = StyleSheet.create({
  // Containers
  todo_container: {
    ...container,
    minHeight: "45%",
    shadowColor: Colors.red,
  },

  backlog_container: {
    ...container,
    minHeight: "20%", // Make it Dynamic based on the number of tasks
    backgroundColor: Colors.red,
    shadowColor: Colors.red,
  },

  in_progress_container: {
    ...container,
    minHeight: "31%",
    shadowColor: Colors.yellow,
  },

  done_container: {
    ...container,
    minHeight: "30%",
    shadowColor: Colors.blue,
  },

  // Headers
  todo_header: {
    ...header,
    backgroundColor: Colors.red,
  },

  in_progress_header: {
    ...header,
    backgroundColor: Colors.yellow,
  },

  done_header: {
    ...header,
    backgroundColor: Colors.blue,
  },

  backlog_header: {
    ...header,
    backgroundColor: Colors.red,
  },

  title: {
    fontFamily: "Gabarito",
    fontSize: 20,
    color: Colors.white,
    textTransform: "uppercase",
  },
  task_count: {
    position: "absolute",
    left: 10,
    width: 21,
    height: 20,
    borderRadius: 9,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  test: {
    position: "absolute",
    top: 44,
    width: "100%",
    height: "85%",
  },
});

const columnConfig = {
  todo: {
    title: "Todo",
    container: styles.todo_container,
    header: styles.todo_header,
  },
  in_progress: {
    title: "Progress",
    container: styles.in_progress_container,
    header: styles.in_progress_header,
  },
  done: {
    title: "Done",
    container: styles.done_container,
    header: styles.done_header,
  },
  missed: {
    title: "Backlog",
    container: styles.backlog_container,
    header: styles.backlog_header,
  },
};
