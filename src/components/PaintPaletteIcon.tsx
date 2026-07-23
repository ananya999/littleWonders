import React from "react";
import { View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { colors } from "../theme/theme";

interface Props {
  size?: number;
}

export default function PaintPaletteIcon({ size = 90 }: Props) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width="100%" height="100%" viewBox="0 0 240 240">
        <Path
          d="M120 40 C60 40 30 85 30 130 C30 165 55 175 75 165 C90 158 100 168 100 182 C100 205 118 210 130 200 C185 195 210 155 210 120 C210 70 175 40 120 40 Z"
          fill={colors.cream}
          stroke={colors.outline}
          strokeWidth={6}
          strokeLinejoin="round"
        />
        <Circle cx="80" cy="95" r="16" fill={colors.coral} stroke={colors.outline} strokeWidth={3} />
        <Circle cx="135" cy="80" r="16" fill={colors.marigold} stroke={colors.outline} strokeWidth={3} />
        <Circle cx="180" cy="115" r="16" fill={colors.teal} stroke={colors.outline} strokeWidth={3} />
        <Circle cx="165" cy="165" r="16" fill={colors.purple} stroke={colors.outline} strokeWidth={3} />
        <Circle cx="60" cy="140" r="14" fill={colors.skyBlue} stroke={colors.outline} strokeWidth={3} />
      </Svg>
    </View>
  );
}
