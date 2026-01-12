import React, { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, TextInput, View as RNView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { getProducts, searchProducts } from "@/src/api/dummyjson";
import { ProductCard } from "@/src/components/ProductCard";
import { Text, useColors } from "@/src/components/Themed";
import { useDebounce } from "@/src/hooks/useDebounce";

export default function ProductListScreen() {
  const c = useColors();
  const [q, setQ] = useState("");
  const debounced = useDebounce(q, 450);

  const queryKey = useMemo(() => ["products", debounced.trim() || "all"], [debounced]);

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey,
    queryFn: () => {
      const term = debounced.trim();
      return term ? searchProducts(term) : getProducts();
    },
  });

  const products = data?.products ?? [];

  return (
    <RNView style={{ flex: 1, backgroundColor: c.bg, padding: 16, gap: 12 }}>
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Search products..."
        placeholderTextColor={c.muted}
        style={{
          backgroundColor: c.card,
          borderColor: c.border,
          borderWidth: 1,
          borderRadius: 16,
          paddingHorizontal: 14,
          paddingVertical: 12,
          color: c.text,
        }}
      />

      {isLoading ? (
        <RNView style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 10 }}>
          <ActivityIndicator />
          <Text style={{ color: c.muted }}>Loading products...</Text>
        </RNView>
      ) : isError ? (
        <RNView style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 18, gap: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "800" }}>Something went wrong</Text>
          <Text style={{ color: c.muted, textAlign: "center" }}>
            {(error as Error)?.message ?? "Unknown error"}
          </Text>
          <Text onPress={() => refetch()} style={{ color: c.primary, fontWeight: "800", marginTop: 8 }}>
            Tap to retry
          </Text>
        </RNView>
      ) : products.length === 0 ? (
        <RNView style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "800" }}>No products</Text>
          <Text style={{ color: c.muted }}>Try another search.</Text>
        </RNView>
      ) : (
        <>
          {isFetching && (
            <Text style={{ color: c.muted, marginBottom: 6 }}>Updating…</Text>
          )}

          <FlatList
            data={products}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() =>
                  router.push({
                    pathname: "/home/[id]",
                    params: { id: String(item.id) },
                  })
                }
              />
            )}
            contentContainerStyle={{ paddingBottom: 18 }}
          />
        </>
      )}
    </RNView>
  );
}
