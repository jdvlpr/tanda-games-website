
import { theme } from './stores';

/**
 * Set the page theme
 *
 * @param   {string}  value  'light', 'dark', or 'system'
 *
 */
export const setTheme = (value) => {
    // Whenever the user explicitly chooses light mode
    if (value === 'light') localStorage.theme = 'light';

    // Whenever the user explicitly chooses dark mode
    if (value === 'dark') localStorage.theme = 'dark';

    // Whenever the user explicitly chooses to respect the OS preference
    if (value === 'system') localStorage.removeItem('theme');

    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    theme.set(value);
};