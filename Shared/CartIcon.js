import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text } from "native-base";
import { useSelector } from 'react-redux'

const CartIcon = (props) => {
    const cartItems = useSelector(state => state.cartItems)
    
    // Check if cartItems is undefined or null before accessing its length
    const cartItemsLength = cartItems ? cartItems.length : 0;

    return (
        <>
            {cartItemsLength ? (
                <Badge style={styles.badge}>
                    <Text style={styles.text}>{cartItemsLength}</Text>
                </Badge>
            ) : null}
        </>
    );
};

const styles = StyleSheet.create({
    badge: {
        width: 20,
        position: "absolute",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        top: -4,
        right: -18,
    },
    text: {
        fontSize: 12,
        width: 100,
        fontWeight: "bold",
        color: "red"
    },
});

export default CartIcon;
