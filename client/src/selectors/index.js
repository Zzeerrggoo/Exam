import {createSelector} from 'reselect';

export const authSelector = state => state.auth;

export const authUserSelector = createSelector(authSelector, auth => auth.user);

export const contestsSelector = state => state.contestsList;

export const singleContestSelector = state => state.singleContestStore;

export const paymentSelector = state => state.payment;

export const offersSelector = state => state.offers;

export const chatSelector = state => state.chatStore;