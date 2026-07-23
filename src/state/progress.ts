import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { STICKERS } from "../data/stickers";

const STORAGE_KEY = "tinyfest.progress.v1";

export interface ProgressState {
  completedDates: string[]; // "YYYY-MM-DD"
  earnedStickerIds: string[];
  puzzleStars: number;
}

const EMPTY_STATE: ProgressState = {
  completedDates: [],
  earnedStickerIds: [],
  puzzleStars: 0,
};

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function dayBefore(dateKey: string): string {
  const d = new Date(dateKey + "T00:00:00");
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function computeStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;
  const set = new Set(completedDates);
  let cursor = todayKey();
  if (!set.has(cursor)) {
    cursor = dayBefore(cursor);
    if (!set.has(cursor)) return 0;
  }
  let streak = 0;
  while (set.has(cursor)) {
    streak += 1;
    cursor = dayBefore(cursor);
  }
  return streak;
}

async function loadProgress(): Promise<ProgressState> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw);
    return {
      completedDates: Array.isArray(parsed.completedDates) ? parsed.completedDates : [],
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

  const completeStoryTime = useCallback(async (): Promise<{ sticker: (typeof STICKERS)[number]; streak: number }> => {
    const today = todayKey();
    const alreadyDoneToday = state.completedDates.includes(today);
    const nextCompletedDates = alreadyDoneToday
      ? state.completedDates
      : [...state.completedDates, today];

    const unearned = STICKERS.filter((s) => !state.earnedStickerIds.includes(s.id));
    const pool = unearned.length > 0 ? unearned : STICKERS;
    const sticker = pool[Math.floor(Math.random() * pool.length)];
    const nextEarned = state.earnedStickerIds.includes(sticker.id)
      ? state.earnedStickerIds
      : [...state.earnedStickerIds, sticker.id];

    const next: ProgressState = {
      ...state,
      completedDates: nextCompletedDates,
      earnedStickerIds: nextEarned,
    };
    setState(next);
    await saveProgress(next);
    return { sticker, streak: computeStreak(next.completedDates) };
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
    completedDates: state.completedDates,
    earnedStickerIds: state.earnedStickerIds,
    puzzleStars: state.puzzleStars,
    streak: computeStreak(state.completedDates),
    completedToday: state.completedDates.includes(todayKey()),
    completeStoryTime,
    completePuzzleCategory,
    resetProgress,
  };
}
