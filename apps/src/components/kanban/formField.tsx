import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import Colors from "@/constants/Colors";
import Icons from "@/constants/Icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { formatDateTime, formatSqlDate } from "@/constants/utils";

type Prop = {
  type: "text" | "datetime" | "dropdown" | "checkbox";
  name: string;
  value: any;
  onChange: (value: any) => void;
};

const icons: Record<any, any> = {
  title: Icons.title,
  description: Icons.document,
  startTime: Icons.calendar,
  deadline: Icons.calendar,
  goals: Icons.goals,
  domain: Icons.domains,
};

const hints: Record<any, string> = {
  title: "What do you wanna do?",
  description: "Discreption (Optional, if you are lazy)",
  startTime: "Start Time",
  deadline: "Deadline",
  goals: "Goals",
  domain: "Domain",
};

function TextField(props: Prop) {
  return (
    <TextInput
      style={styles.textbox}
      value={props.value}
      onChangeText={props.onChange}
    />
  );
}

function DateTimePickerField(props: Prop) {
  // There are three states here:
  // Date : This the Main Date Time
  // Mode : Picker can be Either Date or Time
  // Show : This is to Show the Picker or Not
  const [date, setDate] = useState(props.value);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  // Now I wanted to show Date picker followed by Time Picker,
  // So this function Sets the mode to Date and shows the Picker
  const showDateTimePicker = () => {
    setMode("date");
    setShow(true);
  };

  // This function is called when the user selects a date or time from the picker
  const onChange = (event, selectedDate) => {
    // If the user cancels the picker, we hide it and return
    if (!selectedDate) {
      setShow(false);
      return;
    }

    if (mode === "date") {
      setDate(selectedDate);

      // Open time picker next
      setMode("time");
      setShow(true);
    } else {
      // Merge time into existing date
      const updatedDate = new Date(date);

      updatedDate.setHours(selectedDate.getHours());
      updatedDate.setMinutes(selectedDate.getMinutes());

      setDate(updatedDate);
      setShow(false);
    }
  };

  return (
    <>
      <Text style={styles.text} onPress={showDateTimePicker}>
        {formatDateTime(formatSqlDate(date))}
      </Text>

      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          onChange={onChange}
          is24Hour={true}
        />
      )}
    </>
  );
}

const FieldComponents = {
  text: TextField,
  datetime: DateTimePickerField,
};

export default function FormField(props: Prop) {
  const Icon = icons[props.name] || Icons.title;
  const hint = hints[props.name] || "Input";
  const Field = FieldComponents[props.type];

  return (
    <View style={styles.questionContainer}>
      <Icon style={styles.icon} width={20} />
      {Field && <Field {...props} />}
      <Text style={styles.hint}>{hint}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  questionContainer: {
    width: "100%",
    height: 35,
    borderRadius: 5,
    borderColor: Colors.grey,
    borderWidth: 1,
    justifyContent: "center",
  },

  textbox: {
    position: "absolute",
    top: 0,
    left: 30,
    width: "90%",
    height: "100%",
    fontSize: 13,
    fontFamily: "nunito",
    fontWeight: 500,
    color: Colors.black,
  },
  text: {
    position: "absolute",
    left: 30,
    top: 7,
    fontSize: 12,
    fontFamily: "nunito",
    fontWeight: 500,
    color: Colors.black,
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
});
