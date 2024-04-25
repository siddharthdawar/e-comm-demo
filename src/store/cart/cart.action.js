import {CART_ACTION_TYPES} from './cart.types';

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(cartItem =>
        cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === productToAdd.id ?
                {...cartItem, quantity: cartItem.quantity + 1} :
                cartItem
        );
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find(cartItem =>
        cartItem.id === productToRemove.id
    );

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    }

    return cartItems.map(cartItem =>
        cartItem.id === productToRemove.id ?
            {...cartItem, quantity: cartItem.quantity - 1} :
            cartItem
    );
};

const clearCartItem = (cartItems, cartItemToClear) =>
    cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)

export const addItemToCart = (cartItems, productToAdd) => ({
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: addCartItem(cartItems, productToAdd)
});

export const removeItemFromCart = (cartItems, cartItemToRemove) => ({
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: removeCartItem(cartItems, cartItemToRemove)
});

export const clearItemFromCart = (cartItems, cartItemToClear) => ({
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: clearCartItem(cartItems, cartItemToClear)
});

export const setIsCartOpen = () => ({
    type: CART_ACTION_TYPES.TOGGLE_CART_IS_OPEN
});
