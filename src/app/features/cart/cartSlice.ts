import { createSlice } from "@reduxjs/toolkit";
import { computePriceWithDiscount } from "../../../utils/computePrice";
import { Client } from "../../api/interfaces";
import { CartItem } from "./interfaces";

const initialState = {
  items:
    (JSON.parse(localStorage.getItem("cart") as string) as CartItem[]) || [],
  opened: false,
  total: parseFloat(JSON.parse(localStorage.getItem("total") as string)) || 0,
  clientInfoDrawerOpened: false,
  client: null,
  showSummary: false,
} as {
  items: CartItem[];
  opened: boolean;
  total: number;
  clientInfoDrawerOpened: boolean;
  client: Client | null;
  showSummary: boolean;
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state) => {
      state.opened = true;
    },
    closeCart: (state) => {
      state.opened = false;
    },
    openClientInfoDrawer: (state) => {
      state.clientInfoDrawerOpened = true;
    },
    closeClientInfoDrawer: (state) => {
      state.clientInfoDrawerOpened = false;
      state.showSummary = false;
      state.client = null;
    },
    addToCart: (state, action) => {
      if (
        !state.items.some(
          (item: CartItem) => item.product.id === action.payload.id
        )
      ) {
        state.items = [
          ...state.items,
          {
            product: action.payload,
            quantity: 1,
          },
        ];
        state.total = state.items.reduce(
          (acc, item) =>
            acc + computePriceWithDiscount(item.product) * item.quantity,
          0
        );
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    changeQuantity: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.product.id === action.payload.id) {
          return {
            ...item,
            quantity: action.payload.quantity,
          };
        }
        return item;
      });
      state.total = state.items.reduce(
        (acc, item) =>
          acc + computePriceWithDiscount(item.product) * item.quantity,
        0
      );
      localStorage.setItem("total", JSON.stringify(state.total));

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.opened = false;
      localStorage.removeItem("total");

      localStorage.removeItem("cart");
    },
    setClient: (state, action) => {
      state.client = action.payload;
      state.showSummary = true;
    },
    reset: () => initialState,
  },
});

export const {
  addToCart,
  removeFromCart,
  changeQuantity,
  clearCart,
  openCart,
  closeCart,
  openClientInfoDrawer,
  closeClientInfoDrawer,
  setClient,
  reset,
} = slice.actions;

export default slice.reducer;
