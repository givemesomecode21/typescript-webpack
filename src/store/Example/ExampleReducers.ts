import * as types from "./ExampleTypes";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case types.GET_DATA_RECEIVE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
