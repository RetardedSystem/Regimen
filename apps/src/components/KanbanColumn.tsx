// The logics for Date should be done.
import { View, Text, ViewStyle, StyleSheet, ScrollView } from "react-native";
import Colors from "../constants/Colors";
import { getTasksByStatus } from "@/databases/getTasksByStatus";
import { useEffect, useState } from "react";
import Filter from "@/components/Filter";
import TaskCard from "@/components/TaskCard";

type Prop = {
  title: "todo" | "in_progress" | "done" | "missed";
};

/**
 * KanbanColumn is a component that represents a column in a Kanban board. It takes a title prop that renders the appropriate styles and content based on the title.
 *
 * @param {Prop} props - The Prop object containing the title of the Kanban column, which can be "todo", "in_progress", or "done".
 * @returns {JSX.Element} A React element representing the Kanban column with its header and content.
 */

export default function KanbanColumn(props: Prop) {
  let container: ViewStyle = {};
  let header: ViewStyle = {};
  let title = "";

  // It give any type of Array to Tasks.
  const [tasks, setTasks] = useState<any[]>([]);

  // This is the God of the code.
  // It fetches the tasks based on the status.
  useEffect(() => {
    async function load() {
      const data = await getTasksByStatus(props.title);
      setTasks(data);
    }
    load();
  }, [props.title]);

  // Determine the styles and title based on the provided title prop
  if (props.title === "todo") {
    container = styles.todo_container;
    title = "Todo";
    header = styles.todo_header;
  } else if (props.title === "in_progress") {
    container = styles.in_progress_container;
    title = "Progress";
    header = styles.in_progress_header;
  } else if (props.title === "done") {
    container = styles.done_container;
    title = "Done";
    header = styles.done_header;
  } else if (props.title === "missed") {
    container = styles.backlog_container;
    title = "Backlog";
    header = styles.backlog_header;
  }

  return (
    <View style={container}>
      <View style={header}>
        {/* Header */}
        <View style={styles.task_count}>
          <Text style={{ color: Colors.black, fontSize: 12 }}>
            {tasks.length}
          </Text>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <ScrollView
        style={styles.test}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {tasks.map((task) => (
          <TaskCard task={task} />
        ))}
      </ScrollView>
    </View>
  );
}

// Corner Radius Cunt
const borderRadius = 10;

// Global Kanban Element Style, all Kanban Column inherits it.
const container: ViewStyle = {
  position: "absolute",
  height: "30%",
  width: "44%",
  borderRadius: borderRadius,
  backgroundColor: Colors.white,
  alignItems: "center",
  shadowOffset: {
    width: 2,
    height: 4,
  },
  shadowOpacity: 0.2,
  shadowRadius: 10,
  elevation: 2,
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
  todo_container: {
    ...container,
    height: "40%",
    left: "4%",
    bottom: "27%",
    shadowColor: Colors.red,
  },
  backlog_container: {
    ...container,
    height: "26%", // Make it Dynamic based on the number of tasks
    backgroundColor: Colors.red,
    bottom: "4%",
    left: "4%",
    shadowColor: Colors.red,
  },
  in_progress_container: {
    ...container,
    height: "31%",
    right: "4%",
    bottom: "36%",
    shadowColor: Colors.yellow,
  },
  done_container: {
    ...container,
    height: "30%",
    right: "4%",
    bottom: "4%",
    shadowColor: Colors.blue,
  },
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
    fontFamily: "Outfit-Bold",
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
    backgroundColor: "transparent",
    top: 44,
    width: "100%",
    height: 220,
  },
});
