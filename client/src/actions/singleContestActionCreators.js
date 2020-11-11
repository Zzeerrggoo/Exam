import SINGLE_CONTEST_ACTION_TYPES from './singleContestActionTypes';

export const getDescriptionForContest = values => ({
  type: SINGLE_CONTEST_ACTION_TYPES.GET_DESCRIPTION_FOR_CONTEST,
  payload: {
    values,
  },
});

export const getDescriptionForContestRequest = () => ({
  type: SINGLE_CONTEST_ACTION_TYPES.GET_DESCRIPTION_FOR_CONTEST_REQUEST,
});

export const getDescriptionForContestSuccess = values => ({
  type: SINGLE_CONTEST_ACTION_TYPES.GET_DESCRIPTION_FOR_CONTEST_SUCCESS,
  payload: {
    values,
  },
});

export const getDescriptionForContestFailed = error => ({
  type: SINGLE_CONTEST_ACTION_TYPES.GET_DESCRIPTION_FOR_CONTEST_FAILED,
  payload: {
    error,
  },
});

export const selectBundle = values => ({
  type: SINGLE_CONTEST_ACTION_TYPES.SELECT_BUNDLE,
  payload: {
    values,
  },
});