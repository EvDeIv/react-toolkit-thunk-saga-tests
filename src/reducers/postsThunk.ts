import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import postsApi from "../api/postsApi";
import { IPost, PostsState } from "../types";

export const initialPostsThunkState: PostsState = {
  pending: false,
  posts: [],
  error: null,
};

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (id: number): Promise<IPost[]> => {
    const response = await postsApi.fetchPostsFromApi(id);
    return response;
  }
);

export const getPost = createAsyncThunk(
  "posts/getPost",
  async (id: number): Promise<IPost> => {
    const response = await postsApi.fetchPostFromApi(id);
    return response;
  }
);

export const postsThunkSlice = createSlice({
  name: "postsThunk",
  initialState: initialPostsThunkState,
  reducers: {
    decreasePostsThunk(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter(
        (item: IPost) => item.id <= action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.pending = false;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getPost.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.pending = false;
        action.payload.id && state.posts.push(action.payload);
      })
      .addCase(getPost.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message ?? null;
      });
  },
});

const { reducer, actions } = postsThunkSlice;
export default reducer;
export const { decreasePostsThunk } = actions;
