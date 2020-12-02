import {put} from 'redux-saga/effects';

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

export function* setNewOfferSaga(action) {
  yield put(OfferActionCreators.addNewOfferRequest());

  try {
    const {payload: {values}} = action;
    const {data: {data}} = yield Api.offers.addNewOffer(values);

    yield put(OfferActionCreators.addNewOfferSuccess(data));

  } catch (error) {
    yield put(OfferActionCreators.addNewOfferFailed(error));
  }
}

export function* setOffersStatusSaga(action) {
  yield put(OfferActionCreators.setOfferStatusRequest());

  try {
    const {payload: {values}} = action;
    const {data: {data}} = yield Api.offers.setOfferStatus(values);

    yield put(OfferActionCreators.setOfferStatusSuccess(data));

  } catch (error) {
    yield put(OfferActionCreators.setOfferStatusFailed(error));
  }
}

export function* getModeratingOffersSaga(action) {
  try {
    const {payload: {values}} = action;
    yield put(OfferActionCreators.getModeratingOffersRequest());
    const {data: {data}} = yield Api.offers.getModeratingOffers(values);
    yield put(OfferActionCreators.getModeratingOffersSuccess(data));

  } catch (error) {
    yield put(OfferActionCreators.getModeratingOffersFailed(error));
  }
}