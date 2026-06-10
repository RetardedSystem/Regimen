import ScreenBackground from "@/components/ScreenBackground";
<<<<<<< HEAD
import background from "@/constants/Backgrounds";
import { Text, View, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
=======
import { background } from "@/constants/Images";
import { Text, View } from "react-native";
>>>>>>> main

export default function Goal() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const showDateTimePicker = () => {
    setMode("date");
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Select Deadline" onPress={showDateTimePicker} />

      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
}
