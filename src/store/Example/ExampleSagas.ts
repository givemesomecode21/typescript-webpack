import { all, call, fork, put } from "redux-saga/effects";
import API from "./ExampleApis";
import * as ACTIONS from "./ExampleActions";
import { takeLatest } from "redux-saga/effects";
import * as TYPES from "./ExampleTypes";

export function* onExampleRequest() {
  try {
    const { data } = yield call(API.apiExampleRequest);
    yield put(ACTIONS.actionReceive(data));
  } catch (err) {
  }
}

function* exampleRequest() {
  yield takeLatest(TYPES.GET_DATA_REQUEST, onExampleRequest);
}

export default function* ExampleSaga() {
  yield all([
    fork(exampleRequest),
  ]);
}