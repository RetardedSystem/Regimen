import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import Colors from "@/constants/Colors";
import Icons from "@/constants/Icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { formatDateTime, formatSqlDate } from "@/constants/utils";
import { Dropdown } from "react-native-element-dropdown";

type Prop = {
  type: "text" | "datetime" | "dropdown" | "checkbox";
  name: string;
  value: any;
  onChange: (value: any) => void;
  data?: any; // For dropdown options
};

const icons: Record<any, any> = {
  title: Icons.title,
  description: Icons.document,
  startTime: Icons.calendar,
  deadline: Icons.calendar,
  goals: Icons.goals,
  domain: Icons.domains,
  priority: Icons.siren,
  recurringType: Icons.loop,
};

const hints: Record<any, string> = {
  title: "What do you wanna do?",
  description: "Discreption (Optional, if you are lazy)",
  startTime: "Start Time",
  deadline: "Deadline",
  goals: "Goals",
  domain: "Domain",
  priority: "Priority",
  recurringType: "Recurring Type",
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
      <Pressable style={styles.textbox} onPress={showDateTimePicker}>
        <Text style={styles.text}>{formatDateTime(formatSqlDate(date))}</Text>
      </Pressable>

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

function DropdownField(props: Prop) {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={styles.dropdownContainer}>
      <Dropdown
        containerStyle={styles.dropboxStyle}
        selectedTextStyle={styles.text}
        inputSearchStyle={styles.inputSearchStyle}
        placeholder={!isFocus ? "Batman" : "..."}
        placeholderStyle={styles.text}
        searchPlaceholder="Search..."
        itemTextStyle={styles.itemList}
        data={props.data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={props.value}
        onFocus={() => setIsFocus(true)}
        onChange={(item) => {
          props.onChange(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
}

const FieldComponents = {
  text: TextField,
  datetime: DateTimePickerField,
  dropdown: DropdownField,
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
    justifyContent: "center",
    fontSize: 13,
    fontFamily: "nunito",
    fontWeight: 500,
    color: Colors.black,
  },
  text: {
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

  dropdownContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "80%",
    height: "100%",
    justifyContent: "center",
  },
  dropboxStyle: {
    borderColor: Colors.purple,
    borderRadius: 8,
  },
  inputSearchStyle: {
    height: 30,
    fontSize: 9,
    textAlign: "center",
    fontFamily: "nunito",
    borderRadius: 10,
    borderColor: Colors.grey,
  },
  itemList: {
    borderBottomColor: Colors.grey,
    fontSize: 12,
    marginBottom: -10,
    marginTop: -10,
  },
});
