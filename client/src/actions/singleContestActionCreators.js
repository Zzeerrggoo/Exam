import SINGLE_CONTEST_ACTION_TYPES from './singleContestActionTypes';

export const selectBundle = values => ({
  type: SINGLE_CONTEST_ACTION_TYPES.SELECT_BUNDLE,
  payload: {
    values,
  },
});

export const changeContestViewMode = values => ({
  type: SINGLE_CONTEST_ACTION_TYPES.CHANGE_CONTEST_VIEW_MODE,
  payload: {
    values,
  },
});

export const changeShowImage = values => ({
  type: SINGLE_CONTEST_ACTION_TYPES.CHANGE_SHOW_IMAGE,
  payload: {
    values,
  },
});

export const changeEditContest = values => ({
  type: SINGLE_CONTEST_ACTION_TYPES.CHANGE_EDIT_CONTEST,
  payload: {
    values,
  },
});

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

export const getContestById = values => ({
  type: SINGLE_CONTEST_ACTION_TYPES.GET_CONTEST_BY_ID,
  payload: {
    values,
  },
});

export const getContestByIdRequest = () => ({
  type: SINGLE_CONTEST_ACTION_TYPES.GET_CONTEST_BY_ID_REQUEST,
});

export const getContestByIdSuccess = values => ({
  type: SINGLE_CONTEST_ACTION_TYPES.GET_CONTEST_BY_ID_SUCCESS,
  payload: {
    values,
  },
});

export const getContestByIdFailed = error => ({
  type: SINGLE_CONTEST_ACTION_TYPES.GET_CONTEST_BY_ID_FAILED,
  payload: {
    error,
  },
});

export const updateContest = values => ({
  type: SINGLE_CONTEST_ACTION_TYPES.UPDATE_CONTEST,
  payload: {
    values,
  },
});

export const updateContestRequest = () => ({
  type: SINGLE_CONTEST_ACTION_TYPES.UPDATE_CONTEST_REQUEST,
});

export const updateContestSuccess = values => ({
  type: SINGLE_CONTEST_ACTION_TYPES.UPDATE_CONTEST_SUCCESS,
  payload: {
    values,
  },
});

export const updateContestFailed = error => ({
  type: SINGLE_CONTEST_ACTION_TYPES.UPDATE_CONTEST_FAILED,
  payload: {
    error,
  },
});