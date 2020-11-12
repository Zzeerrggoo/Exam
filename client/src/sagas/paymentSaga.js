import {put} from 'redux-saga/effects';
import * as PaymentActionCreators from '../actions/paymentActionCreators';
import * as Api from '../api/http';
import ACTION from '../actions/actionTypes';
import CONSTANTS from '../constants';

export function* paymentSaga(action) {
  yield put(PaymentActionCreators.payRequest());

  try {
    const {payload: {values}} = action;
    const {data: {data}} = yield Api.payment.pay(values);
    yield put(PaymentActionCreators.paySuccess(data));

  } catch (error) {
    yield put(PaymentActionCreators.payFailed(error));
  }

}

export function* cashoutSaga(action) {
  yield put(PaymentActionCreators.payRequest());

  try {
    const {payload: {values}} = action;
    const {data: {data}} = yield Api.payment.cashout(values);

    yield put({
      type: ACTION.CHANGE_PROFILE_MODE_VIEW,
      data: CONSTANTS.USER_INFO_MODE,
    });

    yield put(PaymentActionCreators.paySuccess(data));

  } catch (error) {
    yield put(PaymentActionCreators.payFailed(error));
  }
}