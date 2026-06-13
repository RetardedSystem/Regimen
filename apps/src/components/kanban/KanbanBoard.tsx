import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import KanbanColumn from "@/components/kanban/KanbanColumn";
import { getTasks } from "@/databases/getTasks";

export default function KanbanBoard() {
  // It give any type of Array to Tasks.
  const [tasks, setTasks] = useState<any[]>([]);

  // It a reusable function fetches all the Tasks
  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  // This keeps a eye on the Task List, and whenever it changes, it will fetch the new Task List and update the Board
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <KanbanColumn
          title="todo"
          tasks={tasks.filter((task) => task.status === "todo")}
          reloadBoard={loadTasks}
        />
        <KanbanColumn
          title="missed"
          tasks={tasks.filter((task) => task.status === "missed")}
          reloadBoard={loadTasks}
        />
      </View>
      <View style={styles.rightColumn}>
        <KanbanColumn
          title="in_progress"
          tasks={tasks.filter((task) => task.status === "in_progress")}
          reloadBoard={loadTasks}
        />
        <KanbanColumn
          title="done"
          tasks={tasks.filter((task) => task.status === "done")}
          reloadBoard={loadTasks}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "70%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  leftColumn: {
    width: "45%",
  },
  rightColumn: {
    width: "45%",
  },
});
