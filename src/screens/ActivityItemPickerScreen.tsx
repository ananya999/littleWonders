import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityKind, RootStackParamList } from "../navigation/types";
import ScreenBackground from "../components/ScreenBackground";
import PuzzleIllustration from "../components/PuzzleIllustration";
import { getCategoryItems, PUZZLE_CATEGORIES } from "../data/puzzleItems";
import { PuzzleItemId } from "../data/puzzleTypes";
import { colors, radii, spacing, typography } from "../theme/theme";

type Props = NativeStackScreenProps<RootStackParamList, "ActivityItemPicker">;

const ACTIVITY_LABEL: Record<ActivityKind, string> = {
  coloring: "Coloring",
  tracing: "Tracing",
  jigsaw: "Jigsaw",
};

export default function ActivityItemPickerScreen({ navigation, route }: Props) {
  const { activity } = route.params;

  const onPick = (itemId: PuzzleItemId) => {
    if (activity === "jigsaw") {
      navigation.navigate("JigsawGame", { itemId });
    } else {
      navigation.navigate("PaintingActivity", { mode: activity, itemId });
    }
  };

  return (
    <ScreenBackground>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.backLink}>«</Text>
        </Pressable>
        <Text style={styles.title}>{ACTIVITY_LABEL[activity]}</Text>
        <Text style={styles.subtitle}>Pick a picture</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {PUZZLE_CATEGORIES.map((category) => (
          <View key={category.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{category.title}</Text>
            <View style={styles.itemsRow}>
              {getCategoryItems(category.id).map((item) => (
                <Pressable
                  key={item.id}
                  style={({ pressed }) => [styles.itemCard, pressed && styles.itemPressed]}
                  onPress={() => onPick(item.id)}
                >
                  <PuzzleIllustration item={item.id} tone="full" size={56} />
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
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
  subtitle: {
    ...typography.caption,
    opacity: 0.7,
  },
  scroll: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  section: {
    gap: spacing.sm,
  },
  sectionTitle: {
    ...typography.title,
    fontSize: 17,
  },
  itemsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  itemCard: {
    width: 68,
    height: 68,
    backgroundColor: colors.white,
    borderRadius: radii.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: colors.cardShadow,
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  itemPressed: {
    transform: [{ scale: 0.94 }],
    borderColor: colors.teal,
  },
});
