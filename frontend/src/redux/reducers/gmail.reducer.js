import {
  HTTP_GMAIL_SUCCESS,
  HTTP_GMAIL_FETCHING,
  HTTP_GMAIL_FAILED,
} from "../../constants/index";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_GMAIL_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case HTTP_GMAIL_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HTTP_GMAIL_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    default:
      return state;
  }
};
