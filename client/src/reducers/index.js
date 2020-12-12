import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import contestsReducer from './contestsReducer';
import singleContestReducer from './singleContestReducer';
import paymentReducer from './paymentReducer';
import offersReducer from './offersReducer';
import chatReducer from './chatReducer';
import brandingEventsReducer from './brandingEventsReducer';
import userProfileReducer from './userProfileReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  contestsList: contestsReducer,
  singleContestStore: singleContestReducer,
  payment: paymentReducer,
  offers: offersReducer,
  chatStore: chatReducer,
  userProfile: userProfileReducer,
  branding: brandingEventsReducer,
});

export default rootReducer;
