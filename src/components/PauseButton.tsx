import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radii } from "../theme/theme";

interface Props {
  onPress: () => void;
}

export default function PauseButton({ onPress }: Props) {
  return (
    <Pressable onPress={onPress} hitSlop={12} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Text style={styles.icon}>⏸</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.cardShadow,
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  pressed: {
    transform: [{ scale: 0.94 }],
  },
  icon: {
    fontSize: 18,
    color: colors.navy,
  },
});
