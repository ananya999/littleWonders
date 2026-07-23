import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { colors } from "../theme/theme";

export default function ScreenBackground({ style, children, ...rest }: ViewProps) {
  return (
    <View style={[styles.base, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: colors.cream,
  },
});
