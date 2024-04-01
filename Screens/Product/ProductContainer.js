import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Dimensions, ScrollViewComponent } from 'react-native'
import { Center, VStack, Input, Heading, Text, Icon, NativeBaseProvider, extendTheme, ScrollView, } from "native-base";
import { Ionicons, SmallCloseIcon } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProduct";
import Header from '../../Shared/Header';
import Greeting from '../../Shared/Greeting';
import theme from "../../Shared/theme";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";
import axios from 'axios'

// const data = require('../../assets/data/products.json')
// const productCategories = require('../../assets/data/categories.json')
import baseURL from "../../assets/common/baseurl"

var { width, height } = Dimensions.get("window")
const ProductContainer = () => {
    const [products, setProducts] = useState([])
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState([]);
    const [initialState, setInitialState] = useState([])
    const [productsCtg, setProductsCtg] = useState([])
    useFocusEffect((
        useCallback(
            () => {
                setFocus(false);
                setActive(-1);
                // Products
                axios
                    .get(`${baseURL}products`)
                    .then((res) => {
                        setProducts(res.data);
                        setProductsFiltered(res.data);
                        setProductsCtg(res.data);
                        setInitialState(res.data);
                        setLoading(false)
                    })
                    .catch((error) => {
                        console.log('Api call error')
                    })

                // Categories
                axios
                    .get(`${baseURL}categories`)
                    .then((res) => {

                        setCategories(res.data)
                    })
                    .catch((error) => {
                        console.log('Api categoriesv call error')
                    })

                return () => {
                    setProducts([]);
                    setProductsFiltered([]);
                    setFocus();
                    setCategories([]);
                    setActive();
                    setInitialState();
                };
            },
            [],
        )
    ))
    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }

    const openList = () => {
        setFocus(true);
    }

    const onBlur = () => {
        setFocus(false);
    }

    const changeCtg = (ctg) => {
        console.log(ctg)
        {
            ctg === "all"
                ? [setProductsCtg(initialState), setActive(true)]
                : [
                    setProductsCtg(
                        products.filter((i) => (i.category !== null && i.category.id) === ctg),
                        setActive(true)
                    ),
                ];
        }
    };

    console.log("category", productsCtg)

    return (
        <NativeBaseProvider theme={theme}>
            <Center style={styles.pageBackground}>
                <ScrollView
                    bounces={true}
                    showsVerticalScrollIndicator={false}
                    style={{ backgroundColor: "white" }}
                >
                    <View style={styles.searchContainer}>
                        <VStack w="100%" space={5} alignSelf="center">
                            <Input
                                onFocus={openList}
                                onChangeText={(text) => searchProduct(text)}
                                placeholder="Search for a Product"
                                width="100%"
                                borderRadius={0}
                                py={2}
                                px={4}
                                borderColor="#B99960"
                                borderWidth={8}
                                marginBottom={5}
                                InputLeftElement={<Icon ml="2" size="5" color="#B99960" as={<Ionicons name="search" />} />}
                                InputRightElement={focus === true ? <Icon ml="2" size="4" color="red.400" as={<Ionicons name="close" size="12" color="black" onPress={onBlur} />} /> : null}
                            />
                        </VStack>
                    </View>
                    {focus === true ? (
                        <SearchedProduct productsFiltered={productsFiltered} />
                    ) : (
                        <>
                            {/* <Header /> */}
                            <Banner />
                            <Greeting />
                            <CategoryFilter
                                categories={categories}
                                categoryFilter={changeCtg}
                                productsCtg={productsCtg}
                                active={active}
                                setActive={setActive}
                            />
                            {productsCtg.length > 0 ? (
                                <View style={styles.listContainer}>
                                    {productsCtg.map((item) => {
                                        return (
                                            <ProductList
                                                key={item._id}
                                                item={item}
                                            />
                                        );
                                    })}
                                </View>
                            ) : (
                                <View style={[styles.center, { height: height / 2 }]}>
                                    <Text>No products found</Text>
                                </View>
                            )}
                        </>
                    )}
                </ScrollView>
            </Center>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    pageBackground: {
        backgroundColor: "#FFFFFF",
    },
    container: {
        flexWrap: "wrap",
        backgroundColor: "#FFFFFF",
    },
    listContainer: {
        height: "2500px",
        width: width,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "#FFFFFF",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    // searchContainer: {
    //     width: '70%', // Adjust width as needed
    //     alignSelf: 'center',
    //     marginBottom: 10, // Adjust margin as needed
    // },
});

export default ProductContainer;