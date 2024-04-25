import {CART_ACTION_TYPES} from './cart.types';

const initialState = {
    cartItems: [],
    isCartOpen: false
};

export const cartReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload
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
