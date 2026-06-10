import { Text, Modal, View, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import Icons from "@/constants/Icons";
import { useState } from "react";
import FormField from "./formField";

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
  onClose: () => void;
};

export default function TaskWindow({ task, onClose }: Props) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [startDate, setStartDate] = useState(new Date(task.start_date));
  const [deadline, setDeadline] = useState(new Date(task.deadline));
  const [goals, setGoals] = useState(task.group_id);

  return (
    <Modal
      transparent
      animationType="fade"
      onRequestClose={onClose} // Write the Closing function.
    >
      {/* The overlay that dims the background, make it so if someone press it the Window closes */}
      <View style={styles.overlay}>
        {/* The actual Window*/}
        <View style={styles.container}>
          <Text style={styles.task_count}>Task {task.id}</Text>

          {/* Title */}
          <FormField
            name="title"
            value={title}
            onChange={setTitle}
            type="text"
          />
          {/* Description */}
          <FormField
            name="description"
            value={description}
            onChange={setDescription}
            type="text"
          />

          {/* Start Time + Deadline */}
          <View style={styles.multiFieldContainer}>
            <View style={{ width: "48%" }}>
              <FormField
                name="startTime"
                value={startDate}
                onChange={(date) => setStartDate(date)}
                type="datetime"
              />
            </View>

            <View style={{ width: "48%" }}>
              <FormField
                name="deadline"
                value={deadline}
                onChange={(date) => setDeadline(date)}
                type="datetime"
              />
            </View>
          </View>

          {/* Goals + Domain */}
          <View style={styles.multiFieldContainer}>
            <View style={{ width: "56%" }}>
              <FormField
                name="goals"
                value={"Goal 1"}
                onChange={() => { }}
                type="dropdown"
              />
            </View>

            <View style={{ width: "40%" }}>
              <FormField
                name="domain"
                value={"Work, Personal"}
                onChange={() => { }}
                type="dropdown"
              />
            </View>
          </View>
          <View style={styles.ProgressTitle}></View>
          <Text style={styles.sarcasm}>Sarcasm</Text>
          <Icons.bigTick style={styles.tick} color={Colors.blue} />
          <Icons.trashcan
            style={[styles.tick, { right: 15 }]}
            fill={Colors.light_red}
            color={Colors.red}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "90%",
    height: "50%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 15,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  task_count: {
    alignSelf: "flex-start",
    fontSize: 20,
    fontFamily: "Gabarito",
    fontWeight: 500,
    marginLeft: 10,
    color: Colors.blue,
  },

  multiFieldContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  progressBar: {
    minHeight: 30,
    width: "90%",
    backgroundColor: Colors.black,
  },
  ProgressTitle: {
    minHeight: 15,
    width: "90%",
    backgroundColor: Colors.grey,
  },
  sarcasm: {
    fontSize: 12,
    fontFamily: "Gabarito",
    fontWeight: 500,
    color: Colors.red,
  },
  tick: {
    position: "absolute",
    bottom: 10,
    right: 50,
    width: 30,
    height: 30,
  },
});
