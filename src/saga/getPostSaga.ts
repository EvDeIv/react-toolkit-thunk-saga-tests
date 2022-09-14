import {
  put,
  call,
  takeEvery,
  CallEffect,
  SagaReturnType,
  PutEffect,
  ForkEffect,
} from "redux-saga/effects";
import { postRequest, postSuccess, postFailure } from "../reducers/postsSaga";
import postsApi, { fetchPostFromApi } from "../api/postsApi";
import { PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../types";

export function* getPostWorker(
  action: PayloadAction<number>
): Generator<
  | CallEffect<SagaReturnType<() => Promise<Response>>>
  | CallEffect<SagaReturnType<() => Promise<IPost>>>
  | PutEffect<PayloadAction<IPost>>
  | PutEffect<PayloadAction<string>>,
  void,
  SagaReturnType<() => Promise<any>>
> {
  try {
    const data = yield call(fetchPostFromApi, action.payload);
    yield put(postSuccess(data));
  } catch (e) {
    yield put(postFailure(e as string));
  }
}

export function* getPostWatcher(): Generator<
  ForkEffect<PayloadAction<number>>,
  void,
  PayloadAction<number>
> {
  yield takeEvery(postRequest, getPostWorker);
}
