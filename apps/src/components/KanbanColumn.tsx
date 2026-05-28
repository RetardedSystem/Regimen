import { View, Text, StyleSheet } from "react-native";

type Prop = {
  title: String;
};

export default function KanbanColumn(props: Prop) {
  return (
    <View style={styles.container}>
      <Text>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "40%",
    width: "40%",
    left: "6%",
    bottom: "5%",
    borderRadius: 10,
    backgroundColor: "black",
    alignItems: "center",
  },
});
