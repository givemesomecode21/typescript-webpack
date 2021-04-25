import { fork, all } from "redux-saga/effects";
import cartSaga from "../cart/cartSagas";
import ExampleSaga from '../Example/ExampleSagas';

export default function* rootSaga() {
    yield all([
        fork(ExampleSaga),
        fork(cartSaga),
    ]);
}
