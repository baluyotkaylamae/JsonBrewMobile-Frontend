import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import Home from "../Screens/Home/home";
// import SingleProduct from '../Screens/Product/SingleProduct';

const Stack = createStackNavigator()
function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='JsonBrew cafe'
                component={Home}
                // options={{
                //     headerShown: false,
                // }}
            />
            {/* <Stack.Screen 
                name='Product Detail'
                // component={SingleProduct}
                // options={{
                //     headerShown: false,
                // }}
            /> */}

        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />;
}