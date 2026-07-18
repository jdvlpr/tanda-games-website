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

import { crossfade } from 'svelte/transition';
import { quintOut } from 'svelte/easing';

export const [send, receive] = crossfade({
  duration: d => Math.sqrt(d * 200),
  fallback(node, params) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;
    return {
      duration: 300,
      easing: quintOut,
      css: t => `
        transform: ${transform} scale(${t});
        opacity: ${t}
      `
    };
  }
});

export function playPaydaySound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    // Start at a lower frequency and slide up quickly for a "cha-ching" or coin sound
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch(e) {
    console.error("Audio playback failed", e);
  }
}
