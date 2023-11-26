import { httpClient } from "./../../utils/HttpClient";
import {
  HTTP_TOKEN_LINE_SUCCESS,
  HTTP_TOKEN_LINE_FETCHING,
  HTTP_TOKEN_LINE_FAILED,
  server,
} from "../../constants";

const setStateTokenLineToSuccess = (payload) => ({
  type: HTTP_TOKEN_LINE_SUCCESS,
  payload: payload,
});

const setStateTokenLineToFetching = () => ({
  type: HTTP_TOKEN_LINE_FETCHING,
});

const setStateTokenLineToFailed = () => ({
  type: HTTP_TOKEN_LINE_FAILED,
});

export const getTokenById = (id) => {
  return async (dispatch) => {
    // dispatch(finishInitialization(false))
    dispatch(setStateTokenLineToFetching());
    await httpClient
      .get(`${server.TOKEN_LINE}/${id}`)
      .then((result) => {
        dispatch(setStateTokenLineToSuccess(result.data));
      })
      .catch((err) => {
        dispatch(setStateTokenLineToFailed());
      });
  };
};

export const deleteTokenLine = (token_line) => {
  return async (dispatch) => {
    dispatch(setStateTokenLineToFetching());
    await httpClient.delete(`${server.TOKEN_LINE}/${token_line}`);
    await doGetTokenLine(dispatch);
  };
};

export const getTokenLine = () => {
  return (dispatch) => {
    dispatch(setStateTokenLineToFetching());
    doGetTokenLine(dispatch);
  };
};

const doGetTokenLine = async (dispatch) => {
  await httpClient
    .get(server.TOKEN_LINE)
    .then((result) => {
      dispatch(setStateTokenLineToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateTokenLineToFailed());
    });
};
