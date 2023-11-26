import {
  HTTP_MAIN_FETCHING,
  HTTP_LOGIN_SUCCESS,
  HTTP_ROOM_SUCCESS,
  HTTP_MAIN_FAILED,
} from "../../constants/index";

const initialState = {
  tokenResult: null,
  roomResult: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_MAIN_FETCHING:
      return {
        ...state,
        tokenResult: null,
        roomResult: null,
        isFetching: true,
        isError: false,
      };
    case HTTP_LOGIN_SUCCESS:
      return {
        ...state,
        tokenResult: payload,
        roomResult: true,
        isFetching: false,
        isError: false,
      };
    case HTTP_ROOM_SUCCESS:
      return {
        ...state,
        tokenResult: true,
        roomResult: payload,
        isFetching: false,
        isError: false,
      };
    case HTTP_MAIN_FAILED:
      return {
        ...state,
        tokenResult: null,
        roomResult: null,
        isFetching: false,
        isError: true,
      };
    default:
      return state;
  }
};
