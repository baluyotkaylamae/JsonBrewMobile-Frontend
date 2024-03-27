import React, { useContext, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios"
import baseURL from "../../assets/common/baseurl"
import AuthGlobal from "../../Context/Store/AuthGlobal"
import OrderCard from '../../Shared/OrderCard';

const UserOrders = () => {
    const context = useContext(AuthGlobal)
    const [orders, setOrders] = useState([])
    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            if (!context.stateUser.isAuthenticated) {
                navigation.navigate("Login")
            } else {
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        axios.get(`${baseURL}orders`, {
                            headers: { Authorization: `Bearer ${res}` },
                        })
                        .then((response) => {
                            const userOrders = response.data.filter(order => order.user && order.user._id === context.stateUser.user.userId);
                            setOrders(userOrders);
                        })
                        .catch((error) => console.log(error));
                    })
                    .catch((error) => console.log(error));
            }
            return () => {
                setOrders([]);
            }
        }, [context.stateUser.isAuthenticated])
    );

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>My Orders</Text>
                <View style={styles.ordersContainer}>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <OrderCard key={order.id} item={order} select="false" />
                        ))
                    ) : (
                        <View style={styles.noOrders}>
                            <Text>You have no orders</Text>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
    },
    ordersContainer: {
        flex: 1,
    },
    noOrders: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});

export default UserOrders;
