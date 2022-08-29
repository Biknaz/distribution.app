import { NavigationProp, RouteProp } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../store/hooks";
import { defaultImage } from "../../_data";

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export const Navbar: React.FC<Props> = () => {
  const { user } = useAppSelector((state) => state.global);

  return (
    <View style={styles.navbar}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: defaultImage }} style={styles.img} />
        <Text style={styles.text}>{user?.name}</Text>
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", height: "100%" }}
      >
        <Text style={styles.text}>Бонусы:</Text>
        <Text style={styles.text}>{user?.bonuses}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#00a1b3",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  text: {
    color: "#fff",
    fontSize: 14,
    paddingLeft: 5,
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#fff",
  },
});
