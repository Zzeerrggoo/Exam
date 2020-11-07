import CONTEST_ACTION_TYPES from './contestActionTypes';

export const getContestsData = values => ({
  type: CONTEST_ACTION_TYPES.GET_CONTESTS,
  payload: {
    values,
  },
});

export const getContestsRequest = () => ({
  type: CONTEST_ACTION_TYPES.GET_CONTESTS_REQUEST,
});

export const getContestsSuccess = values => ({
  type: CONTEST_ACTION_TYPES.GET_CONTESTS_SUCCESS,
  payload: {
    values,
  },
});

export const getContestsFailed = error => ({
  type: CONTEST_ACTION_TYPES.GET_CONTESTS_FAILED,
  payload: {
    error,
  },
});

export const setNewCustomerFilter = values => ({
  type: CONTEST_ACTION_TYPES.SET_NEW_CUSTOMER_FILTER,
  payload: {
    values,
  },
});

