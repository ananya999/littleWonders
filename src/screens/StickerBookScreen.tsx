import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import ScreenBackground from "../components/ScreenBackground";
import PromptIllustration from "../components/PromptIllustration";
import { STICKERS } from "../data/stickers";
import { useProgress } from "../state/progress";
import { colors, radii, spacing, typography } from "../theme/theme";

type Props = NativeStackScreenProps<RootStackParamList, "StickerBook">;

export default function StickerBookScreen({ navigation }: Props) {
  const { earnedStickerIds } = useProgress();

  return (
    <ScreenBackground>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.backLink}>«</Text>
        </Pressable>
        <Text style={styles.title}>Sticker Book</Text>
        <Text style={styles.subtitle}>
          {earnedStickerIds.length} of {STICKERS.length} collected
        </Text>
      </View>

      <FlatList
        data={STICKERS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => {
          const earned = earnedStickerIds.includes(item.id);
          return (
            <View style={[styles.card, !earned && styles.cardLocked]}>
              {earned ? (
                <PromptIllustration scene={item.scene} size={110} />
              ) : (
                <Text style={styles.lockEmoji}>🔒</Text>
              )}
              <Text style={styles.cardLabel}>{earned ? item.label : "???"}</Text>
            </View>
          );
        }}
      />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
    gap: spacing.xs,
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
    marginBottom: spacing.sm,
  },
  grid: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  row: {
    gap: spacing.md,
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.md,
    alignItems: "center",
    gap: spacing.xs,
    minHeight: 160,
    justifyContent: "center",
  },
  cardLocked: {
    opacity: 0.55,
  },
  lockEmoji: {
    fontSize: 40,
  },
  cardLabel: {
    ...typography.caption,
    textAlign: "center",
  },
});
