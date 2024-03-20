import React from 'react'
import { Text, View, TouchableHighlight, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Box, VStack, HStack, Button, Avatar,  Spacer, } from 'native-base';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";
import { SwipeListView } from 'react-native-swipe-list-view';
import { removeFromCart, clearCart } from '../../Redux/Actions/cartActions'
var { height, width } = Dimensions.get("window");
import EasyButton from "../../Shared/StyledComponents/EasyButton"
const Cart = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartItems);

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
                        <Avatar size="48px" source={{
                            uri: item.image ?
                                item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                        }} />
                        <VStack>
                            <Text color="coolGray.800" _dark={{
                                color: 'warmGray.50'
                            }} bold>
                                {item.name}
                            </Text>
                            {item.quantity && (
                                <Text color="coolGray.600" _dark={{
                                    color: 'warmGray.200'
                                }}>
                                   Quantity: {item.quantity}
                                </Text>
                            )}
                            {item.cupSize && (
                                <Text color="coolGray.600" _dark={{
                                    color: 'warmGray.200'
                                }}>
                                    Cup Size: {item.cupSize}
                                </Text>
                            )}
                            {item.sugarLevel && (
                                <Text color="coolGray.600" _dark={{
                                    color: 'warmGray.200'
                                }}>
                                    Sugar Level: {item.sugarLevel}
                                </Text>
                            )}
                            {item.addons && (
                                <Text color="coolGray.600" _dark={{
                                    color: 'warmGray.200'
                                }}>
                                    Addons: {item.addons.join(", ")}
                                </Text>
                            )}
                        </VStack>
                        <Spacer />
                        <Text fontSize="xs" color="coolGray.800" _dark={{
                            color: 'warmGray.50'
                        }} alignSelf="flex-start">
                            $ {totalItemPrice.toFixed(2)}
                        </Text>
                    </HStack>
                </Box>
            </TouchableHighlight>
        );
    };
    
    const renderHiddenItem = (cartItems) =>
        <TouchableOpacity
            onPress={() => dispatch(removeFromCart(cartItems.item))}
        >
            <VStack alignItems="center" style={styles.hiddenButton} >
                <View >
                    <Icon name="trash" color={"white"} size={30} bg="red" />
                    <Text color="white" fontSize="xs" fontWeight="medium">
                        Delete
                    </Text>
                </View>
            </VStack>

        </TouchableOpacity>;
    return (
        <>
            {cartItems.length > 0 ? (
                <Box bg="white" safeArea flex="1" width="100%" >
                    <SwipeListView
                        data={cartItems}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
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
            <VStack style={styles.bottomContainer} w='100%' justifyContent='space-between'
            >
                <HStack justifyContent="space-between">
                    <Text style={styles.price}>$ {total.toFixed(2)}</Text>
                </HStack>
                <HStack justifyContent="space-between">
                    
                    {/* <Button alignItems="center" onPress={() => dispatch(clearCart())} >Clear</Button> */}
                    <EasyButton
                        danger
                        medium
                        alignItems="center"
                        onPress={() => dispatch(clearCart())}
                    >
                        <Text style={{ color: 'white' }}>Clear</Text>
                    </EasyButton>
                </HStack>
                <HStack justifyContent="space-between">
                   
                    {/* <Button alignItems="center" colorScheme="primary" onPress={() => navigation.navigate('Checkout')}>Check Out</Button> */}
                    <EasyButton
                        secondary
                        medium
                        onPress={() => navigation.navigate('Checkout')}
                    >
                        <Text style={{ color: 'white' }}>Checkout</Text>
                    </EasyButton>
                </HStack>
            </VStack >
        </>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        height: height,
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
