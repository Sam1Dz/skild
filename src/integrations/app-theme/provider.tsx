import { useServerFn } from '@tanstack/react-start';
import * as React from 'react';
import { setThemeFn, type Theme } from './server';

/** A {@link Theme} preference resolved down to an actual color scheme. */
type ResolvedTheme = 'light' | 'dark';

/** Value exposed by {@link AppThemeProvider} via {@link useAppTheme}. */
interface ThemeContextValue {
	/** The user's raw theme preference, including `'system'`. */
	theme: Theme;
	/** The resolved color scheme; `undefined` until `'system'` can be resolved on the client. */
	resolvedTheme: ResolvedTheme | undefined;
	/** Updates the theme preference, applying it to the DOM and persisting it. */
	setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

const CHANNEL_NAME = 'app-theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

/** Reads the OS-level color scheme preference via `prefers-color-scheme`. */
function getSystemTheme(): ResolvedTheme {
	return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

/** Applies the resolved theme to `<html>` via class, `data-theme`, and `color-scheme`. */
function applyToDom(resolved: ResolvedTheme) {
	const root = document.documentElement;
	root.classList.remove('light', 'dark');
	root.classList.add(resolved);
	root.dataset.theme = resolved;
	root.style.colorScheme = resolved;
}

/** Swaps the DOM theme without letting unrelated CSS transitions (hover states, etc.) animate along with it. */
function applyWithoutTransition(resolved: ResolvedTheme) {
	const style = document.createElement('style');
	style.textContent = '*,*::before,*::after{transition:none!important}';
	document.head.appendChild(style);
	applyToDom(resolved);
	window.getComputedStyle(style).opacity; // force reflow so the disabled transition actually applies
	window.setTimeout(() => document.head.removeChild(style), 0);
}

/**
 * Provides the current {@link Theme} and a setter to descendants, syncing changes
 * to the DOM, the persisted cookie, and other open tabs.
 *
 * @remarks
 * `initialTheme` should come from {@link getThemeFn} (or the cookie read during
 * SSR) so the client state matches what the server already rendered. Consume the
 * context with {@link useAppTheme}.
 *
 * @example
 * ```tsx
 * <AppThemeProvider initialTheme={initialTheme}>
 *   <App />
 * </AppThemeProvider>
 * ```
 *
 * @param props.initialTheme - The theme resolved on the server for the initial render.
 * @param props.children - The subtree that can consume the theme context.
 */
export function AppThemeProvider({
	initialTheme,
	children,
}: {
	initialTheme: Theme;
	children: React.ReactNode;
}) {
	const [theme, setThemeState] = React.useState<Theme>(initialTheme);
	// Can't know the OS preference during SSR, so 'system' starts unresolved and is
	// filled in on mount, mirroring the ScriptOnce fallback that already fixed the DOM.
	const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme | undefined>(() =>
		initialTheme === 'system' ? undefined : initialTheme
	);
	const setThemeServer = useServerFn(setThemeFn);
	const channelRef = React.useRef<BroadcastChannel | null>(null);

	const applyTheme = React.useCallback((next: Theme, broadcast: boolean) => {
		const resolved = next === 'system' ? getSystemTheme() : next;
		applyWithoutTransition(resolved);
		setThemeState(next);
		setResolvedTheme(resolved);
		if (broadcast) channelRef.current?.postMessage(next);
	}, []);

	React.useEffect(() => {
		if (theme === 'system') setResolvedTheme(getSystemTheme());
	}, [theme]);

	// Live OS-preference updates while the user's preference is 'system'.
	React.useEffect(() => {
		const mql = window.matchMedia(DARK_QUERY);
		function handleChange() {
			if (theme === 'system') applyTheme('system', false);
		}
		mql.addEventListener('change', handleChange);
		return () => mql.removeEventListener('change', handleChange);
	}, [theme, applyTheme]);

	// Cookies don't emit a `storage` event, so cross-tab sync goes through BroadcastChannel instead.
	React.useEffect(() => {
		const channel = new BroadcastChannel(CHANNEL_NAME);
		channelRef.current = channel;
		channel.onmessage = (event: MessageEvent<Theme>) => applyTheme(event.data, false);
		return () => channel.close();
	}, [applyTheme]);

	const setTheme = React.useCallback(
		(next: Theme) => {
			applyTheme(next, true);
			void setThemeServer({ data: next });
		},
		[applyTheme, setThemeServer]
	);

	const value = React.useMemo(
		() => ({ theme, resolvedTheme, setTheme }),
		[theme, resolvedTheme, setTheme]
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Reads the current {@link ThemeContextValue} from the nearest {@link AppThemeProvider}.
 *
 * @throws {Error} If called outside of an {@link AppThemeProvider}.
 * @returns The current theme, resolved theme, and setter.
 */
export function useAppTheme() {
	const ctx = React.useContext(ThemeContext);
	if (!ctx) throw new Error('useAppTheme must be used within AppThemeProvider');
	return ctx;
}
