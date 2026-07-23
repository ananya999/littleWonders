import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import ScreenBackground from "../components/ScreenBackground";
import PuzzleIllustration from "../components/PuzzleIllustration";
import { PUZZLE_CATEGORIES } from "../data/puzzleItems";
import { useProgress } from "../state/progress";
import { colors, radii, spacing, typography } from "../theme/theme";

type Props = NativeStackScreenProps<RootStackParamList, "PuzzleCategories">;

export default function PuzzleCategoriesScreen({ navigation }: Props) {
  const { puzzleStars } = useProgress();

  return (
    <ScreenBackground>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.popToTop()} hitSlop={12}>
          <Text style={styles.backLink}>«</Text>
        </Pressable>
        <Text style={styles.title}>Puzzles</Text>
        <Text style={styles.subtitle}>⭐ {puzzleStars} puzzle stars earned</Text>
      </View>

      <View style={styles.grid}>
        {PUZZLE_CATEGORIES.map((category) => (
          <Pressable
            key={category.id}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: category.color },
              pressed && styles.cardPressed,
            ]}
            onPress={() => navigation.navigate("PuzzleGame", { category: category.id })}
          >
            <View style={styles.iconWrap}>
              <PuzzleIllustration item={category.icon} tone="full" size={70} />
            </View>
            <Text style={styles.cardTitle}>{category.title}</Text>
          </Pressable>
        ))}
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
