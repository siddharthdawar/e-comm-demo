import {UserData} from '../../utils/firebase/firebase.utils';

export enum USER_ACTION_TYPES {
    SET_CURRENT_USER = 'SET_CURRENT_USER'
}

export type UserState = {
    readonly currentUser: null | UserData
};
