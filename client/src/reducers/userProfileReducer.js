import ACTION from '../actions/actionTypes';
import CONSTANTS from '../constants';

const initialState = {
  profileModeView: CONSTANTS.USER_INFO_MODE,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTION.CHANGE_PROFILE_MODE_VIEW: {
      return {
        ...state,
        profileModeView: action.data,
      };
    }
    default:
      return state;
  }
}
