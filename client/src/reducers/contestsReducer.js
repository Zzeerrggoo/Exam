import produce from 'immer';
import CONTEST_ACTION_TYPES from '../actions/contestActionTypes';
import createReducer from './helpers/createReducer';
import CONSTANTS from '../constants';

const initialState = {
  isFetching: true,
  error: null,
  contests: [],
  customerFilter: CONSTANTS.CONTEST_STATUS_ACTIVE,
  creatorFilter: {
    typeIndex: 1,
    contestId: '',
    industry: '',
    awardSort: 'asc',
    ownEntries: false,
  },
  haveMore: true,
};

const helpers = {

  [CONTEST_ACTION_TYPES.GET_CONTESTS_REQUEST]: produce(draftState => {
    draftState.isFetching = true;
  }),

  [CONTEST_ACTION_TYPES.GET_CONTESTS_SUCCESS]: produce((draftState, action) => {

    const {payload: {values: {haveMore, contests}}} = action;

    draftState.haveMore = haveMore;
    draftState.contests = contests;
    draftState.isFetching = false;
  }),

  [CONTEST_ACTION_TYPES.GET_CONTESTS_FAILED]: produce((draftState, action) => {
    const {
      payload: {error},
    } = action;
    draftState.isFetching = false;
    draftState.error = error;
  }),

  [CONTEST_ACTION_TYPES.SET_NEW_CUSTOMER_FILTER]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.customerFilter = values;
      }),
};

const contestsReducer = createReducer(initialState, helpers);

export default contestsReducer;