import {put} from 'redux-saga/effects';
import * as SingleContestActionCreators
  from '../actions/singleContestActionCreators';
import * as Api from '../api/http';

export function* getDescriptionForContestCreatingSaga(action) {

  yield put(SingleContestActionCreators.getDescriptionForContestRequest());

  try {
    const {payload: {values}} = action;
    const {data: {data}} = yield Api.singleContest.getDescrDataForContest(
        values);
    yield put(
        SingleContestActionCreators.getDescriptionForContestSuccess(data));

  } catch (error) {
    yield put(
        SingleContestActionCreators.getDescriptionForContestFailed(error));
  }
}

export function* getContestByIdSaga(action) {
  yield put(SingleContestActionCreators.getContestByIdRequest());
  try {
    const {payload: {values}} = action;
    const {data: {data}} = yield Api.singleContest.getContestById(values);
    yield put(SingleContestActionCreators.getContestByIdSuccess(data));

  } catch (error) {
    yield put(SingleContestActionCreators.getContestByIdFailed(error));
  }
}

export function* updateContestSaga(action) {
  yield put(SingleContestActionCreators.updateContestRequest());

  try {
    const {payload: {values}} = action;
    const {data: {data}} = yield Api.singleContest.updateContest(values);
    yield put(SingleContestActionCreators.updateContestSuccess(data));
  } catch (error) {
    yield put(SingleContestActionCreators.updateContestFailed(error));
  }
}
