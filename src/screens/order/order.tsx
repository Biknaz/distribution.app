import { NavigationProp, RouteProp } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppText } from "../../components/shared/appText";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setOrder } from "../../store/order/order.thunks";

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export const InOrderScreen: React.FC<Props> = ({ navigation }) => {
  const { order } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();

  const showOrderList = () => {
    dispatch(setOrder(null));
    navigation.navigate("Orders");
  };

  if (!order) {
    showOrderList();
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topText}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.idOrderData}>Order {order.id}</Text>
        </View>
        <Text style={styles.idOrderData}>
          {moment(order.createdAt).format("DD-MM-YYYY")}
        </Text>
      </View>

      <ScrollView>
        {order.items?.map((x) => {
          return (
            <View style={styles.orderList} key={x.id}>
              <View style={styles.leftContent}>
                <AppText style={styles.status}>{x.item.title}</AppText>
              </View>
              <View style={styles.rightContent}>
                <AppText style={styles.status}>{x.count}</AppText>
              </View>
            </View>
          );
        })}
      </ScrollView>
      {/* <View style={styles.topText}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.idOrderData}>Общая сумма:</Text>
        </View>
        <Text style={styles.idOrderData}>400$</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#00cfe8",
    paddingVertical: 20,
  },
  topText: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  goBack: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  rightContent: {},
  leftContent: {},
  icon: {
    width: 15,
    height: 15,
    borderRadius: 50,
  },
  goBackText: {
    color: "#fff",
    paddingLeft: 1,
  },
  idOrderData: {
    color: "green",
    fontSize: 16,
    fontWeight: "600",
  },
  orderList: {
    width: 370,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "rgba(255, 255, 2500, 0.7)",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
  },
  status: {
    color: "black",
    fontWeight: "500",
    paddingTop: 10,
  },
  discription: {
    color: "#00cfe8",
    fontSize: 12,
    paddingTop: 10,
    fontWeight: "400",
  },
});
