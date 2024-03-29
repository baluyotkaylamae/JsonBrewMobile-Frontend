import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Container } from "native-base"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import Input from "../../Shared/Form/Input";
import InputPrfl from "../../Shared/Form/InputPrfl";
import UserOrders from "./UserOrders";


import AsyncStorage from '@react-native-async-storage/async-storage'

import axios from "axios"
import baseURL from "../../assets/common/baseurl"

import AuthGlobal from "../../Context/Store/AuthGlobal"
import { logoutUser } from "../../Context/Actions/Auth.actions"

const UserProfile = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState('')
    const [orders, setOrders] = useState([])
    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            if (
                context.stateUser.isAuthenticated === false ||
                context.stateUser.isAuthenticated === null
            ) {
                navigation.navigate("Login")
            }
            AsyncStorage.getItem("jwt")
                .then((res) => {
                    axios
                        .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                            headers: { Authorization: `Bearer ${res}` },
                        })
                        .then((user) => setUserProfile(user.data))
                })
                .catch((error) => console.log(error))
            axios
                .get(`${baseURL}orders`)
                .then((x) => {
                    const data = x.data;
                    console.log(data)
                    const userOrders = data.filter(
                        (order) =>
                            // console.log(order)
                            order.user ? (order.user._id === context.stateUser.user.userId) : false

                    );
                    setOrders(userOrders);
                })
                .catch((error) => console.log(error))
            return () => {
                setUserProfile();
            }

        }, [context.stateUser.isAuthenticated]))

        const handleUserOrdersPress = () => {
            navigation.navigate('My Orders', { orders });
        };
        

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/139x139' }}
                    style={styles.profileImage}
                />
                <TouchableOpacity style={styles.UserOrdersButton} onPress={handleUserOrdersPress}>
                    <Text style={styles.UserOrdersButtonText}>My Orders</Text>
                </TouchableOpacity>
            </View>

            <View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Name</Text>
                    <View style={[styles.inputContainer, { marginTop: 0 }]}>
                        <InputPrfl
                            placeholder="Enter your name"
                            leftIcon={<View style={styles.nameIcon} />}
                            onChangeText={(text) => { /* Handle text input */ }}
                            value={userProfile ? userProfile.name : ''}
                            inputStyle={styles.nameText}
                        />
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Email</Text>
                    <View style={styles.inputContainer}>
                        <InputPrfl
                            placeholder="Enter your email"
                            leftIcon={<View style={styles.emailIcon} />}
                            onChangeText={(text) => { /* Handle text input */ }}
                            value={userProfile ? userProfile.email : ''}
                            inputStyle={styles.emailText}
                        />
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Phone Number</Text>
                    <View style={styles.inputContainer}>
                        <InputPrfl
                            placeholder="Enter your number"
                            leftIcon={<View style={styles.phoneIcon} />}
                            onChangeText={(text) => { /* Handle text input */ }}
                            value={userProfile ? userProfile.phone : ''}
                            inputStyle={styles.phoneText}
                        />
                    </View>
                </View>

                {/* <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Password</Text>
                    <View style={styles.inputContainer}>
                        <InputPrfl
                            placeholder="Enter your password"
                            leftIcon={<View style={styles.lockIcon} />}
                            onChangeText={(text) => {  }}
                            value={''}
                            inputStyle={styles.passwordText}
                        />
                    </View>
                </View> */}
            </View>

            <View style={styles.actionContainer}>
            </View>
            <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.updateProfileButton}>
                    <Text style={styles.updateProfileText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.logoutContainer, { width: 100, borderWidth: 1, borderColor: '#664229', borderRadius: 12 }]}
                    onPress={() => {
                        AsyncStorage.removeItem("jwt");
                        logoutUser(context.dispatch);
                    }}
                >
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Chart;
