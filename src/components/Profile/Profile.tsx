import { FC, useEffect, useRef } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { changePassword, signOut, UserType } from "../../reducers/auth";
import { RootState, useAppSelector } from "../../shared/store";
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
} from "../../reducers/counter";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";

import {
  postRequest,
  postsRequest,
  decreasePostsSaga,
} from "../../reducers/postsSaga";
import {
  getAllPosts,
  getPost,
  decreasePostsThunk,
} from "../../reducers/postsThunk";
import { useGetPostsQuery } from "../../api/postsQueryApi";
import { PostsContainer } from "./components/PostsContainer";

export const Profile: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValues>({ mode: "onBlur" });

  const notInitialRender = useRef(false);

  const authorizedUser = useAppSelector((state) => state.auth.authorizedUser);
  const { count, isDecrementing, isIncrementing } = useAppSelector(
    (state) => state.counter
  );

  const { data, isFetching } = useGetPostsQuery(count);

  const {
    error: errorSaga,
    pending: pendingSaga,
    posts: postsSaga,
  } = useAppSelector((state) => state.postsSaga);

  const {
    error: errorThunk,
    pending: pendingThunk,
    posts: postsThunk,
  } = useAppSelector((state) => state.postsThunk);

  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch(); // протипизированный диспатч для работы с асинхронными санками,
  // первый параметр в generic это тип нашего store, второй то, что функция возращает нам, и третий это сам action
  const navigate = useNavigate();

  const onSignOut = () => {
    // функция для обработки выхода из профиля
    dispatch(signOut()); // диспатчится экшн по выходу из профиля
    navigate("/"); // идёт переадресация на главную страницу
  };

  const onSubmit = (data: FieldValues | UserType) => {
    // функция смены пароля пользователя, в аргументе data хранятся все поля которые подключены к useForm,
    //в нашем случае там будет одно значание, password , которое мы указали как первый параметр в функции register
    dispatch(
      changePassword({
        login: authorizedUser.login,
        password: data.password,
      })
    );
  };

  useEffect(() => {
    if (notInitialRender.current) {
      if (count > 0 && count >= postsSaga.length) dispatch(postRequest(count));
      else dispatch(decreasePostsSaga(count));

      if (count > 0 && count >= postsSaga.length) dispatch(getPost(count));
      else dispatch(decreasePostsThunk(count));
    } else {
      notInitialRender.current = true;
    }
  }, [count]);

  useEffect(() => {
    if (count > 0) {
      dispatch(postsRequest(count));
      dispatch(getAllPosts(count));
    }
  }, []);

  return (
    <>
      <Typography variant={"h1"} sx={{ textAlign: "center" }}>
        Profile Page
      </Typography>

      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "100%", margin: "20px" }}>
          <Typography variant="h3">Welcome User</Typography>
          <Typography>{authorizedUser.login}</Typography>
          <Typography>{authorizedUser.password}</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant={"outlined"}
              label={"Change Password"}
              error={!!errors.password}
              helperText={errors.password?.message as string}
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "Minimum 8 symbols",
                },
                maxLength: {
                  value: 20,
                  message: "Maximum 20 symbols",
                },
              })}
            />
            <Button
              disabled={!isValid}
              variant={"contained"}
              type={"submit"}
              sx={{ margin: "10px" }}
            >
              Change
            </Button>
          </form>
          <Button
            variant={"outlined"}
            onClick={onSignOut}
            sx={{ margin: "10px" }}
          >
            Sign Out
          </Button>
          <Box>
            <Typography>isIncrementing: {`${isIncrementing}`}</Typography>
            <Typography>isDecrementing: {`${isDecrementing}`}</Typography>
            <Typography>Count: {count}</Typography>
            <Button
              variant={"contained"}
              sx={{ marginX: "10px", marginY: "10px" }}
              onClick={() => dispatch(incrementAsync())} // асинхронное добавление count на 1 (которое выполнится после 3 секунд)
            >
              Increment Async
            </Button>
            <Button
              variant={"contained"}
              sx={{ marginX: "10px", marginY: "10px" }}
              onClick={() => dispatch(decrementAsync())} // асинхронное уменьшение count на 1 (которое выполнится после 3 секунд)
            >
              Decrement Async
            </Button>
            <Button
              variant={"contained"}
              sx={{ marginX: "10px", marginY: "10px" }}
              onClick={() => dispatch(increment())} // сихронное добавление count на 1( выполнится мгновенно)
            >
              Icrement
            </Button>
            <Button
              variant={"contained"}
              sx={{ marginX: "10px", marginY: "10px" }}
              onClick={() => dispatch(decrement())} // сихронное уменьшение count на 1( выполнится мгновенно)
            >
              Derement
            </Button>
          </Box>
        </Box>

        <PostsContainer
          name={"postsSaga"}
          data={postsSaga}
          isLoading={pendingSaga}
        />

        <PostsContainer
          name={"postsThunk"}
          data={postsThunk}
          isLoading={pendingThunk}
        />

        <PostsContainer name={"postsRTK"} data={data} isLoading={isFetching} />
      </Box>
    </>
  );
};
