import React, { useEffect, useMemo, useRef, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Haptics from "expo-haptics";
import { RootStackParamList } from "../navigation/types";
import ScreenBackground from "../components/ScreenBackground";
import BigButton from "../components/BigButton";
import PromptIllustration from "../components/PromptIllustration";
import ConfettiBurst from "../components/ConfettiBurst";
import { getSessionPrompts } from "../data/prompts";
import { CATEGORY_LABEL, RESPONSE_MODE_LABEL } from "../data/types";
import { useProgress } from "../state/progress";
import { colors, radii, spacing, typography } from "../theme/theme";
import { Sticker } from "../data/stickers";

type Props = NativeStackScreenProps<RootStackParamList, "StoryTime">;

type Step = "intro" | "prompt" | "complete";

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function StoryTimeScreen({ navigation }: Props) {
  const { completeStoryTime } = useProgress();
  const prompts = useMemo(() => getSessionPrompts(3), []);
  const [step, setStep] = useState<Step>("intro");
  const [promptIndex, setPromptIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(prompts[0]?.seconds ?? 60);
  const [result, setResult] = useState<{ sticker: Sticker; streak: number } | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentPrompt = prompts[promptIndex];

  useEffect(() => {
    if (step !== "prompt") return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [step, promptIndex]);

  const startSession = () => {
    setStep("prompt");
    setPromptIndex(0);
    setSecondsLeft(prompts[0]?.seconds ?? 60);
  };

  const goToNextPrompt = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    if (promptIndex + 1 < prompts.length) {
      const nextIndex = promptIndex + 1;
      setPromptIndex(nextIndex);
      setSecondsLeft(prompts[nextIndex].seconds);
    } else {
      const outcome = await completeStoryTime();
      setResult(outcome);
      setStep("complete");
    }
  };

  if (step === "intro") {
    return (
      <ScreenBackground>
        <View style={styles.centeredContainer}>
          <Image
            source={require("../../assets/brand/smiley-mascot.png")}
            style={styles.mascotLarge}
            resizeMode="contain"
          />
          <Text style={styles.introTitle}>Ready for your moment together?</Text>
          <Text style={styles.introBody}>
            You and your child will explore {prompts.length} playful questions. Read each one
            aloud, then talk, act, or draw the answer together.
          </Text>
          <BigButton label="Let's Go" onPress={startSession} color={colors.coral} style={styles.wideButton} />
          <BigButton
            label="Not right now"
            onPress={() => navigation.goBack()}
            color={colors.white}
            textColor={colors.navy}
            size="medium"
          />
        </View>
      </ScreenBackground>
    );
  }

  if (step === "complete" && result) {
    return (
      <ScreenBackground>
        <View style={styles.centeredContainer}>
          <Text style={styles.completeEmoji}>🎉</Text>
          <Text style={styles.introTitle}>Moment complete!</Text>
          <View style={styles.stickerCard}>
            <PromptIllustration scene={result.sticker.scene} size={140} />
            <Text style={styles.stickerLabel}>You earned: {result.sticker.label}</Text>
          </View>
          <Text style={styles.introBody}>
            {result.streak > 1
              ? `${result.streak} days in a row. Keep the streak going!`
              : "Great start! Come back tomorrow to keep your streak going."}
          </Text>
          <BigButton
            label="Back to Home"
            onPress={() => navigation.popToTop()}
            color={colors.teal}
            style={styles.wideButton}
          />
        </View>
        <ConfettiBurst />
      </ScreenBackground>
    );
  }

  if (!currentPrompt) return null;

  return (
    <ScreenBackground>
      <View style={styles.promptContainer}>
        <View style={styles.topRow}>
          <Text style={styles.categoryChip}>{CATEGORY_LABEL[currentPrompt.category]}</Text>
          <Text style={styles.timer}>⏱ {formatTime(secondsLeft)}</Text>
        </View>

        <View style={styles.illustrationWrap}>
          <PromptIllustration scene={currentPrompt.scene} size={200} />
        </View>

        <Text style={styles.parentLine}>{currentPrompt.parentLine}</Text>
        <Text style={styles.helperLine}>{currentPrompt.helperLine}</Text>
        <Text style={styles.modeBadge}>{RESPONSE_MODE_LABEL[currentPrompt.responseMode]}</Text>

        <BigButton
          label={promptIndex + 1 < prompts.length ? "We talked about it! →" : "Finish Moment 🎉"}
          onPress={goToNextPrompt}
          color={colors.coral}
          style={styles.wideButton}
        />
        <Text style={styles.progressText}>
          {promptIndex + 1} of {prompts.length}
        </Text>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  mascotLarge: {
    width: 150,
    height: 150,
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
  wideButton: {
    width: "100%",
    marginTop: spacing.sm,
  },
  promptContainer: {
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
  },
  categoryChip: {
    ...typography.caption,
    backgroundColor: colors.blush,
    color: colors.white,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
    overflow: "hidden",
  },
  timer: {
    ...typography.caption,
  },
  illustrationWrap: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  parentLine: {
    ...typography.title,
    fontSize: 21,
    textAlign: "center",
  },
  helperLine: {
    ...typography.body,
    fontSize: 15,
    textAlign: "center",
    opacity: 0.7,
    fontStyle: "italic",
  },
  modeBadge: {
    ...typography.caption,
    color: colors.teal,
  },
  progressText: {
    ...typography.caption,
    opacity: 0.6,
  },
  completeEmoji: {
    fontSize: 56,
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
});
