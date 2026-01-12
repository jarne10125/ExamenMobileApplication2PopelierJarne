import React from "react";
import { Tabs } from "expo-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/src/store";
import { selectTotalItems } from "@/src/store/slices/cartSlice";
import { useColors } from "@/src/components/Themed";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  const c = useColors();
  const totalItems = useSelector((s: RootState) => selectTotalItems(s));

  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        tabBarActiveTintColor: c.primary,
        tabBarStyle: { backgroundColor: c.card, borderTopColor: c.border },
        headerStyle: { backgroundColor: c.card },
        headerTitleStyle: { color: c.text },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
