import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BigButton from "./BigButton";
import { colors, radii, spacing, typography } from "../theme/theme";

interface Props {
  onResume: () => void;
  onHome: () => void;
}

/** Full-screen pause scrim. The outer Pressable (no-op onPress) blocks taps from reaching the paused game underneath. */
export default function PauseOverlay({ onResume, onHome }: Props) {
  return (
    <Pressable style={styles.scrim} onPress={() => {}}>
      <View style={styles.card}>
        <Text style={styles.emoji}>⏸</Text>
        <Text style={styles.title}>Paused</Text>
        <BigButton
          label="▶ Resume"
          onPress={onResume}
          color={colors.teal}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        />
        <BigButton
          label="Back to Home"
          onPress={onHome}
          color={colors.white}
          textColor={colors.navy}
          size="medium"
          style={styles.button}
          labelStyle={styles.buttonLabel}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(38, 34, 74, 0.6)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.xl,
    alignItems: "center",
    gap: spacing.md,
    width: "78%",
  },
  emoji: {
    fontSize: 40,
  },
  title: {
    ...typography.title,
    fontFamily: "Fredoka_400Regular",
  },
  button: {
    width: "100%",
  },
  buttonLabel: {
    fontFamily: "Fredoka_400Regular",
  },
});
