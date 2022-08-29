import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import React, { useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { AppText } from "../../components/shared/appText";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAll, setItems } from "../../store/item/item.thunks";

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export const CatalogScreen: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const page = useRef(1);
  const filter = useRef({});

  useFocusEffect(
    useCallback(() => {
      dispatch(getAll(0, filter.current));

      return () => {
        dispatch(setItems());
      };
    }, [dispatch])
  );

  const { count, items } = useAppSelector((state) => state.items);

  const getMore = (skip: number) => {
    dispatch(getAll(skip, filter.current));
  };

  return (
    <View style={styles.container}>
      {items.map((x) => {
        return (
          <View style={styles.orderList} key={x.id}>
            <View style={styles.leftContent}>
              <AppText style={styles.text}>{x.title}</AppText>
              {/* <AppText style = {styles.discription}>Описание заказа</AppText> */}
            </View>
            <View style={styles.rightContent}>
              <AppText style={styles.text}>Цена: {x.price}</AppText>
              {/* <AppText style = {styles.status}>Оплачено</AppText> */}
            </View>
          </View>
        );
      })}
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
  leftContent: {},
  rightContent: {},
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
    fontWeight: "600",
  },
  status: {
    color: "green",
    fontSize: 12,
    paddingTop: 10,
  },
  discription: {
    color: "#00cfe8",
    fontSize: 12,
    paddingTop: 10,
    fontWeight: "400",
  },
});
