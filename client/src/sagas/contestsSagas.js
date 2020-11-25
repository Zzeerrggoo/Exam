import {put} from 'redux-saga/effects';
import * as ContestActionCreators from '../actions/contestsActionCreators';
import * as Api from '../api/http';

const getContests = apiMethod =>
    function* contestsSaga(action) {
      yield put(ContestActionCreators.getContestsRequest());
      try {
        const {payload: {values}} = action;
        const {data: {data}} = yield apiMethod(values);
        yield put(ContestActionCreators.getContestsSuccess(data));

      } catch (error) {
        yield put(ContestActionCreators.getContestsFailed(error));
      }
    };

export const getCustomerContestsSaga = getContests(
    Api.contests.getCustomersContests);

export const activeContestsSaga = getContests(Api.contests.getActiveContests);

export function* industryForContestSaga() {
  yield put(ContestActionCreators.getIndustryForContestRequest());
  try {

    const {data: {data}} = yield Api.contests.getIndustryForContest();
    yield put(ContestActionCreators.getIndustryForContestSuccess(data));

  } catch (error) {
    yield put(ContestActionCreators.getIndustryForContestFailed(error));
  }
}

