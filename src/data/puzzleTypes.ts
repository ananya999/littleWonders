export type PuzzleCategoryId = "cars" | "fruits" | "vegetables" | "animals" | "food" | "objects";

export type PuzzleItemId =
  | "car-sedan"
  | "car-truck"
  | "car-bus"
  | "car-scooter"
  | "car-taxi"
  | "car-firetruck"
  | "car-motorcycle"
  | "car-train"
  | "fruit-apple"
  | "fruit-banana"
  | "fruit-watermelon"
  | "fruit-strawberry"
  | "fruit-grapes"
  | "fruit-orange"
  | "fruit-pineapple"
  | "fruit-mango"
  | "veg-carrot"
  | "veg-broccoli"
  | "veg-corn"
  | "veg-tomato"
  | "veg-potato"
  | "veg-onion"
  | "veg-eggplant"
  | "veg-pea"
  | "animal-dog"
  | "animal-cat"
  | "animal-elephant"
  | "animal-lion"
  | "animal-rabbit"
  | "animal-bear"
  | "animal-duck"
  | "animal-monkey"
  | "food-pizza"
  | "food-sandwich"
  | "food-icecream"
  | "food-cookie"
  | "food-egg"
  | "food-bread"
  | "food-milk"
  | "food-cupcake"
  | "obj-toothbrush"
  | "obj-spoon"
  | "obj-cup"
  | "obj-ball"
  | "obj-shoe"
  | "obj-umbrella"
  | "obj-clock"
  | "obj-book";

export interface PuzzleItem {
  id: PuzzleItemId;
  category: PuzzleCategoryId;
  label: string;
}

export interface PuzzleCategoryMeta {
  id: PuzzleCategoryId;
  title: string;
  subtitle: string;
  color: string;
  icon: PuzzleItemId;
}
