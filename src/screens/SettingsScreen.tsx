import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import ScreenBackground from "../components/ScreenBackground";
import BigButton from "../components/BigButton";
import { useProgress } from "../state/progress";
import { colors, radii, spacing, typography } from "../theme/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

export default function SettingsScreen({ navigation }: Props) {
  const { resetProgress } = useProgress();
  const [confirmingReset, setConfirmingReset] = useState(false);

  return (
    <ScreenBackground>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.popToTop()} hitSlop={12}>
          <Text style={styles.backLink}>«</Text>
        </Pressable>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>About TinyFest</Text>
          <Text style={styles.cardBody}>
            TinyFest gives you one playful prompt at a time so five minutes of screen time
            becomes five minutes of real conversation with your child.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Reset progress</Text>
          <Text style={styles.cardBody}>
            This clears your streak and sticker collection. This cannot be undone.
          </Text>
          {confirmingReset ? (
            <View style={styles.confirmRow}>
              <BigButton
                label="Yes, reset"
                onPress={() => {
                  resetProgress();
                  setConfirmingReset(false);
                }}
                color={colors.coral}
                size="medium"
                style={styles.confirmButton}
              />
              <BigButton
                label="Cancel"
                onPress={() => setConfirmingReset(false)}
                color={colors.white}
                textColor={colors.navy}
                size="medium"
                style={styles.confirmButton}
              />
            </View>
          ) : (
            <BigButton
              label="Reset Progress"
              onPress={() => setConfirmingReset(true)}
              color={colors.skyBlue}
              textColor={colors.navy}
              size="medium"
            />
          )}
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  backLink: {
    ...typography.body,
    color: colors.coral,
    fontWeight: "700",
  },
  title: {
    ...typography.display,
    fontSize: 28,
  },
  body: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  cardTitle: {
    ...typography.title,
    fontSize: 18,
  },
  cardBody: {
    ...typography.body,
    fontSize: 15,
    opacity: 0.8,
  },
  confirmRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  confirmButton: {
    flex: 1,
  },
});
