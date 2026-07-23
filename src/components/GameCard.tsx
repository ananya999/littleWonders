import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, spacing, typography } from "../theme/theme";

interface Props {
  title: string;
  subtitle: string;
  color: string;
  onPress: () => void;
  icon: React.ReactNode;
}

export default function GameCard({ title, subtitle, color, onPress, icon }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: color },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.iconWrap}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    gap: spacing.xs,
    minHeight: 190,
    justifyContent: "center",
    shadowColor: colors.cardShadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.92,
  },
  iconWrap: {
    backgroundColor: colors.white,
    borderRadius: radii.pill,
    padding: spacing.sm,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.title,
    fontSize: 19,
    color: colors.white,
    textAlign: "center",
  },
  subtitle: {
    ...typography.caption,
    color: colors.white,
    opacity: 0.9,
    textAlign: "center",
  },
});
