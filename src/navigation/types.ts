import { PuzzleCategoryId, PuzzleItemId } from "../data/puzzleTypes";

export type PaintingMode = "coloring" | "tracing";
export type ActivityKind = PaintingMode | "jigsaw";

export type RootStackParamList = {
  Home: undefined;
  Memory: undefined;
  MemoryGame: { levelId: string };
  PuzzleCategories: undefined;
  PuzzleGame: { category: PuzzleCategoryId };
  Painting: undefined;
  ActivityItemPicker: { activity: ActivityKind };
  PaintingActivity: { mode: PaintingMode; itemId: PuzzleItemId };
  JigsawGame: { itemId: PuzzleItemId };
  StickerBook: undefined;
  ParentGate: { destination: "Settings" };
  Settings: undefined;
};
