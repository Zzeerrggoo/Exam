import ACTION from './actionTypes';

export const authActionLogin = (data) => {
  return {
    type: ACTION.AUTH_ACTION_LOGIN,
    data: data,
  };
};

export const authActionRegister = (data) => {
  return {
    type: ACTION.AUTH_ACTION_REGISTER,
    data: data,
  };
};

export const clearErrorSignUpAndLogin = () => {
  return {
    type: ACTION.AUTH_ACTION_CLEAR_ERROR,
  };
};

export const getUserAction = (data) => {
  return {
    type: ACTION.GET_USER_ACTION,
    replace: data,
  };
};

export const changeMark = (data) => {
  return {
    type: ACTION.CHANGE_MARK_ACTION,
    data: data,
  };
};

export const createCatalog = (data) => {
  return {
    type: ACTION.CREATE_CATALOG_REQUEST,
    data: data,
  };
};

export const onlyForNotAuthorize = (data) => {
  return {
    type: ACTION.ONLY_FOR_NOT_AUTHORIZE_USERS,
    replace: data,
  };
};

export const clearAuth = () => {
  return {
    type: ACTION.AUTH_ACTION_CLEAR,
  };
};

export const getPreviewChat = () => {
  return {
    type: ACTION.GET_PREVIEW_CHAT_ASYNC,
  };
};

export const backToDialogList = () => {
  return {
    type: ACTION.BACK_TO_DIALOG_LIST,
  };
};

export const goToExpandedDialog = (data) => {
  return {
    type: ACTION.GO_TO_EXPANDED_DIALOG,
    data: data,
  };
};

export const getDialogMessages = (data) => {
  return {
    type: ACTION.GET_DIALOG_MESSAGES_ASYNC,
    data: data,
  };
};

export const sendMessageAction = (data) => {
  return {
    type: ACTION.SEND_MESSAGE_ACTION,
    data: data,
  };
};

export const addMessage = (data) => {
  return {
    type: ACTION.SEND_MESSAGE,
    data: data,
  };
};

export const clearMessageList = () => {
  return {
    type: ACTION.CLEAR_MESSAGE_LIST,
  };
};

export const changeChatShow = () => {
  return {
    type: ACTION.CHANGE_CHAT_SHOW,
  };
};

export const setPreviewChatMode = (mode) => {
  return {
    type: ACTION.SET_CHAT_PREVIEW_MODE,
    mode: mode,
  };
};

export const changeChatFavorite = (data) => {
  return {
    type: ACTION.SET_CHAT_FAVORITE_FLAG,
    data: data,
  };
};

export const changeChatBlock = (data) => {
  return {
    type: ACTION.SET_CHAT_BLOCK_FLAG,
    data: data,
  };
};

export const changeBlockStatusInStore = (data) => {
  return {
    type: ACTION.CHANGE_CHAT_BLOCK,
    data: data,
  };
};

export const getCatalogList = (data) => {
  return {
    type: ACTION.GET_CATALOG_LIST_ASYNC,
    data: data,
  };
};

export const changeShowModeCatalog = (data) => {
  return {
    type: ACTION.CHANGE_SHOW_MODE_CATALOG,
    data: data,
  };
};

export const changeTypeOfChatAdding = (data) => {
  return {
    type: ACTION.CHANGE_TYPE_ADDING_CHAT_IN_CATALOG,
    data: data,
  };
};

export const changeShowAddChatToCatalogMenu = (data) => {
  return {
    type: ACTION.CHANGE_SHOW_ADD_CHAT_TO_CATALOG,
    data: data,
  };
};

export const addChatToCatalog = (data) => {
  return {
    type: ACTION.ADD_CHAT_TO_CATALOG_ASYNC,
    data: data,
  };
};

export const deleteCatalog = (data) => {
  return {
    type: ACTION.DELETE_CATALOG_REQUEST,
    data: data,
  };
};

export const removeChatFromCatalog = (data) => {
  return {
    type: ACTION.REMOVE_CHAT_FROM_CATALOG_REQUEST,
    data: data,
  };
};

export const changeRenameCatalogMode = () => {
  return {
    type: ACTION.CHANGE_RENAME_CATALOG_MODE,
  };
};

export const changeCatalogName = (data) => {
  return {
    type: ACTION.CHANGE_CATALOG_NAME_REQUEST,
    data: data,
  };
};
//REFACTOR
export const changeProfileModeView = (data) => {
  return {
    type: ACTION.CHANGE_PROFILE_MODE_VIEW,
    data: data,
  };
};
//REFACTOR
export const clearUserError = () => {
  return {
    type: ACTION.CLEAR_USER_ERROR,
  };
};

export const clearChatError = () => {
  return {
    type: ACTION.CLEAR_CHAT_ERROR,
  };
};


