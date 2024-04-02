import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Orders from "../Screens/Admin/Orders";
import Products from "../Screens/Admin/Products";
import ProductForm from "../Screens/Admin/ProductForm";
import Categories from "../Screens/Admin/Categories";
import Chart from "../Screens/Admin/Charts";
import Users from "../Screens/Admin/Users";
import TotalSales from "../Screens/Admin/TotalSales"; 

const Stack = createStackNavigator();

const AdminNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, 
        presentation: "modal", 
      }}
    >
      <Stack.Screen
        name="Products"
        component={Products}
        options={{
          title: null, 
        }}
      />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="ProductForm" component={ProductForm} options={{ headerShown: false }} />
      <Stack.Screen name="Charts" component={Chart} />
      <Stack.Screen name="TotalSales" component={TotalSales} />
      
    </Stack.Navigator>
  );
};

export default AdminNavigator;
