import { createUserMock } from "./resucers.mock";

import {
  authSlice,
  signUp,
  signOut,
  signIn,
  changePassword,
  initialAuthState,
  AuthState,
} from "./auth";

describe("auth", () => {
  describe("auth slice", () => {
    test("should return the initial state", () => {
      expect(authSlice.reducer(undefined, { type: "" })).toEqual(
        initialAuthState
      );
    });

    test("should add user to registeren users and change authorized user to this user", () => {
      const user = createUserMock();
      const prevState = { ...initialAuthState };
      expect(authSlice.reducer(prevState, signUp(user))).toEqual({
        registeredUsers: [...prevState.registeredUsers, user],
        authorizedUser: { login: user.login, password: user.password },
      });
    });

    test("should change each authorized user properties to empty string", () => {
      const prevState = { ...initialAuthState };
      expect(authSlice.reducer(prevState, signOut())).toEqual({
        ...prevState,
        authorizedUser: { login: "", password: "" },
      });
    });

    test("should change values of authorized user properties to new user values", () => {
      const user = createUserMock();
      const prevState = { ...initialAuthState };
      expect(authSlice.reducer(prevState, signIn(user))).toEqual({
        ...prevState,
        authorizedUser: { login: user.login, password: user.password },
      });
    });

    test(`should change password of authorized user to 
      new user password and password in registered users array`, () => {
      const user = createUserMock();
      const prevState: AuthState = {
        registeredUsers: [
          { login: "testlogin", password: "22222222" },
          { login: user.login, password: "11111111" },
        ],
        authorizedUser: { login: user.login, password: "11111111" },
      };
      expect(authSlice.reducer(prevState, changePassword(user))).toEqual({
        registeredUsers: [
          ...prevState.registeredUsers.filter((el) => el.login !== user.login),
          { login: user.login, password: user.password },
        ],
        authorizedUser: { login: user.login, password: user.password },
      });
    });

    test(`should change password of authorized user to 
    new user password and password in registered users array`, () => {
      const user = createUserMock();
      const prevState: AuthState = {
        registeredUsers: [
          { login: "testlogin", password: "22222222" },
          { login: user.login, password: "11111111" },
        ],
        authorizedUser: { login: user.login, password: "11111111" },
      };
      expect(authSlice.reducer(prevState, changePassword(user))).toEqual({
        registeredUsers: [
          ...prevState.registeredUsers.filter((el) => el.login !== user.login),
          { login: user.login, password: user.password },
        ],
        authorizedUser: { login: user.login, password: user.password },
      });
    });
  });
});
