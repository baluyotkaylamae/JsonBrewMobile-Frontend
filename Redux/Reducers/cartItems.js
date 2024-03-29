import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    INCREMENT_CART_ITEM_QUANTITY,
    DECREMENT_CART_ITEM_QUANTITY
} from '../constant';

const cartItems = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return [...state, action.payload];
        case REMOVE_FROM_CART:
            return state.filter(cartItem => cartItem.id !== action.payload.id);

        case CLEAR_CART:
            return [];
        case INCREMENT_CART_ITEM_QUANTITY:
            return state.map(cartItem => {
                if (cartItem.id === action.payload.id) {
                    return { ...cartItem, quantity: cartItem.quantity + 1 };
                }
                return cartItem;
            });
        case DECREMENT_CART_ITEM_QUANTITY:
            return state.map(cartItem => {
                if (cartItem.id === action.payload.id && cartItem.quantity > 1) {
                    return { ...cartItem, quantity: cartItem.quantity - 1 };
                }
                return cartItem;
            });
        default:
            return state;
    }
};

export default cartItems;
