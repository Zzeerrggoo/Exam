import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import contestsReducer from './contestsReducer';
import singleContestReducer from './singleContestReduser';
import payReducer from './payReducer';
import storeContestReducer from './storeContestReducer';
import getContestByIdReducer from './getContestByIdReducer';
import updateContestReducer from './updateContestReducer';
import chatReducer from './chatReducer';
import userProfileReducer from './userProfileReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  contestsList: contestsReducer,
  singleContestStore: singleContestReducer,
  contestByIdStore: getContestByIdReducer,
  payment: payReducer,
  contestStore: storeContestReducer,
  updateContestStore: updateContestReducer,
  chatStore: chatReducer,
  userProfile: userProfileReducer,
});

export default rootReducer;
