// Login Page
export const APP_INIT = "APP_INIT";

// main Page
export const HTTP_MAIN_FETCHING = "HTTP_MAIN_FETCHING";
export const HTTP_LOGIN_SUCCESS = "HTTP_LOGIN_SUCCESS";
export const HTTP_ROOM_SUCCESS = "HTTP_ROOM_SUCCESS";
export const HTTP_MAIN_FAILED = "HTTP_MAIN_FAILED";

// Create token
export const HTTP_TOKEN_LINE_FETCHING = "HTTP_TOKEN_LINE_FETCHING";
export const HTTP_TOKEN_LINE_SUCCESS = "HTTP_TOKEN_LINE_SUCCESS";
export const HTTP_TOKEN_LINE_FAILED = "HTTP_TOKEN_LINE_FAILED";

// Create gmail
export const HTTP_GMAIL_FETCHING = "HTTP_GMAIL_FETCHING";
export const HTTP_GMAIL_SUCCESS = "HTTP_GMAIL_SUCCESS";
export const HTTP_GMAIL_FAILED = "HTTP_GMAIL_FAILED";

// Error Code
export const E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
  "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR";
export const E_PERMISSION_MISSING = "E_PERMISSION_MISSING";
export const E_PICKER_NO_CAMERA_PERMISSION = "E_PICKER_NO_CAMERA_PERMISSION";
export const E_USER_CANCELLED = "E_USER_CANCELLED";
export const E_UNKNOWN = "E_UNKNOWN";
export const E_DEVELOPER_ERROR = "E_DEVELOPER_ERROR";
export const TIMEOUT_NETWORK = "ECONNABORTED"; // request service timeout
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE =
  "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE =
  "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  "An error has occurred. The photo was unable to upload.";
export const STATUS_CODE_401 = 401;
export const STATUS_CODE_200 = 200;
export const STATUS_CODE_408 = 408;

export const apiUrl = "http://localhost:8085/api/v1";
// export const imageUrl = "http://localhost:8085";

export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOK = "nok";

export const server = {
  LOGIN_PASSED: `yes`,
  ////////
  INVIT_LINE: `invit/invit-to-line-api`,
  CHECK_TOKEN_LINE: `invit/check-token-line-api`,
  TOKEN_LINE: "token/token-line",
  ////////
  INVIT_GMAIL: "invit/invit-to-gmail-api",
  GMAIL: "gmail/gmail",
};
