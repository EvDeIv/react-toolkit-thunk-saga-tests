import { FC, useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signUp, UserType } from "../../../reducers/auth";
import { useAppSelector } from "../../../shared/store";
import { useGoogleAuth } from "../../../shared/hooks";
import { GOOGLE_BUTTON_ID } from "./../../../utils/consts/googleButtonId";

export const Registration: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValues>({ mode: "onBlur" });
  const dispatch = useDispatch();
  const registeredUsers = useAppSelector((state) => state.auth.registeredUsers);
  const [snackBarIsOpen, setSnackBarIsOpen] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data: FieldValues | UserType) => {
    // функция для обработки регистрации пользователя
    if (!registeredUsers.find((item: UserType) => item.login === data.login)) {
      // если в local storage не будет найден пользователь с таким логином произойдет создание нового пользователся
      dispatch(signUp({ login: data.login, password: data.password }));
      navigate("/profile", { replace: true });
      return;
    }
    setSnackBarIsOpen(true); // в противном случае появится уведомление о том что такой пользователь существует
  };

  const onSignIn = () => {
    // функиция переадресации на страницу входа
    navigate("/login");
  };

  useGoogleAuth(GOOGLE_BUTTON_ID);

  return (
    <Box
      sx={{
        padding: "30px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant={"h1"}>Sign Up Page</Typography>
      <Box sx={{ flexDirection: "column", display: "flex", width: "200px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ marginY: "10px" }}>
            <TextField
              variant={"outlined"}
              label={"Login"}
              error={!!errors.login}
              helperText={errors.login?.message as string}
              {...register("login", {
                maxLength: {
                  value: 20,
                  message: "Maximum 20 symbols",
                },
                minLength: {
                  value: 3,
                  message: "Minimum 3 symbols",
                },
                required: {
                  value: true,
                  message: "Field is required",
                },
              })}
            />
          </Box>
          <Box sx={{ marginY: "10px" }}>
            <TextField
              variant={"outlined"}
              label={"Password"}
              error={!!errors.password}
              helperText={errors.password?.message as string}
              {...register("password", {
                maxLength: {
                  value: 20,
                  message: "Maximum 20 symbols",
                },
                minLength: {
                  value: 8,
                  message: "Minimum 8 symbols",
                },
                required: {
                  value: true,
                  message: "Field is required",
                },
              })}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant={"outlined"} disabled={!isValid} type={"submit"}>
              Sign Up
            </Button>
            <Button variant={"contained"} onClick={onSignIn}>
              Sign In
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <div id={GOOGLE_BUTTON_ID}></div>
          </Box>
        </form>
      </Box>
      <Snackbar
        open={snackBarIsOpen}
        autoHideDuration={6000}
        onClose={() => setSnackBarIsOpen(false)}
      >
        <Alert
          elevation={6}
          variant={"filled"}
          onClose={() => setSnackBarIsOpen(false)}
          severity={"error"}
          sx={{ width: "100%" }}
        >
          User already exist
        </Alert>
      </Snackbar>
    </Box>
  );
};
