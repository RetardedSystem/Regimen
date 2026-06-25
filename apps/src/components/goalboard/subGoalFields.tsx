import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FormField from "@/components/formField";
import Colors from "@/constants/Colors";
import { useState } from "react";
import Icons from "@/constants/Icons";

export default function SubGoalFields({
  subGoal,
  index,
  subGoals,
  setSubGoals,
}: any) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <View key={subGoal.id} style={styles.subGoalContainer}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setCollapsed(!collapsed)}
      >
        <Text style={styles.subGoalTitle}>Subgoal {index + 1}</Text>
        {collapsed ? (
          <Icons.expand width={15} height={15} />
        ) : (
          <Icons.collapse width={15} height={15} />
        )}

        <Icons.trashcan
          style={styles.trash}
          width={15}
          onPress={() => {
            setSubGoals(subGoals.filter((_, i) => i !== index));
          }}
        />
      </TouchableOpacity>
      {!collapsed && (
        <>
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
                value={
                  subGoal.deadline ? new Date(subGoal.deadline) : new Date()
                }
                onChange={(date) => {
                  const updated = [...subGoals];
                  updated[index].deadline = date.toISOString();
                  setSubGoals(updated);
                }}
                type="datetime"
              />
            </View>
          </View>
        </>
      )}
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
    paddingBottom: 0, // Last Field have 10 Margin Bottom.
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  subGoalTitle: {
    marginRight: 10,
    color: Colors.blue,
    fontSize: 15,
    fontFamily: "Gabarito",
  },
  multiFieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  trash: {
    marginLeft: "auto",
  },
});
