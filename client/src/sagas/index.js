import {takeLatest, takeEvery} from 'redux-saga/effects';
import * as AuthSagas from './authSagas';
import * as ContestsSagas from './contestsSagas';
import * as SingleContestSagas from './singleContestSagas';
import * as PaymentSagas from './paymentSaga';
import * as OfferSagas from './offerSagas';
import * as ChatSagas from './chatSagas';
import AUTH_ACTION_TYPES from '../actions/authActionTypes';
import USER_ACTION_TYPES from '../actions/userActionTypes';
import CONTEST_ACTION_TYPES from '../actions/contestsActionTypes';
import SINGLE_CONTEST_ACTION_TYPES from '../actions/singleContestActionTypes';
import PAYMENT_ACTION_TYPES from '../actions/paymentActionTypes';
import OFFER_ACTION_TYPES from '../actions/offerActionTypes';
import CHATS_ACTION_TYPES from '../actions/chatsActionTypes';

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
  yield takeLatest(OFFER_ACTION_TYPES.GET_MODERATING_OFFERS,
      OfferSagas.getModeratingOffersSaga);
  yield takeLatest(OFFER_ACTION_TYPES.MODERATE_OFFER, OfferSagas.moderateOfferSaga);

  //CHAT
  yield takeLatest(CHATS_ACTION_TYPES.GET_CHAT_PREVIEW, ChatSagas.previewSaga);
  yield takeLatest(CHATS_ACTION_TYPES.GET_DIALOG_MESSAGES, ChatSagas.getDialog);
  yield takeLatest(CHATS_ACTION_TYPES.POST_MESSAGE, ChatSagas.sendMessage);
  yield takeLatest(CHATS_ACTION_TYPES.SET_CHAT_FAVORITE,
      ChatSagas.changeChatFavorite);
  yield takeLatest(CHATS_ACTION_TYPES.SET_CHAT_BLOCKED,
      ChatSagas.changeChatBlock);
  yield takeLatest(CHATS_ACTION_TYPES.GET_CATALOG_LIST,
      ChatSagas.getCatalogListSaga);
  yield takeLatest(CHATS_ACTION_TYPES.ADD_CHAT_TO_CATALOG,
      ChatSagas.addChatToCatalog);
  yield takeLatest(CHATS_ACTION_TYPES.CREATE_CATALOG, ChatSagas.createCatalog);
  yield takeLatest(CHATS_ACTION_TYPES.DELETE_CATALOG, ChatSagas.deleteCatalog);
  yield takeLatest(
      CHATS_ACTION_TYPES.REMOVE_CHAT_FROM_CATALOG,
      ChatSagas.removeChatFromCatalogSaga,
  );
  yield takeLatest(CHATS_ACTION_TYPES.CHANGE_CATALOG_NAME,
      ChatSagas.changeCatalogName);
}

export default rootSaga;
