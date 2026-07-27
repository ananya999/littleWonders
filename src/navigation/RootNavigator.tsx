import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import HomeScreen from "../screens/HomeScreen";
import MemoryLevelsScreen from "../screens/MemoryLevelsScreen";
import MemoryGameScreen from "../screens/MemoryGameScreen";
import PuzzleCategoriesScreen from "../screens/PuzzleCategoriesScreen";
import PuzzleGameScreen from "../screens/PuzzleGameScreen";
import PaintingModesScreen from "../screens/PaintingModesScreen";
import ActivityItemPickerScreen from "../screens/ActivityItemPickerScreen";
import PaintingActivityScreen from "../screens/PaintingActivityScreen";
import JigsawGameScreen from "../screens/JigsawGameScreen";
import StickerBookScreen from "../screens/StickerBookScreen";
import ParentGateScreen from "../screens/ParentGateScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Memory" component={MemoryLevelsScreen} />
        <Stack.Screen name="MemoryGame" component={MemoryGameScreen} />
        <Stack.Screen name="PuzzleCategories" component={PuzzleCategoriesScreen} />
        <Stack.Screen name="PuzzleGame" component={PuzzleGameScreen} />
        <Stack.Screen name="Painting" component={PaintingModesScreen} />
        <Stack.Screen name="ActivityItemPicker" component={ActivityItemPickerScreen} />
        <Stack.Screen name="PaintingActivity" component={PaintingActivityScreen} />
        <Stack.Screen name="JigsawGame" component={JigsawGameScreen} />
        <Stack.Screen name="StickerBook" component={StickerBookScreen} />
        <Stack.Screen name="ParentGate" component={ParentGateScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
