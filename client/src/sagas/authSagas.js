import {put} from 'redux-saga/effects';
import * as AuthActionCreators from '../actions/authActionCreators';
import * as Api from './../api/http';
import * as UserActionCreators from '../actions/userActionCreators';
import ACTION from '../actions/actionTypes';
import CONSTANTS from '../constants';
import {controller} from '../api/ws/socketController';

const createAuthSaga = apiMethod =>
    function* authSaga(action) {
      yield put(AuthActionCreators.authRequest());
      try {
        const {
          payload: {values},
        } = action;
        const {
          data: {data},
        } = yield apiMethod(values);
        controller.subscribe(data.user.id);
        yield put(AuthActionCreators.authRequestSuccess(data));
      } catch (err) {
        yield put(AuthActionCreators.authRequestFailed(err));
      }
    };

export const loginSaga = createAuthSaga(Api.auth.login);
export const signUpSaga = createAuthSaga(Api.auth.signUp);
export const refreshAuthSaga = createAuthSaga(Api.auth.refresh);

export const logoutSaga = function* () {
  yield Api.auth.logout();
  yield put({
    type: ACTION.CHANGE_PROFILE_MODE_VIEW,
    data: CONSTANTS.USER_INFO_MODE,
  });
  yield put(AuthActionCreators.logoutRequestSuccess());
};

const createRestoreSaga = apiMethod =>
    function* restoreSaga(action) {
      yield put(AuthActionCreators.restorePasswordRequest());
      try {
        const {payload: {values}} = action;
        yield apiMethod(values);
        yield put(AuthActionCreators.restorePasswordSuccess());
      } catch (error) {
        yield put(AuthActionCreators.restorePasswordFailed(error));
      }
    };

export const restorePasswordSaga = createRestoreSaga(Api.auth.restorePassword);
export const verificationPasswordSaga = createRestoreSaga(
    Api.auth.passwordVerification);

export const updateUserSaga = function* (action) {

  yield put(UserActionCreators.userUpdateRequest());

  try {
    const {payload: {values}} = action;

    const {data: {data}} = yield Api.auth.updateUser(values);

    yield put(UserActionCreators.userUpdateSuccess(data));

  } catch (error) {
    yield put(UserActionCreators.userUpdateFailed(error));
  }
};