// This Component is a Reusable Form Field that can Render Different Types of Inputs.
// Supports Text Input, DateTime Picker, Dropdown, and MultiSelect (Checkbox) Fields.
// The Component also Displays an Icon and a Hint for Each Field Based on the Field Name.

import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import Colors from "@/constants/Colors";
import Icons from "@/constants/Icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { formatDateTime, formatSqlDate } from "@/constants/utils";
import { Dropdown } from "react-native-element-dropdown";
import { MultiSelect } from "react-native-element-dropdown";

const icons: Record<any, any> = {
  title: Icons.title,
  description: Icons.document,
  startTime: Icons.calendar,
  deadline: Icons.calendar,
  goals: Icons.goals,
  domain: Icons.domains,
  priority: Icons.siren,
  recurringType: Icons.loop,
  recurringDays: Icons.loop,
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
  recurringDays: "Recurring Days",
};

/**
 * TextField: A simple text input field for entering single-line text.
 * @todo An Dynamic Multiline Text Field can be Implemented in Future if needed.
 */
function TextField(props: Prop) {
  return (
    <TextInput
      style={styles.textbox}
      value={props.value}
      onChangeText={props.onChange}
    />
  );
}

/**
 * DateTimePickerField: A combined date and time picker that allows to select both date and time afterwards.
 *  @see : https://github.com/react-native-datetimepicker/datetimepicker
 */
function DateTimePickerField(props: Prop) {
  // There are three states here:
  // Date : This the Main Date Time
  // Mode : Picker can be Either Date or Time
  // Show : This is to Show the Picker or Not
  const date = props.value;
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
      props.onChange(selectedDate);

      // Open time picker next
      setMode("time");
      setShow(true);
    } else {
      // Merge time into existing date
      const updatedDate = new Date(date);

      updatedDate.setHours(selectedDate.getHours());
      updatedDate.setMinutes(selectedDate.getMinutes());

      props.onChange(updatedDate);
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

/**
 * DropdownField: A dropdown selector that allows to choose one option from a list of options.
 * @see : https://www.npmjs.com/package/react-native-element-dropdown
 * @todo : A Custom Dropdown can be Implemented in Future if needed.
 */
function DropdownField(props: Prop) {
  return (
    <Dropdown
      style={styles.dropdownContainer}
      containerStyle={styles.dropboxStyle}
      selectedTextStyle={styles.text}
      inputSearchStyle={styles.inputSearchStyle}
      placeholderStyle={styles.text}
      searchPlaceholder="Search..."
      itemTextStyle={styles.itemList}
      activeColor={Colors.purple}
      data={props.data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      value={props.value}
      onChange={(item) => {
        props.onChange(item.value);
      }}
    />
  );
}

/**
 * MultiselectField: A multi-select dropdown that allows to choose multiple options from a list of options.
 * @see : https://www.npmjs.com/package/react-native-element-dropdown
 * @todo : A Custom MultiSelect can be Implemented in Future if needed.
 */
function MultiselectField(props: Prop) {
  // Create a placeholder string that shows the selected options as a comma-separated list
  const placeholder = props.data
    .filter((item) => props.value?.includes(item.value))
    .map((item) => item.label)
    .join(", ");

  return (
    <MultiSelect
      style={styles.dropdownContainer}
      selectedStyle={styles.hidden}
      placeholderStyle={styles.text}
      containerStyle={styles.dropboxStyle}
      selectedTextStyle={styles.text}
      itemTextStyle={styles.itemList}
      data={props.data}
      labelField="label"
      valueField="value"
      placeholder={placeholder || "None"}
      value={props.value}
      onChange={props.onChange}
      activeColor={Colors.purple}
    />
  );
}

// Mapping of Field Types to their Corresponding Components
const FieldComponents = {
  text: TextField,
  datetime: DateTimePickerField,
  dropdown: DropdownField,
  checkbox: MultiselectField,
};

type Prop = {
  type: "text" | "datetime" | "dropdown" | "checkbox";
  name: string;
  value: any;
  onChange: (value: any) => void;
  data?: any; // For dropdown options
};
/**
 * A dynamic form field component that renders a specific input type
 * The component contains, an Icon, the Input Field, and a Hint Text.
 * Each Field Type is Implemented as a Separate Component for Better Modularity and Readability.
 * A Field is where the user can Input (text, datetime, dropdown, checkbox).
 *
 * @component
 * @example
 * ```tsx
 * <FormField
 * type="dropdown"
 * name="country"
 * value={selectedCountry}
 * onChange={(val) => setCountry(val)}
 * data={['USA', 'Canada', 'UK']}
 * />
 * ```
 * @param {Prop} props - The configuration properties for the form field.
 * @param {Prop['type']} props.type - The rendering strategy for the input (e.g., 'text', 'dropdown').
 * @param {Prop['name']} props.name - Used to look up the associated Icon and hint text ( @todo Change this in Future)
 * @param {Prop['value']} props.value - The current state value of the field.
 * @param {Prop['onChange']} props.onChange - Callback triggered when the field's value changes.
 * @param {Prop['data']} [props.data] - Optional supplementary data, primarily used for dropdown options.
 */
export default function FormField(props: Prop) {
  const Icon = icons[props.name] || Icons.title; // Chose the Icon from icons Object
  const hint = hints[props.name] || "Input"; // Chose the Hint from hints Object
  const Field = FieldComponents[props.type]; // Chose the Field Component from FieldComponents Object

  return (
    <View style={styles.questionContainer}>
      <Icon style={styles.icon} width={20} />
      {Field && <Field {...props} />}
      <Text style={styles.hint}>{hint}</Text>
    </View>
  );
}

// Styles Duhh
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
  hidden: {
    position: "absolute",
    width: 0,
    height: 0,
    borderWidth: 0,
  },
});
