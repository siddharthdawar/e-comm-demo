import {
    CartItem,
    CartState
} from './cart.types';
import {RootState} from '../store';
import {createSelector} from 'reselect';

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems: CartItem[]) => cartItems.reduce((acc, cartItem) =>
        cartItem.quantity + acc, 0
    )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems: CartItem[]) => cartItems.reduce((acc, cartItem) =>
        (cartItem.quantity * cartItem.price) + acc, 0
    )
);
