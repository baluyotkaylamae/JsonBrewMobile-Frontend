import React, { useState } from 'react';
import { Text, View, TouchableHighlight, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Box, VStack, HStack, Button, Avatar, Spacer, Divider } from 'native-base';
import { useSelector, useDispatch } from 'react-redux'
import Toast from "react-native-toast-message"
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";
import { SwipeListView } from 'react-native-swipe-list-view';
import { removeFromCart, clearCart } from '../../Redux/Actions/cartActions'
var { height, width } = Dimensions.get("window");
import EasyButton from "../../Shared/StyledComponents/EasyButton"
import Checkout from "./Checkout/Checkout";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const Cart = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartItems);
    const [cart, setCartItems] = useState(useSelector(state => state.cartItems));


    const handleQuantityChange = (index, action) => {
        const updatedCartItems = [...cartItems]; // Make a copy of cartItems
        const selectedItem = updatedCartItems[index];

        if (!selectedItem) {
            console.error(`Item at index ${index} is undefined.`);
            return; // Exit early if item is undefined
        }

        if (action === 'increment') {
            // Ensure quantity is a number before incrementing
            selectedItem.quantity = parseInt(selectedItem.quantity) + 1;
        } else if (action === 'decrement') {
            // Ensure quantity is greater than 1 before decrementing
            if (selectedItem.quantity > 1) {
                selectedItem.quantity = parseInt(selectedItem.quantity) - 1;
            } else {
                console.error('Quantity cannot be less than 1.');
                return; // Exit early if quantity is already 1
            }
        }

        // Update the state with the modified cart items
        setCartItems(updatedCartItems);
    };


    const handleClearCart = () => {
        // Dispatch the clearCart action
        dispatch(clearCart());
        // Clear the local state as well
        setCartItems([]);
    };
    // Function to calculate total price for each item
    const calculateTotalPrice = (item) => {
        let totalItemPrice = item.price || 0; // Base price of the product

        // Calculate addon prices
        let addonPrice = item.addons ? item.addons.length * 5 : 0;
        totalItemPrice += addonPrice;

        // Calculate cup size price
        if (item.cupSize === "Medium") {
            totalItemPrice += 10;
        } else if (item.cupSize === "Large") {
            totalItemPrice += 20;
        }

        // Calculate sugar level price
        if (item.sugarLevel !== "Medium") {
            totalItemPrice += 5;
        }

        return totalItemPrice * item.quantity;
    };

    // Calculate total price for all items in the cart
    const total = cartItems.reduce((acc, item) => acc + calculateTotalPrice(item), 0);




    const renderItem = ({ item, index }) => {
        // Calculate total price for the current item
        const totalItemPrice = calculateTotalPrice(item);

        return (
            <>
                <TouchableHighlight
                    _dark={{
                        bg: 'coolGray.800'
                    }}
                    _light={{
                        bg: 'white'
                    }}
                >
                    <Box pl="4" pr="5" py="2" bg="white" keyExtractor={item => item.id}>
                        <HStack alignItems="center" space={3}>
                            <Avatar size="90px" marginLeft={1} source={{
                                uri: item.image ?
                                    item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                            }} />
                            <VStack style={{ marginLeft: 10 }}>
                                <Text color="coolGray.800" _dark={{
                                    color: 'warmGray.50'
                                }} style={{ fontWeight: 'bold', fontSize: 18 }}>
                                    {item.name}
                                </Text>
                                <Text color="coolGray.600" _dark={{
                                    color: 'warmGray.200'
                                }} style={{ fontSize: 12, marginLeft: 6 }}>
                                    Quantity: {item.quantity}
                                </Text>
                                {item.cupSize && (
                                    <Text color="coolGray.600" _dark={{
                                        color: 'warmGray.200'
                                    }} style={{ fontSize: 12, marginLeft: 6 }}>
                                        Cup Size: {item.cupSize}
                                    </Text>
                                )}
                                {item.sugarLevel && (
                                    <Text color="coolGray.600" _dark={{
                                        color: 'warmGray.200'
                                    }} style={{ fontSize: 12, marginLeft: 6 }}>
                                        Sugar Level: {item.sugarLevel}
                                    </Text>
                                )}
                                {item.addons && (
                                    <Text color="coolGray.600" _dark={{
                                        color: 'warmGray.200'
                                    }} style={{ fontSize: 12, marginLeft: 6 }}>
                                        Addons: {item.addons.length > 0 ? item.addons.join(", ") : "None"}
                                    </Text>
                                )}
                            </VStack>
                            <Spacer />
                            <Text fontSize="xs" color="coolGray.800" _dark={{
                                color: 'warmGray.50'
                            }} alignSelf="flex-start">
                                ₱ {totalItemPrice.toFixed(2)}
                            </Text>
                        </HStack>
                        {/* Quantity controls */}
                        <HStack space={3} alignItems="center" mt={2}>
                            <Button
                                onPress={() => handleQuantityChange(index, 'decrement')}
                                size="sm"
                                bg="red.400"
                                _pressed={{ bg: 'red.500' }}
                            >
                                <Icon name="minus" size={12} color="white" />
                            </Button>
                            <Text>{item.quantity}</Text>
                            <Button
                                onPress={() => handleQuantityChange(index, 'increment')}
                                size="sm"
                                bg="green.400"
                                _pressed={{ bg: 'green.500' }}
                            >
                                <Icon name="plus" size={12} color="white" />
                            </Button>
                        </HStack>
                    </Box>
                </TouchableHighlight>
                <Divider />
            </>
        );
    };

    const renderHiddenItem = (cartItem) => (
        <TouchableOpacity onPress={() => dispatch(removeFromCart(cartItem))}>
            <View style={styles.hiddenButton}>
                <Icon name="trash" size={30} color="white" />
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            {cartItems.length > 0 ? (
                <Box bg="white" safeArea flex="1" width="100%">
                    <SwipeListView
                        data={cartItems}
                        renderItem={renderItem}
                        renderHiddenItem={({ item }) => renderHiddenItem(item)}
                        disableRightSwipe={true}
                        leftOpenValue={75}
                        rightOpenValue={-150}
                        previewOpenValue={-100}
                        previewOpenDelay={3000}
                        closeOnRowBeginSwipe
                    />
                </Box>
            ) : (
                <Box style={styles.emptyContainer}>
                    <Text >No items in cart
                    </Text>
                </Box>
            )}
            <VStack style={styles.bottomContainer} w='100%' justifyContent='space-between'>
                <Box>
                    <Text style={[styles.label, { fontWeight: 'bold' }]}>Total Amount:</Text>
                    <HStack justifyContent="space-between" marginBottom={-3}>
                        <Text style={styles.price}>₱ {total.toFixed(2)}</Text>
                    </HStack>
                </Box>
                <HStack justifyContent="space-between">

                    {/* <Button alignItems="center" onPress={() => dispatch(clearCart())} >Clear</Button> */}
                    <EasyButton
                        danger
                        medium
                        alignItems="center"
                        onPress={() => handleClearCart()}
                        height={40} // Adjust the height here
                    >
                        <FontAwesomeIcon name="trash" size={20} color="white" />
                    </EasyButton>
                </HStack>
                <HStack justifyContent="space-between">

                    {/* <Button alignItems="center" colorScheme="primary" onPress={() => navigation.navigate('Checkout')}>Check Out</Button> */}
                    <EasyButton
                        secondary
                        medium
                        onPress={() => navigation.navigate('Checkout')}
                    >
                        <FontAwesomeIcon name="shopping-cart" size={20} color="white" />
                    </EasyButton>
                </HStack>
            </VStack >
        </>
    )
}

const styles = StyleSheet.create({
    label: {
        marginTop: 1,
        textAlign: 'center',
        marginBottom: -16,
    },
    emptyContainer: {
        height: 450,
        alignItems: "center",
        justifyContent: "center",
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        elevation: 20
    },
    price: {
        fontSize: 18,
        margin: 20,
        color: 'red'
    },
    hiddenContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        // width: 'lg'
    },
    hiddenButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 25,
        height: 70,
        width: width / 1.2
    }
});

export default Cart;