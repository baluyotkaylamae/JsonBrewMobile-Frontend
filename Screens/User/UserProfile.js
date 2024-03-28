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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderBottomWidth: 3,
        // borderBottomColor: 'black',
        paddingBottom: -20,
        marginTop: 0, // Add margin top to separate each input
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Added justifyContent property
        marginTop: 5,
        marginBottom: 7,
    },
    profileImage: {
        alignItems: 'center',
        marginBottom: 35,
        width: 139,
        height: 139,
        borderRadius: 139 / 2,
        backgroundColor: '#B99960',
    },
    UserOrdersButton: {
        backgroundColor: '#B99960',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        marginLeft: 20,
        marginBottom: 20,
    },
    UserOrdersButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: '700',
    },
    textContainer: {
        marginLeft: 20,
    },
    agencyText: {
        marginLeft: -15,
        alignItems: 'center',
        color: '#262422',
        fontSize: 20,
        fontFamily: 'Poppins',
        fontWeight: '600',
    },
    userText: {
        marginLeft: 18,
        alignItems: 'center',
        color: '#ABABAB',
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '400',
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    editContainer: {
        width: 31,
        height: 31,
        borderRadius: 31 / 2,
        backgroundColor: '#EE8924',
        marginRight: 10,
    },
    editIcon: {
        width: 18,
        height: 18,
        borderWidth: 1.5,
        borderColor: 'white',
    },
    logoutContainer: {
        width: 100, // Adjust width if needed
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1, // Add border width
        borderColor: '#664229', // Add border color
        borderRadius: 12, // Add border radius to match the "Edit Profile" button
    },
    logoutText: {
        color: '#664229',
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: '700',
    },
    infoContainer: {
        marginBottom: 0,
    },
    infoLabel: {
        color: '#262422',
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '600',
        marginTop: 0,
        marginBottom: -5,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameIcon: {
        width: 24,
        height: 24,
        borderWidth: 1.5,
        borderColor: '#ABABAB',
        marginRight: 10,
    },
    nameText: {
        color: '#ABABAB',
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '500',
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emailIcon: {
        width: 24,
        height: 24,
        borderWidth: 1.5,
        borderColor: '#ABABAB',
        marginRight: 10,
    },
    emailText: {
        color: '#ABABAB',
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '500',
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    phoneIcon: {
        width: 24,
        height: 24,
        borderWidth: 1.5,
        borderColor: '#ABABAB',
        marginRight: 10,
    },
    phoneText: {
        color: '#ABABAB',
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '500',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    lockIcon: {
        width: 24,
        height: 24,
        borderWidth: 1.5,
        borderColor: '#ABABAB',
        marginRight: 10,
    },
    passwordText: {
        color: '#ABABAB',
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '500',
        flex: 1,
    },
    viewOffIcon: {
        width: 24,
        height: 24,
        borderWidth: 1.5,
        borderColor: '#ABABAB',
    },
    updateProfileButton: {
        width: 151,
        height: 51,
        borderRadius: 12,
        backgroundColor: '#664229',
        marginRight: 10, // Add margin to separate from the logout button
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateProfileText: {
        color: '#FDFDFD',
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: '700',
        textAlign: 'center',
    },
});

export default UserProfile;