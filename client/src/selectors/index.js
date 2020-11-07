import {createSelector} from 'reselect';

export const authSelector = state => state.auth;

export const authUserSelector = createSelector(authSelector, auth => auth.user);

export const contestsSelector = state => state.contestsList;
