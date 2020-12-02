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
  type: OFFER_ACTION_TYPES.GET_OFFERS_FOR_CONTEST_SUCCESS,
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

export const changeOfferMark = values => ({
  type: OFFER_ACTION_TYPES.CHANGE_OFFER_MARK,
  payload: {
    values,
  },
});

export const changeOfferMarkSuccess = values => ({
  type: OFFER_ACTION_TYPES.CHANGE_OFFER_MARK_SUCCESS,
  payload: {
    values,
  },
});

export const changeOfferMarkFailed = error => ({
  type: OFFER_ACTION_TYPES.CHANGE_OFFER_MARK_FAILED,
  payload: {
    error,
  },
});

export const clearError = () => ({
  type: OFFER_ACTION_TYPES.CLEAR_ERROR,
});

export const addNewOffer = values => ({
  type: OFFER_ACTION_TYPES.ADD_NEW_OFFER,
  payload: {
    values,
  },
});

export const addNewOfferRequest = () => ({
  type: OFFER_ACTION_TYPES.ADD_NEW_OFFER_REQUEST,
});

export const addNewOfferSuccess = values => ({
  type: OFFER_ACTION_TYPES.ADD_NEW_OFFER_SUCCESS,
  payload: {
    values,
  },
});

export const addNewOfferFailed = error => ({
  type: OFFER_ACTION_TYPES.ADD_NEW_OFFER_FAILED,
  payload: {
    error,
  },
});

export const setOfferStatus = values => ({
  type: OFFER_ACTION_TYPES.SET_OFFER_STATUS,
  payload: {
    values,
  },
});

export const setOfferStatusRequest = () => ({
  type: OFFER_ACTION_TYPES.SET_OFFER_STATUS_REQUEST,
});

export const setOfferStatusSuccess = values => ({
  type: OFFER_ACTION_TYPES.SET_OFFER_STATUS_SUCCESS,
  payload: {
    values,
  },
});

export const setOfferStatusFailed = error => ({
  type: OFFER_ACTION_TYPES.SET_OFFER_STATUS_FAILED,
  payload: {
    error,
  },
});

export const getModeratingOffers = values => ({
  type: OFFER_ACTION_TYPES.GET_MODERATING_OFFERS,
  payload: {
    values,
  },
});

export const getModeratingOffersRequest = () => ({
  type: OFFER_ACTION_TYPES.GET_MODERATING_OFFERS_REQUEST,
});

export const getModeratingOffersSuccess = values => ({
  type: OFFER_ACTION_TYPES.GET_MODERATING_OFFERS_SUCCESS,
  payload: {
    values,
  },
});

export const getModeratingOffersFailed = error => ({
  type: OFFER_ACTION_TYPES.GET_MODERATING_OFFERS_FAILED,
  payload: {
    error,
  },
});