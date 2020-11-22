import produce from 'immer';
import OFFER_ACTION_TYPES from '../actions/offerActionTypes';
import createReducer from './helpers/createReducer';

const initialState = {
  isFetching: true,
  offers: [],
  error: null,

  changeMarkError: null,
  addOfferError: null,
  setOfferStatusError: null,

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

  [OFFER_ACTION_TYPES.ADD_NEW_OFFER_REQUEST]: produce(
      draftState => {
        draftState.isFetching = true;
        draftState.offers = [];
        draftState.error = null;
      }),

  [OFFER_ACTION_TYPES.ADD_NEW_OFFER_SUCCESS]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.offers = values;
        draftState.isFetching = false;
      }),

  [OFFER_ACTION_TYPES.ADD_NEW_OFFER_FAILED]: produce(
      (draftState, action) => {
        const {payload: {error}} = action;
        draftState.error = error;
        draftState.isFetching = false;
      }),

  [OFFER_ACTION_TYPES.SET_OFFER_STATUS_REQUEST]: produce(
      draftState => {
        draftState.isFetching = true;
        draftState.offers = [];
        draftState.error = null;
      }),

  [OFFER_ACTION_TYPES.SET_OFFER_STATUS_SUCCESS]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.offers = values;
        draftState.isFetching = false;
      }),

  [OFFER_ACTION_TYPES.SET_OFFER_STATUS_FAILED]: produce(
      (draftState, action) => {
        const {payload: {error}} = action;
        draftState.error = error;
        draftState.isFetching = false;
      }),

  [OFFER_ACTION_TYPES.CHANGE_OFFER_MARK_SUCCESS]: produce(
      (draftState, action) => {
        const {
          payload: {values: {offer, user}},
        } = action;

        const index = draftState.offers.findIndex(
            elem => elem.id === offer.offerId && elem.userId ===
                offer.creatorId);
        draftState.offers[index].Rating.mark = offer.mark;

        draftState.offers.map(item => {
          if (item.User.id === user.id) {
            item.User = user;
          }
        });

        draftState.isFetching = false;
      }),

  [OFFER_ACTION_TYPES.CHANGE_OFFER_MARK_FAILED]: produce(
      (draftState, action) => {
        const {payload: {error}} = action;
        draftState.error = error;
        draftState.isFetching = false;
      }),

  [OFFER_ACTION_TYPES.CLEAR_MARK_ERROR]: produce(
      (draftState) => {
        draftState.error = null;
      }),
};

const offersReducer = createReducer(initialState, helpers);

export default offersReducer;