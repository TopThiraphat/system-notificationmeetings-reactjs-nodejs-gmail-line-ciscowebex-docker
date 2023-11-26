import { httpClient } from "./../../utils/HttpClient";
import {
  HTTP_GMAIL_SUCCESS,
  HTTP_GMAIL_FETCHING,
  HTTP_GMAIL_FAILED,
  server,
} from "../../constants";

const setStateGmailToSuccess = (payload) => ({
  type: HTTP_GMAIL_SUCCESS,
  payload: payload,
});

const setStateGmailToFetching = () => ({
  type: HTTP_GMAIL_FETCHING,
});

const setStateGmailToFailed = () => ({
  type: HTTP_GMAIL_FAILED,
});

export const getGmailById = (id) => {
  return async (dispatch) => {
    // dispatch(finishInitialization(false))
    dispatch(setStateGmailToFetching());
    await httpClient
      .get(`${server.TOKEN_LINE}/${id}`)
      .then((result) => {
        dispatch(setStateGmailToSuccess(result.data));
      })
      .catch((err) => {
        dispatch(setStateGmailToFailed());
      });
  };
};

export const deleteGmail = (gmail) => {
  return async (dispatch) => {
    dispatch(setStateGmailToFetching());
    await httpClient.delete(`${server.GMAIL}/${gmail}`);
    await doGetGmail(dispatch);
  };
};

export const getGmail = () => {
  return (dispatch) => {
    dispatch(setStateGmailToFetching());
    doGetGmail(dispatch);
  };
};

const doGetGmail = async (dispatch) => {
  await httpClient
    .get(server.GMAIL)
    .then((result) => {
      dispatch(setStateGmailToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateGmailToFailed());
    });
};
