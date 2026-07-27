import { colors } from "../theme/theme";

export interface MemoryLevel {
  id: string;
  label: string;
  pairs: number;
  columns: number;
  color: string;
}

export const MEMORY_LEVELS: MemoryLevel[] = [
  { id: "beginner", label: "Beginner", pairs: 2, columns: 2, color: colors.coral },
  { id: "easy", label: "Easy", pairs: 3, columns: 3, color: colors.marigold },
  { id: "medium", label: "Medium", pairs: 4, columns: 4, color: colors.teal },
  { id: "advanced", label: "Advanced", pairs: 6, columns: 4, color: colors.purple },
];
