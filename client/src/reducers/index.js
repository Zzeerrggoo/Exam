import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import contestsReducer from './contestsReducer';
import singleContestReducer from './singleContestReducer';
import paymentReducer from './paymentReducer';
import offersReducer from './offersReducer';
import getContestByIdReducer from './getContestByIdReducer';
import chatReducer from './chatReducer';
import userProfileReducer from './userProfileReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  contestsList: contestsReducer,
  singleContestStore: singleContestReducer,
  payment: paymentReducer,
  offers: offersReducer,
  contestByIdStore: getContestByIdReducer,
  chatStore: chatReducer,
  userProfile: userProfileReducer,
});

export default rootReducer;
