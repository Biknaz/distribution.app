import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Navbar } from "../../components/global";
import { CatalogScreen } from "./catalog";

const CatalogStack = createNativeStackNavigator();

export const CatalogStackScreen: React.FC = () => {
  return (
    <CatalogStack.Navigator initialRouteName="Catalog">
      <CatalogStack.Screen
        options={{
          header: (props) => <Navbar {...props} />,
        }}
        name="Catalog"
        component={CatalogScreen}
      />
    </CatalogStack.Navigator>
  );
};
