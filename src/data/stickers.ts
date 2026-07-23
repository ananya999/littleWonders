import { SceneId } from "./types";

export interface Sticker {
  id: string;
  scene: SceneId;
  label: string;
}

export const STICKERS: Sticker[] = [
  { id: "sticker-bird", scene: "bird-hat", label: "Hat Bird" },
  { id: "sticker-cat", scene: "cat-sunglasses", label: "Cool Cat" },
  { id: "sticker-dino", scene: "dino-umbrella", label: "Rainy Dino" },
  { id: "sticker-elephant", scene: "elephant-car", label: "Driving Elephant" },
  { id: "sticker-fish", scene: "fish-crown", label: "Fish King" },
  { id: "sticker-bear", scene: "bear-cake", label: "Cake Bear" },
  { id: "sticker-rabbit", scene: "rabbit-boots", label: "Boot Rabbit" },
  { id: "sticker-fox", scene: "fox-balloon", label: "Balloon Fox" },
  { id: "sticker-owl", scene: "owl-scarf", label: "Cozy Owl" },
  { id: "sticker-turtle", scene: "turtle-backpack", label: "Traveling Turtle" },
];
