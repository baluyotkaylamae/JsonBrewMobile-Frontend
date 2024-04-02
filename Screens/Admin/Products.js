import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Dimensions,
    RefreshControl,
} from "react-native";
import { Input, VStack, Heading, Box } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
import { Searchbar } from 'react-native-paper';
import ListItem from "./ListItem";
import axios from "axios";
import baseURL from "../../assets/common/baseurl";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
// import EasyButton from "../../Shared/EasyButton";

const { height, width } = Dimensions.get("window");

const Products = (props) => {
    const [productList, setProductList] = useState([]);
    const [productFilter, setProductFilter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);

    const ListHeader = () => {
        return (
            <View
                elevation={1}
                style={styles.listHeader}
            >
                <View style={styles.headerItem}></View>
                <View style={styles.headerItem}>
                    <Text style={{ fontWeight: '600' }}>Brand</Text>
                </View>
                <View style={styles.headerItem}>
                    <Text style={{ fontWeight: '600' }}>Name</Text>
                </View>
                <View style={styles.headerItem}>
                    <Text style={{ fontWeight: '600' }}>Category</Text>
                </View>
                <View style={styles.headerItem}>
                    <Text style={{ fontWeight: '600' }}>Price</Text>
                </View>
            </View>
        );
    };

    const searchProduct = (text) => {
        if (text === "") {
            setProductFilter(productList);
        }
        setProductFilter(
            productList.filter((i) =>
                i.name.toLowerCase().includes(text.toLowerCase())
            )
        );
    };

    const deleteProduct = (id) => {
        axios
            .delete(`${baseURL}products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const products = productFilter.filter((item) => item.id !== id);
                setProductFilter(products);
            })
            .catch((error) => console.log(error));
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            axios
                .get(`${baseURL}products`)
                .then((res) => {
                    setProductList(res.data);
                    setProductFilter(res.data);
                    setLoading(false);
                });
            setRefreshing(false);
        }, 2000);
    }, []);


    useFocusEffect(
        useCallback(
            () => {
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res);
                    })
                    .catch((error) => console.log(error));
                axios
                    .get(`${baseURL}products`)
                    .then((res) => {
                        setProductList(res.data);
                        setProductFilter(res.data);
                        setLoading(false);
                    });

                return () => {
                    setProductList();
                    setProductFilter();
                    setLoading(true);
                };
            },
            [],
        )
    );

    return (
        <Box flex={1} bg="white">
            <View style={styles.buttonContainer}>
                <View style={styles.row}>
                    <View style={[styles.dashheaderContainer, { flexDirection: 'column', alignItems: 'center' }]}>
                        <EasyButton
                            dashboard
                            secondary
                            primary
                            onPress={() => navigation.navigate("Orders")}
                            style={{ backgroundColor: "#F7D9C4", borderRadius: 50 }}
                        >
                            <Icon name="shopping-bag" size={18} color="white" />
                        </EasyButton>
                        <Text style={styles.buttonText}>Orders</Text>
                    </View>
                    <View style={[styles.dashheaderContainer, { flexDirection: 'column', alignItems: 'center' }]}>
                        <EasyButton
                            dashboard
                            secondary
                            primary
                            onPress={() => navigation.navigate("ProductForm")}
                            style={{ backgroundColor: "#FAEDCB", borderRadius: 50 }}
                        >
                            <Icon name="leaf" size={18} color="white" />
                        </EasyButton>
                        <Text style={styles.buttonText}>Products</Text>
                    </View>
                    <View style={[styles.dashheaderContainer, { flexDirection: 'column', alignItems: 'center' }]}>
                        <EasyButton
                            dashboard
                            secondary
                            primary
                            onPress={() => navigation.navigate("Categories")}
                            style={{ backgroundColor: "#C9E4DE", borderRadius: 50 }}
                        >
                            <Icon name="shopping-basket" size={18} color="white" />
                        </EasyButton>
                        <Text style={styles.buttonText}>Categories</Text>
                    </View>
                    <View style={[styles.dashheaderContainer, { flexDirection: 'column', alignItems: 'center' }]}>
                        <EasyButton
                            dashboard
                            secondary
                            primary
                            onPress={() => navigation.navigate("Charts")}
                            style={{ backgroundColor: "#C6DEF1", borderRadius: 50 }}
                        >
                            <Icon name="bar-chart" size={18} color="white" />
                        </EasyButton>
                        <Text style={styles.buttonText}>Charts</Text>
                    </View>
                    <View style={[styles.dashheaderContainer, { flexDirection: 'column', alignItems: 'center' }]}>
                        <EasyButton
                            dashboard
                            secondary
                            primary
                            onPress={() => navigation.navigate("Users")}
                            style={{ backgroundColor: "#DBCDF0", borderRadius: 50 }}
                        >
                            <Icon name="leaf" size={18} color="white" />
                        </EasyButton>
                        <Text style={styles.buttonText}>Users</Text>
                    </View>
                </View>
            </View>
            <View style={styles.rowContainer}>
            </View>
            <Searchbar
                width="50%"
                placeholder="Search"
                onChangeText={(text) => searchProduct(text)}
                style={{
                    backgroundColor: 'white',
                    borderColor: '#664229',
                    borderWidth: 1,
                    borderRadius: 10, // adjust as needed
                    marginLeft: 30,
                    marginRight: 30,
                    marginBottom: 30,
                }}
            />
            {loading ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            ) : (
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    ListHeaderComponent={ListHeader}
                    data={productFilter}
                    renderItem={({ item, index }) => (
                        <ListItem
                            item={item}
                            index={index}
                            deleteProduct={deleteProduct}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
        </Box>
    );
};

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'white',
    },
    headerItem: {
        margin: 3,
        width: width / 6,
    },
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        paddingHorizontal: 0, // Adjust this value as needed
    },
    dashheaderContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: -30,
        paddingRight: 40,
    },
    buttonText: {
        color: 'darkgrey',
        textAlign: 'center', // Center the text horizontally
        marginTop: 5, // Add margin top to separate text from icon
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        marginLeft: 37,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center', // optional, adjusts vertical alignment
        justifyContent: 'space-around', // optional, adjusts horizontal spacing
        marginTop: -20,
        marginRight: -30,
        marginBottom: 20,
    },
});

export default Products;
