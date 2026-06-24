import { Text, Modal, View, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import Icons from "@/constants/Icons";
import { useState, useEffect } from "react";
import FormField from "@/components/formField";
import { getGoals } from "@/databases/getGoals";
import { formatSqlDate } from "@/constants/utils";
import { updateTask, deleteTask } from "@/databases/taskQuery";

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

const weekDaysOptions = [
  { label: "Mon", value: "1" },
  { label: "Tue", value: "2" },
  { label: "Wed", value: "3" },
  { label: "Thu", value: "4" },
  { label: "Fri", value: "5" },
  { label: "Sat", value: "6" },
  { label: "Sun", value: "7" },
];

const monthDaysOptions = Array.from({ length: 31 }, (_, i) => ({
  label: (i + 1).toString(),
  value: (i + 1).toString(),
}));

type Props = {
  task: Task;
  reloadBoard: () => void;
  onClose: () => void;
};
/**
 * This is the Task Window, it appears when you click on a Task Card, Icons
 * It allows you to edit the task details, Update the Database and Reloads the Board.
 * @param task The Task Object that contains all the details of the Task. @See Task Type.
 * @param onClose A hook from Parent that Closes the Window
 * @param reloadBoard A hook that reload the board and reflect the changes.
 */
export default function TaskWindow({ task, onClose, reloadBoard }: Props) {
  // Local States for the Task Details
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [startDate, setStartDate] = useState(new Date(task.start_date));
  const [deadline, setDeadline] = useState(new Date(task.deadline));
  const [goalID, setGoalID] = useState(task.goal_id);
  const [priority, setPriority] = useState(task.priority);
  const [recurrenceType, setRecurrenceType] = useState(task.recurrence_type);
  const [recurrenceDays, setRecurrenceDays] = useState(
    task.recurrence_days ? task.recurrence_days.split(",") : [],
  );

  // A callback when Save Icon is Pressed,
  // It updates the Task in the Database
  // Reloads the Board and Closes the Window.
  const handleSave = async () => {
    try {
      const is_recurring = recurrenceType ? 1 : 0;
      const updatedTask = {
        task_id: task.task_id,
        title: title,
        description: description,
        start_date: formatSqlDate(startDate),
        deadline: formatSqlDate(deadline),
        goal_id: goalID,
        priority: priority,
        is_recurring: is_recurring,
        recurrence_type: recurrenceType,
        recurrence_days: recurrenceDays.join(","),
      };
      await updateTask(updatedTask);
      reloadBoard();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      // Call the deleteTask function here
      await deleteTask(task.task_id);
      reloadBoard();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  // This for the Goal Dropdown.
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

  // @todo Make this with Switch
  let recurrenceDaysOptions: any[] = [];

  if (recurrenceType === "weekly") {
    recurrenceDaysOptions = weekDaysOptions;
  } else if (recurrenceType === "monthly") {
    recurrenceDaysOptions = monthDaysOptions;
  }

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
                name="recurringDays"
                value={recurrenceDays}
                data={recurrenceDaysOptions}
                onChange={setRecurrenceDays}
                type="checkbox"
              />
            </View>
          </View>

          <View style={styles.ProgressTitle}></View>
          <View style={styles.ProgressTitle}></View>

          <Text style={styles.sarcasm}>Sarcasm</Text>
          <Icons.bigTick
            style={styles.tick}
            color={Colors.blue}
            onPress={handleSave}
          />
          <Icons.trashcan
            style={[styles.tick, { right: 15 }]}
            fill={Colors.light_red}
            color={Colors.red}
            onPress={handleDelete}
          />
        </View>
      </View>
    </Modal>
  );
}

// Styles Duhhhhh
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
