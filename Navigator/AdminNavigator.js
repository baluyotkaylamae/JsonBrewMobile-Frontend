import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Orders from "../Screens/Admin/Orders"
import Products from "../Screens/Admin/Products"
import ProductForm from "../Screens/Admin/ProductForm"
import Categories from "../Screens/Admin/Categories"
import Chart from "../Screens/Admin/Charts"

const Stack = createStackNavigator();

const AdminNavigator= () => {
    
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Products"
                component={Products}
                options={{
                    title: "Products"
                }}
            />
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="ProductForm" component={ProductForm} />
            <Stack.Screen name="Charts" component={Chart} />
        </Stack.Navigator>
    )
}
export default  AdminNavigator