import React from "react";
import { View } from "react-native";
import Svg, { Path, Polygon, Rect } from "react-native-svg";
import { colors } from "../theme/theme";

interface Props {
  size?: number;
}

export default function TracingPencilIcon({ size = 90 }: Props) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width="100%" height="100%" viewBox="0 0 240 240">
        <Path
          d="M60 195 Q120 225 180 195"
          stroke={colors.shadowStroke}
          strokeWidth={8}
          strokeDasharray="12 12"
          strokeLinecap="round"
          fill="none"
        />
        <Rect
          x="100"
          y="35"
          width="40"
          height="130"
          rx="8"
          fill={colors.marigold}
          stroke={colors.outline}
          strokeWidth={5}
          transform="rotate(18 120 120)"
        />
        <Rect
          x="100"
          y="35"
          width="40"
          height="20"
          rx="6"
          fill={colors.coral}
          stroke={colors.outline}
          strokeWidth={4}
          transform="rotate(18 120 120)"
        />
        <Polygon
          points="100,160 140,160 120,195"
          fill={colors.tan}
          stroke={colors.outline}
          strokeWidth={5}
          strokeLinejoin="round"
          transform="rotate(18 120 120)"
        />
      </Svg>
    </View>
  );
}
