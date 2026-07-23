import React, { useEffect, useRef } from "react";
import { Animated, Easing, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import ScreenBackground from "../components/ScreenBackground";
import BigButton from "../components/BigButton";
import GameCard from "../components/GameCard";
import PopIn from "../components/PopIn";
import PromptIllustration from "../components/PromptIllustration";
import PuzzlePieceCharacter from "../components/PuzzlePieceCharacter";
import PaintPaletteIcon from "../components/PaintPaletteIcon";
import JigsawPiecesIcon from "../components/JigsawPiecesIcon";
import { useProgress } from "../state/progress";
import { colors, radii, spacing, typography } from "../theme/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { completedToday, earnedStickerIds, puzzleStars } = useProgress();
  const bounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, { toValue: 1, duration: 1400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(bounce, { toValue: 0, duration: 1400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [bounce]);

  const logoTranslateY = bounce.interpolate({ inputRange: [0, 1], outputRange: [0, -10] });

  return (
    <ScreenBackground>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Animated.Image
          source={require("../../assets/brand/smiley-logo.png")}
          style={[styles.logo, { transform: [{ translateY: logoTranslateY }] }]}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>Play. Ask. Giggle. Together.</Text>

        <View style={styles.cardsGrid}>
          <PopIn style={styles.cardWrap} delay={0}>
            <GameCard
              title="Story Time"
              subtitle={completedToday ? "Done for today!" : "Today's 5-min moment"}
              color={colors.coral}
              icon={<PromptIllustration scene="bird-hat" size={70} />}
              onPress={() => navigation.navigate("StoryTime")}
            />
          </PopIn>
          <PopIn style={styles.cardWrap} delay={80}>
            <GameCard
              title="Puzzles"
              subtitle="Cars · Fruits · Veggies"
              color={colors.teal}
              icon={<PuzzlePieceCharacter size={70} />}
              onPress={() => navigation.navigate("PuzzleCategories")}
            />
          </PopIn>
          <PopIn style={styles.cardWrap} delay={160}>
            <GameCard
              title="Painting"
              subtitle="Color & Trace"
              color={colors.blush}
              icon={<PaintPaletteIcon size={70} />}
              onPress={() => navigation.navigate("Painting")}
            />
          </PopIn>
          <PopIn style={styles.cardWrap} delay={240}>
            <GameCard
              title="Jigsaw"
              subtitle="Piece it together"
              color={colors.purple}
              icon={<JigsawPiecesIcon size={70} />}
              onPress={() => navigation.navigate("ActivityItemPicker", { activity: "jigsaw" })}
            />
          </PopIn>
        </View>

        <View style={styles.secondaryRow}>
          <BigButton
            label={`Stickers ${earnedStickerIds.length}`}
            onPress={() => navigation.navigate("StickerBook")}
            color={colors.blush}
            size="small"
            style={styles.secondaryButton}
          />
          <BigButton
            label={`Stars ${puzzleStars}`}
            onPress={() => navigation.navigate("PuzzleCategories")}
            color={colors.marigold}
            size="small"
            style={styles.secondaryButton}
          />
          <BigButton
            label="Settings"
            onPress={() => navigation.navigate("ParentGate", { destination: "Settings" })}
            color={colors.skyBlue}
            textColor={colors.navy}
            size="small"
            style={styles.secondaryButton}
          />
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  logo: {
    width: 220,
    height: 220,
  },
  tagline: {
    ...typography.body,
    color: colors.navy,
    opacity: 0.75,
  },
  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: spacing.md,
    width: "100%",
  },
  cardWrap: {
    width: "47%",
  },
  secondaryRow: {
    flexDirection: "row",
    gap: spacing.sm,
    width: "100%",
  },
  secondaryButton: {
    flex: 1,
  },
});
