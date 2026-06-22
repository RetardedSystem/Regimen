import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

function GoalItem({ goal, level = 0 }: any) {
  const [expanded, setExpanded] = useState(false);

  const hasChildren = goal.children?.length > 0;

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          if (hasChildren) {
            setExpanded(!expanded);
          }
        }}
        style={{
          paddingLeft: level * 20,
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
        }}
      >
        <Text>{hasChildren ? (expanded ? "▼" : "▶") : "•"}</Text>

        <Text style={{ marginLeft: 8 }}>{goal.title}</Text>
      </TouchableOpacity>

      {expanded &&
        goal.children.map((child: any) => (
          <GoalItem key={child.id} goal={child} level={level + 1} />
        ))}
    </View>
  );
}

export default GoalItem;
