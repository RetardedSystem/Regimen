import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { useEffect, useState } from "react";
import { getGoalsTree } from "@/databases/goalQuery";
import GoalView from "./GoalView";
import { createGoal } from "@/databases/goalQuery";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

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

/**
 * This is the main component for the Goal Board.
 * It fetches and displays a list of goals in a scrollable view.
 * Users can add new goals using the "Add Goal" button.
 */
export default function GoalBoard() {
  const [goals, setGoals] = useState<Goal[]>([]);

  const loadGoals = useCallback(async () => {
    const goalsTree = await getGoalsTree();
    setGoals(goalsTree);
  }, []);

  useEffect(() => {
    loadGoals();
  }, [loadGoals]);

  // If the screen is focused, reload the goals to ensure the list is up-to-date.
  useFocusEffect(
    useCallback(() => {
      loadGoals();
    }, [loadGoals]),
  );

  const handleAddGoal = async () => {
    await createGoal();
    loadGoals();
  };

  return (
    <>
      {/* Search Bar */}
      <View style={styles.searchBar}></View>
      {/* Goals List */}
      <ScrollView contentContainerStyle={styles.container}>
        {goals.map((goal) => (
          <GoalView key={goal.id} goal={goal} reloadBoard={loadGoals} />
        ))}
        <View style={{ height: 300 }} />
      </ScrollView>
      {/* Add Goal Button */}
      <Pressable style={styles.AddButton} onPress={handleAddGoal}></Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
  },
  searchBar: {
    left: "5%",
    width: "90%",
    height: 40,
    backgroundColor: Colors.light_grey,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  AddButton: {
    width: 70,
    height: 70,
    backgroundColor: Colors.red,
    borderRadius: 15,
    position: "absolute",
    bottom: 120,
    right: 20,
  },
});
