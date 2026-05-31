import { Text, View, Pressable, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import Icons from "../constants/Icons";

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

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  return (
    <Pressable style={styles.container} onPress={() => console.log(task)}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.deadline}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    width: "90%",
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 5,
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    position: "absolute",
    top: 16,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 10,
    color: Colors.grey,
  },
});
