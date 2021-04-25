import { combineReducers } from "redux";
import { cartReducer } from "../cart/cartReducers";
import Example from "../Example/ExampleReducers";

const rootReducer = combineReducers({
  Example,
  cart: cartReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
