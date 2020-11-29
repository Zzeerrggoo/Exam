import {put, select} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';
import remove from 'lodash/remove';
import {isEqual} from 'lodash';
import * as ChatsActionCreators from '../actions/chatsActionCreators';
import * as Api from '../api/http';

export function* previewSaga() {
  try {
    const {data: {data}} = yield Api.chats.getChatsPreview();
    yield put({type: ACTION.GET_PREVIEW_CHAT, data: data});
  } catch (err) {
    yield put({type: ACTION.GET_PREVIEW_CHAT_ERROR, error: err.response});
  }
}

export function* sendMessage(action) {
  try {
    const {data: {data}} = yield Api.chats.postNewMessage(action.data);

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

    yield put({
      type: ACTION.SEND_MESSAGE,
      data: {message, chatData, messagesPreview},
    });
  } catch (err) {
    yield put({type: ACTION.SEND_MESSAGE_ERROR, error: err.response});
  }
}

export function* getDialog(action) {
  try {
    const {data: {data}} = yield Api.chats.getChat(action.data);
    yield put({type: ACTION.GET_DIALOG_MESSAGES, data: data});
  } catch (err) {
    yield put({type: ACTION.GET_DIALOG_MESSAGES_ERROR, error: err.response});
  }
}

export function* changeChatBlock(action) {
  try {
    const {data: {data}} = yield Api.chats.setChatBlocked(action.data);
    console.log(data);
    const {messagesPreview} = yield select(state => state.chatStore);
    messagesPreview.forEach(preview => {
      if (preview.chatId === data.chatId) {
        preview.isBlocked = data.isBlocked;
        preview.isInBlackList = data.isInBlackList;
      }
    });
    yield put({
      type: ACTION.CHANGE_CHAT_BLOCK,
      data: {messagesPreview, chatData: data},
    });
  } catch (err) {
    yield put({type: ACTION.SET_CHAT_BLOCK_ERROR, error: err.response});
  }
}

export function* changeChatBlock(action) {
  try {
    const {data} = yield restController.changeChatBlock(action.data);
    const {messagesPreview} = yield select(state => state.chatStore);
    messagesPreview.forEach(preview => {
      if (isEqual(preview.participants, data.participants))
        preview.favoriteList = data.favoriteList;
    });
    yield put({
      type: ACTION.CHANGE_CHAT_BLOCK,
      data: {messagesPreview, chatData: data},
    });
  } catch (err) {
    yield put({type: ACTION.SET_CHAT_BLOCK_ERROR, error: err.response});
  }
}

export function* getCatalogListSaga(action) {
  try {
    const {data} = yield restController.getCatalogList(action.data);
    yield put({type: ACTION.RECEIVE_CATALOG_LIST, data: data});
  } catch (err) {
    yield put({type: ACTION.RECEIVE_CATALOG_LIST_ERROR, error: err.response});
  }
}

export function* addChatToCatalog(action) {
  try {
    const {data} = yield restController.addChatToCatalog(action.data);
    const {catalogList} = yield select(state => state.chatStore);
    for (let i = 0; i < catalogList.length; i++) {
      if (catalogList[i]._id === data._id) {
        catalogList[i].chats = data.chats;
        break;
      }
    }
    yield put({type: ACTION.ADD_CHAT_TO_CATALOG, data: catalogList});
  } catch (err) {
    yield put({type: ACTION.ADD_CHAT_TO_CATALOG_ERROR, error: err.response});
  }
}

export function* createCatalog(action) {
  try {
    const {data} = yield restController.createCatalog(action.data);
    yield put({type: ACTION.CREATE_CATALOG_SUCCESS, data: data});
  } catch (err) {
    yield put({type: ACTION.CREATE_CATALOG_ERROR, error: err.response});
  }
}

export function* deleteCatalog(action) {
  try {
    yield restController.deleteCatalog(action.data);
    const {catalogList} = yield select(state => state.chatStore);
    const newCatalogList = remove(
        catalogList,
        catalog => action.data.catalogId !== catalog._id,
    );
    yield put({type: ACTION.DELETE_CATALOG_SUCCESS, data: newCatalogList});
  } catch (err) {
    yield put({type: ACTION.DELETE_CATALOG_ERROR, error: err.response});
  }
}

export function* removeChatFromCatalogSaga(action) {
  try {
    const {data} = yield restController.removeChatFromCatalog(action.data);
    const {catalogList} = yield select(state => state.chatStore);
    for (let i = 0; i < catalogList.length; i++) {
      if (catalogList[i]._id === data._id) {
        catalogList[i].chats = data.chats;
        break;
      }
    }
    yield put({
      type: ACTION.REMOVE_CHAT_FROM_CATALOG_SUCCESS,
      data: {catalogList, currentCatalog: data},
    });
  } catch (err) {
    yield put({
      type: ACTION.REMOVE_CHAT_FROM_CATALOG_ERROR,
      error: err.response,
    });
  }
}

export function* changeCatalogName(action) {
  try {
    const {data} = yield restController.changeCatalogName(action.data);
    const {catalogList} = yield select(state => state.chatStore);
    for (let i = 0; i < catalogList.length; i++) {
      if (catalogList[i]._id === data._id) {
        catalogList[i].catalogName = data.catalogName;
        break;
      }
    }
    yield put({
      type: ACTION.CHANGE_CATALOG_NAME_SUCCESS,
      data: {catalogList, currentCatalog: data},
    });
  } catch (err) {
    yield put({type: ACTION.CHANGE_CATALOG_NAME_ERROR, error: err.response});
  }
}
