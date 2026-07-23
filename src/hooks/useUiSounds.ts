import { useAudioPlayer } from "expo-audio";

/** Soft tap sound for buttons and other primary taps. */
export function useTapSound() {
  const player = useAudioPlayer(require("../../assets/sounds/ui-tap.wav"));
  return () => {
    player.seekTo(0);
    player.play();
  };
}

/** Cheerful chime that accompanies confetti/celebration moments. */
export function useCelebrationSound() {
  const player = useAudioPlayer(require("../../assets/sounds/celebration.wav"));
  return () => {
    player.seekTo(0);
    player.play();
  };
}
