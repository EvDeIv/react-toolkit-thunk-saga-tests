import { createPosts, createPost } from "./resucers.mock";
import { IPost } from "../types";

import {
  postsSagaSlice,
  postRequest,
  postSuccess,
  postFailure,
  postsRequest,
  postsSuccess,
  decreasePostsSaga,
  initialPostsSagaState,
} from "./postsSaga";

describe("postsSaga", () => {
  describe("postsSagaSlice", () => {
    test("should return decresed array of posts", () => {
      const posts = createPosts();
      const prevState = { ...initialPostsSagaState, posts };
      expect(postsSagaSlice.reducer(prevState, decreasePostsSaga(3))).toEqual({
        ...prevState,
        posts: posts.filter((item: IPost) => item.id <= 3),
      });
    });

    test("should set loading to true and error to null while post request", () => {
      const prevState = { ...initialPostsSagaState };
      expect(postsSagaSlice.reducer(prevState, postRequest(3))).toEqual({
        ...prevState,
        pending: true,
        error: null,
      });
    });

    test("should set loading to true and error to null while posts request", () => {
      const prevState = { ...initialPostsSagaState };
      expect(postsSagaSlice.reducer(prevState, postsRequest(3))).toEqual({
        ...prevState,
        pending: true,
        error: null,
      });
    });

    test("should set post to store after success post request", () => {
      const post = createPost();
      const prevState = { ...initialPostsSagaState };
      expect(postsSagaSlice.reducer(prevState, postSuccess(post))).toEqual({
        ...prevState,
        posts: [...prevState.posts, post],
      });
    });

    test("should set posts to store after success post request", () => {
      const posts = createPosts();
      const prevState = { ...initialPostsSagaState };
      expect(postsSagaSlice.reducer(prevState, postsSuccess(posts))).toEqual({
        ...prevState,
        posts: [...prevState.posts, ...posts],
      });
    });

    test("should set error to store after failure post request", () => {
      const error = "Error happened!";
      const prevState = { ...initialPostsSagaState };
      expect(postsSagaSlice.reducer(prevState, postFailure(error))).toEqual({
        ...prevState,
        error,
      });
    });
  });
});
