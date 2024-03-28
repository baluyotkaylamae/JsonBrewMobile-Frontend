import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import HomeNavigator from "./HomeNavigator";
import Cart from "../Screens/Cart/Cart"; // Adjusted import statement
import CartIcon from "../Shared/CartIcon";
import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";
import AdminNavigator from "./AdminNavigator";
import AuthGlobal from "../Context/Store/AuthGlobal";

const Tab = createBottomTabNavigator();

const Main = () => {
    const context = useContext(AuthGlobal);
    return (
        <Tab.Navigator
            initialRouteName="Homepage"
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#664229'
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarShowLabel: true,
                    tabBarIcon: ({ color }) => {
                        return <Icon
                            name="home"
                            style={{ position: "relative" }}
                            color={color}
                            size={30}
                        />
                    }
                }}
            />

            <Tab.Screen
                name="Cart"
                component={CartNavigator} // Updated component
                options={{
                    tabBarIcon: ({ color }) => {
                        return <>
                            <Icon
                                name="shopping-cart"
                                style={{ position: "relative" }}
                                color={color}
                                size={30}
                            />
                            <CartIcon />
                        </>
                    }
                }}
            />
            {context.stateUser.user.isAdmin && (
                <Tab.Screen
                    name="Admin"
                    component={AdminNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon
                                name="cog"
                                style={{ position: "relative" }}
                                color={color}
                                size={30}
                            />
                        )
                    }}
                />
            )}

            <Tab.Screen
                name="User"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({ color }) => {
                        return <Icon
                            name="user"
                            style={{ position: "relative" }}
                            color={color}
                            size={30}

                        />
                    }
                }}
            />
        </Tab.Navigator>
    )
}
export default Main;
