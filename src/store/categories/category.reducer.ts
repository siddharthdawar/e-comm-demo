import {
    // CategoryAction,
    fetchCategoriesFailed,
    fetchCategoriesStart,
    fetchCategoriesSuccess
} from './category.action';
import {Category} from './category.types';
import {UnknownAction} from 'redux';

// readOnly means we cannot modify these values (immutable state)
export type CategoriesState = {
    readonly categories: Category[];
    readonly error: Error | null;
    readonly isLoading: boolean;
};

const initialState: CategoriesState = {
    categories: [],
    error: null,
    isLoading: false
};

export const categoriesReducer = (
    state = initialState,
    // action = {} as CategoryAction // "Discriminatory" union. Will not receive any other action type in TS's eyes. but in reality, reducers receive ALL actions
    action = {} as UnknownAction
): CategoriesState => {
    if (fetchCategoriesStart.match(action)) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (fetchCategoriesFailed.match(action)) {
        return {
            ...state,
            error: action.payload,
            isLoading: false
        };
    }

    if (fetchCategoriesSuccess.match(action)) {
        return {
            ...state,
            categories: action.payload,
            isLoading: false
        };
    }

    return state;

    // Cannot destructure anymore because the union also contains
    // actions without the payload
    // Below statement will throw ts error about payload
    // const {type, payload} = action;

    /*switch (action.type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                error: action.payload,
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
                categories: action.payload,
                isLoading: false
            }
        default:
            return state;
    }*/
};
