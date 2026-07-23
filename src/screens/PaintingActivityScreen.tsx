import React, { useEffect, useRef, useState } from "react";
import { Animated, PanResponder, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import ScreenBackground from "../components/ScreenBackground";
import BigButton from "../components/BigButton";
import PuzzleIllustration from "../components/PuzzleIllustration";
import ConfettiBurst from "../components/ConfettiBurst";
import { PUZZLE_ITEMS } from "../data/puzzleItems";
import { colors, radii, spacing, typography } from "../theme/theme";

type Props = NativeStackScreenProps<RootStackParamList, "PaintingActivity">;

const PALETTE = [
  colors.coral,
  colors.marigold,
  colors.teal,
  colors.skyBlue,
  colors.blush,
  colors.purple,
  colors.brown,
  colors.navy,
];

const CANVAS_SIZE = 240;

interface Point {
  x: number;
  y: number;
}

function pathFromPoints(points: Point[]): string {
  if (points.length === 0) return "";
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");
}

export default function PaintingActivityScreen({ navigation, route }: Props) {
  const { mode, itemId } = route.params;
  const item = PUZZLE_ITEMS.find((i) => i.id === itemId)!;

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [penColor, setPenColor] = useState<string>(colors.coral);
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const [traced, setTraced] = useState(false);
  const currentStroke = useRef<Point[]>([]);
  const popAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (selectedColor) {
      popAnim.setValue(0.85);
      Animated.spring(popAnim, { toValue: 1, friction: 4, useNativeDriver: true }).start();
    }
  }, [selectedColor, popAnim]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        currentStroke.current = [{ x: locationX, y: locationY }];
        setStrokes((prev) => [...prev, currentStroke.current]);
      },
      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        currentStroke.current = [...currentStroke.current, { x: locationX, y: locationY }];
        setStrokes((prev) => {
          const next = prev.slice(0, -1);
          next.push(currentStroke.current);
          return next;
        });
      },
    })
  ).current;

  const goToPicker = () => navigation.goBack();

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Pressable onPress={goToPicker} hitSlop={12}>
            <Text style={styles.backLink}>‹ {mode === "coloring" ? "Coloring" : "Tracing"}</Text>
          </Pressable>
          <Text style={styles.itemLabel}>{item.label}</Text>
        </View>

        {mode === "coloring" ? (
          <>
            <View style={styles.previewWrap}>
              <Animated.View style={{ transform: [{ scale: popAnim }] }}>
                <PuzzleIllustration
                  item={itemId}
                  tone={selectedColor ? "full" : "silhouette"}
                  tintColor={selectedColor ?? undefined}
                  size={CANVAS_SIZE}
                />
              </Animated.View>
            </View>
            <View style={styles.palette}>
              {PALETTE.map((c) => (
                <Pressable
                  key={c}
                  onPress={() => setSelectedColor(c)}
                  style={[styles.swatch, { backgroundColor: c }, selectedColor === c && styles.swatchActive]}
                />
              ))}
            </View>
            <View style={styles.actionsRow}>
              <BigButton
                label="Reset"
                onPress={() => setSelectedColor(null)}
                color={colors.white}
                textColor={colors.navy}
                size="medium"
                style={styles.actionButton}
              />
              <BigButton
                label="New Picture"
                onPress={goToPicker}
                color={colors.blush}
                size="medium"
                style={styles.actionButton}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.previewWrap}>
              <View style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}>
                <PuzzleIllustration item={itemId} tone="outline" size={CANVAS_SIZE} />
                <View style={StyleSheet.absoluteFill} {...panResponder.panHandlers}>
                  <Svg width="100%" height="100%">
                    {strokes.map((stroke, i) => (
                      <Path
                        key={i}
                        d={pathFromPoints(stroke)}
                        stroke={penColor}
                        strokeWidth={8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    ))}
                  </Svg>
                </View>
              </View>
            </View>
            <View style={styles.palette}>
              {PALETTE.map((c) => (
                <Pressable
                  key={c}
                  onPress={() => setPenColor(c)}
                  style={[styles.swatch, { backgroundColor: c }, penColor === c && styles.swatchActive]}
                />
              ))}
            </View>
            {traced ? (
              <BigButton label="New Picture" onPress={goToPicker} color={colors.marigold} style={styles.wideButton} />
            ) : (
              <View style={styles.actionsRow}>
                <BigButton
                  label="Clear"
                  onPress={() => setStrokes([])}
                  color={colors.white}
                  textColor={colors.navy}
                  size="medium"
                  style={styles.actionButton}
                />
                <BigButton
                  label="Done! 🎉"
                  onPress={() => setTraced(true)}
                  color={colors.marigold}
                  size="medium"
                  style={styles.actionButton}
                />
              </View>
            )}
          </>
        )}
      </View>
      {traced && <ConfettiBurst />}
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
  itemLabel: {
    ...typography.title,
    fontSize: 20,
  },
  previewWrap: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  palette: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    justifyContent: "center",
  },
  swatch: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    borderWidth: 3,
    borderColor: colors.white,
  },
  swatchActive: {
    borderColor: colors.navy,
  },
  actionsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    width: "100%",
  },
  actionButton: {
    flex: 1,
  },
  wideButton: {
    width: "100%",
  },
});
