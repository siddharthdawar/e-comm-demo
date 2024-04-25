import {CATEGORIES_ACTION_TYPES} from './category.types';

const initialState = {
    categories: [],
    error: null,
    isLoading: false
};

export const categoriesReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                error: payload,
                isLoading: false
            }
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return {
                ...state,
                isLoading: true
            }
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload,
                isLoading: false
            }
        default:
            return state;
    }
};
