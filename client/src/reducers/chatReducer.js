import produce, {original} from 'immer';
import CHATS_ACTION_TYPES from '../actions/chatsActionTypes';
import createReducer from './helpers/createReducer';
import CONSTANTS from '../constants';

const initialState = {
  isFetching: true,
  addChatId: null,
  isShowCatalogCreation: false,
  currentCatalog: null,
  chatData: null,
  messages: [],
  error: null,
  isExpanded: false,
  interlocutor: [],
  messagesPreview: [],
  isShow: false,
  chatMode: CONSTANTS.NORMAL_PREVIEW_CHAT_MODE,
  catalogList: [],
  isRenameCatalog: false,
  isShowChatsInCatalog: false,
  catalogCreationMode: CONSTANTS.ADD_CHAT_TO_OLD_CATALOG,
};

const helpers = {

  [CHATS_ACTION_TYPES.GET_CHAT_PREVIEW_REQUEST]: produce(
      draftState => {
        draftState.isFetching = true;
        draftState.error = null;
      }),

  [CHATS_ACTION_TYPES.GET_CHAT_PREVIEW_SUCCESS]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.messagesPreview = values.conversations;
        draftState.isFetching = false;
      }),

  [CHATS_ACTION_TYPES.GET_CHAT_PREVIEW_FAILED]: produce(
      (draftState, action) => {
        const {payload: {error}} = action;
        draftState.error = error;
        draftState.isFetching = false;
      }),

  [CHATS_ACTION_TYPES.POST_MESSAGE_REQUEST]: produce(
      draftState => {
        draftState.isFetching = true;
        draftState.error = null;
      }),

  [CHATS_ACTION_TYPES.POST_MESSAGE_SUCCESS]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.chatData = values.chatData;
        draftState.messagesPreview = values.messagesPreview;
        draftState.messages.push(values.message);
        draftState.isFetching = false;
      }),

  [CHATS_ACTION_TYPES.POST_MESSAGE_FAILED]: produce(
      (draftState, action) => {
        const {payload: {error}} = action;
        draftState.error = error;
        draftState.isFetching = false;
      }),

  [CHATS_ACTION_TYPES.CREATE_CATALOG_SUCCESS]: produce(
      (draftState) => {
        draftState.isShowCatalogCreation = false;
      }),

  [CHATS_ACTION_TYPES.CREATE_CATALOG_FAILED]: produce(
      (draftState, action) => {
        const {payload: {error}} = action;
        draftState.isShowCatalogCreation = false;
        draftState.error = error;
      }),

  [CHATS_ACTION_TYPES.DELETE_CATALOG_SUCCESS]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.catalogList = values;
      }),

  [CHATS_ACTION_TYPES.DELETE_CATALOG_FAILED]: produce(
      (draftState, action) => {
        const {payload: {error}} = action;
        draftState.error = error;
      }),

  [CHATS_ACTION_TYPES.ADD_CHAT_TO_CATALOG_SUCCESS]: produce(
      (draftState) => {
        draftState.isShowCatalogCreation = false;
      }),

  [CHATS_ACTION_TYPES.ADD_CHAT_TO_CATALOG_FAILED]: produce(
      (draftState, action) => {
        const {payload: {error}} = action;
        draftState.error = error;
        draftState.isShowCatalogCreation = false;
      }),

  [CHATS_ACTION_TYPES.REMOVE_CHAT_FROM_CATALOG_SUCCESS]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.currentCatalog = values.currentCatalog;
        draftState.catalogList = values.catalogList;
      }),

  [CHATS_ACTION_TYPES.REMOVE_CHAT_FROM_CATALOG_FAILED]: produce(
      (draftState, action) => {
        const {payload: {error}} = action;
        draftState.error = error;
      }),

  [CHATS_ACTION_TYPES.SET_CHAT_FAVORITE_SUCCESS]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.chatData = values.chatData;
        draftState.messagesPreview = values.messagesPreview;
      }),

  [CHATS_ACTION_TYPES.SET_CHAT_FAVORITE_FAILED]: produce(
      (draftState, action) => {
        const {payload: {error}} = action;
        draftState.error = error;
      }),

  [CHATS_ACTION_TYPES.SET_CHAT_BLOCKED_SUCCESS]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.chatData = values.chatData;
        draftState.messagesPreview = values.messagesPreview;
      }),

  [CHATS_ACTION_TYPES.SET_CHAT_BLOCKED_FAILED]: produce(
      (draftState, action) => {
        const {payload: {error}} = action;
        draftState.error = error;
      }),

  [CHATS_ACTION_TYPES.GET_CATALOG_LIST_SUCCESS]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.catalogList = values;
        draftState.isFetching = false;
      }),

  [CHATS_ACTION_TYPES.GET_CATALOG_LIST_FAILED]: produce(
      (draftState, action) => {
        const {payload: {error}} = action;
        draftState.error = error;
        draftState.isFetching = false;
      }),

  [CHATS_ACTION_TYPES.CHANGE_CATALOG_NAME_SUCCESS]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.catalogList = values.catalogList;
        draftState.currentCatalog = values.currentCatalog;
        draftState.isRenameCatalog = false;
      }),

  [CHATS_ACTION_TYPES.CHANGE_CATALOG_NAME_FAILED]: produce(
      (draftState, action) => {
        const {payload: {error}} = action;
        draftState.error = error;
        draftState.isRenameCatalog = false;
      }),

  [CHATS_ACTION_TYPES.GET_DIALOG_MESSAGES_SUCCESS]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.messages = values.messages;
        draftState.interlocutor = values.interlocutor;
      }),

  [CHATS_ACTION_TYPES.GET_DIALOG_MESSAGES_FAILED]: produce(
      (draftState, action) => {
        const {payload: {error}} = action;
        draftState.error = error;
        draftState.messages = [];
        draftState.interlocutor = null;
      }),

  //////////////NO SAGA ACTIONS//////////////
  [CHATS_ACTION_TYPES.CLEAR_MESSAGE_LIST]: produce(
      (draftState) => {
        draftState.messages = [];
      }),

  [CHATS_ACTION_TYPES.CHANGE_CHAT_SHOW]: produce(
      (draftState) => {
        const {isShow} = original(draftState);
        draftState.isShowCatalogCreation = false;
        draftState.isShow = !isShow;
      }),

  [CHATS_ACTION_TYPES.BACK_TO_DIALOG_LIST]: produce(
      (draftState) => {
        draftState.isExpanded = false;
      }),

  [CHATS_ACTION_TYPES.CHANGE_RENAME_CATALOG_MODE]: produce(
      (draftState) => {
        const {isRenameCatalog} = original(draftState);
        draftState.isRenameCatalog = !isRenameCatalog;
      }),

  [CHATS_ACTION_TYPES.SET_CHAT_PREVIEW_MODE]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.chatMode = values;
      }),

  [CHATS_ACTION_TYPES.GO_TO_EXPANDED_DIALOG]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.interlocutor = values.interlocutor;
        draftState.chatData = values.conversationData;
        draftState.isShow = true;
        draftState.isExpanded = true;
        draftState.messages = [];
      }),

  [CHATS_ACTION_TYPES.CHANGE_SHOW_MODE_CATALOG]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        const {isShowChatsInCatalog} = original(draftState);
        draftState.currentCatalog = values;
        draftState.isShowChatsInCatalog = !isShowChatsInCatalog;
        draftState.isRenameCatalog = false;
      }),

  [CHATS_ACTION_TYPES.CHANGE_TYPE_ADDING_CHAT_IN_CATALOG]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.catalogCreationMode = values;
      }),

  [CHATS_ACTION_TYPES.CHANGE_SHOW_ADD_CHAT_TO_CATALOG]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        const {isShowCatalogCreation} = original(draftState);
        draftState.addChatId = values;
        draftState.isShowCatalogCreation = !isShowCatalogCreation;
      }),

};

const chatReducer = createReducer(initialState, helpers);

export default chatReducer;