import {put, select} from 'redux-saga/effects';
import remove from 'lodash/remove';
import * as ChatsActionCreators from '../actions/chatsActionCreators';
import * as Api from '../api/http';

export function* previewSaga() {
  try {
    yield put(ChatsActionCreators.getChatPreviewRequest());
    const {data: {data}} = yield Api.chats.getChatsPreview();
    yield put(ChatsActionCreators.getChatPreviewSuccess(data));
  } catch (error) {
    yield put(ChatsActionCreators.getCatalogListFailed(error));
  }
}

export function* sendMessage(action) {
  try {
    yield put(ChatsActionCreators.postMessageRequest());
    const {payload: {values}} = action;
    const {data: {data}} = yield Api.chats.postNewMessage(values);

    const {message, interlocutor, chatData} = data;
    const preview = {
      ...chatData,
      Interlocutor: {User: interlocutor},
      message,
    };
    const {messagesPreview} = yield select(state => state.chatStore);

    let isNew = true;
    messagesPreview.forEach(preview => {
      if (preview.chatId === message.chatId) {
        preview.message.body = message.body;
        preview.message.sender = message.userId;
        preview.message.createAt = message.createdAt;
        isNew = false;
      }
    });
    if (isNew) {
      messagesPreview.push(preview);
    }

    yield put(ChatsActionCreators.postMessageSuccess(
        {message, chatData, messagesPreview}));
  } catch (error) {
    yield put(ChatsActionCreators.postMessageFailed(error));
  }
}

export function* getDialog(action) {
  try {
    const {payload: {values}} = action;
    const {data: {data}} = yield Api.chats.getChat(values);
    yield put(ChatsActionCreators.getDialogMessagesSuccess(data));
  } catch (error) {
    yield put(ChatsActionCreators.getDialogMessagesFailed(error));
  }
}

export function* changeChatBlock(action) {
  try {
    const {payload: {values}} = action;
    const {data: {data}} = yield Api.chats.setChatBlocked(values);
    const {messagesPreview} = yield select(state => state.chatStore);

    messagesPreview.forEach(preview => {
      if (preview.chatId === data.chatId) {
        preview.isBlocked = data.isBlocked;
        preview.isInBlackList = data.isInBlackList;
      }
    });

    yield put(ChatsActionCreators.setChatBlockedSuccess(
        {messagesPreview, chatData: data}));
  } catch (error) {
    yield put(ChatsActionCreators.setChatBlockedFailed(error));
  }
}

export function* changeChatFavorite(action) {
  try {
    const {payload: {values}} = action;
    const {data: {data}} = yield Api.chats.setChatFavorite(values);
    const {messagesPreview} = yield select(state => state.chatStore);

    messagesPreview.forEach(preview => {
      if (preview.chatId === data.chatId)
        preview.isFavorite = data.isFavorite;
    });

    yield put(ChatsActionCreators.setChatFavoriteSuccess(
        {chatData: data, messagesPreview}));
  } catch (error) {
    yield put(ChatsActionCreators.setChatFavoriteFailed(error));
  }
}

export function* createCatalog(action) {
  try {
    const {payload: {values}} = action;
    const {data: {data}} = yield Api.chats.createCatalog(values);
    yield put(ChatsActionCreators.createCatalogSuccess(data));
  } catch (error) {
    yield put(ChatsActionCreators.createCatalogFailed(error));
  }
}

export function* getCatalogListSaga(action) {
  try {
    const {payload: {values}} = action;
    const {data: {data}} = yield Api.chats.getCatalogsList(values);
    yield put(ChatsActionCreators.getCatalogListSuccess(data));
  } catch (error) {
    yield put(ChatsActionCreators.getCatalogListFailed(error));
  }
}

export function* addChatToCatalog(action) {
  try {
    const {payload: {values}} = action;
    yield Api.chats.addChatIntoCatalog(values);
    yield put(ChatsActionCreators.addChatToCatalogSuccess());
  } catch (error) {
    yield put(ChatsActionCreators.addChatToCatalogFailed(error));
  }
}

export function* changeCatalogName(action) {
  try {
    const {payload: {values}} = action;
    const {data: {data}} = yield Api.chats.changeCatalogName(values);
    const {catalogList} = yield select(state => state.chatStore);

    const index = catalogList.findIndex((item) => item.id === data.id);
    if (index !== -1) {
      catalogList[index].catalogName = data.catalogName;
    }

    yield put(ChatsActionCreators.changeCatalogNameSuccess(
        {catalogList, currentCatalog: data}));
  } catch (error) {
    yield put(ChatsActionCreators.changeCatalogNameFailed(error));
  }
}

export function* removeChatFromCatalogSaga(action) {
  try {
    const {payload: {values}} = action;
    const {data: {data}} = yield Api.chats.removeChatFromCatalog(values);
    const {catalogList} = yield select(state => state.chatStore);

    const index = catalogList.findIndex((item) => item.id === data.id);
    if (index !== -1) {
      catalogList[index] = data;
    }

    yield put(ChatsActionCreators.removeChatFromCatalogSuccess(
        {catalogList, currentCatalog: data}));
  } catch (error) {
    yield put(ChatsActionCreators.removeChatFromCatalogFailed(error));
  }
}

export function* deleteCatalog(action) {
  try {
    const {payload: {values}} = action;
    yield Api.chats.deleteCatalog(values);
    const {catalogList} = yield select(state => state.chatStore);
    const newCatalogList = remove(
        catalogList,
        catalog => action.data.catalogId !== catalog.id,
    );
    yield put(ChatsActionCreators.deleteCatalogSuccess(newCatalogList));
  } catch (error) {
    yield put(ChatsActionCreators.deleteCatalogFailed(error));
  }
}


