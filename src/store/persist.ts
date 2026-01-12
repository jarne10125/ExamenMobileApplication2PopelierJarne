import AsyncStorage from "@react-native-async-storage/async-storage";
import type { RootState } from "@/src/store";

const KEY = "minishop_state_v1";

export async function loadPersistedState(): Promise<Partial<RootState> | undefined> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as Partial<RootState>;
  } catch {
    return undefined;
  }
}

export async function savePersistedState(state: RootState) {
  try {
    const subset = {
      cart: state.cart,
      theme: state.theme,
    };
    await AsyncStorage.setItem(KEY, JSON.stringify(subset));
  } catch {
    // ignore
  }
}
