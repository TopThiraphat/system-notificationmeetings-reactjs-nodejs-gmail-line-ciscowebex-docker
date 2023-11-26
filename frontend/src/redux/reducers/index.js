import { combineReducers } from "redux";
import appReducer from "../reducers/app.reducer";
import mainReducer from "../reducers/main.reducer";
import tokenLine from "../reducers/tokenLine.reducer";
import gmail from "../reducers/gmail.reducer";

export default combineReducers({
  appReducer,
  mainReducer,
  tokenLine,
  gmail,
});
