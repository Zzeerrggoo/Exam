import {put} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';
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
    Api.contest.getCustomersContests);

export const activeContestsSaga = getContests(Api.contest.getActiveContests);

export function* industryForContestSaga() {
  yield put(ContestActionCreators.getIndustryForContestRequest());
  try {

    const {data: {data}} = yield Api.contest.getIndustryForContest();
    yield put(ContestActionCreators.getIndustryForContestSuccess(data));

  } catch (error) {
    yield put(ContestActionCreators.getIndustryForContestFailed(error));
  }
}

/////////////////////////////legacy////////////////////////////////

export function* updateContestSaga(action) {
  yield put({type: ACTION.UPDATE_CONTEST_REQUEST});
  try {
    const {data} = yield restController.updateContest(action.data);
    yield put({type: ACTION.UPDATE_STORE_AFTER_UPDATE_CONTEST, data: data});
  } catch (e) {
    yield put({type: ACTION.UPDATE_CONTEST_ERROR, error: e.response});
  }
}

export function* getContestByIdSaga(action) {
  yield put({type: ACTION.GET_CONTEST_BY_ID_REQUEST});
  try {
    const {data} = yield restController.getContestById(action.data);
    const {Offers} = data;
    delete data.Offers;
    yield put({
      type: ACTION.GET_CONTEST_BY_ID_SUCCESS,
      data: {contestData: data, offers: Offers},
    });
  } catch (e) {
    yield put({type: ACTION.GET_CONTEST_BY_ID_ERROR, error: e.response});
  }
}

export function* downloadContestFileSaga(action) {
  yield put({type: ACTION.DOWNLOAD_CONTEST_FILE_REQUEST});
  try {
    const {data} = yield restController.downloadContestFile(action.data);
    yield put({type: ACTION.DOWNLOAD_CONTEST_FILE_SUCCESS, data: data});
  } catch (e) {
    yield put({type: ACTION.DOWNLOAD_CONTEST_FILE_ERROR, error: e.response});
  }
}
