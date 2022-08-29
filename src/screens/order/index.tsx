import { NavigationProp, RouteProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Navbar } from "../../components/global";
import { useAppDispatch } from "../../store/hooks";
import { setOrder } from "../../store/order/order.thunks";
import { InOrderScreen } from "./order";
import { OrdersListScreen } from "./orders";

const OrderStack = createNativeStackNavigator();

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export const OrderStackScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const showOrderList = () => {
    dispatch(setOrder(null));
    navigation.navigate("Orders");
  };

  return (
    <OrderStack.Navigator initialRouteName="Orders">
      <OrderStack.Screen
        options={{
          header: (props) => <Navbar {...props} />,
        }}
        name="Orders"
        component={OrdersListScreen}
      />
      <OrderStack.Screen
        options={{
          header: (props) => <Navbar {...props} />,
          headerLeft: (props) => {
            return (
              <>
                <TouchableOpacity style={styles.goBack} onPress={showOrderList}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      backgroundColor: "black",
                    }}
                  >
                    <Image
                      source={{ uri: "../../../assets/image/previous2.png" }}
                      style={styles.icon}
                    />
                  </View>
                </TouchableOpacity>
              </>
            );
          },
        }}
        name="Order"
        component={InOrderScreen}
      />
    </OrderStack.Navigator>
  );
};

const styles = StyleSheet.create({
  goBack: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  icon: {
    width: 15,
    height: 15,
    borderRadius: 50,
  },
  goBackText: {
    color: "#fff",
    paddingLeft: 1,
  },
});
