import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { NavigationTabs } from "./src/components/global";
import { store } from "./src/store";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <NavigationTabs />
      </Provider>
      <Toast />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
