import produce from 'immer';
import PAYMENT_ACTION_TYPES from '../actions/paymentActionTypes';
import createReducer from './helpers/createReducer';

const initialState = {
  isFetching: false,
  error: null,
};

const helpers = {

  [PAYMENT_ACTION_TYPES.PAYMENT_REQUEST]: produce(draftState => {
    draftState.isFetching = true;
  }),

  [PAYMENT_ACTION_TYPES.PAYMENT_SUCCESS]: produce((draftState, action) => {

    const {payload: {values}} = action;

    console.log(values);
    draftState.data = values;
  }),

  [PAYMENT_ACTION_TYPES.PAYMENT_FAILED]: produce((draftState, action) => {
    const {
      payload: {error},
    } = action;
    draftState.isFetching = false;
    draftState.error = error;
  }),
};

const paymentReducer = createReducer(initialState, helpers);

export default paymentReducer;