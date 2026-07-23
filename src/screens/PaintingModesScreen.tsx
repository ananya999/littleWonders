import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import ScreenBackground from "../components/ScreenBackground";
import PaintPaletteIcon from "../components/PaintPaletteIcon";
import TracingPencilIcon from "../components/TracingPencilIcon";
import { colors, radii, spacing, typography } from "../theme/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Painting">;

export default function PaintingModesScreen({ navigation }: Props) {
  return (
    <ScreenBackground>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.popToTop()} hitSlop={12}>
          <Text style={styles.backLink}>«</Text>
        </Pressable>
        <Text style={styles.title}>Painting</Text>
        <Text style={styles.subtitle}>Pick a way to play</Text>
      </View>

      <View style={styles.grid}>
        <Pressable
          style={({ pressed }) => [styles.card, { backgroundColor: colors.blush }, pressed && styles.cardPressed]}
          onPress={() => navigation.navigate("ActivityItemPicker", { activity: "coloring" })}
        >
          <View style={styles.iconWrap}>
            <PaintPaletteIcon size={70} />
          </View>
          <Text style={styles.cardTitle}>Coloring</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.card, { backgroundColor: colors.marigold }, pressed && styles.cardPressed]}
          onPress={() => navigation.navigate("ActivityItemPicker", { activity: "tracing" })}
        >
          <View style={styles.iconWrap}>
            <TracingPencilIcon size={70} />
          </View>
          <Text style={styles.cardTitle}>Tracing</Text>
        </Pressable>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
    gap: spacing.xs,
    marginBottom: spacing.lg,
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
  subtitle: {
    ...typography.caption,
    opacity: 0.7,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    rowGap: spacing.md,
  },
  card: {
    width: "47%",
    aspectRatio: 1,
    borderRadius: radii.lg,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    shadowColor: colors.cardShadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92,
  },
  iconWrap: {
    backgroundColor: colors.white,
    borderRadius: radii.pill,
    padding: spacing.sm,
  },
  cardTitle: {
    ...typography.title,
    fontSize: 18,
    color: colors.white,
  },
});
