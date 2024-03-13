import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// import services
import { countriesApi, f1Api, f1InfoApi } from "./services";

// import features
import { f1InfoReducer, f1Reducer } from "./features";

const reducer = combineReducers({
  f1: f1Reducer,
  f1Info: f1InfoReducer,
  [f1Api.reducerPath]: f1Api.reducer,
  [countriesApi.reducerPath]: countriesApi.reducer,
  [f1InfoApi.reducerPath]: f1InfoApi.reducer
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
  },
  reducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
    .concat(f1Api.middleware)
    .concat(countriesApi.middleware)
    .concat(f1InfoApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
setupListeners(store.dispatch);
