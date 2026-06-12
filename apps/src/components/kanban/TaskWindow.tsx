import { Text, Modal, View, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import Icons from "@/constants/Icons";
import { useState, useEffect } from "react";
import FormField from "./formField";
import { getGoals } from "@/databases/getGoals";

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

type Props = {
  task: Task;
  onClose: () => void;
};

const priporityOptions = [
  { label: "Low", value: 1 },
  { label: "Medium", value: 2 },
  { label: "High", value: 3 },
];

const recurrenceTypeOptions = [
  { label: "None", value: null },
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

export default function TaskWindow({ task, onClose }: Props) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [startDate, setStartDate] = useState(new Date(task.start_date));
  const [deadline, setDeadline] = useState(new Date(task.deadline));

  // This for the Goal Dropdown.
  const [goalID, setGoalID] = useState(task.goal_id);
  const [dropdownGoals, setDropdownGoals] = useState([]);

  useEffect(() => {
    async function fetchGoals() {
      const goals = await getGoals();

      const data = goals.map((goal) => ({
        label: goal.title,
        value: goal.id,
      }));

      setDropdownGoals(data);
    }

    fetchGoals();
  }, []);
  // Dropdown being consistent with every render. that why its a state.

  const [priority, setPriority] = useState(task.priority);
  const [recurrenceType, setRecurrenceType] = useState(task.recurrence_type);

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
          <Text style={styles.task_count}>Task {task.task_id}</Text>

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

          {/* Goals + Priority */}
          <View style={styles.multiFieldContainer}>
            <View style={{ width: "58%" }}>
              <FormField
                name="goals"
                value={goalID}
                data={dropdownGoals}
                onChange={setGoalID}
                type="dropdown"
              />
            </View>

            <View style={{ width: "38%" }}>
              <FormField
                name="priority"
                value={priority}
                data={priporityOptions}
                onChange={setPriority}
                type="dropdown"
              />
            </View>
          </View>

          {/* RecursionType + Recursion Days*/}
          <View style={styles.multiFieldContainer}>
            <View style={{ width: "45%" }}>
              <FormField
                name="recurringType"
                value={recurrenceType}
                data={recurrenceTypeOptions}
                onChange={setRecurrenceType}
                type="dropdown"
              />
            </View>

            <View style={{ width: "51%" }}>
              <FormField
                name="domain"
                value={"Work, Personal"}
                data={dropdownGoals}
                onChange={() => { }}
                type="dropdown"
              />
            </View>
          </View>

          <View style={styles.ProgressTitle}></View>
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
