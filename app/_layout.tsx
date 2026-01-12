import React, { useEffect, useMemo, useState } from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loadPersistedState } from "@/src/store/persist";
import { makeStore, type AppStore } from "@/src/store";

export default function RootLayout() {
  const [store, setStore] = useState<AppStore | null>(null);

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 30_000,
          },
        },
      }),
    []
  );

  useEffect(() => {
    (async () => {
      const persisted = await loadPersistedState();
      const s = makeStore(persisted);
      setStore(s);
    })();
  }, []);

  if (!store) return null;

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerTitleAlign: "center" }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </Provider>
  );
}
