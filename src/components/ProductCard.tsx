import React from "react";
import { Image, Pressable } from "react-native";
import { Text, useColors, View } from "@/src/components/Themed";
import type { Product } from "@/src/types/products";

export function ProductCard({
  product,
  onPress,
}: {
  product: Product;
  onPress: () => void;
}) {
  const c = useColors();

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: c.card,
        borderColor: c.border,
        borderWidth: 1,
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        flexDirection: "row",
        gap: 12,
      }}
    >
      <Image
        source={{ uri: product.thumbnail }}
        style={{ width: 78, height: 78, borderRadius: 14, backgroundColor: c.border }}
      />
      <View style={{ flex: 1, gap: 6 }}>
        <Text style={{ fontSize: 16, fontWeight: "700" }} numberOfLines={1}>
          {product.title}
        </Text>
        <Text style={{ color: c.muted }} numberOfLines={2}>
          {product.description}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "800" }}>€ {product.price}</Text>
      </View>
    </Pressable>
  );
}
