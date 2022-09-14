import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { signIn } from "../../reducers/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export interface GoogleUserType {
  email: string;
}

// Hook that initialize google accounts, render SingIn button per id and handle google success authentification
// @params tartgetId

export const useGoogleAuth = (targetId: string) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResponse = (response: google.accounts.id.CredentialResponse) => {
    const responsePayload = jwtDecode<GoogleUserType>(response.credential);
    dispatch(signIn({ login: responsePayload.email, password: "" }));
    navigate("/profile", { replace: true });
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "987498619422-vpf1poda2jms60ee49dft6jc35nl8g49.apps.googleusercontent.com",
      callback: handleResponse,
    });
    google.accounts.id.renderButton(document.getElementById(targetId)!, {
      theme: "filled_blue",
      size: "large",
      type: "standard",
    });
    google.accounts.id.prompt();
  }, []);
};
