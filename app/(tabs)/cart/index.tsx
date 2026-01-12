import React from "react";
import { FlatList, Image, Pressable, View as RNView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/src/store";
import { selectCartItemsArray, selectSubtotal, decrement, increment, removeItem, clearCart } from "@/src/store/slices/cartSlice";
import { Text, useColors } from "@/src/components/Themed";
import { QuantityStepper } from "@/src/components/QuantityStepper";

export default function CartScreen() {
  const c = useColors();
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((s: RootState) => selectCartItemsArray(s));
  const subtotal = useSelector((s: RootState) => selectSubtotal(s));

  return (
    <RNView style={{ flex: 1, backgroundColor: c.bg, padding: 16 }}>
      {items.length === 0 ? (
        <RNView style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "900" }}>Your cart is empty</Text>
          <Text style={{ color: c.muted }}>Add items from Home.</Text>
        </RNView>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(it) => String(it.id)}
            contentContainerStyle={{ paddingBottom: 140 }}
            renderItem={({ item }) => (
              <RNView
                style={{
                  backgroundColor: c.card,
                  borderColor: c.border,
                  borderWidth: 1,
                  borderRadius: 16,
                  padding: 12,
                  marginBottom: 12,
                  flexDirection: "row",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: item.thumbnail }}
                  style={{ width: 64, height: 64, borderRadius: 14, backgroundColor: c.border }}
                />
                <RNView style={{ flex: 1, gap: 6 }}>
                  <Text style={{ fontWeight: "900" }} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={{ color: c.muted }}>
                    € {item.price} each
                  </Text>

                  <RNView style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <QuantityStepper
                      value={item.quantity}
                      onMinus={() => dispatch(decrement(item.id))}
                      onPlus={() => dispatch(increment(item.id))}
                    />
                    <Pressable onPress={() => dispatch(removeItem(item.id))}>
                      <Text style={{ color: c.danger, fontWeight: "900" }}>Remove</Text>
                    </Pressable>
                  </RNView>
                </RNView>
              </RNView>
            )}
          />

          <RNView
            style={{
              position: "absolute",
              left: 16,
              right: 16,
              bottom: 16,
              backgroundColor: c.card,
              borderColor: c.border,
              borderWidth: 1,
              borderRadius: 20,
              padding: 14,
              gap: 10,
            }}
          >
            <RNView style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: c.muted, fontWeight: "700" }}>Subtotal</Text>
              <Text style={{ fontWeight: "900" }}>€ {subtotal.toFixed(2)}</Text>
            </RNView>

            <Pressable
              onPress={() => dispatch(clearCart())}
              style={{
                backgroundColor: c.danger,
                paddingVertical: 12,
                borderRadius: 14,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "900" }}>Clear cart</Text>
            </Pressable>
          </RNView>
        </>
      )}
    </RNView>
  );
}
