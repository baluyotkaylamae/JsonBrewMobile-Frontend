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
    const navigation = useNavigation()
    dispatch = useDispatch()
    const cartItems = useSelector(state => state.cartItems)
    var total = 0;
    cartItems.forEach(cart => {
        return (total += cart.price)
    });
    const renderItem = ({ item, index }) =>
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
                    </VStack>
                    <Spacer />
                    <Text fontSize="xs" color="coolGray.800" _dark={{
                        color: 'warmGray.50'
                    }} alignSelf="flex-start">
                        $ {item.price}
                    </Text>
                </HStack>
            </Box>
        </TouchableHighlight>;

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

export default Cart