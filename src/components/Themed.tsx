import React from "react";
import { Text as RNText, View as RNView, type TextProps, type ViewProps } from "react-native";
import { useSelector } from "react-redux";
import type { RootState } from "@/src/store";
import { darkColors, lightColors } from "@/src/theme/colors";

export function useColors() {
  const mode = useSelector((s: RootState) => s.theme.mode);
  return mode === "dark" ? darkColors : lightColors;
}

export function View(props: ViewProps) {
  return <RNView {...props} />;
}

export function Text({ style, ...props }: TextProps) {
  const c = useColors();
  return <RNText {...props} style={[{ color: c.text }, style]} />;
}
