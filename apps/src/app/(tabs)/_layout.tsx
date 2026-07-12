import { Tabs } from "expo-router";
import TabBar from "../../components/TabBar";
import Colors from "../../constants/Colors";
import Icons from "../../constants/Icons";
const icon_size = 25;

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={tabBarOptions}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icons.homeActive width={icon_size} height={icon_size} />
            ) : (
              <Icons.home
                width={icon_size}
                height={icon_size}
                color={Colors.white}
              />
            ),
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: "Goals",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icons.goalsActive width={icon_size} height={icon_size} />
            ) : (
              <Icons.goals
                width={icon_size}
                height={icon_size}
                color={Colors.white}
              />
            ),
        }}
      />
      <Tabs.Screen
        name="domains"
        options={{
          title: "Domains",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icons.domainsActive width={icon_size} height={icon_size} />
            ) : (
              <Icons.domains
                width={icon_size}
                height={icon_size}
                color={Colors.white}
              />
            ),
        }}
      />
    </Tabs>
  );
}

const tabBarOptions = {
  headerShown: false,
  tabBarActiveTintColor: Colors.icon_active,
  tabBarInactiveTintColor: Colors.white,
  tabBarStyle: {
    position: "absolute",
    backgroundColor: "transparent",
    height: "100%",
    borderTopWidth: 0,
    elevation: 0,
  },
  tabBarHideOnKeyboard: true,
};
