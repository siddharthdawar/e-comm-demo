import {ActionWithPayload} from '../../utils/reducer/reducer.utils';
import {USER_ACTION_TYPES} from './user.types';
import {UserData} from '../../utils/firebase/firebase.utils';

export type SetCurrentUserAction = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>
export const setCurrentUser = (user: UserData) => ({
    type: USER_ACTION_TYPES.SET_CURRENT_USER,
    payload: user
});
