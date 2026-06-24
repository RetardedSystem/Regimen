import { View, ScrollView, Text, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { useEffect, useState } from "react";
import { getGoalsTree } from "@/databases/getGoals";
import GoalView from "./GoalView";

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

export default function GoalBoard() {
  const [goals, setGoals] = useState<Goal[]>([]);

  async function loadGoals() {
    const goalsTree = await getGoalsTree();
    setGoals(goalsTree);
  }
  useEffect(() => {
    loadGoals();
  }, []);

  return (
    <>
      <View style={styles.searchBar}></View>
      <ScrollView contentContainerStyle={styles.container}>
        {goals.map((goal) => (
          <GoalView key={goal.id} goal={goal} />
        ))}
      </ScrollView>
      <View style={styles.AddButton}></View>
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
