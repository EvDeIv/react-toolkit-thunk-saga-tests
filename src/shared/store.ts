import { Store } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { rootWatcher } from "../saga";
import { postsQueryApi } from "./../api/postsQueryApi";

// Redux Persist это библиотека для связки localStorage со Store Redux

const rootPersistConfig = {
  key: "rootStorage",
  storage,
  whitelist: ["counter", "auth"], // это список тех редьюсеров которые должен redux persist добавлять и контролировать в local storage, так же есть balcklist,
  // это те редьюсеры которые необходимо игнорировать к добавлению в local storage
};

const pReducer = persistReducer(rootPersistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store: Store = configureStore({
  reducer: pReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    sagaMiddleware,
    postsQueryApi.middleware,
  ],
});
const persistor = persistStore(store);

sagaMiddleware.run(rootWatcher);

export { persistor, store };

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // протипизированная функция для доступа к елементам в store
