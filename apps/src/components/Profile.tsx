// Write this code Priya
import color from "@/constants/Colors";
import { getAvatar, getUsers } from "@/databases/getUser";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [avatar, setAvatar] = useState<any>(null);
  async function loadUser() {
    // Need to design and create authentication and get the current user as per the active login
    const user = await getUsers(2);
    setUser(user);
  }
  if (user) {
    const avatar = getAvatar(user.avatar_id);
  }
  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    async function loadAvatar() {
      if (!user?.avatar_id) return;

      const avatarData = await getAvatar(user.avatar_id);
      setAvatar(avatarData);
    }

    loadAvatar();
  }, [user]);
  console.log("Users", user?.username);
  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        {/* Profile Image */}
        <Image
          source={require("@/assets/Avatars/Beaver.png")}
          style={styles.profileImage}
        />
        <View></View>
        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user?.username}</Text>

          <Text style={styles.description}>{avatar?.description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    padding: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 45,
    backgroundColor: color.blue,
  },

  userInfo: {
    marginLeft: 20,
    flex: 1,
  },
  description: {
    color: "black",
    fontSize: 18,
    fontFamily: "nunito",
    fontWeight: "200" as const,
  },

  name: {
    color: "#5FA1CA",
    fontSize: 24,
    fontFamily: "Gabarito",
    fontWeight: "700",
    textTransform: "uppercase",
    wordWrap: "break-word",
  },
});
