// Theme registry. Each theme maps to a CSS token block in `style.css`
// (`[data-theme="<id>"]`), except the default "clay" which lives in `:root`.
// `dark` toggles the `.dark` class so Tailwind `dark:` variants activate.

export interface ThemeDef {
  id: string;
  label: string;
  dark: boolean;
}

export const THEMES: ThemeDef[] = [
  { id: "clay", label: "Clay (Light)", dark: false },
  { id: "clay-dark", label: "Clay (Dark)", dark: true },
  { id: "light", label: "Light", dark: false },
  { id: "dark", label: "Dark", dark: true },
  { id: "dracula", label: "Dracula", dark: true },
  { id: "nord", label: "Nord", dark: true },
  { id: "tokyo-night", label: "Tokyo Night", dark: true },
  { id: "catppuccin-mocha", label: "Catppuccin Mocha", dark: true },
  { id: "rose-pine", label: "Rosé Pine", dark: true },
  { id: "gruvbox-dark", label: "Gruvbox Dark", dark: true },
  { id: "solarized-light", label: "Solarized Light", dark: false },
  { id: "solarized-dark", label: "Solarized Dark", dark: true },
];

export const DEFAULT_THEME = "clay";
const STORAGE_KEY = "justchat-theme";

export function applyTheme(id: string) {
  const t = THEMES.find((x) => x.id === id) || THEMES[0];
  const root = document.documentElement;
  if (t.id === DEFAULT_THEME) root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", t.id);
  root.classList.toggle("dark", t.dark);
  root.style.colorScheme = t.dark ? "dark" : "light";
  try {
    localStorage.setItem(STORAGE_KEY, t.id);
  } catch {
    /* storage unavailable */
  }
}

/** Read the saved theme (default if none), apply it, and return its id. */
export function initTheme(): string {
  let id = DEFAULT_THEME;
  try {
    id = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
  } catch {
    /* storage unavailable */
  }
  if (!THEMES.some((t) => t.id === id)) id = DEFAULT_THEME;
  applyTheme(id);
  return id;
}
