import { Text, Modal, View, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import Icons from "@/constants/Icons";
import { useState, useEffect } from "react";
import FormField from "@/components/formField";
import { getGoals } from "@/databases/getGoals";
import { formatSqlDate } from "@/constants/utils";
import { updateTask } from "@/databases/taskQuery";

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
  goal: Goal;
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
export default function GoalWindow({ goal, onClose, reloadBoard }: Props) {
  // Local States for the Task Details
  const [title, setTitle] = useState(goal.title);
  const [startDate, setStartDate] = useState(new Date(goal.start_date));
  const [deadline, setDeadline] = useState(new Date(goal.deadline));
  const [goalID, setGoalID] = useState(goal.goal_id);

  // A callback when Save Icon is Pressed,
  // It updates the Task in the Database
  // Reloads the Board and Closes the Window.
  const handleSave = async () => {
    try {
      const updatedTask = {
        task_id: goal.task_id,
        title: title,
        start_date: formatSqlDate(startDate),
        deadline: formatSqlDate(deadline),
        goal_id: goalID,
      };
      await updateTask(updatedTask);
      reloadBoard();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
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
          <Text style={styles.task_count}>Goal</Text>

          {/* Title */}
          <FormField
            name="title"
            value={title}
            onChange={setTitle}
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
