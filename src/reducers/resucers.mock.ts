import { UserType } from "./auth";
import { IPost } from "../types";

export const createUserMock = (): UserType => {
  return { login: "somelogin", password: "somePassword" };
};

export const createPost = (): IPost => {
  return { userId: 1, id: 6, title: "g54g2g", body: "346243tew" };
};

export const createPosts = (): IPost[] => {
  return [
    { userId: 1, id: 1, title: "asd", body: "asdfasdfsdf" },
    { userId: 1, id: 2, title: "3424", body: "y52y4y" },
    { userId: 1, id: 3, title: "232e3d32", body: "25r2r3" },
    { userId: 1, id: 4, title: "f4f5fs", body: "t7i64u35y" },
    { userId: 1, id: 5, title: "5gg3g3", body: "1432rwe6" },
    { userId: 1, id: 6, title: "g54g2g", body: "346243tew" },
  ];
};
