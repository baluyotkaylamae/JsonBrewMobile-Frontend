import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Dimensions,
    StyleSheet,
    Modal,
    TouchableOpacity,
} from "react-native";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import baseURL from "../../assets/common/baseurl";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

var { width } = Dimensions.get("window");

const UserItem = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRole, setSelectedRole] = useState(props.item.role);

    const updateUserRole = (role) => {
        // Make API call to update user role
        // Hide the modal
        setModalVisible(false);
    };

    return (
        <View style={styles.item}>
            <Text>{props.item.name}</Text>
            <View style={styles.iconContainer}>
                {/* Delete icon */}
                <EasyButton
                    danger
                    medium
                    onPress={() => props.delete(props.item._id)}
                    style={styles.icon}
                >
                    <Icon name="trash" size={20} color="white" />
                </EasyButton>
                {/* Update icon */}
                <EasyButton
                    primary
                    medium
                    onPress={() => setModalVisible(true)}
                    style={styles.icon}
                >
                    <Icon name="pencil" size={20} color="white" />
                </EasyButton>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text>{props.item.name}</Text>
                            <Text>{props.item.email}</Text>
                            <Text>Current Role: {props.item.isAdmin ? 'Admin' : 'User'}</Text>
                            <View style={styles.selectRoleContainer}>
                                <Text style={styles.selectRoleText}>Select Role:</Text>
                                <View style={styles.roleButtonContainer}>
                                    <View style={styles.roleButtonContainer}>
                                        <TouchableOpacity
                                            style={[styles.roleButton, { marginRight: 10 }]}
                                            onPress={() => updateUserRole('user')}
                                        >
                                            <Text>User</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.roleButton}
                                            onPress={() => updateUserRole('admin')}
                                        >
                                            <Text>Admin</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

const Users = (props) => {
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState("");

    useEffect(() => {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res);
            })
            .catch((error) => console.log(error));

        axios
            .get(`${baseURL}users`)
            .then((res) => setUsers(res.data))
            .catch((error) => alert("Error loading users"));

        return () => {
            setUsers([]);
            setToken("");
        };
    }, []);

    const deleteUser = (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        axios
            .delete(`${baseURL}users/${id}`, config)
            .then((res) => {
                const newUsers = users.filter((item) => item.id !== id);
                setUsers(newUsers);
            })
            .catch((error) => alert("Error deleting user"));
    };

    return (
        <FlatList
            data={users}
            renderItem={({ item }) => (
                <UserItem item={item} delete={deleteUser} />
            )}
            keyExtractor={(item) => item._id} // Assuming _id is a unique identifier
        />
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 30,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    roleButton: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#DDDDDD',
        borderRadius: 10,
    },
    selectRoleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    roleButtonContainer: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
    },

});

export default Users;