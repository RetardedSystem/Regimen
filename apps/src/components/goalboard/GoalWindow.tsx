import { Text, Modal, View, StyleSheet, ScrollView } from "react-native";
import Colors from "@/constants/Colors";
import Icons from "@/constants/Icons";
import { useState } from "react";
import FormField from "@/components/formField";
import { formatSqlDate } from "@/constants/utils";
import { updateGoal, deleteGoal } from "@/databases/goalQuery";
import SubGoalFields from "./subGoalFields";

type Goal = {
  id: number | null;
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
  const [originalSubGoals] = useState(goal.children);
  // A callback when Save Icon is Pressed,
  // It updates the Task in the Database
  // Reloads the Board and Closes the Window.
  const handleSave = async () => {
    try {
      const deletedIds = originalSubGoals
        .filter(
          (original) => !subGoals.some((current) => current.id === original.id),
        )
        .map((goal) => goal.id);

      const updatedGoal = {
        id: goal.id,
        parent_goal_id: goal.parent_goal_id,
        title: title,
        description: description,
        domain: domain,
        status: goal.status,
        start_date: formatSqlDate(startDate),
        deadline: formatSqlDate(deadline),
        children: subGoals.map((subGoal) => ({
          id: subGoal.id,
          title: subGoal.title,
          description: subGoal.description,
          parent_goal_id: goal.id,
          domain: subGoal.domain,
          status: subGoal.status,
          start_date: formatSqlDate(new Date(subGoal.start_date)),
          completed_at: subGoal.completed_at
            ? formatSqlDate(new Date(subGoal.completed_at))
            : null,
          deadline: subGoal.deadline
            ? formatSqlDate(new Date(subGoal.deadline))
            : null,
        })),
      };
      for (const id of deletedIds) {
        await deleteGoal(id);
      }
      await updateGoal(updatedGoal);
      reloadBoard();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    try {
      await deleteGoal(goal.id);
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
          <ScrollView
            contentContainerStyle={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.header}>
              <Text style={styles.task_count}>Goal</Text>
              <Icons.trashcan
                style={{ marginLeft: "auto" }}
                fill={Colors.light_red}
                color={Colors.red}
                onPress={handleDelete}
              />
              <Icons.bigTick color={Colors.blue} onPress={handleSave} />
            </View>
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
            {subGoals.map((subGoal, index) => (
              <SubGoalFields
                key={subGoal.id}
                subGoal={subGoal}
                index={index}
                subGoals={subGoals}
                setSubGoals={setSubGoals}
              />
            ))}
            <Text
              onPress={() => {
                setSubGoals([
                  ...subGoals,
                  {
                    id: null,
                    title: "",
                    description: "",
                    parent_goal_id: goal.id,
                    domain: goal.domain,
                    status: "in_progress",
                    start_date: new Date().toISOString(),
                    completed_at: null,
                    deadline: null,
                    children: [],
                  },
                ]);
              }}
              style={styles.addSubgoalText}
            >
              Add Subgoal +
            </Text>

            <View style={{ height: 50 }} />
          </ScrollView>
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
    height: "80%",
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    gap: 10,
  },
  task_count: {
    fontSize: 20,
    fontFamily: "Gabarito",
    fontWeight: 500,
    color: Colors.blue,
  },

  multiFieldContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addSubgoalText: {
    color: Colors.blue,
    fontSize: 15,
    fontFamily: "Gabarito",
    marginTop: 15,
    marginBottom: 20,
  },
});
