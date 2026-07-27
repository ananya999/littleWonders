import React from "react";
import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import * as Haptics from "expo-haptics";
import { useTapSound } from "../hooks/useUiSounds";
import { colors, radii, spacing } from "../theme/theme";

interface Props {
  label: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
  size?: "large" | "medium" | "small";
  icon?: React.ReactNode;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  disabled?: boolean;
}

export default function BigButton({
  label,
  onPress,
  color = colors.coral,
  textColor = colors.white,
  size = "large",
  icon,
  style,
  labelStyle,
  disabled,
}: Props) {
  const playTap = useTapSound();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    playTap();
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        sizeStyles[size],
        { backgroundColor: disabled ? colors.skyBlue : color },
        pressed && !disabled ? styles.pressed : null,
        style,
      ]}
    >
      <View style={styles.content}>
        {icon}
        <Text
          style={[
            styles.label,
            { color: textColor },
            size === "small" && styles.labelSmall,
            labelStyle,
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const sizeStyles: Record<string, ViewStyle> = {
  large: { paddingVertical: spacing.lg, paddingHorizontal: spacing.xl },
  medium: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
  small: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.cardShadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.92,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  label: {
    fontSize: 19,
    fontFamily: "Fredoka_700Bold",
  },
  labelSmall: {
    fontSize: 15,
    fontFamily: "Fredoka_400Regular",
  },
});
