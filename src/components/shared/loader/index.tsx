import React, { ReactNode } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface Props {
  loading: boolean;
  children?: ReactNode;
}

export const Loader: React.FC<Props> = ({ loading, children }) => {
  return loading ? (
    <View style={style.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <>{children}</>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
  },
});
