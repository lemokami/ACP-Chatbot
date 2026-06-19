// Theme registry. Each theme maps to a CSS token block in `style.css`
// (`[data-theme="<id>"]`), except "clay" which is the `:root` palette.
// `dark` toggles the `.dark` class so Tailwind `dark:` variants activate.

export interface ThemeDef {
  id: string;
  label: string;
  dark: boolean;
  preview: { bg: string; primary: string; fg: string };
}

export const THEMES: ThemeDef[] = [
  { id: "clay-dark", label: "Clay (Dark)", dark: true, preview: { bg: "#2a2622", primary: "#c8693f", fg: "#ece7df" } },
  { id: "clay", label: "Clay (Light)", dark: false, preview: { bg: "#f4f1ea", primary: "#bd5d3a", fg: "#2b2722" } },
  { id: "light", label: "Light", dark: false, preview: { bg: "#ffffff", primary: "#1c1c20", fg: "#0a0a0b" } },
  { id: "dark", label: "Dark", dark: true, preview: { bg: "#0a0a0b", primary: "#e4e4e7", fg: "#fafafa" } },
  { id: "dracula", label: "Dracula", dark: true, preview: { bg: "#282a36", primary: "#bd93f9", fg: "#f8f8f2" } },
  { id: "nord", label: "Nord", dark: true, preview: { bg: "#2e3440", primary: "#88c0d0", fg: "#eceff4" } },
  { id: "tokyo-night", label: "Tokyo Night", dark: true, preview: { bg: "#1a1b26", primary: "#7aa2f7", fg: "#c0caf5" } },
  { id: "catppuccin-mocha", label: "Catppuccin Mocha", dark: true, preview: { bg: "#1e1e2e", primary: "#cba6f7", fg: "#cdd6f4" } },
  { id: "rose-pine", label: "Rosé Pine", dark: true, preview: { bg: "#191724", primary: "#ebbcba", fg: "#e0def4" } },
  { id: "gruvbox-dark", label: "Gruvbox Dark", dark: true, preview: { bg: "#282828", primary: "#fe8019", fg: "#ebdbb2" } },
  { id: "solarized-light", label: "Solarized Light", dark: false, preview: { bg: "#fdf6e3", primary: "#268bd2", fg: "#586e75" } },
  { id: "solarized-dark", label: "Solarized Dark", dark: true, preview: { bg: "#002b36", primary: "#268bd2", fg: "#93a1a1" } },
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
