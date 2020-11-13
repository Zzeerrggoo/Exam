import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import contestsReducer from './contestsReducer';
import singleContestReducer from './singleContestReduser';
import paymentReducer from './paymentReducer';
import getContestByIdReducer from './getContestByIdReducer';
import updateContestReducer from './updateContestReducer';
import chatReducer from './chatReducer';
import userProfileReducer from './userProfileReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  contestsList: contestsReducer,
  singleContestStore: singleContestReducer,
  payment: paymentReducer,
  contestByIdStore: getContestByIdReducer,
  updateContestStore: updateContestReducer,
  chatStore: chatReducer,
  userProfile: userProfileReducer,
});

export default rootReducer;
