import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IPost, PostsState } from "../types";

export const initialPostsSagaState: PostsState = {
  pending: false,
  posts: [],
  error: null,
};

export const postsSagaSlice = createSlice({
  name: "postsSaga",
  initialState: initialPostsSagaState,
  reducers: {
    decreasePostsSaga(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter(
        (item: IPost) => item.id <= action.payload
      );
    },
    postRequest(state, action: PayloadAction<number>) {
      state.pending = true;
      state.error = null;
    },
    postSuccess(state, action: PayloadAction<IPost>) {
      state.pending = false;
      state.error = null;
      action.payload.id && state.posts.push(action.payload);
    },
    postsRequest(state, action: PayloadAction<number>) {
      state.pending = true;
      state.error = null;
    },
    postsSuccess(state, action: PayloadAction<IPost[]>) {
      state.pending = false;
      state.posts = action.payload;
      state.error = null;
    },
    postFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = postsSagaSlice;
export default reducer;
export const {
  postRequest,
  postSuccess,
  postFailure,
  postsRequest,
  postsSuccess,
  decreasePostsSaga,
} = actions;
