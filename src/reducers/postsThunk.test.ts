import { createPost, createPosts } from "./resucers.mock";
import { IPost } from "../types";
import {
  postsThunkSlice,
  decreasePostsThunk,
  getPost,
  getAllPosts,
  initialPostsThunkState,
} from "./postsThunk";
import postsApi from "../api/postsApi";
import { configureStore } from "@reduxjs/toolkit";

describe("postsThunk", () => {
  describe("postsThunkslice", () => {
    test("should return decresed array of posts", () => {
      const posts = createPosts();
      const prevState = { ...initialPostsThunkState, posts };
      expect(postsThunkSlice.reducer(prevState, decreasePostsThunk(3))).toEqual(
        {
          ...prevState,
          posts: posts.filter((item: IPost) => item.id <= 3),
        }
      );
    });
  });

  describe("Async thunk tests", () => {
    const post = createPost();
    const posts = createPosts();

    const action = {
      payload: 3,
    };

    const error = "Error happened!";

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test("should set post to store after success post request", async () => {
      jest.spyOn(postsApi, "fetchPostFromApi").mockResolvedValueOnce(post);
      const store = configureStore({ reducer: postsThunkSlice.reducer });
      await store.dispatch(getPost(action.payload));
      expect(store.getState()).toEqual({
        ...initialPostsThunkState,
        posts: [post],
      });
    });

    test("should set error to store after failure post request", async () => {
      jest.spyOn(postsApi, "fetchPostFromApi").mockRejectedValue(error);
      const store = configureStore({ reducer: postsThunkSlice.reducer });
      await store.dispatch(getPost(action.payload));
      expect(store.getState()).toEqual({
        ...initialPostsThunkState,
        error,
      });
    });

    test("should set posts to store after success posts request", async () => {
      jest.spyOn(postsApi, "fetchPostsFromApi").mockResolvedValueOnce(posts);
      const store = configureStore({ reducer: postsThunkSlice.reducer });
      await store.dispatch(getAllPosts(action.payload));
      expect(store.getState()).toEqual({
        ...initialPostsThunkState,
        posts: [...posts],
      });
    });

    test("should set error to store after failure posts request", async () => {
      jest.spyOn(postsApi, "fetchPostsFromApi").mockRejectedValue(error);
      const store = configureStore({ reducer: postsThunkSlice.reducer });
      await store.dispatch(getAllPosts(action.payload));
      expect(store.getState()).toEqual({
        ...initialPostsThunkState,
        error,
      });
    });
  });
});
