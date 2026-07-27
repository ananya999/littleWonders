import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Haptics from "expo-haptics";
import { RootStackParamList } from "../navigation/types";
import ScreenBackground from "../components/ScreenBackground";
import BigButton from "../components/BigButton";
import PuzzleIllustration from "../components/PuzzleIllustration";
import MemoryCardBack from "../components/MemoryCardBack";
import ConfettiBurst from "../components/ConfettiBurst";
import PauseButton from "../components/PauseButton";
import PauseOverlay from "../components/PauseOverlay";
import PromptIllustration from "../components/PromptIllustration";
import { MEMORY_LEVELS } from "../data/memoryLevels";
import { PUZZLE_ITEMS } from "../data/puzzleItems";
import { PuzzleItemId } from "../data/puzzleTypes";
import { Sticker } from "../data/stickers";
import { usePuzzleSounds } from "../hooks/usePuzzleSounds";
import { useProgress } from "../state/progress";
import { colors, gradientPastels, radii, spacing, typography } from "../theme/theme";

type Props = NativeStackScreenProps<RootStackParamList, "MemoryGame">;

interface CardState {
  key: string;
  itemId: PuzzleItemId;
  backColor: string;
  matched: boolean;
}

function shuffle<T>(list: T[]): T[] {
  return [...list].sort(() => Math.random() - 0.5);
}

function buildDeck(pairs: number): CardState[] {
  const items = shuffle(PUZZLE_ITEMS).slice(0, pairs);
  const doubled = items.flatMap((item) => [
    { key: `${item.id}-a`, itemId: item.id, matched: false },
    { key: `${item.id}-b`, itemId: item.id, matched: false },
  ]);
  // Assign card-back colors by shuffled position (not by item), so the back
  // never hints at which cards match.
  return shuffle(doubled).map((card, i) => ({ ...card, backColor: gradientPastels[i % gradientPastels.length] }));
}

export default function MemoryGameScreen({ navigation, route }: Props) {
  const { levelId } = route.params;
  const level = MEMORY_LEVELS.find((l) => l.id === levelId)!;
  const { completeMemoryLevel } = useProgress();
  const { play: playItemSound } = usePuzzleSounds();
  const { width } = useWindowDimensions();

  const [cards, setCards] = useState<CardState[]>(() => buildDeck(level.pairs));
  const [flippedKeys, setFlippedKeys] = useState<string[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [busy, setBusy] = useState(false);
  const [paused, setPaused] = useState(false);
  const [complete, setComplete] = useState(false);
  const [sticker, setSticker] = useState<Sticker | null>(null);

  const gap = spacing.sm;
  const boardWidth = Math.min(width - spacing.lg * 2, 480);
  const tileSize = Math.floor((boardWidth - gap * (level.columns - 1)) / level.columns);

  useEffect(() => {
    if (matchedCount > 0 && matchedCount === level.pairs && !complete) {
      completeMemoryLevel().then(({ sticker: earned }) => {
        setSticker(earned);
        setComplete(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedCount]);

  const onNewGame = () => {
    setCards(buildDeck(level.pairs));
    setFlippedKeys([]);
    setMatchedCount(0);
    setMoves(0);
    setBusy(false);
    setComplete(false);
    setSticker(null);
  };

  const goToLevels = () => navigation.goBack();

  const onTapCard = (key: string) => {
    if (busy || paused || complete) return;
    const card = cards.find((c) => c.key === key);
    if (!card || card.matched || flippedKeys.includes(key)) return;
    if (flippedKeys.length >= 2) return;

    const nextFlipped = [...flippedKeys, key];
    setFlippedKeys(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [aKey, bKey] = nextFlipped;
      const a = cards.find((c) => c.key === aKey)!;
      const b = cards.find((c) => c.key === bKey)!;

      if (a.itemId === b.itemId) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
        playItemSound(a.itemId);
        setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.key === aKey || c.key === bKey ? { ...c, matched: true } : c)));
          setFlippedKeys([]);
          setMatchedCount((m) => m + 1);
        }, 500);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
        setBusy(true);
        setTimeout(() => {
          setFlippedKeys([]);
          setBusy(false);
        }, 900);
      }
    }
  };

  if (complete) {
    return (
      <ScreenBackground>
        <View style={styles.centered}>
          <Text style={styles.completeEmoji}>⭐</Text>
          <Text style={styles.introTitle}>{level.label} complete!</Text>
          <Text style={styles.introBody}>
            You found all {level.pairs} pairs in {moves} tries.
          </Text>
          {sticker ? (
            <View style={styles.stickerCard}>
              <PromptIllustration scene={sticker.scene} size={120} />
              <Text style={styles.stickerLabel}>You earned: {sticker.label}</Text>
            </View>
          ) : null}
          <BigButton label="Play Again" onPress={onNewGame} color={level.color} style={styles.wideButton} />
          <BigButton
            label="Back to Levels"
            onPress={goToLevels}
            color={colors.white}
            textColor={colors.navy}
            size="medium"
          />
        </View>
        <ConfettiBurst />
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Pressable onPress={goToLevels} hitSlop={12}>
            <Text style={styles.backLink}>‹ {level.label}</Text>
          </Pressable>
          <View style={styles.topRowRight}>
            <PauseButton onPress={() => setPaused(true)} />
            <Text style={styles.progressText}>
              {matchedCount} of {level.pairs}
            </Text>
          </View>
        </View>

        <Text style={styles.hint}>Find the matching pairs!</Text>

        <View style={[styles.board, { width: boardWidth }]}>
          {cards.map((card) => {
            const isFlipped = card.matched || flippedKeys.includes(card.key);
            return (
              <Pressable
                key={card.key}
                onPress={() => onTapCard(card.key)}
                style={({ pressed }) => [
                  styles.tile,
                  { width: tileSize, height: tileSize },
                  pressed && !isFlipped && styles.tilePressed,
                ]}
              >
                {isFlipped ? (
                  <PuzzleIllustration item={card.itemId} tone="full" size={tileSize} />
                ) : (
                  <MemoryCardBack size={tileSize} color={card.backColor} />
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
      {paused && <PauseOverlay onResume={() => setPaused(false)} onHome={() => navigation.popToTop()} />}
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.md,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  topRowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  backLink: {
    ...typography.body,
    color: colors.coral,
    fontWeight: "700",
  },
  progressText: {
    ...typography.caption,
    opacity: 0.7,
  },
  hint: {
    ...typography.caption,
    opacity: 0.6,
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: spacing.sm,
  },
  tile: {
    borderRadius: radii.md,
    alignItems: "center",
    justifyContent: "center",
  },
  tilePressed: {
    transform: [{ scale: 0.94 }],
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  completeEmoji: {
    fontSize: 56,
  },
  introTitle: {
    ...typography.title,
    textAlign: "center",
  },
  introBody: {
    ...typography.body,
    textAlign: "center",
    opacity: 0.8,
  },
  stickerCard: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: "center",
    gap: spacing.sm,
  },
  stickerLabel: {
    ...typography.caption,
    fontSize: 16,
  },
  wideButton: {
    width: "100%",
    marginTop: spacing.sm,
  },
});
