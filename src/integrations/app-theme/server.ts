import { createServerFn } from '@tanstack/react-start';
import { getCookie, setCookie } from '@tanstack/react-start/server';
import { z } from 'zod';

/** Validates the theme cookie/payload, accepting `'light'`, `'dark'`, or `'system'`. */
export const themeSchema = z.union([z.literal('light'), z.literal('dark'), z.literal('system')]);

/** The user's theme preference, as persisted in the `_theme` cookie. */
export type Theme = z.infer<typeof themeSchema>;

const THEME_COOKIE = '_theme';

/**
 * Reads the persisted theme preference from the `_theme` cookie.
 *
 * @remarks
 * Falls back to `'system'` when the cookie is missing or fails schema validation.
 *
 * @returns The current {@link Theme} preference.
 */
export const getThemeFn = createServerFn().handler(async () => {
	return themeSchema.catch('system').parse(getCookie(THEME_COOKIE));
});

/**
 * Persists the theme preference to the `_theme` cookie.
 *
 * @remarks
 * The cookie is set with a one-year max age and `sameSite: 'lax'` so it survives
 * top-level navigations while still resisting cross-site requests.
 *
 * @param data - The {@link Theme} value to persist.
 */
export const setThemeFn = createServerFn({ method: 'POST' })
	.validator(themeSchema)
	.handler(async ({ data }) => {
		setCookie(THEME_COOKIE, data, {
			maxAge: 60 * 60 * 24 * 365,
			path: '/',
			sameSite: 'lax',
		});
	});
