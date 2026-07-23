import React from "react";
import { View } from "react-native";
import Svg, { Circle, Ellipse, Path } from "react-native-svg";
import { colors } from "../theme/theme";

interface Props {
  size?: number;
}

/** Two overlapping jigsaw pieces coming together -- used to represent the "Jigsaw" game. */
export default function JigsawPiecesIcon({ size = 90 }: Props) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width="100%" height="100%" viewBox="0 0 240 240">
        <Ellipse cx="130" cy="212" rx="65" ry="10" fill={colors.groundShadow} />
        <Path
          d="M40 60 L65 60 C65 44 105 44 105 60 L130 60 L130 85 C113 85 113 115 130 115 L130 140 L40 140 Z"
          fill={colors.teal}
          stroke={colors.outline}
          strokeWidth={5}
          strokeLinejoin="round"
        />
        <Path
          d="M90 100 L122 100 C122 80 168 80 168 100 L200 100 L200 130 C180 130 180 165 200 165 L200 200 L90 200 Z"
          fill={colors.coral}
          stroke={colors.outline}
          strokeWidth={6}
          strokeLinejoin="round"
        />
        <Circle cx="128" cy="158" r="7" fill={colors.white} />
        <Circle cx="163" cy="158" r="7" fill={colors.white} />
        <Circle cx="128" cy="160" r="4" fill={colors.navy} />
        <Circle cx="163" cy="160" r="4" fill={colors.navy} />
        <Path d="M127 182 Q145 192 163 182" stroke={colors.outline} strokeWidth={4} strokeLinecap="round" fill="none" />
        <Ellipse cx="112" cy="120" rx="12" ry="7" fill={colors.highlight} transform="rotate(-25 112 120)" />
      </Svg>
    </View>
  );
}
