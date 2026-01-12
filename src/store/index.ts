import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "@/src/store/slices/cartSlice";
import themeReducer from "@/src/store/slices/themeSlice";
import { savePersistedState } from "@/src/store/persist";

const rootReducer = combineReducers({
  cart: cartReducer,
  theme: themeReducer,
});

// temp store voor types (geen cirkel)
const tempStore = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof tempStore.getState>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as any,
  });

  let timeout: ReturnType<typeof setTimeout> | undefined;
  store.subscribe(() => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      savePersistedState(store.getState());
    }, 250);
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
