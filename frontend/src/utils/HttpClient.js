import axios from "axios";
import join from "url-join";
import {
  server,
  apiUrl,
  NOT_CONNECT_NETWORK,
  NETWORK_CONNECTION_MESSAGE,
  STATUS_CODE_401,
} from "./../constants";
import Swal from "sweetalert2";

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

const httpClient1 = axios.create({
  baseURL: process.env.REACT_PUBLIC_APP_BASE_API_URL,
});

httpClient1.interceptors.request.use(async (config) => {
  if (!isAbsoluteURLRegex.test(config.url)) {
    config.url = join(apiUrl, config.url);
  }
  config.timeout = 10000; // 10 Second
  return config;
});

httpClient1.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // debugger;
    console.log(JSON.stringify(error, undefined, 2));
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    } else if (!error.response) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        html: `<h5>Error in operation</h5>`,
        confirmButtonColor: "#367FA9",
      });
      return Promise.reject({
        code: NOT_CONNECT_NETWORK,
        message: NETWORK_CONNECTION_MESSAGE,
      });
    }
    return Promise.reject(error);
  }
);

export const httpClient = httpClient1;
