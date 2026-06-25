import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import Icons from "@/constants/Icons";
import GoalWindow from "./GoalWindow";
import { formatDate } from "@/constants/utils";

function GoalItem({ goal, level = 0, color: color, reloadBoard }: any) {
  let marginLeft = 15 + level * 20;
  const [expanded, setExpanded] = useState(false);
  const hasChildren = goal.children?.length > 0;
  const [showWindow, setShowWindow] = useState(false);
  const datetime =
    goal.status === "in_progress"
      ? formatDate(goal.deadline)
      : formatDate(goal.deadline);

  return (
    <>
      <View
        style={[
          styles.goalItemContainer,
          { marginLeft: marginLeft, width: `${100 - marginLeft / 3}%` },
        ]}
      >
        {/*This Checks the Childs and if its expanded*/}
        {hasChildren ? (
          expanded ? (
            <Icons.goalExpanded
              strokeColor={color.main}
              fillColor={color.dark}
              style={styles.icons}
              onPress={() => {
                setExpanded(!expanded);
              }}
            />
          ) : (
            <Icons.goalHasChild
              color={color.main}
              fill={color.dark}
              style={styles.icons}
              onPress={() => {
                setExpanded(!expanded);
              }}
            />
          )
        ) : (
          <Icons.goalNoChild
            color={color.main}
            fill={color.light}
            style={styles.icons}
          />
        )}
        <View style={[styles.line, { backgroundColor: color.main }]} />
        <Text
          style={styles.title}
          numberOfLines={1}
          onPress={() => setShowWindow(true)}
        >
          {goal.title}
        </Text>
        <View style={styles.deadLineContainer}>
          {goal.completed_at === null ? (
            <Icons.deadline width={10} height={10} color={color.main} />
          ) : (
            <Icons.bigTick width={10} height={10} color={color.main} />
          )}

          <Text style={styles.deadline}>{datetime}</Text>
        </View>
      </View>
      {showWindow && (
        <GoalWindow
          goal={goal}
          onClose={() => setShowWindow(false)}
          reloadBoard={reloadBoard}
        />
      )}
      {/*This Renders the Items recursively*/}
      {expanded &&
        goal.children.map((child: any) => (
          <GoalItem
            key={child.id}
            goal={child}
            level={level + 1}
            color={color}
            reloadBoard={reloadBoard}
          />
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
  },
  line: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 4,
    height: 40,
  },
  icons: {
    position: "absolute",
    top: 14,
    zIndex: 1,
    left: -5,
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
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
    color: Colors.black,
    marginLeft: 20,
  },
  deadLineContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  deadline: {
    color: Colors.grey,
    fontSize: 10,
    fontFamily: "Nunito_400Regular",
    marginLeft: 5,
  },
});

export default GoalItem;
