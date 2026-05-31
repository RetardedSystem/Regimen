// Write this code Priya
<<<<<<< HEAD
import color from "@/constants/Colors";
=======

>>>>>>> main
import { Image, StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Profile Image */}
        <Image
          source={require("@/assets/Avatars/profile.png")}
          style={styles.profileImage}
        />

        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={styles.name}>Samantha Jones</Text>

          <Text style={styles.description}>A Lazy Sloth</Text>
        </View>
      </View>
    </View>
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
<<<<<<< HEAD
    backgroundColor: color.blue,
=======
    backgroundColor: "#5FA1CA",
    borderWidth: 2,
    borderColor: "#5FA1CA",
>>>>>>> main
  },

  userInfo: {
    marginLeft: 20,
    flex: 1,
  },
<<<<<<< HEAD
    description: {
    color: "black",
    fontSize: 18,
    fontFamily: "Geologica",
    fontWeight: "200" as const,
  },

  name: {
    color: '#5FA1CA',
    fontSize: 24,
    fontFamily: 'Gabarito',
    fontWeight: '700',
    textTransform: 'uppercase',
    wordWrap: 'break-word'
  }
=======
>>>>>>> main
});
