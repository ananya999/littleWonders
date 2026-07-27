import React from "react";
import { View } from "react-native";
import Svg, { Circle, Rect } from "react-native-svg";
import { colors } from "../theme/theme";

interface Props {
  size?: number;
  color?: string;
}

/** Uniform hidden-card face for the memory game -- deliberately gives no hint of what's underneath. */
export default function MemoryCardBack({ size = 80, color = colors.skyBlue }: Props) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width="100%" height="100%" viewBox="0 0 240 240">
        <Rect x="30" y="30" width="180" height="180" rx="28" fill={color} stroke={colors.outline} strokeWidth={6} />
        <Circle cx="90" cy="90" r="10" fill={colors.white} opacity={0.5} />
        <Circle cx="150" cy="90" r="10" fill={colors.white} opacity={0.5} />
        <Circle cx="120" cy="150" r="10" fill={colors.white} opacity={0.5} />
        <Circle cx="60" cy="150" r="7" fill={colors.white} opacity={0.35} />
        <Circle cx="180" cy="150" r="7" fill={colors.white} opacity={0.35} />
      </Svg>
    </View>
  );
}
