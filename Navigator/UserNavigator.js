import React from "react";
import { createStackNavigator } from '@react-navigation/stack'

import Login from "../Screens/User/Login";
import Register from "../Screens/User/Register";
import UserProfile from "../Screens/User/UserProfile";
import UserOrders from "../Screens/User/UserOrders";
import UserReviews from "../Screens/User/UserReviews";
import OrderFeedback from "../Screens/OrderFeedback";
const Stack = createStackNavigator();

const UserNavigator = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="User Profile"
                component={UserProfile}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="My Orders" 
                component={UserOrders} 
                options={{
                    headerShown: false
                }}
            />


            <Stack.Screen
                name="My Reviews" 
                component={UserReviews} 
                options={{
                    headerShown: false
                }}
            />


            
            <Stack.Screen
                name="Order Feedback" 
                component={OrderFeedback} 
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    )

}

export default UserNavigator;