import {
    UserState,
    USER_ACTION_TYPES
} from './user.types';
import {SetCurrentUserAction} from './user.action';

const initialState: UserState = {
    currentUser: null
};

export const userReducer = (
    state = initialState,
    action = {} as SetCurrentUserAction
): UserState => {
    switch (action.type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
};
