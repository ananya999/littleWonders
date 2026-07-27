import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Haptics from "expo-haptics";
import { RootStackParamList } from "../navigation/types";
import ScreenBackground from "../components/ScreenBackground";
import BigButton from "../components/BigButton";
import PuzzleIllustration from "../components/PuzzleIllustration";
import ConfettiBurst from "../components/ConfettiBurst";
import PauseButton from "../components/PauseButton";
import PauseOverlay from "../components/PauseOverlay";
import { PUZZLE_ITEMS } from "../data/puzzleItems";
import { colors, radii, spacing, typography } from "../theme/theme";

type Props = NativeStackScreenProps<RootStackParamList, "JigsawGame">;

const GRID = 2;
const PIECE = 110;
const FULL = PIECE * GRID;

function shuffledOrder(): number[] {
  const identity = Array.from({ length: GRID * GRID }, (_, i) => i);
  let arr = identity;
  do {
    arr = [...identity].sort(() => Math.random() - 0.5);
  } while (arr.every((v, i) => v === i));
  return arr;
}

export default function JigsawGameScreen({ navigation, route }: Props) {
  const { itemId } = route.params;
  const item = PUZZLE_ITEMS.find((i) => i.id === itemId)!;

  const [order, setOrder] = useState<number[]>(() => shuffledOrder());
  const [selected, setSelected] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const [paused, setPaused] = useState(false);

  const onTapSlot = (slot: number) => {
    if (solved || paused) return;
    if (selected === null) {
      setSelected(slot);
      return;
    }
    if (selected === slot) {
      setSelected(null);
      return;
    }
    const next = [...order];
    [next[selected], next[slot]] = [next[slot], next[selected]];
    setOrder(next);
    setSelected(null);
    if (next.every((v, i) => v === i)) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      setSolved(true);
    }
  };

  const onPlayAgain = () => {
    setOrder(shuffledOrder());
    setSelected(null);
    setSolved(false);
  };

  const goToPicker = () => navigation.goBack();

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Pressable onPress={goToPicker} hitSlop={12}>
            <Text style={styles.backLink}>‹ Jigsaw</Text>
          </Pressable>
          <View style={styles.topRowRight}>
            <PauseButton onPress={() => setPaused(true)} />
            <Text style={styles.itemLabel}>{item.label}</Text>
          </View>
        </View>

        <Text style={styles.hint}>{solved ? "You did it!" : "Tap two pieces to swap them"}</Text>

        <View style={styles.board}>
          {order.map((piece, slot) => {
            const origRow = Math.floor(piece / GRID);
            const origCol = piece % GRID;
            const isSelected = selected === slot;
            return (
              <Pressable
                key={slot}
                onPress={() => onTapSlot(slot)}
                style={[styles.pieceWrap, isSelected && styles.pieceSelected]}
              >
                <View style={{ width: FULL, height: FULL, position: "absolute", left: -origCol * PIECE, top: -origRow * PIECE }}>
                  <PuzzleIllustration item={itemId} tone="full" size={FULL} />
                </View>
              </Pressable>
            );
          })}
        </View>

        {solved ? (
          <View style={styles.actionsRow}>
            <BigButton label="Play Again" onPress={onPlayAgain} color={colors.purple} size="medium" style={styles.actionButton} />
            <BigButton label="New Picture" onPress={goToPicker} color={colors.marigold} size="medium" style={styles.actionButton} />
          </View>
        ) : null}
      </View>
      {solved && <ConfettiBurst />}
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
    width: "100%",
    alignItems: "center",
  },
  backLink: {
    ...typography.body,
    color: colors.coral,
    fontWeight: "700",
  },
  topRowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  itemLabel: {
    ...typography.title,
    fontSize: 20,
  },
  hint: {
    ...typography.caption,
    opacity: 0.7,
  },
  board: {
    width: FULL,
    height: FULL,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: colors.white,
    borderRadius: radii.md,
    overflow: "hidden",
  },
  pieceWrap: {
    width: PIECE,
    height: PIECE,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.cream,
  },
  pieceSelected: {
    borderColor: colors.teal,
    borderWidth: 4,
  },
  actionsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    width: "100%",
    marginTop: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
});
