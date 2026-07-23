export type ResponseMode = "speak" | "point" | "act" | "draw";

export type SceneId =
  | "bird-hat"
  | "cat-sunglasses"
  | "dino-umbrella"
  | "elephant-car"
  | "fish-crown"
  | "bear-cake"
  | "rabbit-boots"
  | "fox-balloon"
  | "owl-scarf"
  | "turtle-backpack";

export type PromptCategory =
  | "imagination"
  | "feelings"
  | "kindness"
  | "curiosity"
  | "pretend-play";

export interface Prompt {
  id: string;
  category: PromptCategory;
  scene: SceneId;
  /** What the parent reads aloud to the child. */
  parentLine: string;
  /** A gentle nudge if the child needs help getting started. */
  helperLine: string;
  responseMode: ResponseMode;
  seconds: number;
}

export const CATEGORY_LABEL: Record<PromptCategory, string> = {
  imagination: "Imagination",
  feelings: "Feelings",
  kindness: "Kindness",
  curiosity: "Curiosity",
  "pretend-play": "Pretend Play",
};

export const RESPONSE_MODE_LABEL: Record<ResponseMode, string> = {
  speak: "Say it together",
  point: "Point & show",
  act: "Act it out",
  draw: "Draw the answer",
};
