import USER_ACTION_TYPES from './userActionTypes';

export const userUpdate = values => ({
  type: USER_ACTION_TYPES.USER_UPDATE,
  payload: {
    values,
  },
});

export const userUpdateRequest = () => ({
  type: USER_ACTION_TYPES.USER_UPDATE_REQUEST,
});

export const userUpdateSuccess = values => ({
  type: USER_ACTION_TYPES.USER_UPDATE_SUCCESS,
  payload: {
    values,
  },
});

export const userUpdateFailed = error => ({
  type: USER_ACTION_TYPES.USER_UPDATE_FAILED,
  payload: {
    error,
  },
});