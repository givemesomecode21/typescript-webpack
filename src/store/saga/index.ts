import { fork, all } from "redux-saga/effects";
import ExampleSaga from '../Example/ExampleSagas';

export default function* rootSaga() {
    yield all([
        fork(ExampleSaga),
    ]);
}
