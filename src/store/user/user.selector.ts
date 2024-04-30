import {RootState} from '../store';
import {UserState} from './user.types';
import {createSelector} from 'reselect';

const selectCurrentUserReducer = (state: RootState): UserState =>
    state.user;

export const selectCurrentUser = createSelector(
    [selectCurrentUserReducer],
    (currentUserSlice) => currentUserSlice.currentUser
);
