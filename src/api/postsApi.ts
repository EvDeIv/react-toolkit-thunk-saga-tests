import { IPost } from "../types";

export const fetchPostFromApi = (id: number): Promise<IPost> =>
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
    res.json()
  );

export const fetchPostsFromApi = (postsNumber: number): Promise<IPost[]> =>
  fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${postsNumber}`
  ).then((res) => res.json());

export default { fetchPostFromApi, fetchPostsFromApi };
