import {put, select} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';
import CONSTANTS from '../constants';
import * as Api from '../api/http';
import * as OfferActionCreators from '../actions/offerActionCreators';

export function* getOffersSaga(action) {
  yield put(OfferActionCreators.getOffersForContestRequest());

  try {
    const {payload: {values}} = action;
    const {data: {data}} = yield Api.offers.getOffersForContest(values);
    yield put(OfferActionCreators.getOffersForContestSuccess(data));

  } catch (error) {
    yield put(OfferActionCreators.getOffersForContestFailed(error));
  }

}

export function* changeOfferMarkSaga(action) {
  try {
    const {payload: {values}} = action;
    const {data: {data}} = yield Api.offers.changeOfferMark(values);

    yield put(OfferActionCreators.changeOfferMarkSuccess(data));

  } catch (error) {
    yield put(OfferActionCreators.changeOfferMarkFailed(error));
  }
}

export function* addOfferSaga(action) {
  try {
    const {data} = yield restController.setNewOffer(action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);
    offers.unshift(data);
    yield put({type: ACTION.ADD_NEW_OFFER_TO_STORE, data: offers});
  } catch (e) {
    yield put({type: ACTION.ADD_OFFER_ERROR, error: e.response});
  }
}

export function* setOfferStatusSaga(action) {
  try {
    const {data} = yield restController.setOfferStatus(action.data);
    const offers = yield select((state) => state.contestByIdStore.offers);
    offers.forEach((offer) => {
      if (data.status === CONSTANTS.OFFER_STATUS_WON) {
        offer.status =
            data.id === offer.id
                ? CONSTANTS.OFFER_STATUS_WON
                : CONSTANTS.OFFER_STATUS_REJECTED;
      } else if (data.id === offer.id) {
        offer.status = CONSTANTS.OFFER_STATUS_REJECTED;
      }
    });
    yield put({type: ACTION.CHANGE_STORE_FOR_STATUS, data: offers});
  } catch (e) {
    yield put({type: ACTION.SET_OFFER_STATUS_ERROR, error: e.response});
  }
}

