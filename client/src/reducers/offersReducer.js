import produce from 'immer';
import OFFER_ACTION_TYPES from '../actions/offerActionTypes';
import createReducer from './helpers/createReducer';

const initialState = {
  isFetching: true,
  offers: [],
  error: null,
};

const helpers = {

  [OFFER_ACTION_TYPES.GET_OFFERS_FOR_CONTEST_REQUEST]: produce(
      draftState => {
        draftState.isFetching = true;
        draftState.offers = [];
        draftState.error = null;
      }),

  [OFFER_ACTION_TYPES.GET_OFFERS_FOR_CONTEST_SUCCESS]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.offers = values;
        draftState.isFetching = false;
      }),

  [OFFER_ACTION_TYPES.GET_OFFERS_FOR_CONTEST_FAILED]: produce(
      (draftState, action) => {
        const {payload: {error}} = action;
        draftState.error = error;
        draftState.isFetching = false;
      }),

};

const offersReducer = createReducer(initialState, helpers);

export default offersReducer;