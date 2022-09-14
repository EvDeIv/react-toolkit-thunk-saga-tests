import { SerializedError } from "@reduxjs/toolkit";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  pending: boolean;
  posts: IPost[];
  error: string | null | SerializedError;
}

export type { IPost, PostsState };
