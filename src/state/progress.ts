import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { STICKERS } from "../data/stickers";

const STORAGE_KEY = "tinyfest.progress.v1";

export interface ProgressState {
  earnedStickerIds: string[];
  puzzleStars: number;
}

const EMPTY_STATE: ProgressState = {
  earnedStickerIds: [],
  puzzleStars: 0,
};

async function loadProgress(): Promise<ProgressState> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw);
    return {
      earnedStickerIds: Array.isArray(parsed.earnedStickerIds) ? parsed.earnedStickerIds : [],
      puzzleStars: typeof parsed.puzzleStars === "number" ? parsed.puzzleStars : 0,
    };
  } catch {
    return EMPTY_STATE;
  }
}

async function saveProgress(state: ProgressState): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(EMPTY_STATE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadProgress().then((loaded) => {
      setState(loaded);
      setReady(true);
    });
  }, []);

  const completeMemoryLevel = useCallback(async (): Promise<{ sticker: (typeof STICKERS)[number] }> => {
    const unearned = STICKERS.filter((s) => !state.earnedStickerIds.includes(s.id));
    const pool = unearned.length > 0 ? unearned : STICKERS;
    const sticker = pool[Math.floor(Math.random() * pool.length)];
    const nextEarned = state.earnedStickerIds.includes(sticker.id)
      ? state.earnedStickerIds
      : [...state.earnedStickerIds, sticker.id];

    const next: ProgressState = { ...state, earnedStickerIds: nextEarned };
    setState(next);
    await saveProgress(next);
    return { sticker };
  }, [state]);

  const completePuzzleCategory = useCallback(async (): Promise<{ puzzleStars: number }> => {
    const next: ProgressState = { ...state, puzzleStars: state.puzzleStars + 1 };
    setState(next);
    await saveProgress(next);
    return { puzzleStars: next.puzzleStars };
  }, [state]);

  const resetProgress = useCallback(async () => {
    setState(EMPTY_STATE);
    await saveProgress(EMPTY_STATE);
  }, []);

  return {
    ready,
    earnedStickerIds: state.earnedStickerIds,
    puzzleStars: state.puzzleStars,
    completeMemoryLevel,
    completePuzzleCategory,
    resetProgress,
  };
}
