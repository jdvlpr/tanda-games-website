import { theme } from "./stores.svelte";

/**
 * Set the page theme
 *
 * @param   {string}  value  'light', 'dark', or 'system'
 *
 */
export const setTheme = (value) => {
  // Whenever the user explicitly chooses light mode
  if (value === "light") localStorage.theme = "light";

  // Whenever the user explicitly chooses dark mode
  if (value === "dark") localStorage.theme = "dark";

  // Whenever the user explicitly chooses to respect the OS preference
  if (value === "system") localStorage.removeItem("theme");

  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  theme.value = value;
};

import { crossfade } from "svelte/transition";
import { quintOut } from "svelte/easing";

export const [send, receive] = crossfade({
  duration: (d) => Math.sqrt(d * 200),
  fallback(node, params) {
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;
    return {
      duration: 300,
      easing: quintOut,
      css: (t) => `
        transform: ${transform} scale(${t});
        opacity: ${t}
      `,
    };
  },
});

export function playPaydaySound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // 'sine' gives a clean, modern metallic ring.
    // Change to 'square' if you want a retro, 8-bit arcade feel.
    osc.type = "sine";

    const t = ctx.currentTime;

    // The "Cha" - First note (B5)
    osc.frequency.setValueAtTime(988, t);

    // The "Ching" - Instant jump to the second note (E6) after 80ms
    osc.frequency.setValueAtTime(1319, t + 0.08);

    // Volume envelope
    gain.gain.setValueAtTime(0, t);
    // 1. Quick attack to full volume
    gain.gain.linearRampToValueAtTime(0.2, t + 0.02);
    // 2. Hold the volume for the duration of the first note
    gain.gain.setValueAtTime(0.2, t + 0.08);
    // 3. Smooth, bell-like decay for the second note
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);

    osc.start(t);
    osc.stop(t + 0.5);
  } catch (e) {
    console.error("Audio playback failed", e);
  }
}
