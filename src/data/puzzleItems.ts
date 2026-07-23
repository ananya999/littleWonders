import { colors } from "../theme/theme";
import { PuzzleCategoryMeta, PuzzleItem } from "./puzzleTypes";

export const PUZZLE_ITEMS: PuzzleItem[] = [
  { id: "car-sedan", category: "cars", label: "Car" },
  { id: "car-truck", category: "cars", label: "Truck" },
  { id: "car-bus", category: "cars", label: "Bus" },
  { id: "car-scooter", category: "cars", label: "Scooter" },
  { id: "car-taxi", category: "cars", label: "Taxi" },
  { id: "car-firetruck", category: "cars", label: "Fire Truck" },
  { id: "car-motorcycle", category: "cars", label: "Motorcycle" },
  { id: "car-train", category: "cars", label: "Train" },
  { id: "fruit-apple", category: "fruits", label: "Apple" },
  { id: "fruit-banana", category: "fruits", label: "Banana" },
  { id: "fruit-watermelon", category: "fruits", label: "Watermelon" },
  { id: "fruit-strawberry", category: "fruits", label: "Strawberry" },
  { id: "fruit-grapes", category: "fruits", label: "Grapes" },
  { id: "fruit-orange", category: "fruits", label: "Orange" },
  { id: "fruit-pineapple", category: "fruits", label: "Pineapple" },
  { id: "fruit-mango", category: "fruits", label: "Mango" },
  { id: "veg-carrot", category: "vegetables", label: "Carrot" },
  { id: "veg-broccoli", category: "vegetables", label: "Broccoli" },
  { id: "veg-corn", category: "vegetables", label: "Corn" },
  { id: "veg-tomato", category: "vegetables", label: "Tomato" },
  { id: "veg-potato", category: "vegetables", label: "Potato" },
  { id: "veg-onion", category: "vegetables", label: "Onion" },
  { id: "veg-eggplant", category: "vegetables", label: "Eggplant" },
  { id: "veg-pea", category: "vegetables", label: "Pea Pod" },
  { id: "animal-dog", category: "animals", label: "Dog" },
  { id: "animal-cat", category: "animals", label: "Cat" },
  { id: "animal-elephant", category: "animals", label: "Elephant" },
  { id: "animal-lion", category: "animals", label: "Lion" },
  { id: "animal-rabbit", category: "animals", label: "Rabbit" },
  { id: "animal-bear", category: "animals", label: "Bear" },
  { id: "animal-duck", category: "animals", label: "Duck" },
  { id: "animal-monkey", category: "animals", label: "Monkey" },
  { id: "food-pizza", category: "food", label: "Pizza" },
  { id: "food-sandwich", category: "food", label: "Sandwich" },
  { id: "food-icecream", category: "food", label: "Ice Cream" },
  { id: "food-cookie", category: "food", label: "Cookie" },
  { id: "food-egg", category: "food", label: "Egg" },
  { id: "food-bread", category: "food", label: "Bread" },
  { id: "food-milk", category: "food", label: "Milk" },
  { id: "food-cupcake", category: "food", label: "Cupcake" },
  { id: "obj-toothbrush", category: "objects", label: "Toothbrush" },
  { id: "obj-spoon", category: "objects", label: "Spoon" },
  { id: "obj-cup", category: "objects", label: "Cup" },
  { id: "obj-ball", category: "objects", label: "Ball" },
  { id: "obj-shoe", category: "objects", label: "Shoe" },
  { id: "obj-umbrella", category: "objects", label: "Umbrella" },
  { id: "obj-clock", category: "objects", label: "Clock" },
  { id: "obj-book", category: "objects", label: "Book" },
];

export const PUZZLE_CATEGORIES: PuzzleCategoryMeta[] = [
  { id: "cars", title: "Cars", subtitle: "Match the vehicle", color: colors.skyBlue, icon: "car-sedan" },
  { id: "fruits", title: "Fruits", subtitle: "Match the fruit", color: colors.coral, icon: "fruit-apple" },
  { id: "vegetables", title: "Vegetables", subtitle: "Match the veggie", color: colors.teal, icon: "veg-carrot" },
  { id: "animals", title: "Animals", subtitle: "Match the animal", color: colors.marigold, icon: "animal-dog" },
  { id: "food", title: "Food", subtitle: "Match the food", color: colors.blush, icon: "food-pizza" },
  { id: "objects", title: "Daily Objects", subtitle: "Match the object", color: colors.purple, icon: "obj-cup" },
];

export function getCategoryItems(categoryId: string): PuzzleItem[] {
  return PUZZLE_ITEMS.filter((item) => item.category === categoryId);
}

function shuffle<T>(list: T[]): T[] {
  return [...list].sort(() => Math.random() - 0.5);
}

export interface PuzzleRound {
  target: PuzzleItem;
  options: PuzzleItem[];
}

/** Cap rounds per playthrough so sessions stay short even as item libraries grow. */
const ROUNDS_PER_SESSION = 5;

export function buildRounds(categoryId: string): PuzzleRound[] {
  const items = getCategoryItems(categoryId);
  const orderedTargets = shuffle(items).slice(0, Math.min(ROUNDS_PER_SESSION, items.length));

  return orderedTargets.map((target) => {
    const distractors = shuffle(items.filter((item) => item.id !== target.id)).slice(0, 2);
    return { target, options: shuffle([target, ...distractors]) };
  });
}
