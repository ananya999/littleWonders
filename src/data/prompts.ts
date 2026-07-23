import { Prompt } from "./types";

export const PROMPTS: Prompt[] = [
  {
    id: "bird-hat-why",
    category: "imagination",
    scene: "bird-hat",
    parentLine: "Ask your child: why is the bird wearing a hat?",
    helperLine: "Maybe it's cold, or maybe the hat is magic!",
    responseMode: "speak",
    seconds: 90,
  },
  {
    id: "cat-sunglasses-where",
    category: "imagination",
    scene: "cat-sunglasses",
    parentLine: "Ask your child: where is this cool cat going?",
    helperLine: "To the beach? To a party? Let them decide!",
    responseMode: "speak",
    seconds: 90,
  },
  {
    id: "dino-umbrella-feel",
    category: "feelings",
    scene: "dino-umbrella",
    parentLine: "Ask your child: how does the dinosaur feel in the rain?",
    helperLine: "Happy splashing in puddles, or a little cold?",
    responseMode: "act",
    seconds: 90,
  },
  {
    id: "elephant-car-sound",
    category: "pretend-play",
    scene: "elephant-car",
    parentLine: "Ask your child: what sound does the elephant's car make?",
    helperLine: "Try honking together — beep beep!",
    responseMode: "act",
    seconds: 60,
  },
  {
    id: "fish-crown-kingdom",
    category: "imagination",
    scene: "fish-crown",
    parentLine: "Ask your child: what is the fish king of?",
    helperLine: "The ocean? A bathtub? A puddle?",
    responseMode: "speak",
    seconds: 90,
  },
  {
    id: "bear-cake-share",
    category: "kindness",
    scene: "bear-cake",
    parentLine: "Ask your child: who should the bear share the cake with?",
    helperLine: "A friend, a sibling, or even you?",
    responseMode: "speak",
    seconds: 90,
  },
  {
    id: "rabbit-boots-going",
    category: "curiosity",
    scene: "rabbit-boots",
    parentLine: "Ask your child: why does the rabbit need big boots today?",
    helperLine: "Puddles? Snow? A big adventure outside?",
    responseMode: "point",
    seconds: 60,
  },
  {
    id: "fox-balloon-wish",
    category: "imagination",
    scene: "fox-balloon",
    parentLine: "Ask your child: if you had that balloon, where would you fly?",
    helperLine: "To grandma's house? To the moon?",
    responseMode: "draw",
    seconds: 120,
  },
  {
    id: "owl-scarf-cold",
    category: "feelings",
    scene: "owl-scarf",
    parentLine: "Ask your child: what makes the owl feel cozy?",
    helperLine: "A warm scarf, a hug, a blanket?",
    responseMode: "speak",
    seconds: 60,
  },
  {
    id: "turtle-backpack-pack",
    category: "curiosity",
    scene: "turtle-backpack",
    parentLine: "Ask your child: what did the turtle pack for the trip?",
    helperLine: "Snacks, a toy, a favorite book?",
    responseMode: "draw",
    seconds: 120,
  },
];

export function getSessionPrompts(count = 3): Prompt[] {
  const shuffled = [...PROMPTS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
