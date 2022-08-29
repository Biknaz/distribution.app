import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import moment from "moment";
import React, { useCallback, useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText } from "../../components/shared/appText";
import { IOrder } from "../../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getAll,
  setEmptyOrders,
  setOrder,
} from "../../store/order/order.thunks";
import { OrderStatus } from "../../utils/enums";

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

const Order: React.FC<{ navigation: NavigationProp<any>; item: IOrder }> = ({
  item: x,
  navigation,
}) => {
  const dispatch = useAppDispatch();

  const showOrder = (order: IOrder) => () => {
    dispatch(setOrder(order));
    navigation.navigate("Order");
  };

  return (
    <TouchableOpacity onPress={showOrder(x)} key={x.id}>
      <View style={styles.orderList}>
        <View style={styles.leftContent}>
          <AppText style={styles.text}>Дата заказа{x.id}</AppText>
          <AppText style={styles.discription}>
            {moment(x.createdAt).format("DD-MM-YYYY")}
          </AppText>
        </View>
        <View style={styles.rightContent}>
          <AppText style={styles.text}>Статус</AppText>
          <AppText
            style={{
              ...styles.status,
              color: x?.status?.id === OrderStatus.NoPaid ? "gray" : "green",
            }}
          >
            {x?.status?.title}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const OrdersListScreen: React.FC<Props> = ({ navigation, route }) => {
  const { user } = useAppSelector((state) => state.global);

  const [loading, setLoading] = useState(false);

  const page = useRef(1);
  const filter = useRef({ userId: user!.id });

  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(getAll(0, filter.current));

      return () => {
        dispatch(setEmptyOrders());
        page.current = 1;
      };
    }, [dispatch])
  );

  const { count, orders } = useAppSelector((state) => state.orders);

  const getMore = () => {
    if (orders.length > count) return;

    setLoading(true);
    return dispatch(getAll(page.current * 10, filter.current))
      .then(() => {
        page.current = page.current + 1;
      })
      .finally(() => setLoading(false));
  };

  const renderItem = (props: any) => {
    return <Order navigation={navigation} {...props} />;
  };


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={({ id }) => id.toString() + `${route.name}-list`}
        renderItem={renderItem}
        onEndReached={getMore}
        onEndReachedThreshold={0.1}
        refreshing={loading}
      />
    </SafeAreaView>
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
  rightContent: {},
  leftContent: {},
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
    fontWeight: "400",
  },
  status: {
    color: "green",
    paddingTop: 10,
  },
  discription: {
    paddingTop: 10,
    fontWeight: "600",
  },
});
