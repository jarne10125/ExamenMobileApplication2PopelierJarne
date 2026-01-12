import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { Product } from "@/src/types/products";
import type { RootState } from "@/src/store";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

type CartState = {
  items: Record<number, CartItem>; 
};

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const p = action.payload;
      const existing = state.items[p.id];
      if (existing) existing.quantity += 1;
      else {
        state.items[p.id] = {
          id: p.id,
          title: p.title,
          price: p.price,
          thumbnail: p.thumbnail,
          quantity: 1,
        };
      }
    },
    increment(state, action: PayloadAction<number>) {
      const id = action.payload;
      const item = state.items[id];
      if (item) item.quantity += 1;
    },
    decrement(state, action: PayloadAction<number>) {
      const id = action.payload;
      const item = state.items[id];
      if (!item) return;
      item.quantity -= 1;
      if (item.quantity <= 0) delete state.items[id];
    },
    removeItem(state, action: PayloadAction<number>) {
      delete state.items[action.payload];
    },
    clearCart(state) {
      state.items = {};
    },
  },
});

export const { addToCart, increment, decrement, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


export const selectCartItemsArray = (state: RootState): CartItem[] =>
  Object.values(state.cart.items);


export const selectTotalItems = createSelector(selectCartItemsArray, (items) =>
  items.reduce((sum, it) => sum + it.quantity, 0)
);

export const selectSubtotal = createSelector(selectCartItemsArray, (items) =>
  items.reduce((sum, it) => sum + it.price * it.quantity, 0)
);

