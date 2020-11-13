import {put} from 'redux-saga/effects';
import * as PaymentActionCreators from '../actions/paymentActionCreators';
import * as Api from '../api/http';
import ACTION from '../actions/actionTypes';
import CONSTANTS from '../constants';
import history from '../browserHistory';
import * as UserActionCreators from '../actions/userActionCreators';
import * as ContestsActionCreators from '../actions/contestsActionCreators';

export function* paymentSaga(action) {
  yield put(PaymentActionCreators.payRequest());
  try {
    const {payload: {values}} = action;
    yield Api.payment.pay(values);
    history.replace('dashboard');
    yield put(ContestsActionCreators.clearCreatingContestsFromStore());
    yield put(PaymentActionCreators.clearPaymentStore());

  } catch (error) {
    yield put(PaymentActionCreators.payFailed(error));
  }

}

export function* cashoutSaga(action) {
  yield put(PaymentActionCreators.payRequest());

  try {

    const {payload: {values}} = action;
    const {data: {data}} = yield Api.payment.cashout(values);

    yield put(UserActionCreators.userUpdateBalance(data));
    yield put(PaymentActionCreators.clearPaymentStore());
    yield put({
      type: ACTION.CHANGE_PROFILE_MODE_VIEW,
      data: CONSTANTS.USER_INFO_MODE,
    });

  } catch (error) {
    yield put(PaymentActionCreators.payFailed(error));
  }
}