import {
    ActionWithoutPayload,
    ActionWithPayload
} from '../../utils/reducer/reducer.utils';
import {
    CART_ACTION_TYPES,
    CartItem
} from './cart.types';
import {CategoryItem} from '../categories/category.types';

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const removeCartItem = (cartItems: CartItem[], productToRemove: CategoryItem): CartItem[] => {
    const existingCartItem = cartItems.find(cartItem =>
        cartItem.id === productToRemove.id
    );

    if (existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    }

    return cartItems.map(cartItem =>
        cartItem.id === productToRemove.id ?
            {...cartItem, quantity: cartItem.quantity - 1} :
            cartItem
    );
};

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CategoryItem) =>
    cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)

type SetCartItemsAction = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => ({
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: addCartItem(cartItems, productToAdd)
});

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CategoryItem) => ({
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: removeCartItem(cartItems, cartItemToRemove)
});

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CategoryItem) => ({
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: clearCartItem(cartItems, cartItemToClear)
});

type ToggleCartIsOpenAction = ActionWithoutPayload<CART_ACTION_TYPES.TOGGLE_CART_IS_OPEN>;

export const setIsCartOpen = () => ({
    type: CART_ACTION_TYPES.TOGGLE_CART_IS_OPEN
});

export type CartAction = SetCartItemsAction | ToggleCartIsOpenAction;
