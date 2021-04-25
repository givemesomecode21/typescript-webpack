import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, Store } from "redux";
import rootReducers from "./reducer";
import rootSaga from "./saga";

const cartItemsString: any = localStorage.getItem("cartItems");
const shippingAddressString: any = localStorage.getItem("shippingAddress");
const paymentString: any = localStorage.getItem("paymentMethod");

const cartItemsFromStorage = cartItemsString ? JSON.parse(cartItemsString) : [];
const shippingAddressFromStorage = shippingAddressString
  ? JSON.parse(shippingAddressString)
  : [];
const paymentFromStorage = paymentString ? JSON.parse(paymentString) : [];

const initialState: any = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentFromStorage,
  },
};

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const store = createStore(
    rootReducers,
    initialState,
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
export default configureStore;
