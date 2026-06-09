import {
  Text,
  Modal,
  View,
  StyleSheet,
  ViewStyle,
  TextInput,
} from "react-native";
import Colors from "@/constants/Colors";
import Icons from "@/constants/Icons";
import { useState } from "react";

type Task = {
  category: string;
  completed_at: string;
  deadline: string;
  description: string;
  group_id: number;
  id: number;
  is_recurring: number;
  recurrence_days: string;
  recurrence_type: string;
  start_date: string;
  status: string;
  title: string;
};

type Props = {
  task: Task;
  onClose: () => void;
};

export default function TaskWindow({ task, onClose }: Props) {
  const [title, setTitle] = useState(task.title);
  return (
    <Modal
      transparent
      animationType="fade"
      onRequestClose={onClose} // Write the Closing function.
    >
      {/* The overlay that dims the background, make it so if someone press it the Window closes */}
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.task_count}>Task {task.id}</Text>
          <View style={questionContainer}>
            <Icons.title style={styles.icon} width={20} />
            <TextInput style={styles.textbox}>{title}</TextInput>
            <Text style={styles.hint}>What do you wanna do?</Text>
          </View>
          <View style={questionContainer}></View>
          <View style={questionContainer}></View>
          <View style={questionContainer}></View>
          <View style={questionContainer}></View>
          <View style={styles.progressBar}></View>
          <View style={styles.ProgressTitle}></View>
          <Text style={styles.sarcasm}>Sarcasm</Text>
          <Icons.bigTick style={styles.tick} color={Colors.blue} />
          <Icons.trashcan
            style={[styles.tick, { right: 15 }]}
            fill={Colors.light_red}
            color={Colors.red}
          />
        </View>
      </View>
    </Modal>
  );
}

const questionContainer: ViewStyle = {
  width: "90%",
  height: 35,
  backgroundColor: "transparent",
  borderRadius: 5,
  borderColor: Colors.grey,
  borderWidth: 1,
  justifyContent: "center",
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "90%",
    height: "50%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  task_count: {
    alignSelf: "flex-start",
    fontSize: 20,
    fontFamily: "Gabarito",
    fontWeight: 500,
    marginLeft: 10,
    color: Colors.blue,
  },
  progressBar: {
    minHeight: 30,
    width: "90%",
    backgroundColor: Colors.black,
  },
  ProgressTitle: {
    minHeight: 15,
    width: "90%",
    backgroundColor: Colors.grey,
  },
  sarcasm: {
    fontSize: 12,
    fontFamily: "Gabarito",
    fontWeight: 500,
    color: Colors.red,
  },
  tick: {
    position: "absolute",
    bottom: 10,
    right: 50,
    width: 30,
    height: 30,
  },
  icon: {
    color: Colors.purple,
    left: 5,
  },
  hint: {
    position: "absolute",
    fontSize: 7,
    fontFamily: "nunito",
    fontWeight: 500,
    color: Colors.grey,
    right: 5,
    bottom: 5,
  },
  textbox: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "90%",
    height: "100%",
    fontSize: 13,
    fontFamily: "nunito",
    fontWeight: 500,
    color: Colors.black,
  },
});
