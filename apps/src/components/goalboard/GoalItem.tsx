import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import Icons from "@/constants/Icons";
import GoalWindow from "./GoalWindow";

function GoalItem({ goal, level = 0, color: color }: any) {
  let marginLeft = 15 + level * 20;
  const [expanded, setExpanded] = useState(false);
  const hasChildren = goal.children?.length > 0;
  const [showWindow, setShowWindow] = useState(false);

  console.log(goal.domain);
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
            <Icons.deadline width={12} height={12} color={color.main} />
          ) : (
            <Icons.bigTick width={12} height={12} color={color.main} />
          )}

          <Text style={styles.deadline}>{goal.deadline}</Text>
        </View>
      </View>
      {showWindow && (
        <GoalWindow
          goal={goal}
          onClose={() => setShowWindow(false)}
          reloadBoard={() => { }}
        />
      )}
      {expanded &&
        goal.children.map((child: any) => (
          <GoalItem
            key={child.id}
            goal={child}
            level={level + 1}
            color={color}
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
    flex: 1,
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
    fontSize: 12,
    fontFamily: "Nunito_400Regular",
    marginLeft: 5,
  },
});

export default GoalItem;
