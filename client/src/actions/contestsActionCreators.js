import CONTEST_ACTION_TYPES from './contestsActionTypes';

export const getContestsData = values => ({
  type: CONTEST_ACTION_TYPES.GET_CONTESTS,
  payload: {
    values,
  },
});

export const getActiveContestsData = values => ({
  type: CONTEST_ACTION_TYPES.GET_ACTIVE_CONTESTS,
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

export const setNewCreatorFilter = values => ({
  type: CONTEST_ACTION_TYPES.SET_NEW_CREATOR_FILTER,
  payload: {
    values,
  },
});

export const getIndustryForContest = values => ({
  type: CONTEST_ACTION_TYPES.GET_INDUSTRY_FOR_CONTEST,
  payload: {
    values,
  },
});

export const getIndustryForContestRequest = () => ({
  type: CONTEST_ACTION_TYPES.GET_INDUSTRY_FOR_CONTEST_REQUEST,
});

export const getIndustryForContestSuccess = values => ({
  type: CONTEST_ACTION_TYPES.GET_INDUSTRY_FOR_CONTEST_SUCCESS,
  payload: {
    values,
  },
});

export const getIndustryForContestFailed = error => ({
  type: CONTEST_ACTION_TYPES.GET_INDUSTRY_FOR_CONTEST_FAILED,
  payload: {
    error,
  },
});