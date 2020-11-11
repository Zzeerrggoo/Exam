import {put} from 'redux-saga/effects';
import * as SingleContestActionCreators
  from '../actions/singleContestActionCreators';
import * as Api from '../api/http';

export function* getDescriptionForContestCreatingSaga(action) {

  yield put(SingleContestActionCreators.getDescriptionForContestRequest());

  try {
    const {payload: {values}} = action;
    const {data: {data}} = yield Api.singleContest.getDescDataForContest(
        values);
    yield put(
        SingleContestActionCreators.getDescriptionForContestSuccess(data));

  } catch (error) {
    yield put(
        SingleContestActionCreators.getDescriptionForContestFailed(error));
  }
}