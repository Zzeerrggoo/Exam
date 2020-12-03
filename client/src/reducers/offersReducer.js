import produce, {original} from 'immer';
import _ from 'lodash';
import OFFER_ACTION_TYPES from '../actions/offerActionTypes';
import createReducer from './helpers/createReducer';
import CONSTANTS from '../constants';

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

  [OFFER_ACTION_TYPES.GET_MODERATING_OFFERS_REQUEST]: produce(
      draftState => {
        draftState.isFetching = true;
        draftState.offers = [];
        draftState.error = null;
      }),

  [OFFER_ACTION_TYPES.GET_MODERATING_OFFERS_SUCCESS]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.offers = values;
        draftState.isFetching = false;
      }),

  [OFFER_ACTION_TYPES.GET_MODERATING_OFFERS_FAILED]: produce(
      (draftState, action) => {
        const {payload: {error}} = action;
        draftState.error = error;
        draftState.isFetching = false;
      }),

  [OFFER_ACTION_TYPES.ADD_NEW_OFFER_REQUEST]: produce(
      draftState => {
        draftState.isFetching = true;
        draftState.error = null;
      }),

  [OFFER_ACTION_TYPES.ADD_NEW_OFFER_SUCCESS]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.offers.push(values);
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
        draftState.error = null;
      }),

  [OFFER_ACTION_TYPES.SET_OFFER_STATUS_SUCCESS]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        const orig = original(draftState);
        const offers = _.cloneDeep(orig.offers);

        draftState.offers = offers.map((offer) => {

          if (values.status === CONSTANTS.OFFER_STATUS_WON) {
            offer.status =
                values.id === offer.id
                    ? CONSTANTS.OFFER_STATUS_WON
                    : CONSTANTS.OFFER_STATUS_REJECTED;
          } else if (values.id === offer.id) {
            offer.status = CONSTANTS.OFFER_STATUS_REJECTED;
          }
          return offer;
        });

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

        const currentOffer = draftState.offers[index];
        if (currentOffer.Rating) {
          currentOffer.Rating.mark = offer.mark;
        } else {
          currentOffer.Rating = {mark: offer.mark};
        }

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

  [OFFER_ACTION_TYPES.CLEAR_ERROR]: produce(
      (draftState) => {
        draftState.error = null;
      }),

  [OFFER_ACTION_TYPES.MODERATE_OFFER_SUCCESS]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        const index = draftState.offers.findIndex(
            offer => offer.id === values.offerId);
        if (index !== -1) {
          draftState.offers[index].isAllowed = values.isAllowed;
        }
      }),

  [OFFER_ACTION_TYPES.MODERATE_OFFER_FAILED]: produce(
      (draftState, action) => {
        const {payload: {error}} = action;
        draftState.error = error;
      }),

};

const offersReducer = createReducer(initialState, helpers);

export default offersReducer;