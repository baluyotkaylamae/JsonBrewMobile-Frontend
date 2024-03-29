// cartActions.js

import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    INCREMENT_CART_ITEM_QUANTITY,
    DECREMENT_CART_ITEM_QUANTITY
} from '../constant';

export const addToCart = (payload) => {
    return {
        type: ADD_TO_CART,
        payload
    }
}

export const removeFromCart = (payload) => {
    return {
        type: REMOVE_FROM_CART,
        payload
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}

export const incrementCartItemQuantity = (payload) => {
    return {
        type: INCREMENT_CART_ITEM_QUANTITY,
        payload
    }

}

export const decrementCartItemQuantity = (payload) => {
    return {
        type: DECREMENT_CART_ITEM_QUANTITY,
        payload
    }
}
