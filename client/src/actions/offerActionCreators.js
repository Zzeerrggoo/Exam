import OFFER_ACTION_TYPES from './offerActionTypes';

export const getOffersForContest = values => ({
  type: OFFER_ACTION_TYPES.GET_OFFERS_FOR_CONTEST,
  payload: {
    values,
  },
});

export const getOffersForContestRequest = () => ({
  type: OFFER_ACTION_TYPES.GET_OFFERS_FOR_CONTEST_REQUEST,
});

export const getOffersForContestSuccess = values => ({
  type:OFFER_ACTION_TYPES.GET_OFFERS_FOR_CONTEST_SUCCESS,
  payload: {
    values,
  },
});

export const getOffersForContestFailed = error => ({
  type: OFFER_ACTION_TYPES.GET_OFFERS_FOR_CONTEST_FAILED,
  payload: {
    error,
  },
});