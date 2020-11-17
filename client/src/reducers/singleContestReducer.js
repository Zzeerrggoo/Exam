import produce, {original} from 'immer';
import SINGLE_CONTEST_ACTION_TYPES from '../actions/singleContestActionTypes';
import createReducer from './helpers/createReducer';

const initialState = {
  isFetching: true,

  isFetchingDescr: true,
  description: {
    nameStyle: '',
    typeOfName: '',
    brandStyle: '',
    typeOfTagline: '',
  },

  bundle: {},

  contestData: null,
  isEditContest: false,
  isBrief: true,
  isShowOnFull: false,
  imagePath: null,
  isShowModal: false,

  error: null,
};

const helpers = {

  [SINGLE_CONTEST_ACTION_TYPES.SELECT_BUNDLE]: produce((draftState, action) => {
    const {payload: {values}} = action;
    draftState.bundle = values;
  }),

  [SINGLE_CONTEST_ACTION_TYPES.CHANGE_CONTEST_VIEW_MODE]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.isEditContest = false;
        draftState.isBrief = values;
      }),

  [SINGLE_CONTEST_ACTION_TYPES.CHANGE_SHOW_IMAGE]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.isShowOnFull = values.isShowOnFull;
        draftState.imagePath = values.imagePath;
      }),

  [SINGLE_CONTEST_ACTION_TYPES.CHANGE_EDIT_CONTEST]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.isEditContest = values;
      }),

  [SINGLE_CONTEST_ACTION_TYPES.CHANGE_SHOW_MODAL]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.isShowModal = values;
      }),

  [SINGLE_CONTEST_ACTION_TYPES.GET_DESCRIPTION_FOR_CONTEST_REQUEST]: produce(
      draftState => {
        draftState.isFetchingDescr = true;
        draftState.description = initialState.description;
        draftState.error = null;
      }),

  [SINGLE_CONTEST_ACTION_TYPES.GET_DESCRIPTION_FOR_CONTEST_SUCCESS]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.description = values;
        draftState.isFetchingDescr = false;
      }),

  [SINGLE_CONTEST_ACTION_TYPES.GET_DESCRIPTION_FOR_CONTEST_FAILED]: produce(
      (draftState, action) => {
        const {payload: {error}} = action;
        draftState.error = error;
        draftState.isFetchingDescr = false;
      }),

  [SINGLE_CONTEST_ACTION_TYPES.GET_CONTEST_BY_ID_REQUEST]: produce(
      draftState => {
        draftState.isFetching = true;
        draftState.contestData = null;
        draftState.error = null;
      }),

  [SINGLE_CONTEST_ACTION_TYPES.GET_CONTEST_BY_ID_SUCCESS]: produce(
      (draftState, action) => {

        const {payload: {values}} = action;
        draftState.contestData = values;
        draftState.isFetching = false;

      }),

  [SINGLE_CONTEST_ACTION_TYPES.GET_CONTEST_BY_ID_FAILED]: produce(
      (draftState, action) => {

        const {payload: {error}} = action;
        draftState.error = error;
        draftState.isFetching = false;

      }),

  [SINGLE_CONTEST_ACTION_TYPES.UPDATE_CONTEST_REQUEST]: produce(
      draftState => {
        draftState.isFetching = true;
        draftState.error = null;
      }),

  [SINGLE_CONTEST_ACTION_TYPES.UPDATE_CONTEST_SUCCESS]: produce(
      (draftState, action) => {

        const {payload: {values}} = action;
        const orig = original(draftState);
        draftState.contestData = {...orig.contestData, ...values};
        draftState.isFetching = false;
        draftState.isEditContest = false;
      }),

  [SINGLE_CONTEST_ACTION_TYPES.UPDATE_CONTEST_FAILED]: produce(
      (draftState, action) => {

        const {payload: {error}} = action;
        draftState.error = error;
        draftState.isFetching = false;
        draftState.isEditContest = false;
      }),

};

const singleContestReducer = createReducer(initialState, helpers);

export default singleContestReducer;