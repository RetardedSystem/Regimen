import ScreenBackground from "@/components/ScreenBackground";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";


export default function Index() {
  return (
    <ScreenBackground
      image={require("../../../assets/Home_bg.png")}
    >
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>

          {/* Profile Image */}
          <Image
            source={require("../../../assets/profile.png")}
            style={styles.profileImage}
          />

          {/* User Info */}
          <View style={styles.userInfo}>

            <Text style={styles.name}>
              Samantha Jones
            </Text>

            <Text style={styles.description}>
              A Lazy Sloth
            </Text>

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

  name: {
    color: '#5FA1CA',
    fontSize: 20,
    fontFamily: 'Gabarito',
    fontWeight: '700',
    textTransform: 'uppercase',
    wordWrap: 'break-word'
  },

  description: {
  color: 'black',
  fontSize: 18,
  fontFamily: 'Geologica',
  fontWeight: '200',
  wordWrap: 'break-word'
  },
});