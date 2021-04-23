import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, Store } from "redux"
import rootReducers from "./reducer";
import rootSaga from "./saga";

const initialState = {
};

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const store = createStore(rootReducers, initialState, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return store;
};
export default configureStore;


