import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TabProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

type Props = {
  period: "monthly" | "weekly" | "yearly";
  setPeriod: (value: "monthly" | "weekly" | "yearly") => void;
};

function Tab({ label, active, onPress }: TabProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tab, active && styles.activeTab]}
    >
      <Text style={[styles.tabText, active && styles.activeTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function PeriodSelector({ period, setPeriod }: Props) {
  return (
    <View style={styles.container}>
      <Tab
        label="Monthly"
        active={period === "monthly"}
        onPress={() => setPeriod("monthly")}
      />

      <Tab
        label="Weekly"
        active={period === "weekly"}
        onPress={() => setPeriod("weekly")}
      />

      <Tab
        label="Yearly"
        active={period === "yearly"}
        onPress={() => setPeriod("yearly")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },

  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 34,
    overflow: "hidden",
  },

  activeTab: {
    borderRadius: 9,
    backgroundColor: "#5ba9eb",
  },

  tabText: {
    color: "#999",
    fontSize: 13,
    fontFamily: "GeologicaRoman-ExtraLight",
  },

  activeTabText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
