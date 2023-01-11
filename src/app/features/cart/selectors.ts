import { RootState } from "../../store";

export const getCartItems = (state: RootState) => state.cart.items;
export const getCartOpened = (state: RootState) => state.cart.opened;
export const getTotal = (state: RootState) => state.cart.total;
export const getClientInfoDrawerOpened = (state: RootState) =>
  state.cart.clientInfoDrawerOpened;
export const getClient = (state: RootState) => state.cart.client;
export const getShowSummary = (state: RootState) => state.cart.showSummary;
export const getIsItemInCart = (state: RootState, id: number) =>
  state.cart.items.some((item) => item.product.id === id);
