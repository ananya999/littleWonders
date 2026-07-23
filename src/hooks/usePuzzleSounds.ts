import { useAudioPlayer } from "expo-audio";
import { PuzzleItemId } from "../data/puzzleTypes";

/**
 * Loads every puzzle match sound up front (Rules of Hooks require a fixed
 * number of hook calls) and exposes a single `play(itemId)` helper.
 *
 * Every item -- vehicles, fruits, and vegetables -- gets the item's name
 * spoken aloud, so toddlers hear the word each time they get a match right.
 */
export function usePuzzleSounds() {
  const carSedan = useAudioPlayer(require("../../assets/sounds/voice/car-sedan.wav"));
  const carTruck = useAudioPlayer(require("../../assets/sounds/voice/car-truck.wav"));
  const carBus = useAudioPlayer(require("../../assets/sounds/voice/car-bus.wav"));
  const carScooter = useAudioPlayer(require("../../assets/sounds/voice/car-scooter.wav"));
  const carTaxi = useAudioPlayer(require("../../assets/sounds/voice/car-taxi.wav"));
  const carFiretruck = useAudioPlayer(require("../../assets/sounds/voice/car-firetruck.wav"));
  const carMotorcycle = useAudioPlayer(require("../../assets/sounds/voice/car-motorcycle.wav"));
  const carTrain = useAudioPlayer(require("../../assets/sounds/voice/car-train.wav"));
  const fruitApple = useAudioPlayer(require("../../assets/sounds/voice/fruit-apple.wav"));
  const fruitBanana = useAudioPlayer(require("../../assets/sounds/voice/fruit-banana.wav"));
  const fruitWatermelon = useAudioPlayer(require("../../assets/sounds/voice/fruit-watermelon.wav"));
  const fruitStrawberry = useAudioPlayer(require("../../assets/sounds/voice/fruit-strawberry.wav"));
  const fruitGrapes = useAudioPlayer(require("../../assets/sounds/voice/fruit-grapes.wav"));
  const fruitOrange = useAudioPlayer(require("../../assets/sounds/voice/fruit-orange.wav"));
  const fruitPineapple = useAudioPlayer(require("../../assets/sounds/voice/fruit-pineapple.wav"));
  const fruitMango = useAudioPlayer(require("../../assets/sounds/voice/fruit-mango.wav"));
  const vegCarrot = useAudioPlayer(require("../../assets/sounds/voice/veg-carrot.wav"));
  const vegBroccoli = useAudioPlayer(require("../../assets/sounds/voice/veg-broccoli.wav"));
  const vegCorn = useAudioPlayer(require("../../assets/sounds/voice/veg-corn.wav"));
  const vegTomato = useAudioPlayer(require("../../assets/sounds/voice/veg-tomato.wav"));
  const vegPotato = useAudioPlayer(require("../../assets/sounds/voice/veg-potato.wav"));
  const vegOnion = useAudioPlayer(require("../../assets/sounds/voice/veg-onion.wav"));
  const vegEggplant = useAudioPlayer(require("../../assets/sounds/voice/veg-eggplant.wav"));
  const vegPea = useAudioPlayer(require("../../assets/sounds/voice/veg-pea.wav"));
  const animalDog = useAudioPlayer(require("../../assets/sounds/voice/animal-dog.wav"));
  const animalCat = useAudioPlayer(require("../../assets/sounds/voice/animal-cat.wav"));
  const animalElephant = useAudioPlayer(require("../../assets/sounds/voice/animal-elephant.wav"));
  const animalLion = useAudioPlayer(require("../../assets/sounds/voice/animal-lion.wav"));
  const animalRabbit = useAudioPlayer(require("../../assets/sounds/voice/animal-rabbit.wav"));
  const animalBear = useAudioPlayer(require("../../assets/sounds/voice/animal-bear.wav"));
  const animalDuck = useAudioPlayer(require("../../assets/sounds/voice/animal-duck.wav"));
  const animalMonkey = useAudioPlayer(require("../../assets/sounds/voice/animal-monkey.wav"));
  const foodPizza = useAudioPlayer(require("../../assets/sounds/voice/food-pizza.wav"));
  const foodSandwich = useAudioPlayer(require("../../assets/sounds/voice/food-sandwich.wav"));
  const foodIcecream = useAudioPlayer(require("../../assets/sounds/voice/food-icecream.wav"));
  const foodCookie = useAudioPlayer(require("../../assets/sounds/voice/food-cookie.wav"));
  const foodEgg = useAudioPlayer(require("../../assets/sounds/voice/food-egg.wav"));
  const foodBread = useAudioPlayer(require("../../assets/sounds/voice/food-bread.wav"));
  const foodMilk = useAudioPlayer(require("../../assets/sounds/voice/food-milk.wav"));
  const foodCupcake = useAudioPlayer(require("../../assets/sounds/voice/food-cupcake.wav"));
  const objToothbrush = useAudioPlayer(require("../../assets/sounds/voice/obj-toothbrush.wav"));
  const objSpoon = useAudioPlayer(require("../../assets/sounds/voice/obj-spoon.wav"));
  const objCup = useAudioPlayer(require("../../assets/sounds/voice/obj-cup.wav"));
  const objBall = useAudioPlayer(require("../../assets/sounds/voice/obj-ball.wav"));
  const objShoe = useAudioPlayer(require("../../assets/sounds/voice/obj-shoe.wav"));
  const objUmbrella = useAudioPlayer(require("../../assets/sounds/voice/obj-umbrella.wav"));
  const objClock = useAudioPlayer(require("../../assets/sounds/voice/obj-clock.wav"));
  const objBook = useAudioPlayer(require("../../assets/sounds/voice/obj-book.wav"));

  const players: Record<PuzzleItemId, ReturnType<typeof useAudioPlayer>> = {
    "car-sedan": carSedan,
    "car-truck": carTruck,
    "car-bus": carBus,
    "car-scooter": carScooter,
    "car-taxi": carTaxi,
    "car-firetruck": carFiretruck,
    "car-motorcycle": carMotorcycle,
    "car-train": carTrain,
    "fruit-apple": fruitApple,
    "fruit-banana": fruitBanana,
    "fruit-watermelon": fruitWatermelon,
    "fruit-strawberry": fruitStrawberry,
    "fruit-grapes": fruitGrapes,
    "fruit-orange": fruitOrange,
    "fruit-pineapple": fruitPineapple,
    "fruit-mango": fruitMango,
    "veg-carrot": vegCarrot,
    "veg-broccoli": vegBroccoli,
    "veg-corn": vegCorn,
    "veg-tomato": vegTomato,
    "veg-potato": vegPotato,
    "veg-onion": vegOnion,
    "veg-eggplant": vegEggplant,
    "veg-pea": vegPea,
    "animal-dog": animalDog,
    "animal-cat": animalCat,
    "animal-elephant": animalElephant,
    "animal-lion": animalLion,
    "animal-rabbit": animalRabbit,
    "animal-bear": animalBear,
    "animal-duck": animalDuck,
    "animal-monkey": animalMonkey,
    "food-pizza": foodPizza,
    "food-sandwich": foodSandwich,
    "food-icecream": foodIcecream,
    "food-cookie": foodCookie,
    "food-egg": foodEgg,
    "food-bread": foodBread,
    "food-milk": foodMilk,
    "food-cupcake": foodCupcake,
    "obj-toothbrush": objToothbrush,
    "obj-spoon": objSpoon,
    "obj-cup": objCup,
    "obj-ball": objBall,
    "obj-shoe": objShoe,
    "obj-umbrella": objUmbrella,
    "obj-clock": objClock,
    "obj-book": objBook,
  };

  function play(itemId: PuzzleItemId) {
    const player = players[itemId];
    player.seekTo(0);
    player.play();
  }

  return { play };
}
