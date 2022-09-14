import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../components/Auth/Login/Login";
import { RequireAuth } from "../shared/hoc/RequireAuth";
import { Profile } from "../components/Profile/Profile";
import { Registration } from "../components/Auth/Registration/Registration";
import { Main } from "../components/Main/Main";

// RequireAuth это HOC которым мы оборачиваем страницы роутинга которые доступны только авторизоавнным пользователям
// в нашем случае на страницу Profile не авторизованные пользователи попасть не могут, идет переадресация на страницу Registration

const MainRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Main />} />
      <Route
        path={"/profile"}
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route path={"/registration"} element={<Registration />} />
      <Route path={"/login"} element={<Login />} />
    </Routes>
  );
};

export default MainRoutes;
