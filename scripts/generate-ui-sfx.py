"""Synthesizes short, gentle UI sound effects as WAV files.

Regenerate with: python3 scripts/generate-ui-sfx.py
"""
import math
import struct
import wave

SAMPLE_RATE = 22050


def envelope(i: int, total: int, attack: int, release: int) -> float:
    if i < attack:
        return i / attack
    if i > total - release:
        return max(0.0, (total - i) / release)
    return 1.0


def sine(freq: float, t: float) -> float:
    return math.sin(2 * math.pi * freq * t)


def render_note(freq: float, duration_s: float, amplitude: float = 0.35, attack_s: float = 0.01, release_s: float = 0.08) -> list:
    total = int(SAMPLE_RATE * duration_s)
    attack = max(1, int(SAMPLE_RATE * attack_s))
    release = max(1, int(SAMPLE_RATE * release_s))
    samples = []
    for i in range(total):
        t = i / SAMPLE_RATE
        env = envelope(i, total, attack, release)
        samples.append(sine(freq, t) * amplitude * env)
    return samples


def render_silence(duration_s: float) -> list:
    return [0.0] * int(SAMPLE_RATE * duration_s)


def mix(*layers: list) -> list:
    length = max(len(layer) for layer in layers)
    out = [0.0] * length
    for layer in layers:
        for i, s in enumerate(layer):
            out[i] += s
    return out


def write_wav(path: str, samples: list) -> None:
    with wave.open(path, "w") as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(SAMPLE_RATE)
        frames = b"".join(
            struct.pack("<h", int(max(-1.0, min(1.0, s)) * 32767)) for s in samples
        )
        f.writeframes(frames)


def build_ui_tap() -> list:
    # A soft, quick two-tone "pop" for button presses.
    return render_note(880.0, 0.05, amplitude=0.3, attack_s=0.003, release_s=0.03)


def build_celebration() -> list:
    # A cheerful ascending three-note chime (C5-E5-G5) with a light sparkle on top.
    samples = []
    samples += render_note(523.25, 0.16, amplitude=0.32)
    samples += render_silence(0.02)
    samples += render_note(659.25, 0.16, amplitude=0.32)
    samples += render_silence(0.02)
    samples += render_note(783.99, 0.32, amplitude=0.34)

    sparkle_start = int(SAMPLE_RATE * 0.34)
    sparkle = render_note(1568.0, 0.28, amplitude=0.14, attack_s=0.02, release_s=0.2)
    padded_sparkle = [0.0] * sparkle_start + sparkle

    return mix(samples, padded_sparkle)


if __name__ == "__main__":
    write_wav("assets/sounds/ui-tap.wav", build_ui_tap())
    print("Wrote assets/sounds/ui-tap.wav")
    write_wav("assets/sounds/celebration.wav", build_celebration())
    print("Wrote assets/sounds/celebration.wav")
