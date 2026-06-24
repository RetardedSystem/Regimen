import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FormField from "@/components/formField";
import Colors from "@/constants/Colors";
import { useState } from "react";

export default function SubGoalFields({
  subGoal,
  index,
  subGoals,
  setSubGoals,
}: any) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <View key={subGoal.id} style={styles.subGoalContainer}>
      <Text style={styles.subGoalTitle}>Subgoal {index + 1}</Text>

      {/* Title */}
      <FormField
        name="title"
        value={subGoal.title}
        onChange={(value) => {
          const updated = [...subGoals];
          updated[index].title = value;
          setSubGoals(updated);
        }}
        type="text"
      />

      {/* Description */}
      <FormField
        name="description"
        value={subGoal.description ?? ""}
        onChange={(value) => {
          const updated = [...subGoals];
          updated[index].description = value;
          setSubGoals(updated);
        }}
        type="text"
      />

      {/* Start Date + Deadline */}
      <View style={styles.multiFieldContainer}>
        <View style={{ width: "48%" }}>
          <FormField
            name="startTime"
            value={new Date(subGoal.start_date)}
            onChange={(date) => {
              const updated = [...subGoals];
              updated[index].start_date = date.toISOString();
              setSubGoals(updated);
            }}
            type="datetime"
          />
        </View>

        <View style={{ width: "48%" }}>
          <FormField
            name="deadline"
            value={subGoal.deadline ? new Date(subGoal.deadline) : new Date()}
            onChange={(date) => {
              const updated = [...subGoals];
              updated[index].deadline = date.toISOString();
              setSubGoals(updated);
            }}
            type="datetime"
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          setSubGoals(subGoals.filter((_, i) => i !== index));
        }}
      >
        <Text style={{ color: "red" }}>Delete Subgoal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  subGoalContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.light_grey,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  subGoalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  multiFieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
