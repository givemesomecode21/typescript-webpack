import * as types from "./ExampleTypes";

export const actionRequest = () => ({
  type: types.GET_DATA_REQUEST
});

export const actionReceive = (payload: string) => ({
  type: types.GET_DATA_REQUEST,
  payload
});
