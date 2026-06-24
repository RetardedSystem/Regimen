import {
  Text,
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Colors from "@/constants/Colors";
import Icons from "@/constants/Icons";
import { useState, useEffect } from "react";
import FormField from "@/components/formField";
import { formatSqlDate } from "@/constants/utils";
import { updateTask } from "@/databases/taskQuery";
import SubGoalFields from "./subGoalFields";

type Goal = {
  id: number;
  description: string | null;
  title: string;
  parent_goal_id: number | null;
  domain: string;
  status: string;
  start_date: string;
  completed_at: string | null;
  deadline: string | null;
  children: Goal[];
};

const domainOptions = [
  { label: "Work", value: "work" },
  { label: "Personal", value: "personal" },
  { label: "Health", value: "health" },
  { label: "Finance", value: "finance" },
  { label: "Education", value: "education" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Social", value: "social" },
];

/**
 * This is the Task Window, it appears when you click on a Task Card, Icons
 * It allows you to edit the task details, Update the Database and Reloads the Board.
 * @param task The Task Object that contains all the details of the Task. @See Task Type.
 * @param onClose A hook from Parent that Closes the Window
 * @param reloadBoard A hook that reload the board and reflect the changes.
 */
export default function GoalWindow({ goal, onClose, reloadBoard }: any) {
  // Local States for the Task Details
  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description);
  const [startDate, setStartDate] = useState(new Date(goal.start_date));
  const [deadline, setDeadline] = useState(new Date(goal.deadline));
  const [domain, setDomain] = useState(goal.domain);

  const [subGoals, setSubGoals] = useState<Goal[]>(goal.children || []);

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
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.task_count}>Goal</Text>

          {/* Title */}
          <FormField
            name="title"
            value={title}
            onChange={setTitle}
            type="text"
          />

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
          {/* Domain */}
          <FormField
            name="domain"
            value={domain}
            data={domainOptions}
            onChange={setDomain}
            type="dropdown"
          />

          <Text style={styles.sectionTitle}>Subgoals</Text>

          {subGoals.map((subGoal, index) => (
            <SubGoalFields
              key={subGoal.id}
              subGoal={subGoal}
              index={index}
              subGoals={subGoals}
              setSubGoals={setSubGoals}
            />
          ))}

          <TouchableOpacity
            style={styles.addSubgoalButton}
            onPress={() => {
              setSubGoals([
                ...subGoals,
                {
                  id: Date.now(), // temporary id
                  title: "",
                  description: "",
                  parent_goal_id: goal.id,
                  domain: goal.domain,
                  status: "todo",
                  start_date: new Date().toISOString(),
                  completed_at: null,
                  deadline: null,
                  children: [],
                },
              ]);
            }}
          >
            <Text>Add Subgoal</Text>
          </TouchableOpacity>

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
        </ScrollView>
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
    minHeight: "60%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 15,
    flexDirection: "column",
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

  tick: {
    position: "absolute",
    bottom: 10,
    right: 50,
    width: 30,
    height: 30,
  },
});
