import produce from 'immer';
import CONTEST_ACTION_TYPES from '../actions/contestActionTypes';
import createReducer from './helpers/createReducer';
import CONSTANTS from '../constants';

const initialState = {
  isFetching: false,
  error: null,
  contests: [],
  customerFilter: CONSTANTS.CONTEST_STATUS_ACTIVE,
  creatorFilter: {
    typeIndex: 'name,tagline,logo',
    contestId: '',
    industry: '',
    awardSort: 'asc',
    ownEntries: false,
  },
  haveMore: true,
  isIndustryLoading: false,
  industryTypes: [],
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

  [CONTEST_ACTION_TYPES.SET_NEW_CREATOR_FILTER]: produce(
      (draftState, action) => {
        const {payload: {values}} = action;
        draftState.creatorFilter = values;
      }),

  [CONTEST_ACTION_TYPES.GET_INDUSTRY_FOR_CONTEST_REQUEST]: produce(
      draftState => {
        draftState.isIndustryLoaded = true;
      }),

  [CONTEST_ACTION_TYPES.GET_INDUSTRY_FOR_CONTEST_SUCCESS]: produce(
      (draftState, action) => {

        const {payload: {values}} = action;

        draftState.industryTypes = values;
        draftState.isIndustryLoaded = false;
      }),

  [CONTEST_ACTION_TYPES.GET_INDUSTRY_FOR_CONTEST_FAILED]: produce(
      (draftState, action) => {
        const {
          payload: {error},
        } = action;
        draftState.error = error;
        draftState.isIndustryLoaded = false;
      }),

};

const contestsReducer = createReducer(initialState, helpers);

export default contestsReducer;