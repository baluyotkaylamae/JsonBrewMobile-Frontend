import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Dimensions,
    TextInput,
    StyleSheet,
    Modal,
} from "react-native";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import baseURL from "../../assets/common/baseurl";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

var { width } = Dimensions.get("window");

const Item = (props) => {
    return (
        <View style={styles.item}>
            <Text>{props.item.name}</Text>
            <EasyButton
                danger
                medium
                onPress={() => props.delete(props.item._id)}
                style={{ marginLeft: 10 }} // Add margin for better separation
            >
                <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
            </EasyButton>
            <EasyButton
                primary
                medium
                onPress={() => props.update(props.item)}
                style={{ marginLeft: 10 }} // Add margin for better separation
            >
                <Text style={{ color: "white", fontWeight: "bold" }}>Update</Text>
            </EasyButton>
        </View>
    );
};

const Categories = (props) => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [token, setToken] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res);
            })
            .catch((error) => console.log(error));

        axios
            .get(`${baseURL}categories`)
            .then((res) => setCategories(res.data))
            .catch((error) => alert("Error loading categories"));

        return () => {
            setCategories([]);
            setToken("");
        };
    }, []);

    const addCategory = () => {
        const category = {
            name: categoryName,
            description: categoryDescription
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        axios
            .post(`${baseURL}categories`, category, config)
            .then((res) => setCategories([...categories, res.data]))
            .catch((error) => alert("Error loading categories"));

        setCategoryName("");
        setCategoryDescription("");
    };

    const deleteCategory = (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        axios
            .delete(`${baseURL}categories/${id}`, config)
            .then((res) => {
                const newCategories = categories.filter((item) => item.id !== id);
                setCategories(newCategories);
            })
            .catch((error) => alert("Error deleting categories"));
    };

    const updateCategory = () => {
        if (!selectedCategory) return;

        const updatedCategory = {
            _id: selectedCategory._id,
            name: categoryName || selectedCategory.name,
            description: categoryDescription || selectedCategory.description
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        axios
            .put(`${baseURL}categories/${selectedCategory._id}`, updatedCategory, config)
            .then((res) => {
                const updatedCategories = categories.map(category =>
                    category._id === res.data._id ? res.data : category
                );
                setCategories(updatedCategories);
                setModalVisible(false);
            })
            .catch((error) => alert("Error updating category"));

        setCategoryName("");
        setCategoryDescription("");
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={categories}
                renderItem={({ item }) => (
                    <Item item={item} delete={deleteCategory} update={(category) => {
                        setSelectedCategory(category);
                        setCategoryName(category.name);
                        setCategoryDescription(category.description);
                        setModalVisible(true);
                    }} />
                )}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.bottomBar}>
                <TextInput
                    value={categoryName}
                    style={styles.input}
                    onChangeText={(text) => setCategoryName(text)}
                    placeholder="Category Name"
                />
                <TextInput
                    value={categoryDescription}
                    style={styles.input}
                    onChangeText={(text) => setCategoryDescription(text)}
                    placeholder="Description"
                />
                <EasyButton
                    medium
                    primary
                    onPress={() => addCategory()}
                >
                    <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
                </EasyButton>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            value={categoryName}
                            style={styles.input}
                            onChangeText={(text) => setCategoryName(text)}
                            placeholder="Category Name"
                        />
                        <TextInput
                            value={categoryDescription}
                            style={styles.input}
                            onChangeText={(text) => setCategoryDescription(text)}
                            placeholder="Description"
                        />
                        <EasyButton
                            medium
                            primary
                            onPress={() => updateCategory()}
                        >
                            <Text style={{ color: "white", fontWeight: "bold" }}>Update</Text>
                        </EasyButton>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomBar: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "lightgray",
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
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
        shadowRadius: 3.84,
        elevation: 5
    }
});

export default Categories;
