import {
  HTTP_MAIN_FETCHING,
  HTTP_LOGIN_SUCCESS,
  HTTP_ROOM_SUCCESS,
  HTTP_MAIN_FAILED,
  server,
  OK,
  YES,
} from "../../constants";

import axios from "axios";
import { connect } from "react-redux";
import Swal from "sweetalert2";

export const setMainStateToFetching = () => ({
  type: HTTP_MAIN_FETCHING,
});

export const setLoginStateToSuccess = (payload) => ({
  type: HTTP_LOGIN_SUCCESS,
  payload,
});
export const setRoomStateToSuccess = (payload) => ({
  type: HTTP_ROOM_SUCCESS,
  payload,
});

export const setMainStateToFailed = () => ({
  type: HTTP_MAIN_FAILED,
});

export const autoLogin = (history) => {
  return async () => {
    await axios({
      method: "get",
      url: "https://webexapis.com/v1/rooms",
      headers: {
        Authorization: localStorage.getItem("Token"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(function (response) {
        if (localStorage.getItem(server.LOGIN_PASSED) == YES) {
          console.log("pass");
          setTimeout(() => history.push("/main"), 100);
        }
      })
      .catch(function (error) {
        history.push("/login");
        localStorage.clear();
      });
  };
};

export const login = (history, credential) => {
  return async (dispatch, getState) => {
    dispatch(setMainStateToFetching());
    let result = `Bearer ${credential.token}`;
    await axios({
      method: "get",
      url: "https://webexapis.com/v1/rooms",
      headers: {
        Authorization: result,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(function (response) {
        localStorage.setItem(server.LOGIN_PASSED, YES);
        localStorage.setItem("Token", result);

        getState().appReducer.app.forceUpdate();

        dispatch(setLoginStateToSuccess(result));
        dispatch(setRoomStateToSuccess(response.data));
        history.push("/main");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successfully.",
          html: `<h5>You now have access to the <b>Webex API</b>.</h5>`,
          showConfirmButton: false,
          timer: 3000,
        });
      })
      .catch(function (error) {
        dispatch(setMainStateToFailed(error));
        Swal.fire({
          icon: "error",
          title: "Your token is invalid.",
          text: "You must enter a valid token!",
          confirmButtonColor: "#367FA9",
          footer:
            '<a href="https://developer.webex.com/docs/api/getting-started">Are you looking for Webex Token?</a>',
        });
      });
  };
};

export const getDataRoom = (history) => {
  return async (dispatch) => {
    dispatch(setMainStateToFetching());
    await axios({
      method: "get",
      url: "https://webexapis.com/v1/rooms",
      headers: {
        Authorization: localStorage.getItem("Token"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(function (response) {
        dispatch(setRoomStateToSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(setMainStateToFailed(error));

        history.push("/login");
        localStorage.clear();
      });
  };
};
