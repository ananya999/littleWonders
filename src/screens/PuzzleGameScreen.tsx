import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Haptics from "expo-haptics";
import { RootStackParamList } from "../navigation/types";
import ScreenBackground from "../components/ScreenBackground";
import BigButton from "../components/BigButton";
import PuzzleIllustration from "../components/PuzzleIllustration";
import ConfettiBurst from "../components/ConfettiBurst";
import PauseButton from "../components/PauseButton";
import PauseOverlay from "../components/PauseOverlay";
import { buildRounds, PUZZLE_CATEGORIES } from "../data/puzzleItems";
import { PuzzleItemId } from "../data/puzzleTypes";
import { usePuzzleSounds } from "../hooks/usePuzzleSounds";
import { useProgress } from "../state/progress";
import { colors, radii, spacing, typography } from "../theme/theme";

type Props = NativeStackScreenProps<RootStackParamList, "PuzzleGame">;

type Phase = "playing" | "complete";

export default function PuzzleGameScreen({ navigation, route }: Props) {
  const { category } = route.params;
  const { completePuzzleCategory } = useProgress();
  const meta = PUZZLE_CATEGORIES.find((c) => c.id === category)!;

  const [rounds, setRounds] = useState(() => buildRounds(category));
  const [roundIndex, setRoundIndex] = useState(0);
  const [solved, setSolved] = useState(false);
  const [wrongId, setWrongId] = useState<PuzzleItemId | null>(null);
  const [phase, setPhase] = useState<Phase>("playing");
  const [stars, setStars] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const { play: playMatchSound } = usePuzzleSounds();
  const { width } = useWindowDimensions();
  const isTablet = width >= 700;
  const frameSize = isTablet ? 320 : Math.min(width * 0.5, 200);
  const optionSize = isTablet ? 130 : 80;
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const round = rounds[roundIndex];

  useEffect(() => {
    if (solved) {
      bounceAnim.setValue(1);
      Animated.sequence([
        Animated.timing(bounceAnim, { toValue: 1.18, duration: 160, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.spring(bounceAnim, { toValue: 1, friction: 4, useNativeDriver: true }),
      ]).start();
    }
  }, [solved, bounceAnim]);

  useEffect(() => {
    if (wrongId) {
      shakeAnim.setValue(0);
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 1, duration: 55, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -1, duration: 55, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 1, duration: 55, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 55, useNativeDriver: true }),
      ]).start();
    }
  }, [wrongId, shakeAnim]);

  const shakeTranslate = shakeAnim.interpolate({ inputRange: [-1, 0, 1], outputRange: [-8, 0, 8] });

  const onPickOption = (optionId: PuzzleItemId) => {
    if (solved || paused) return;
    if (optionId === round.target.id) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      playMatchSound(optionId);
      setSolved(true);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
      setWrongId(optionId);
      setTimeout(() => setWrongId(null), 500);
    }
  };

  const onNext = async () => {
    if (roundIndex + 1 < rounds.length) {
      setRoundIndex(roundIndex + 1);
      setSolved(false);
    } else {
      const outcome = await completePuzzleCategory();
      setStars(outcome.puzzleStars);
      setPhase("complete");
    }
  };

  const onPlayAgain = () => {
    setRounds(buildRounds(category));
    setRoundIndex(0);
    setSolved(false);
    setPhase("playing");
  };

  if (phase === "complete") {
    return (
      <ScreenBackground>
        <View style={styles.centered}>
          <Text style={styles.completeEmoji}>⭐</Text>
          <Text style={styles.introTitle}>{meta.title} puzzle complete!</Text>
          <Text style={styles.introBody}>
            {stars !== null ? `You've earned ${stars} puzzle star${stars === 1 ? "" : "s"} in total.` : ""}
          </Text>
          <BigButton label="Play Again" onPress={onPlayAgain} color={meta.color} style={styles.wideButton} />
          <BigButton
            label="Back to Puzzles"
            onPress={() => navigation.goBack()}
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
          <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
            <Text style={styles.backLink}>‹ {meta.title}</Text>
          </Pressable>
          <View style={styles.topRowRight}>
            <PauseButton onPress={() => setPaused(true)} />
            <Text style={styles.progressText}>
              {roundIndex + 1} of {rounds.length}
            </Text>
          </View>
        </View>

        <View style={styles.topSection}>
          <Text style={styles.prompt}>Which one matches the shape?</Text>

          <View style={[styles.frame, { borderColor: meta.color }]}>
            <PuzzleIllustration item={round.target.id} tone={solved ? "full" : "silhouette"} size={frameSize} />
          </View>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.optionsRow}>
            {round.options.map((option) => {
              const isWrong = wrongId === option.id;
              const isCorrectSolved = solved && option.id === round.target.id;
              return (
                <Pressable
                  key={option.id}
                  onPress={() => onPickOption(option.id)}
                  style={({ pressed }) => [
                    styles.optionCard,
                    isWrong && styles.optionWrong,
                    isCorrectSolved && styles.optionCorrect,
                    pressed && !solved && styles.optionPressed,
                  ]}
                >
                  <Animated.View
                    style={{
                      transform: [
                        { scale: isCorrectSolved ? bounceAnim : 1 },
                        { translateX: isWrong ? shakeTranslate : 0 },
                      ],
                    }}
                  >
                    <PuzzleIllustration item={option.id} tone="full" size={optionSize} />
                  </Animated.View>
                </Pressable>
              );
            })}
          </View>

          {solved ? (
            <BigButton
              label={roundIndex + 1 < rounds.length ? "Yay! Next →" : "Finish Puzzle ⭐"}
              onPress={onNext}
              color={meta.color}
              style={styles.wideButton}
            />
          ) : (
            <Text style={styles.hint}>Tap the picture that matches the gray shape</Text>
          )}
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
    paddingBottom: spacing.lg,
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
  topSection: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },
  bottomSection: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
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
  prompt: {
    ...typography.title,
    fontSize: 20,
    textAlign: "center",
  },
  frame: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    borderWidth: 4,
    borderStyle: "dashed",
    padding: spacing.md,
  },
  optionsRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  optionCard: {
    backgroundColor: colors.white,
    borderRadius: radii.md,
    padding: spacing.sm,
    borderWidth: 3,
    borderColor: "transparent",
  },
  optionPressed: {
    transform: [{ scale: 0.95 }],
  },
  optionWrong: {
    borderColor: colors.coral,
  },
  optionCorrect: {
    borderColor: colors.teal,
  },
  hint: {
    ...typography.caption,
    opacity: 0.6,
  },
  wideButton: {
    width: "100%",
    marginTop: spacing.sm,
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
});
