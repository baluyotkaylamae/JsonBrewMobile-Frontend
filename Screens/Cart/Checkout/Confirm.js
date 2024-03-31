import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Button } from "react-native";
import { Text, HStack, VStack, Avatar, Spacer, Center } from "native-base";
import { clearCart } from "../../../Redux/Actions/cartActions";
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from "../../../assets/common/baseurl";
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";

var { width, height } = Dimensions.get("window");

const Confirm = (props) => {
    const finalOrder = props.route.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const confirmOrder = async () => {
        try {
            const orderItems = finalOrder.order.order.orderItems.map(item => ({
                product: item.id, 
                quantity: item.quantity
            }));

            const order = {
                orderItems: orderItems,
                shippingAddress1: finalOrder.order.order.shippingAddress1,
                shippingAddress2: finalOrder.order.order.shippingAddress2,
                city: finalOrder.order.order.city,
                zip: finalOrder.order.order.zip,
                country: finalOrder.order.order.country,
                phone: finalOrder.order.order.phone,
                status: '3', 
                user: finalOrder.order.order.user
            };

            // Calculate total price
            const totalPrice = finalOrder.order.order.orderItems.reduce((total, item) => {
                return total + parseFloat(item.totalPrice);
            }, 0);

            // Add total price to the order data
            order.totalPrice = totalPrice;

            // Get JWT token from AsyncStorage
            const token = await AsyncStorage.getItem('jwt');

            // Set authorization header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Send POST request to backend
            const response = await axios.post(`${baseURL}orders`, order, config);

            if (response.status === 200 || response.status === 201) {
                Toast.show({
                    topOffset: 60,
                    type: 'success',
                    text1: 'Order Completed',
                    text2: '',
                });

                setTimeout(() => {
                    dispatch(clearCart());
                    navigation.navigate('Cart');
                }, 500);
            }
        } catch (error) {
            console.error('Error sending request:', error);

            Toast.show({
                topOffset: 60,
                type: 'error',
                text1: 'Something went wrong',
                text2: 'Please try again',
            });
        }
    };

    return (
        <Center>
            <ScrollView contentContainerStyle={styles.container}>
            <View style={[styles.titleContainer, { width: width * 0.9 }]}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Confirmation</Text>
                    {props.route.params ? (
                        <View style={{ borderWidth: 1, borderColor: "orange" }}>
                            <Text style={styles.title}>Shipping to:</Text>
                            <View style={{ padding: 8 }}>
                                <Text>Address: {finalOrder.order.order.shippingAddress1}</Text>
                                <Text>Address2: {finalOrder.order.order.shippingAddress2}</Text>
                                <Text>City: {finalOrder.order.order.city}</Text>
                                <Text>Zip Code: {finalOrder.order.order.zip}</Text>
                                <Text>Country: {finalOrder.order.order.country}</Text>
                            </View>
                            <Text style={styles.title}>Items</Text>
                            {finalOrder.order.order.orderItems.map((item) => {
                                return (
                                    <View key={item.id}>
                                        <HStack space={[2, 3]} justifyContent="space-between">
                                            <Avatar size="48px" source={{
                                                uri: item.image ? item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                                            }} />
                                            <VStack>
                                                <Text _dark={{ color: "warmGray.50" }} color="coolGray.800" bold>
                                                    {item.name}
                                                </Text>
                                                <Text>Quantity: {item.quantity}</Text>
                                                <Text>Cup Size: {item.cupSize}</Text>
                                                <Text>Sugar Level: {item.sugarLevel}</Text>
                                                <Text>Add-ons: {item.addons.join(", ")}</Text>
                                            </VStack>
                                            <Spacer />
                                            <Text fontSize="xs" _dark={{ color: "warmGray.50" }} color="coolGray.800" alignSelf="flex-start">
                                                Total: ₱{item.totalPrice}
                                            </Text>
                                        </HStack>
                                        <View style={{ borderBottomWidth: 1, borderBottomColor: "#ccc", marginVertical: 10 }} />
                                    </View>
                                );
                            })}
                        </View>
                    ) : null}
                    <View style={{ alignItems: "center", margin: 20 }}>
                        <Button title={"Place order"} onPress={confirmOrder} color="#664229" />
                    </View>
                </View>
            </ScrollView>
        </Center>
    );
};

const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 8,
        alignContent: "center",
        backgroundColor: "white",
    },
    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    title: {
        alignSelf: "center",
        margin: 8,
        fontSize: 16,
        fontWeight: "bold",
    },
    listItem: {
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center",
        width: width / 1.2,
    },
    body: {
        margin: 10,
        alignItems: "center",
        flexDirection: "row",
    },
});

export default Confirm;
