import React from "react";
import { View } from "react-native";
import Svg, { Circle, Rect } from "react-native-svg";
import { colors } from "../theme/theme";

interface Props {
  size?: number;
}

export default function MemoryCardsIcon({ size = 90 }: Props) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width="100%" height="100%" viewBox="0 0 240 240">
        <Rect
          x="35"
          y="55"
          width="80"
          height="110"
          rx="14"
          fill={colors.marigold}
          stroke={colors.outline}
          strokeWidth={5}
          transform="rotate(-10 75 110)"
        />
        <Circle cx="75" cy="110" r="18" fill={colors.white} transform="rotate(-10 75 110)" />
        <Rect
          x="125"
          y="55"
          width="80"
          height="110"
          rx="14"
          fill={colors.teal}
          stroke={colors.outline}
          strokeWidth={5}
          transform="rotate(10 165 110)"
        />
        <Circle cx="165" cy="110" r="18" fill={colors.white} transform="rotate(10 165 110)" />
      </Svg>
    </View>
  );
}
