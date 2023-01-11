import {
  configureStore,
  ThunkAction,
  Action,
  ConfigureStoreOptions,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { api } from "./api/api";
import { rtkQueryErrorLogger } from "./api/middlewares/error";
import filter from "./features/filter/filterSlice";
import cart from "./features/cart/cartSlice";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      filter,
      cart,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware, rtkQueryErrorLogger),
    ...options,
  });
export const store = createStore();

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
