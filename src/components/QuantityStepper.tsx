import React from "react";
import { Pressable } from "react-native";
import { Text, useColors, View } from "@/src/components/Themed";

export function QuantityStepper({
  value,
  onMinus,
  onPlus,
}: {
  value: number;
  onMinus: () => void;
  onPlus: () => void;
}) {
  const c = useColors();
  const btn = {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.card,
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <Pressable onPress={onMinus} style={btn}>
        <Text style={{ fontSize: 18, fontWeight: "800" }}>−</Text>
      </Pressable>
      <Text style={{ minWidth: 18, textAlign: "center", fontWeight: "800" }}>{value}</Text>
      <Pressable onPress={onPlus} style={btn}>
        <Text style={{ fontSize: 18, fontWeight: "800" }}>+</Text>
      </Pressable>
    </View>
  );
}
