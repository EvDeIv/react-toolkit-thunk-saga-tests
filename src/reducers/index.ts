import { combineReducers } from "redux";
import counter from "./counter";
import auth from "./auth";
import postsSaga from "./postsSaga";
import postsThunk from "./postsThunk";
import { postsQueryApi } from "./../api/postsQueryApi";

const rootReducer = combineReducers({
  counter,
  auth,
  postsSaga,
  postsThunk,
  [postsQueryApi.reducerPath]: postsQueryApi.reducer,
});
export default rootReducer;
