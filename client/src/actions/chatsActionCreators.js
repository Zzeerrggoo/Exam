import CHATS_ACTION_TYPES from './chatsActionTypes';

export const getChatPreview = values => ({
  type: CHATS_ACTION_TYPES.GET_CHAT_PREVIEW,
  payload: {
    values,
  },
});

export const getChatPreviewRequest = () => ({
  type: CHATS_ACTION_TYPES.GET_CHAT_PREVIEW_REQUEST,
});

export const getChatPreviewSuccess = values => ({
  type: CHATS_ACTION_TYPES.GET_CHAT_PREVIEW_SUCCESS,
  payload: {
    values,
  },
});

export const getChatPreviewFailed = error => ({
  type: CHATS_ACTION_TYPES.GET_CHAT_PREVIEW_FAILED,
  payload: {
    error,
  },
});

export const postMessage = values => ({
  type: CHATS_ACTION_TYPES.POST_MESSAGE,
  payload: {
    values,
  },
});

export const postMessageRequest = () => ({
  type: CHATS_ACTION_TYPES.POST_MESSAGE_REQUEST,
});

export const postMessageSuccess = values => ({
  type: CHATS_ACTION_TYPES.POST_MESSAGE_SUCCESS,
  payload: {
    values,
  },
});

export const postMessageFailed = error => ({
  type: CHATS_ACTION_TYPES.POST_MESSAGE_FAILED,
  payload: {
    error,
  },
});

export const createCatalog = values => ({
  type: CHATS_ACTION_TYPES.CREATE_CATALOG,
  payload: {
    values,
  },
});

export const createCatalogSuccess = values => ({
  type: CHATS_ACTION_TYPES.CREATE_CATALOG_SUCCESS,
  payload: {
    values,
  },
});

export const createCatalogFailed = error => ({
  type: CHATS_ACTION_TYPES.CREATE_CATALOG_FAILED,
  payload: {
    error,
  },
});

export const deleteCatalog = values => ({
  type: CHATS_ACTION_TYPES.DELETE_CATALOG,
  payload: {
    values,
  },
});

export const deleteCatalogSuccess = values => ({
  type: CHATS_ACTION_TYPES.DELETE_CATALOG_SUCCESS,
  payload: {
    values,
  },
});

export const deleteCatalogFailed = error => ({
  type: CHATS_ACTION_TYPES.DELETE_CATALOG_FAILED,
  payload: {
    error,
  },
});

export const addChatToCatalog = values => ({
  type: CHATS_ACTION_TYPES.ADD_CHAT_TO_CATALOG,
  payload: {
    values,
  },
});

export const addChatToCatalogSuccess = values => ({
  type: CHATS_ACTION_TYPES.ADD_CHAT_TO_CATALOG_SUCCESS,
  payload: {
    values,
  },
});

export const addChatToCatalogFailed = error => ({
  type: CHATS_ACTION_TYPES.ADD_CHAT_TO_CATALOG_FAILED,
  payload: {
    error,
  },
});

export const removeChatFromCatalog = values => ({
  type: CHATS_ACTION_TYPES.REMOVE_CHAT_FROM_CATALOG,
  payload: {
    values,
  },
});

export const removeChatFromCatalogSuccess = values => ({
  type: CHATS_ACTION_TYPES.REMOVE_CHAT_FROM_CATALOG_SUCCESS,
  payload: {
    values,
  },
});

export const removeChatFromCatalogFailed = error => ({
  type: CHATS_ACTION_TYPES.REMOVE_CHAT_FROM_CATALOG_FAILED,
  payload: {
    error,
  },
});

export const setChatFavorite = values => ({
  type: CHATS_ACTION_TYPES.SET_CHAT_FAVORITE,
  payload: {
    values,
  },
});

export const setChatFavoriteSuccess = values => ({
  type: CHATS_ACTION_TYPES.SET_CHAT_FAVORITE_SUCCESS,
  payload: {
    values,
  },
});

export const setChatFavoriteFailed = error => ({
  type: CHATS_ACTION_TYPES.SET_CHAT_FAVORITE_FAILED,
  payload: {
    error,
  },
});

export const setChatBlocked = values => ({
  type: CHATS_ACTION_TYPES.SET_CHAT_BLOCKED,
  payload: {
    values,
  },
});

export const setChatBlockedSuccess = values => ({
  type: CHATS_ACTION_TYPES.SET_CHAT_BLOCKED_SUCCESS,
  payload: {
    values,
  },
});

export const setChatBlockedFailed = error => ({
  type: CHATS_ACTION_TYPES.SET_CHAT_BLOCKED_FAILED,
  payload: {
    error,
  },
});

export const getCatalogList = values => ({
  type: CHATS_ACTION_TYPES.GET_CATALOG_LIST,
  payload: {
    values,
  },
});

export const getCatalogListSuccess = values => ({
  type: CHATS_ACTION_TYPES.GET_CATALOG_LIST_SUCCESS,
  payload: {
    values,
  },
});

export const getCatalogListFailed = error => ({
  type: CHATS_ACTION_TYPES.GET_CATALOG_LIST_FAILED,
  payload: {
    error,
  },
});

export const changeCatalogName = values => ({
  type: CHATS_ACTION_TYPES.CHANGE_CATALOG_NAME,
  payload: {
    values,
  },
});

export const changeCatalogNameSuccess = values => ({
  type: CHATS_ACTION_TYPES.CHANGE_CATALOG_NAME_SUCCESS,
  payload: {
    values,
  },
});

export const changeCatalogNameFailed = error => ({
  type: CHATS_ACTION_TYPES.CHANGE_CATALOG_NAME_FAILED,
  payload: {
    error,
  },
});

export const getDialogMessages = values => ({
  type: CHATS_ACTION_TYPES.GET_DIALOG_MESSAGES,
  payload: {
    values,
  },
});

export const getDialogMessagesSuccess = values => ({
  type: CHATS_ACTION_TYPES.GET_DIALOG_MESSAGES_SUCCESS,
  payload: {
    values,
  },
});

export const getDialogMessagesFailed = error => ({
  type: CHATS_ACTION_TYPES.GET_DIALOG_MESSAGES_FAILED,
  payload: {
    error,
  },
});

////////////////NO SAGA ACTIONS/////////////////
export const clearMessageList = error => ({
  type: CHATS_ACTION_TYPES.CLEAR_MESSAGE_LIST,
  payload: {
    error,
  },
});
export const changeChatShow = error => ({
  type: CHATS_ACTION_TYPES.CHANGE_CHAT_SHOW,
  payload: {
    error,
  },
});
export const backToDialogList = error => ({
  type: CHATS_ACTION_TYPES.BACK_TO_DIALOG_LIST,
  payload: {
    error,
  },
});
export const changeRenameCatalogMode = error => ({
  type: CHATS_ACTION_TYPES.CHANGE_RENAME_CATALOG_MODE,
  payload: {
    error,
  },
});
export const setChatPreviewMode = error => ({
  type: CHATS_ACTION_TYPES.SET_CHAT_PREVIEW_MODE,
  payload: {
    error,
  },
});
export const goToExpandedDialog = error => ({
  type: CHATS_ACTION_TYPES.GO_TO_EXPANDED_DIALOG,
  payload: {
    error,
  },
});
export const changeShowModeCatalog = error => ({
  type: CHATS_ACTION_TYPES.CHANGE_SHOW_MODE_CATALOG,
  payload: {
    error,
  },
});
export const changeTypeAddingChatInCatalog = error => ({
  type: CHATS_ACTION_TYPES.CHANGE_TYPE_ADDING_CHAT_IN_CATALOG,
  payload: {
    error,
  },
});
export const changeShowAddChatToCatalog = error => ({
  type: CHATS_ACTION_TYPES.CHANGE_SHOW_ADD_CHAT_TO_CATALOG,
  payload: {
    error,
  },
});