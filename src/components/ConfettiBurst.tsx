import React, { useEffect, useMemo } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";
import { useCelebrationSound } from "../hooks/useUiSounds";
import { gradientPastels } from "../theme/theme";

interface Props {
  pieceCount?: number;
}

interface Particle {
  id: number;
  left: number;
  width: number;
  height: number;
  color: string;
  delay: number;
  duration: number;
  rotateDeg: number;
  drift: number;
  anim: Animated.Value;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export default function ConfettiBurst({ pieceCount = 36 }: Props) {
  const playCelebration = useCelebrationSound();

  useEffect(() => {
    playCelebration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: pieceCount }).map((_, id) => ({
        id,
        left: randomBetween(0, 100),
        width: randomBetween(7, 14),
        height: randomBetween(10, 18),
        color: gradientPastels[id % gradientPastels.length],
        delay: randomBetween(0, 250),
        duration: randomBetween(1500, 2300),
        rotateDeg: randomBetween(180, 640) * (Math.random() > 0.5 ? 1 : -1),
        drift: randomBetween(-50, 50),
        anim: new Animated.Value(0),
      })),
    [pieceCount]
  );

  useEffect(() => {
    const animations = particles.map((particle) =>
      Animated.timing(particle.anim, {
        toValue: 1,
        duration: particle.duration,
        delay: particle.delay,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      })
    );
    Animated.parallel(animations).start();
  }, [particles]);

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((particle) => {
        const translateY = particle.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [-20, SCREEN_HEIGHT + 20],
        });
        const translateX = particle.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, particle.drift],
        });
        const rotate = particle.anim.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", `${particle.rotateDeg}deg`],
        });
        const opacity = particle.anim.interpolate({
          inputRange: [0, 0.85, 1],
          outputRange: [1, 1, 0],
        });

        return (
          <Animated.View
            key={particle.id}
            style={[
              styles.piece,
              {
                left: `${particle.left}%`,
                width: particle.width,
                height: particle.height,
                backgroundColor: particle.color,
                opacity,
                transform: [{ translateY }, { translateX }, { rotate }],
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    overflow: "hidden",
  },
  piece: {
    position: "absolute",
    top: 0,
    borderRadius: 2,
  },
});
