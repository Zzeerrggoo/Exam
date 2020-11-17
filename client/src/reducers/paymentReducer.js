import produce from 'immer';
import PAYMENT_ACTION_TYPES from '../actions/paymentActionTypes';
import createReducer from './helpers/createReducer';

const initialState = {
  isFetching: true,
  error: null,
  focusOnElement: 'number',
};

const helpers = {

  [PAYMENT_ACTION_TYPES.PAYMENT_REQUEST]: produce(draftState => {
    draftState.isFetching = true;
  }),

  [PAYMENT_ACTION_TYPES.PAYMENT_SUCCESS]: produce((draftState, action) => {
    const {payload: {values}} = action;
    draftState.data = values;
  }),

  [PAYMENT_ACTION_TYPES.PAYMENT_FAILED]: produce((draftState, action) => {
    const {
      payload: {error},
    } = action;
    draftState.isFetching = false;
    draftState.error = error;
  }),

  [PAYMENT_ACTION_TYPES.CLEAR_PAYMENT_STORE]: produce(draftState => {
    draftState = initialState;
  }),

  [PAYMENT_ACTION_TYPES.CHANGE_FOCUS_ON_CARD]: produce((draftState, action) => {
    const {payload: {values}} = action;
    draftState.focusOnElement = values;
  }),
};

const paymentReducer = createReducer(initialState, helpers);

export default paymentReducer;