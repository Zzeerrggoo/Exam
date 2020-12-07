import produce from 'immer';
import _ from 'lodash';
import AUTH_ACTION_TYPES from '../actions/authActionTypes';
import USER_ACTION_TYPES from '../actions/userActionTypes';
import createReducer from './helpers/createReducer';

const initialState = {
  user: null,
  isFetching: false,
  restoreActionSuccess: false,
  error: null,
};

const handlers = {
  [AUTH_ACTION_TYPES.AUTH_REQUEST]: produce(draftState => {
    draftState.isFetching = true;
  }),
  [AUTH_ACTION_TYPES.AUTH_REQUEST_SUCCESS]: produce((draftState, action) => {
    const {
      payload: {
        data: {user},
      },
    } = action;
    draftState.isFetching = false;
    draftState.user = user;
  }),
  [AUTH_ACTION_TYPES.AUTH_REQUEST_FAILED]: produce((draftState, action) => {
    const {
      payload: {error},
    } = action;
    draftState.isFetching = false;
    draftState.error = error;
  }),
  [AUTH_ACTION_TYPES.LOGOUT_REQUEST_SUCCESS]: () => ({
    ...initialState,
  }),

  [AUTH_ACTION_TYPES.RESTORE_PASSWORD_REQUEST]: produce(draftState => {
    draftState.isFetching = true;
  }),

  [AUTH_ACTION_TYPES.RESTORE_PASSWORD_REQUEST_SUCCESS]: produce(
      (draftState) => {
        draftState.isFetching = false;
        draftState.restoreActionSuccess = true;
      }),
  [AUTH_ACTION_TYPES.AUTH_REQUEST_FAILED]: produce((draftState, action) => {
    const {
      payload: {error},
    } = action;
    draftState.isFetching = false;
    draftState.restoreActionSuccess = false;
    draftState.error = error;
  }),

  [USER_ACTION_TYPES.USER_UPDATE_REQUEST]: produce(draftState => {
    draftState.isFetching = true;
  }),
  [USER_ACTION_TYPES.USER_UPDATE_SUCCESS]: produce((draftState, action) => {
    const {payload: {values}} = action;

    const preparedUser = _.omit(values, ['password']);

    draftState.user = preparedUser;
    draftState.isFetching = false;
  }),
  [USER_ACTION_TYPES.USER_UPDATE_BALANCE]: produce((draftState, action) => {
    const {payload: {values}} = action;
    draftState.user.balance = values;
    draftState.isFetching = false;
  }),
  [USER_ACTION_TYPES.USER_UPDATE_FAILED]: produce((draftState, action) => {
    const {
      payload: {error},
    } = action;
    draftState.isFetching = false;
    draftState.error = error;
  }),

};

const authReducer = createReducer(initialState, handlers);

export default authReducer;
