import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserType {
  login: string;
  password: string;
}

export interface AuthState {
  authorizedUser: UserType;
  registeredUsers: UserType[];
}

export const initialAuthState: AuthState = {
  authorizedUser: {
    login: "",
    password: "",
  },
  registeredUsers: [
    {
      login: "",
      password: "",
    },
  ],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    signUp(state, action: PayloadAction<UserType>) {
      // редьюсер для выполнения регистрации пользователя
      state.registeredUsers.push(action.payload);
      state.authorizedUser = {
        login: action.payload.login,
        password: action.payload.password,
      };
    },
    signOut(state) {
      // редьюсер для выполнения выхода из профиля
      state.authorizedUser.login = "";
      state.authorizedUser.password = "";
    },
    signIn(state, action: PayloadAction<UserType>) {
      // редьюсер для выполнения входа в профиль
      state.authorizedUser.login = action.payload.login;
      state.authorizedUser.password = action.payload.password;
    },
    changePassword(state, action: PayloadAction<UserType>) {
      // редьюсер для изменения пароля в профиле
      let index = state.registeredUsers.findIndex(
        (item: UserType) => item.login === action.payload.login
      );
      state.registeredUsers[index].password = action.payload.password;
      state.authorizedUser.password = action.payload.password;
    },
    deleteUser(state, action: PayloadAction<string>) {
      // редьюсер для удаления пользователя
      let index = state.registeredUsers.findIndex(
        (item: UserType) => item.login === action.payload
      );
      state.registeredUsers.splice(index, 1);
    },
  },
});

const { reducer, actions } = authSlice;
export default reducer;
export const { signUp, signOut, signIn, changePassword, deleteUser } = actions;
