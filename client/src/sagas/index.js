import {takeLatest, takeEvery} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as AuthSagas from './authSagas';
import * as ContestsSagas from './contestsSagas';
import * as SingleContestSagas from './singleContestSagas';
import * as PaymentSagas from './paymentSaga';
import * as OfferSagas from './offerSagas';
import {
  previewSaga,
  getDialog,
  sendMessage,
  changeChatFavorite,
  changeChatBlock,
  getCatalogListSaga,
  addChatToCatalog,
  createCatalog,
  deleteCatalog,
  removeChatFromCatalogSaga,
  changeCatalogName,
} from './chatSagas';
import AUTH_ACTION_TYPES from '../actions/authActionTypes';
import USER_ACTION_TYPES from '../actions/userActionTypes';
import CONTEST_ACTION_TYPES from '../actions/contestsActionTypes';
import SINGLE_CONTEST_ACTION_TYPES from '../actions/singleContestActionTypes';
import PAYMENT_ACTION_TYPES from '../actions/paymentActionTypes';
import OFFER_ACTION_TYPES from '../actions/offerActionTypes';

function* rootSaga() {
  //SINGLE_CONTEST
  yield takeLatest(SINGLE_CONTEST_ACTION_TYPES.GET_DESCRIPTION_FOR_CONTEST,
      SingleContestSagas.getDescriptionForContestCreatingSaga);
  yield takeLatest(SINGLE_CONTEST_ACTION_TYPES.GET_CONTEST_BY_ID,
      SingleContestSagas.getContestByIdSaga);
  yield takeLatest(SINGLE_CONTEST_ACTION_TYPES.UPDATE_CONTEST,
      SingleContestSagas.updateContestSaga);

  // CONTESTS
  yield takeLatest(CONTEST_ACTION_TYPES.GET_CONTESTS,
      ContestsSagas.getCustomerContestsSaga);
  yield takeLatest(CONTEST_ACTION_TYPES.GET_ACTIVE_CONTESTS,
      ContestsSagas.activeContestsSaga);
  yield takeLatest(CONTEST_ACTION_TYPES.GET_INDUSTRY_FOR_CONTEST,
      ContestsSagas.industryForContestSaga);

  // AUTH
  yield takeLatest(USER_ACTION_TYPES.USER_UPDATE, AuthSagas.updateUserSaga);
  yield takeLatest(AUTH_ACTION_TYPES.LOGIN_REQUEST, AuthSagas.loginSaga);
  yield takeLatest(AUTH_ACTION_TYPES.SIGNUP_REQUEST, AuthSagas.signUpSaga);
  yield takeLatest(
      AUTH_ACTION_TYPES.REFRESH_AUTH_REQUEST,
      AuthSagas.refreshAuthSaga,
  );
  yield takeLatest(AUTH_ACTION_TYPES.LOGOUT_REQUEST, AuthSagas.logoutSaga);

  //PAYMENT
  yield takeLatest(PAYMENT_ACTION_TYPES.PAYMENT, PaymentSagas.paymentSaga);
  yield takeLatest(PAYMENT_ACTION_TYPES.CASHOUT, PaymentSagas.cashoutSaga);

  //OFFERS
  yield takeLatest(OFFER_ACTION_TYPES.GET_OFFERS_FOR_CONTEST,
      OfferSagas.getOffersSaga);
  yield takeLatest(OFFER_ACTION_TYPES.CHANGE_OFFER_MARK,
      OfferSagas.changeOfferMarkSaga);
  yield takeEvery(OFFER_ACTION_TYPES.ADD_NEW_OFFER, OfferSagas.setNewOfferSaga);
  yield takeLatest(OFFER_ACTION_TYPES.SET_OFFER_STATUS,
      OfferSagas.setOffersStatusSaga);

  //CHAT LEGACY
  yield takeLatest(ACTION.GET_PREVIEW_CHAT_ASYNC, previewSaga);
  yield takeLatest(ACTION.GET_DIALOG_MESSAGES_ASYNC, getDialog);
  yield takeLatest(ACTION.SEND_MESSAGE_ACTION, sendMessage);
  yield takeLatest(ACTION.SET_CHAT_FAVORITE_FLAG, changeChatFavorite);
  yield takeLatest(ACTION.SET_CHAT_BLOCK_FLAG, changeChatBlock);
  yield takeLatest(ACTION.GET_CATALOG_LIST_ASYNC, getCatalogListSaga);
  yield takeLatest(ACTION.ADD_CHAT_TO_CATALOG_ASYNC, addChatToCatalog);
  yield takeLatest(ACTION.CREATE_CATALOG_REQUEST, createCatalog);
  yield takeLatest(ACTION.DELETE_CATALOG_REQUEST, deleteCatalog);
  yield takeLatest(
      ACTION.REMOVE_CHAT_FROM_CATALOG_REQUEST,
      removeChatFromCatalogSaga,
  );
  yield takeLatest(ACTION.CHANGE_CATALOG_NAME_REQUEST, changeCatalogName);
}

export default rootSaga;
