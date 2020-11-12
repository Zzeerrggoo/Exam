import PAYMENT_ACTION_TYPES from './paymentActionTypes';

export const cashout = values => ({
  type: PAYMENT_ACTION_TYPES.CASHOUT,
  payload: {
    values,
  },
});

export const pay = values => ({
  type: PAYMENT_ACTION_TYPES.PAYMENT,
  payload: {
    values,
  },
});

export const payRequest = () => ({
  type: PAYMENT_ACTION_TYPES.PAYMENT_REQUEST,
});

export const paySuccess = values => ({
  type: PAYMENT_ACTION_TYPES.PAYMENT_SUCCESS,
  payload: {
    values,
  },
});

export const payFailed = error => ({
  type: PAYMENT_ACTION_TYPES.PAYMENT_FAILED,
  payload: {
    error,
  },
});



