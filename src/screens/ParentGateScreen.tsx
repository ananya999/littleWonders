import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import ScreenBackground from "../components/ScreenBackground";
import BigButton from "../components/BigButton";
import { colors, radii, spacing, typography } from "../theme/theme";

type Props = NativeStackScreenProps<RootStackParamList, "ParentGate">;

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function ParentGateScreen({ navigation, route }: Props) {
  const { a, b } = useMemo(() => ({ a: randomInt(4, 9), b: randomInt(3, 8) }), []);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = () => {
    if (parseInt(value, 10) === a * b) {
      navigation.replace(route.params.destination);
    } else {
      setError(true);
      setValue("");
    }
  };

  return (
    <ScreenBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Grown-ups only</Text>
        <Text style={styles.subtitle}>Solve this to continue</Text>
        <Text style={styles.equation}>
          {a} × {b} = ?
        </Text>
        <TextInput
          value={value}
          onChangeText={(t) => {
            setValue(t.replace(/[^0-9]/g, ""));
            setError(false);
          }}
          keyboardType="number-pad"
          style={[styles.input, error && styles.inputError]}
          placeholder="?"
          maxLength={4}
        />
        {error ? <Text style={styles.errorText}>Not quite — try again.</Text> : null}
        <BigButton label="Continue" onPress={onSubmit} color={colors.coral} style={styles.button} />
        <BigButton
          label="Cancel"
          onPress={() => navigation.goBack()}
          color={colors.white}
          textColor={colors.navy}
          size="medium"
        />
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  title: {
    ...typography.title,
  },
  subtitle: {
    ...typography.body,
    opacity: 0.7,
  },
  equation: {
    ...typography.display,
    marginVertical: spacing.md,
  },
  input: {
    width: 140,
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    backgroundColor: colors.white,
    borderRadius: radii.md,
    paddingVertical: spacing.sm,
    color: colors.navy,
  },
  inputError: {
    borderWidth: 2,
    borderColor: colors.coral,
  },
  errorText: {
    color: colors.coral,
    fontWeight: "700",
  },
  button: {
    width: "100%",
    marginTop: spacing.md,
  },
});
