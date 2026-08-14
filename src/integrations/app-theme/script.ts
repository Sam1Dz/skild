import type { Theme } from './server';

/** Hex colors for the `theme-color` meta tag, keyed by resolved theme. */
interface ThemeColors {
	light: string;
	dark: string;
}

/**
 * Runs pre-hydration via ScriptOnce to resolve the initial theme in the browser.
 *
 * @remarks
 * The server already resolves `'light'`/`'dark'` straight into the SSR HTML (see
 * `__root.tsx`), so this only has work to do for `'system'`, which has no
 * server-side signal and must be resolved from the browser's media query. This
 * also corrects the SSR-rendered `theme-color` meta tag, which defaults to the
 * light color since the server can't know the OS preference.
 *
 * @param theme - The {@link Theme} preference resolved on the server.
 * @param colors - The light/dark `theme-color` values to apply once resolved.
 */
function themeInitScript(theme: Theme, colors: ThemeColors) {
	try {
		if (theme === 'system') {
			const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const resolved = dark ? 'dark' : 'light';
			const root = document.documentElement;
			root.classList.add(resolved);
			root.dataset.theme = resolved;
			root.style.colorScheme = resolved;
			document.querySelector('meta[name="theme-color"]')?.setAttribute('content', colors[resolved]);
		}
	} catch {}
}

/**
 * Serializes {@link themeInitScript} into an IIFE string for inline execution.
 *
 * @remarks
 * Intended for use with TanStack Start's `ScriptOnce`, so the theme is resolved
 * before hydration and no flash of incorrect theme occurs.
 *
 * @example
 * ```tsx
 * <ScriptOnce>{getThemeInitScript(theme, colors)}</ScriptOnce>
 * ```
 *
 * @param theme - The {@link Theme} preference resolved on the server.
 * @param colors - The light/dark `theme-color` values to apply once resolved.
 * @returns A self-invoking script string safe to embed inline.
 */
export function getThemeInitScript(theme: Theme, colors: ThemeColors): string {
	return `(${themeInitScript.toString()})(${JSON.stringify(theme)}, ${JSON.stringify(colors)})`;
}
