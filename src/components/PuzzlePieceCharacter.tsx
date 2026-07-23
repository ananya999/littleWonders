import React from "react";
import { View } from "react-native";
import Svg, { Circle, Ellipse, Path } from "react-native-svg";
import { colors } from "../theme/theme";

interface Props {
  size?: number;
}

/** A single friendly jigsaw-piece character -- used to represent the "Puzzles" game. */
export default function PuzzlePieceCharacter({ size = 90 }: Props) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width="100%" height="100%" viewBox="0 0 240 240">
        <Ellipse cx="120" cy="205" rx="55" ry="10" fill={colors.groundShadow} />
        <Path
          d="M60 60 L95 60 C95 35 145 35 145 60 L180 60 L180 95 C155 95 155 145 180 145 L180 180 L60 180 Z"
          fill={colors.skyBlue}
          stroke={colors.outline}
          strokeWidth={6}
          strokeLinejoin="round"
        />
        <Circle cx="100" cy="122" r="8" fill={colors.white} />
        <Circle cx="140" cy="122" r="8" fill={colors.white} />
        <Circle cx="100" cy="124" r="4.5" fill={colors.navy} />
        <Circle cx="140" cy="124" r="4.5" fill={colors.navy} />
        <Path d="M100 152 Q120 164 140 152" stroke={colors.outline} strokeWidth={4} strokeLinecap="round" fill="none" />
        <Ellipse cx="85" cy="90" rx="14" ry="8" fill={colors.highlight} transform="rotate(-25 85 90)" />
      </Svg>
    </View>
  );
}
