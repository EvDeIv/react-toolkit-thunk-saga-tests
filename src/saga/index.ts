import { all } from "redux-saga/effects";
import { getPostWatcher } from "./getPostSaga";
import { getPostsWatcher } from "./getPostsSaga";

export function* rootWatcher() {
  yield all([getPostWatcher(), getPostsWatcher()]);
}
