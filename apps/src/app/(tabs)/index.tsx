import ScreenBackground from "@/components/ScreenBackground";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <ScreenBackground
      image={require("../../../assets/Backgrounds/Home_bg.png")}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          {/* Profile Image */}
          <Image
            source={require("../../../assets/Avatars/profile.png")}
            style={styles.profileImage}
          />

          {/* User Info */}
          <View style={styles.userInfo}>
            <Text style={styles.name}>Samantha Jones</Text>

            <Text style={styles.description}>A Lazy Sloth</Text>
          </View>
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    padding: 23,
    elevation: 5,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 45,
    backgroundColor: "#5FA1CA",
    borderWidth: 2,
    borderColor: "#5FA1CA",
  },

  userInfo: {
    marginLeft: 20,
    flex: 1,
  },
});
