import { Navigate } from "react-router";
import { useAppSelector } from "../store";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const authorizedUser = useAppSelector((state) => state.auth.authorizedUser);
  // если это поле не пустое то отрисуется children который передали HOC'у
  // в противном случае идет переадресация на страницу регистрации
  // компонент который находится внутри HOC'а
  return authorizedUser.login ? (
    children
  ) : (
    <Navigate to={"/registration"} replace />
  );
}
