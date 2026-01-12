import React from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, View as RNView } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/src/api/dummyjson";
import { Text, useColors } from "@/src/components/Themed";
import { useDispatch } from "react-redux";
import { addToCart } from "@/src/store/slices/cartSlice";
import type { AppDispatch } from "@/src/store";

export default function ProductDetailScreen() {
  const c = useColors();
  const dispatch = useDispatch<AppDispatch>();
  const params = useLocalSearchParams<{ id: string }>();
  const id = Number(params.id);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: Number.isFinite(id),
  });

  return (
    <>
      <Stack.Screen options={{ title: "Product" }} />
      <RNView style={{ flex: 1, backgroundColor: c.bg }}>
        {isLoading ? (
          <RNView style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 10 }}>
            <ActivityIndicator />
            <Text style={{ color: c.muted }}>Loading product...</Text>
          </RNView>
        ) : isError ? (
          <RNView style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 18, gap: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "800" }}>Couldn’t load product</Text>
            <Text style={{ color: c.muted, textAlign: "center" }}>
              {(error as Error)?.message ?? "Unknown error"}
            </Text>
            <Text onPress={() => refetch()} style={{ color: c.primary, fontWeight: "800", marginTop: 8 }}>
              Tap to retry
            </Text>
          </RNView>
        ) : !data ? (
          <RNView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "800" }}>Empty</Text>
          </RNView>
        ) : (
          <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
            <RNView
              style={{
                backgroundColor: c.card,
                borderColor: c.border,
                borderWidth: 1,
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: data.thumbnail }}
                style={{ width: "100%", height: 260, backgroundColor: c.border }}
              />
            </RNView>

            <RNView style={{ gap: 6 }}>
              <Text style={{ fontSize: 22, fontWeight: "900" }}>{data.title}</Text>
              <Text style={{ color: c.muted }}>
                {data.brand ? `${data.brand} • ` : ""}
                {data.category ?? ""}
                {data.rating ? ` • ⭐ ${data.rating}` : ""}
              </Text>
            </RNView>

            <RNView
              style={{
                backgroundColor: c.card,
                borderColor: c.border,
                borderWidth: 1,
                borderRadius: 16,
                padding: 14,
                gap: 10,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "900" }}>€ {data.price}</Text>
              <Text style={{ color: c.muted }}>{data.description}</Text>

              <Pressable
                onPress={() => dispatch(addToCart(data))}
                style={{
                  marginTop: 10,
                  backgroundColor: c.primary,
                  paddingVertical: 12,
                  borderRadius: 14,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "900" }}>Add to cart</Text>
              </Pressable>
            </RNView>
          </ScrollView>
        )}
      </RNView>
    </>
  );
}
