import { message } from "antd";
import { BaseService } from "./../../services/Base.service";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";

import * as ACTIONS from "./cartActions";
import * as TYPES from "./cartTypes";
import { getProductById } from "./cartApis";

export function* addCartItemRequest(params) {
  try {
    const response = yield call(getProductById, params.payload);
    yield put(ACTIONS.addCartItem(response));
    message.success("Add to cart successfully!");
  } catch (err) {
    console.log(err);
  }
}

export function* cartRequest() {
  yield takeLatest(TYPES.CART_ADD_ITEM_REQUEST, addCartItemRequest);
}

export default function* cartSaga() {
  yield all([fork(cartRequest)]);
}
