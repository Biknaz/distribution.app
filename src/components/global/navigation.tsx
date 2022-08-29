import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { AuthScreen } from "../../screens/auth";
import { CatalogStackScreen } from "../../screens/catalog";
import { OrderStackScreen } from "../../screens/order";
import { autoLogIn } from "../../store/global/global.thunks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Tab = createBottomTabNavigator();

export const NavigationTabs = () => {
  const { token } = useAppSelector((state) => state.global);

  const [load, setLoad] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    AsyncStorage.getItem("token").then((_token) => {
      if (_token && !token) {
        dispatch(autoLogIn()).finally(() => setLoad(false));
      } else {
        setLoad(false);
      }
    });
  }, []);

  if (load) return null;

  return (
    <>
      {token ? (
        <Tab.Navigator>
          <Tab.Screen name="Заказы" component={OrderStackScreen} />
          <Tab.Screen name="Каталог" component={CatalogStackScreen} />
        </Tab.Navigator>
      ) : (
        <AuthScreen />
      )}
    </>
  );
};
