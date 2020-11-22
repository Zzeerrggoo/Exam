import ACTION from '../actions/actionTypes';

const initialState = {
  isFetching: true,
  contestData: null,
  isEditContest: false,
  error: null,
  offers: [],
  changeMarkError: null,
  addOfferError: null,
  setOfferStatusError: null,
  isBrief: true,
  isShowOnFull: false,
  imagePath: null,
  isShowModal: false,
};

export default function(state = initialState, action) {
  switch (action.type) {

      // case ACTION.CHANGE_MARK_SUCCESS: {
      //   return {
      //     ...state,
      //     error: null,
      //     offers: [...action.data],
      //   };
      // }
      // case ACTION.CHANGE_STORE_FOR_STATUS: {
      //   return {
      //     ...state,
      //     error: null,
      //     offers: [...action.data],
      //   };
      // }
      // case ACTION.CHANGE_MARK_ERROR: {
      //   return {
      //     ...state,
      //     changeMarkError: action.error,
      //   };
      // }
      // case ACTION.CLEAR_CHANGE_MARK_ERROR: {
      //   return {
      //     ...state,
      //     changeMarkError: null,
      //   };
      // }

    case ACTION.ADD_NEW_OFFER_TO_STORE: {
      return {
        ...state,
        error: null,
        offers: [...action.data],
      };
    }
    case ACTION.ADD_OFFER_ERROR: {
      return {
        ...state,
        addOfferError: action.error,
      };
    }
    case ACTION.SET_OFFER_STATUS_ERROR: {
      return {
        ...state,
        setOfferStatusError: action.error,
      };
    }
    case ACTION.CLEAR_ADD_OFFER_ERROR: {
      return {
        ...state,
        addOfferError: null,
      };
    }
    case ACTION.CLEAR_SET_OFFER_STATUS_ERROR: {
      return {
        ...state,
        setOfferStatusError: null,
      };
    }

    default:
      return state;
  }
}
