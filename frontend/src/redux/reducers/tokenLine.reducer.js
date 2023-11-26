import {
  HTTP_TOKEN_LINE_SUCCESS,
  HTTP_TOKEN_LINE_FETCHING,
  HTTP_TOKEN_LINE_FAILED,
} from "../../constants/index";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_TOKEN_LINE_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case HTTP_TOKEN_LINE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HTTP_TOKEN_LINE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    default:
      return state;
  }
};
