import React from "react";
import { Pressable, View as RNView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/src/store";
import { selectSubtotal, selectTotalItems } from "@/src/store/slices/cartSlice";
import { toggleMode } from "@/src/store/slices/themeSlice";
import { Text, useColors } from "@/src/components/Themed";
import { router } from "expo-router";

export default function ProfileScreen() {
  const c = useColors();
  const dispatch = useDispatch<AppDispatch>();
  const totalItems = useSelector((s: RootState) => selectTotalItems(s));
  const subtotal = useSelector((s: RootState) => selectSubtotal(s));
  const mode = useSelector((s: RootState) => s.theme.mode);

  return (
    <RNView style={{ flex: 1, backgroundColor: c.bg, padding: 16, gap: 14 }}>
      <RNView
        style={{
          backgroundColor: c.card,
          borderColor: c.border,
          borderWidth: 1,
          borderRadius: 20,
          padding: 16,
          gap: 8,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "900" }}>Voornaam Achternaam</Text>
        <Text style={{ color: c.muted }}>
          Mode: <Text style={{ fontWeight: "900" }}>{mode.toUpperCase()}</Text>
        </Text>
      </RNView>

      <RNView
        style={{
          backgroundColor: c.card,
          borderColor: c.border,
          borderWidth: 1,
          borderRadius: 20,
          padding: 16,
          gap: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "900" }}>Cart summary</Text>

        <RNView style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: c.muted }}>Items</Text>
          <Text style={{ fontWeight: "900" }}>{totalItems}</Text>
        </RNView>

        <RNView style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: c.muted }}>Subtotal</Text>
          <Text style={{ fontWeight: "900" }}>€ {subtotal.toFixed(2)}</Text>
        </RNView>

        <Pressable
          onPress={() => router.push("/cart")}
          style={{
            marginTop: 8,
            backgroundColor: c.primary,
            paddingVertical: 12,
            borderRadius: 14,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "900" }}>Go to Cart</Text>
        </Pressable>
      </RNView>

      <RNView
        style={{
          backgroundColor: c.card,
          borderColor: c.border,
          borderWidth: 1,
          borderRadius: 20,
          padding: 16,
          gap: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "900" }}>Settings</Text>

        <Pressable
          onPress={() => dispatch(toggleMode())}
          style={{
            backgroundColor: c.card,
            borderColor: c.border,
            borderWidth: 1,
            paddingVertical: 12,
            borderRadius: 14,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "900" }}>Toggle Light/Dark</Text>
        </Pressable>
      </RNView>
    </RNView>
  );
}
