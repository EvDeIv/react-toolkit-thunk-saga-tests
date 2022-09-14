import { FC, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Box } from "@mui/system";
import { Alert, Button, Snackbar, TextField, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useAppSelector } from "../../../shared/store";
import { useGoogleAuth } from "../../../shared/hooks";
import { signIn, UserType } from "../../../reducers/auth";
import { GOOGLE_BUTTON_ID } from "./../../../utils/consts/googleButtonId";

export const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValues>({ mode: "onBlur" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const snackBarTitle = useRef<string>("");
  const [snackBarIsOpen, setSnackBarIsOpen] = useState(false);
  const registeredUsers: UserType[] = useAppSelector(
    (state) => state.auth.registeredUsers
  );
  const onSubmit = (data: FieldValues | UserType) => {
    // функция обработки входа пользователя
    const index = registeredUsers.findIndex(
      (item: UserType) => item.login === data.login
    );
    switch (true) {
      case index === -1:
        snackBarTitle.current = "User not found";
        setSnackBarIsOpen(true);
        break;
      case registeredUsers[index].password !== data.password:
        snackBarTitle.current = "Incorrect password";
        setSnackBarIsOpen(true);
        break;
      default:
        dispatch(signIn({ login: data.login, password: data.password }));
        navigate("/profile", { replace: true });
    }
  };

  const onSignUp = () => {
    // функция для переадресации на страницу регистрации
    navigate("/registration");
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
      <Typography variant={"h1"}>Sign In Page</Typography>
      <Box sx={{ display: "flex" }}>
        <form
          style={{
            width: "300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100% ",
            }}
          >
            <Button variant={"outlined"} disabled={!isValid} type={"submit"}>
              Sign In
            </Button>
            <Button variant={"contained"} onClick={onSignUp}>
              Create Account
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
          {snackBarTitle.current}
        </Alert>
      </Snackbar>
    </Box>
  );
};
