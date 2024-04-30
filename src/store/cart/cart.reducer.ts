import {
    CART_ACTION_TYPES,
    CartState
} from './cart.types';
import {CartAction} from './cart.action';

const initialState: CartState = {
    cartItems: [],
    isCartOpen: false
};

export const cartReducer = (
    state = initialState,
    action = {} as CartAction
): CartState => {
    switch (action.type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload
            }
        case CART_ACTION_TYPES.TOGGLE_CART_IS_OPEN:
            return {
                ...state,
                isCartOpen: !state.isCartOpen
            }
        default:
            return state;
    }
};
