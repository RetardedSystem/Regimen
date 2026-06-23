import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import Icons from "@/constants/Icons";

function GoalItem({ goal, level = 0 }: any) {
  let marginLeft = 15 + level * 20;
  const [expanded, setExpanded] = useState(false);
  const hasChildren = goal.children?.length > 0;

  return (
    <>
      <View
        style={[
          styles.goalItemContainer,
          { marginLeft: marginLeft, width: `${100 - marginLeft / 3}%` },
        ]}
      >
        {hasChildren ? (
          expanded ? (
            <Icons.expandedCheckbox
              style={styles.icons}
              onPress={() => {
                setExpanded(!expanded);
              }}
            />
          ) : (
            <Icons.checkboxChild
              style={styles.icons}
              onPress={() => {
                setExpanded(!expanded);
              }}
            />
          )
        ) : (
          <Icons.checkbox style={styles.icons} />
        )}
        <View style={styles.line} />
        <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {goal.title}
          </Text>

          <Text style={styles.deadline}>{goal.deadline}</Text>
        </View>
      </View>

      {expanded &&
        goal.children.map((child: any) => (
          <GoalItem key={child.id} goal={child} level={level + 1} />
        ))}
    </>
  );
}

const styles = StyleSheet.create({
  goalItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    width: "100%",
    minHeight: 40,
    justifyContent: "flex-start",
    flex: 1,
  },
  line: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 4,
    height: 40,
    backgroundColor: Colors.blue,
  },
  icons: {
    position: "absolute",
    top: 16,
    zIndex: 1,
    left: -4,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
  },

  title: {
    flex: 1,
    marginRight: 10,
  },

  deadline: {
    color: Colors.grey,
  },
});

export default GoalItem;
