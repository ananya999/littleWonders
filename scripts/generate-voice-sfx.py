"""Synthesizes cheerful spoken-word sound effects using the macOS `say` command.

Used for every puzzle category: when a child matches an item correctly, the
app plays this recording of the item's name aloud (including vehicles, which
previously used synthesized horn/beep tones).

macOS only (relies on the built-in `say` and `afconvert` tools). Regenerate with:
    python3 scripts/generate-voice-sfx.py
"""
import os
import subprocess

VOICE = "Samantha"
RATE_WPM = "165"  # slightly slower and clearer than the default speaking rate
OUTPUT_DIR = "assets/sounds/voice"

WORDS = {
    "car-sedan": "Car!",
    "car-truck": "Truck!",
    "car-bus": "Bus!",
    "car-scooter": "Scooter!",
    "car-taxi": "Taxi!",
    "car-firetruck": "Fire Truck!",
    "car-motorcycle": "Motorcycle!",
    "car-train": "Train!",
    "fruit-apple": "Apple!",
    "fruit-banana": "Banana!",
    "fruit-watermelon": "Watermelon!",
    "fruit-strawberry": "Strawberry!",
    "fruit-grapes": "Grapes!",
    "fruit-orange": "Orange!",
    "fruit-pineapple": "Pineapple!",
    "fruit-mango": "Mango!",
    "veg-carrot": "Carrot!",
    "veg-broccoli": "Broccoli!",
    "veg-corn": "Corn!",
    "veg-tomato": "Tomato!",
    "veg-potato": "Potato!",
    "veg-onion": "Onion!",
    "veg-eggplant": "Eggplant!",
    "veg-pea": "Pea Pod!",
    "animal-dog": "Dog!",
    "animal-cat": "Cat!",
    "animal-elephant": "Elephant!",
    "animal-lion": "Lion!",
    "animal-rabbit": "Rabbit!",
    "animal-bear": "Bear!",
    "animal-duck": "Duck!",
    "animal-monkey": "Monkey!",
    "food-pizza": "Pizza!",
    "food-sandwich": "Sandwich!",
    "food-icecream": "Ice Cream!",
    "food-cookie": "Cookie!",
    "food-egg": "Egg!",
    "food-bread": "Bread!",
    "food-milk": "Milk!",
    "food-cupcake": "Cupcake!",
    "obj-toothbrush": "Toothbrush!",
    "obj-spoon": "Spoon!",
    "obj-cup": "Cup!",
    "obj-ball": "Ball!",
    "obj-shoe": "Shoe!",
    "obj-umbrella": "Umbrella!",
    "obj-clock": "Clock!",
    "obj-book": "Book!",
}


def synthesize(item_id: str, text: str) -> None:
    aiff_path = f"/tmp/{item_id}.aiff"
    wav_path = os.path.join(OUTPUT_DIR, f"{item_id}.wav")

    subprocess.run(
        ["say", "-v", VOICE, "-r", RATE_WPM, "-o", aiff_path, text],
        check=True,
    )
    subprocess.run(
        ["afconvert", "-f", "WAVE", "-d", "LEI16@22050", "-c", "1", aiff_path, wav_path],
        check=True,
    )
    os.remove(aiff_path)
    print(f"Wrote {wav_path}")


if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for item_id, text in WORDS.items():
        synthesize(item_id, text)
