import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost } from "../types";

export const postsQueryApi = createApi({
  reducerPath: "api/postsQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (build) => ({
    getPosts: build.query<IPost[], number>({
      query: (count: number) => `posts?_limit=${count}`,
    }),
    getPost: build.query<IPost, number>({
      query: (count: number) => `posts?/${count}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery } = postsQueryApi;
