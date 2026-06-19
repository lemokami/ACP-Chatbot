// Theme registry. Each theme maps to a CSS token block in `style.css`
// (`[data-theme="<id>"]`), except "clay" which is the `:root` palette.
// `dark` toggles the `.dark` class so Tailwind `dark:` variants activate.

export interface ThemeDef {
  id: string;
  label: string;
  dark: boolean;
}

export const THEMES: ThemeDef[] = [
  { id: "clay-dark", label: "Clay (Dark)", dark: true },
  { id: "clay", label: "Clay (Light)", dark: false },
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

export const DEFAULT_THEME = "clay-dark";
// Bumped key so the previous build's auto-saved default doesn't pin the theme.
const STORAGE_KEY = "justchat-theme:v2";

export function applyTheme(id: string, persist = true) {
  const t = THEMES.find((x) => x.id === id) || THEMES[0];
  const root = document.documentElement;
  // "clay" is the :root palette and needs no data-theme attribute.
  if (t.id === "clay") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", t.id);
  root.classList.toggle("dark", t.dark);
  root.style.colorScheme = t.dark ? "dark" : "light";
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, t.id);
    } catch {
      /* storage unavailable */
    }
  }
}

/** Read the saved theme (default if none), apply it, and return its id.
 *  Does not persist, so the default applies until the user picks a theme. */
export function initTheme(): string {
  let id = DEFAULT_THEME;
  try {
    id = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
  } catch {
    /* storage unavailable */
  }
  if (!THEMES.some((t) => t.id === id)) id = DEFAULT_THEME;
  applyTheme(id, false);
  return id;
}
