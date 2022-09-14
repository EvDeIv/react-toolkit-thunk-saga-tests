import { cloneableGenerator } from "@redux-saga/testing-utils";
import { PayloadAction } from "@reduxjs/toolkit";
import { runSaga } from "redux-saga";
import { call, put } from "redux-saga/effects";
import postsApi from "../api/postsApi";
import { postFailure, postsSuccess, postSuccess } from "../reducers/postsSaga";
import { createPost, createPosts } from "../reducers/resucers.mock";
import { getPostWorker } from "./getPostSaga";
import { getPostsWorker } from "./getPostsSaga";

describe("postSaga", () => {
  const errorMessage = "Error happened";

  describe("getPostWorker branching", () => {
    const action = {
      payload: 3,
    };

    const g = cloneableGenerator(getPostWorker)(
      action as PayloadAction<number>
    );

    test("should put post into store if success request", () => {
      const gClone = g.clone();
      const post = createPost();

      expect(gClone.next().value).toEqual(
        call(postsApi.fetchPostFromApi, action.payload)
      );

      expect(gClone.next(post).value).toEqual(put(postSuccess(post)));
    });

    test("should put error into store if success request", () => {
      const gClone = g.clone();

      gClone.next(); // call

      expect(gClone.throw?.(errorMessage).value).toEqual(
        put(postFailure(errorMessage))
      );

      expect(gClone.next().done).toEqual(true);
    });
  });

  describe("getPostWorker full", () => {
    const action = {
      payload: 3,
    } as PayloadAction<number>;

    afterAll(() => {
      jest.clearAllMocks();
    });

    test("should put post into store if success request", async () => {
      const dispatched: PayloadAction[] = [];
      const post = createPost();
      postsApi.fetchPostFromApi = jest.fn().mockResolvedValue(post);

      await runSaga(
        {
          dispatch: (action: PayloadAction) => dispatched.push(action),
          getState: () => ({ state: "test" }),
        },
        getPostWorker,
        action
      ).toPromise();

      expect(postsApi.fetchPostFromApi).toHaveBeenCalledWith(action.payload);
      expect(dispatched).toEqual([postSuccess(post)]);
    });

    test("should put error into store if success request", async () => {
      const dispatched: PayloadAction[] = [];
      postsApi.fetchPostFromApi = jest.fn().mockRejectedValue(errorMessage);

      await runSaga(
        {
          dispatch: (action: PayloadAction) => dispatched.push(action),
          getState: () => ({ state: "test" }),
        },
        getPostWorker,
        action
      ).toPromise();

      expect(postsApi.fetchPostFromApi).toHaveBeenCalledWith(action.payload);
      expect(dispatched).toEqual([postFailure(errorMessage)]);
    });
  });

  describe("getPostsWorker full", () => {
    const action = {
      payload: 6,
    } as PayloadAction<number>;

    afterAll(() => {
      jest.clearAllMocks();
    });

    test("should put posts into store if success request", async () => {
      const dispatched: PayloadAction[] = [];
      const posts = createPosts();
      postsApi.fetchPostsFromApi = jest.fn().mockResolvedValue(posts);

      await runSaga(
        {
          dispatch: (action: PayloadAction) => dispatched.push(action),
          getState: () => ({ state: "test" }),
        },
        getPostsWorker,
        action
      ).toPromise();

      expect(postsApi.fetchPostsFromApi).toHaveBeenCalledWith(action.payload);
      expect(dispatched).toEqual([postsSuccess(posts)]);
    });

    test("should put error into store if success request", async () => {
      const dispatched: PayloadAction[] = [];
      postsApi.fetchPostsFromApi = jest.fn().mockRejectedValue(errorMessage);

      await runSaga(
        {
          dispatch: (action: PayloadAction) => dispatched.push(action),
          getState: () => ({ state: "test" }),
        },
        getPostsWorker,
        action
      ).toPromise();

      expect(postsApi.fetchPostsFromApi).toHaveBeenCalledWith(action.payload);
      expect(dispatched).toEqual([postFailure(errorMessage)]);
    });
  });
});
