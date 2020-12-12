import produce, {original} from 'immer';
import BRANDING_EVENTS_ACTION_TYPE
  from '../actions/brandingEventsActionTypes';
import createReducer from './helpers/createReducer';

const initialState = {
  notificationCounter: 0,
};

const handlers = {
  [BRANDING_EVENTS_ACTION_TYPE.ADD_NOTIFICATION]: produce(
      (draftState, action) => {
        const {
          payload: {values},
        } = action;
        draftState.notificationCounter = values;
      }),
  [BRANDING_EVENTS_ACTION_TYPE.REMOVE_NOTIFICATION]: produce(
      (draftState) => {
        const orig = original(draftState);
        draftState.notificationCounter = orig.notificationCounter - 1;
      }),

};

const brandingEventsReducer = createReducer(initialState, handlers);

export default brandingEventsReducer;
