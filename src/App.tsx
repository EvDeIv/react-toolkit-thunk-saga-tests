import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import { store } from "./shared/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <MainRoutes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
