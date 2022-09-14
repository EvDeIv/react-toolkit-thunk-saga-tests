import {
  put,
  call,
  takeEvery,
  PutEffect,
  CallEffect,
  SagaReturnType,
  ForkEffect,
} from "redux-saga/effects";
import { postsRequest, postsSuccess, postFailure } from "../reducers/postsSaga";
import postsApi from "../api/postsApi";
import { PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../types";

export function* getPostsWorker(
  action: PayloadAction<number>
): Generator<
  | CallEffect<SagaReturnType<() => Promise<any>>>
  | CallEffect<SagaReturnType<() => Promise<IPost>>>
  | PutEffect<PayloadAction<IPost[]>>
  | PutEffect<PayloadAction<string>>,
  void,
  SagaReturnType<() => Promise<any>>
> {
  try {
    const data = yield call(() => postsApi.fetchPostsFromApi(action.payload));
    yield put(postsSuccess(data));
  } catch (e) {
    yield put(postFailure(e as string));
  }
}

export function* getPostsWatcher(): Generator<
  ForkEffect<PayloadAction<number>>,
  void,
  PayloadAction<number>
> {
  yield takeEvery(postsRequest, getPostsWorker);
}
