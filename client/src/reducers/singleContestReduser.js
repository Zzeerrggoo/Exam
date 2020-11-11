import produce from 'immer';
import SINGLE_CONTEST_ACTION_TYPES from '../actions/singleContestActionTypes';
import createReducer from './helpers/createReducer';

const initialState = {
  isFetching: false,
  description: {
    nameStyle: '',
    typeOfName: '',
    brandStyle: '',
    typeOfTagline: '',
  },
  bundle: {},
  error: null,
};

const helpers = {
  [SINGLE_CONTEST_ACTION_TYPES.GET_DESCRIPTION_FOR_CONTEST_REQUEST]: produce(
      draftState => {
        draftState.isFetching = true;
      }),

  [SINGLE_CONTEST_ACTION_TYPES.GET_DESCRIPTION_FOR_CONTEST_SUCCESS]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.description = values;
        draftState.isFetching = false;
      }),

  [SINGLE_CONTEST_ACTION_TYPES.GET_DESCRIPTION_FOR_CONTEST_FAILED]: produce(
      (draftState, action) => {
        const {payload: {error}} = action;
        draftState.error = error;
        draftState.isFetching = false;
      }),

  [SINGLE_CONTEST_ACTION_TYPES.SELECT_BUNDLE]: produce((draftState, action) => {
    const {payload: {values}} = action;
    draftState.bundle = values;
  }),

};

const singleContestReducer = createReducer(initialState, helpers);

export default singleContestReducer;