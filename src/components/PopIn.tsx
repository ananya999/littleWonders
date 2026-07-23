import React, { useEffect, useRef } from "react";
import { Animated, Easing, ViewStyle } from "react-native";

interface Props {
  children: React.ReactNode;
  delay?: number;
  style?: ViewStyle;
}

/** Fades and springs its children in on mount -- a light "pop" entrance for cards and tiles. */
export default function PopIn({ children, delay = 0, style }: Props) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 420,
      delay,
      easing: Easing.out(Easing.back(1.4)),
      useNativeDriver: true,
    }).start();
  }, [anim, delay]);

  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] });

  return <Animated.View style={[style, { opacity: anim, transform: [{ scale }] }]}>{children}</Animated.View>;
}
